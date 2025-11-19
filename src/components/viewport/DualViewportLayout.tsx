/**
 * DualViewportLayout - Picture-in-Picture dual viewport layout
 * Primary viewport (full screen) + Secondary viewport (draggable small window)
 */

import { useState, useCallback } from 'react'
import { DndContext, useDraggable } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Viewport3D } from './Viewport3D'
import { Viewport2D } from './Viewport2D'

export type ViewportMode = '3D' | '2D'

export interface DualViewportLayoutProps {
  /** Initial primary viewport mode */
  initialMode?: ViewportMode
  /** Children to render in both viewports */
  children?: React.ReactNode
}

// Draggable Secondary Viewport Component
interface DraggableSecondaryViewportProps {
  secondaryMode: ViewportMode
  children?: React.ReactNode
  onSwap: () => void
  onCameraChange: () => void
}

function DraggableSecondaryViewport({
  secondaryMode,
  children,
  onSwap,
  onCameraChange,
}: DraggableSecondaryViewportProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'secondary-viewport',
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="absolute w-80 h-60 border-2 border-gray-600 rounded-lg overflow-hidden shadow-2xl z-40 bg-gray-950 group"
      {...attributes}
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        className="absolute top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-sm cursor-move flex items-center justify-between px-3 z-[11]"
      >
        <span className="text-white text-xs font-semibold ml-1">
          {secondaryMode === '3D' ? '3D Preview' : '2D Floor Plan'}
        </span>
        <button
          onClick={onSwap}
          onPointerDown={(e) => e.stopPropagation()}
          className="text-gray-400 hover:text-white hover:bg-gray-700 text-sm px-2 py-1 rounded transition-colors"
          title="Swap viewports"
        >
          ⇄
        </button>
      </div>

      {/* Viewport Content */}
      <div className="w-full h-full pt-8">
        {secondaryMode === '3D' ? (
          <Viewport3D showHelpers={true} cameraPosition={[8, 8, 8]} onCameraChange={onCameraChange}>
            {children}
          </Viewport3D>
        ) : (
          <Viewport2D showHelpers={true} zoom={40} onCameraChange={onCameraChange}>
            {children}
          </Viewport2D>
        )}
      </div>
    </div>
  )
}

export function DualViewportLayout({ initialMode = '3D', children }: DualViewportLayoutProps) {
  const [primaryMode, setPrimaryMode] = useState<ViewportMode>(initialMode)
  // Position secondary viewport in bottom-right of visible canvas area
  // Accounting for: toolbar (48px top), right sidebar (320px right)
  const [secondaryPosition, setSecondaryPosition] = useState({
    x: window.innerWidth - 320 - 340 - 20, // width - sidebar - viewport width - padding
    y: window.innerHeight - 240 - 20, // height - viewport height - padding
  })

  // Swap primary and secondary viewports
  const handleSwapViewports = useCallback(() => {
    setPrimaryMode((prev) => (prev === '3D' ? '2D' : '3D'))
  }, [])

  // Handle drag end to save position
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { delta } = event
    setSecondaryPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }))
  }, [])

  // Handle camera changes for synchronization (placeholder for future implementation)
  const handlePrimaryCameraChange = useCallback(() => {
    // TODO: Implement camera synchronization logic
  }, [])

  const handleSecondaryCameraChange = useCallback(() => {
    // TODO: Implement camera synchronization logic
  }, [])

  const secondaryMode: ViewportMode = primaryMode === '3D' ? '2D' : '3D'

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {/* Primary Viewport (Full Screen) */}
        <div className="absolute top-0 left-0 w-full h-full z-[1]">
          {primaryMode === '3D' ? (
            <Viewport3D showHelpers={true} onCameraChange={handlePrimaryCameraChange}>
              {children}
            </Viewport3D>
          ) : (
            <Viewport2D showHelpers={true} onCameraChange={handlePrimaryCameraChange}>
              {children}
            </Viewport2D>
          )}
        </div>

        {/* Draggable Secondary Viewport (Picture-in-Picture) */}
        <div
          className="z-50"
          style={{
            position: 'absolute',
            left: secondaryPosition.x,
            top: secondaryPosition.y,
          }}
        >
          <DraggableSecondaryViewport
            secondaryMode={secondaryMode}
            onSwap={handleSwapViewports}
            onCameraChange={handleSecondaryCameraChange}
          >
            {children}
          </DraggableSecondaryViewport>
        </div>
      </div>
    </DndContext>
  )
}
