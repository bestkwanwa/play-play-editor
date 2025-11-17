/**
 * DualViewportLayout - Picture-in-Picture dual viewport layout
 * Primary viewport (full screen) + Secondary viewport (small window)
 */

import { useState, useCallback } from 'react'
import { Viewport3D } from './Viewport3D'
import { Viewport2D } from './Viewport2D'

export type ViewportMode = '3D' | '2D'

export interface DualViewportLayoutProps {
  /** Initial primary viewport mode */
  initialMode?: ViewportMode
  /** Whether to show performance monitor */
  showPerf?: boolean
  /** Children to render in both viewports */
  children?: React.ReactNode
}

export function DualViewportLayout({
  initialMode = '3D',
  showPerf = true,
  children,
}: DualViewportLayoutProps) {
  const [primaryMode, setPrimaryMode] = useState<ViewportMode>(initialMode)

  // Swap primary and secondary viewports
  const handleSwapViewports = useCallback(() => {
    setPrimaryMode((prev) => (prev === '3D' ? '2D' : '3D'))
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
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Primary Viewport (Full Screen) */}
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        {primaryMode === '3D' ? (
          <Viewport3D
            showPerf={showPerf}
            showHelpers={true}
            onCameraChange={handlePrimaryCameraChange}
          >
            {children}
          </Viewport3D>
        ) : (
          <Viewport2D
            showPerf={showPerf}
            showHelpers={true}
            onCameraChange={handlePrimaryCameraChange}
          >
            {children}
          </Viewport2D>
        )}
      </div>

      {/* Secondary Viewport (Picture-in-Picture) */}
      <div
        className="absolute bottom-5 right-5 w-80 h-60 border-2 border-gray-600 rounded-lg overflow-hidden shadow-2xl cursor-pointer z-10 bg-gray-950 transition-all duration-200 hover:border-gray-500 hover:shadow-3xl hover:scale-105 group"
        onClick={handleSwapViewports}
      >
        {/* Viewport Label */}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold z-[11] pointer-events-none">
          {secondaryMode === '3D' ? '3D Preview' : '2D Floor Plan'}
        </div>

        {/* Viewport Content */}
        {secondaryMode === '3D' ? (
          <Viewport3D
            showPerf={false}
            showHelpers={true}
            cameraPosition={[8, 8, 8]}
            onCameraChange={handleSecondaryCameraChange}
          >
            {children}
          </Viewport3D>
        ) : (
          <Viewport2D
            showPerf={false}
            showHelpers={true}
            zoom={40}
            onCameraChange={handleSecondaryCameraChange}
          >
            {children}
          </Viewport2D>
        )}

        {/* Swap Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-gray-400 px-3 py-1 rounded text-[11px] z-[11] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Click to swap
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg tracking-wide">
          {primaryMode} Mode
        </span>
      </div>
    </div>
  )
}
