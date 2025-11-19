/**
 * Viewport2D - Orthographic top-down viewport for floor plan editing
 */

import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls } from '@react-three/drei'
import { PerfHeadless } from 'r3f-perf'
import { ViewportHelpers } from './ViewportHelpers'
import * as THREE from 'three'

export interface Viewport2DProps {
  /** Whether to show grid and axes helpers */
  showHelpers?: boolean
  /** Camera position (top-down view) */
  cameraPosition?: [number, number, number]
  /** Camera target (look-at point) */
  cameraTarget?: [number, number, number]
  /** Orthographic camera zoom level */
  zoom?: number
  /** Children to render in the scene */
  children?: React.ReactNode
  /** Callback when camera changes */
  onCameraChange?: (camera: THREE.Camera) => void
}

export function Viewport2D({
  showHelpers = true,
  cameraPosition = [0, 20, 0],
  cameraTarget = [0, 0, 0],
  zoom = 50,
  children,
  onCameraChange,
}: Viewport2DProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      linear
      style={{ width: '100%', height: '100%' }}
    >
      {/* Performance Monitor - Headless mode, UI rendered in EditorLayout */}
      <PerfHeadless />

      {/* Orthographic Camera - Top-down view */}
      <OrthographicCamera makeDefault position={cameraPosition} zoom={zoom} near={0.1} far={1000} />

      {/* Camera Controls - Restricted for 2D view */}
      <OrbitControls
        target={cameraTarget}
        enableDamping
        dampingFactor={0.05}
        enableRotate={false} // Disable rotation for pure top-down view
        minZoom={10}
        maxZoom={200}
        onChange={(e) => {
          if (onCameraChange && e?.target) {
            onCameraChange(e.target.object as THREE.Camera)
          }
        }}
      />

      {/* Lighting - Simpler for 2D view */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />

      {/* Grid and Axes Helpers */}
      {showHelpers && <ViewportHelpers />}

      {/* Scene Content */}
      {children}
    </Canvas>
  )
}
