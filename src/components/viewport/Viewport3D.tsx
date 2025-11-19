/**
 * Viewport3D - Primary 3D perspective viewport
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { PerfHeadless } from 'r3f-perf'
import { ViewportHelpers } from './ViewportHelpers'
import * as THREE from 'three'

export interface Viewport3DProps {
  /** Whether to show grid and axes helpers */
  showHelpers?: boolean
  /** Camera position */
  cameraPosition?: [number, number, number]
  /** Camera target (look-at point) */
  cameraTarget?: [number, number, number]
  /** Children to render in the scene */
  children?: React.ReactNode
  /** Callback when camera changes */
  onCameraChange?: (camera: THREE.Camera) => void
}

export function Viewport3D({
  showHelpers = true,
  cameraPosition = [10, 10, 10],
  cameraTarget = [0, 0, 0],
  children,
  onCameraChange,
}: Viewport3DProps) {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      linear
      style={{ width: '100%', height: '100%' }}
    >
      {/* Performance Monitor - Headless mode, UI rendered in EditorLayout */}
      <PerfHeadless />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} near={0.1} far={1000} />

      {/* Camera Controls */}
      <OrbitControls
        target={cameraTarget}
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
        onChange={(e) => {
          if (onCameraChange && e?.target) {
            onCameraChange(e.target.object as THREE.Camera)
          }
        }}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Grid and Axes Helpers */}
      {showHelpers && <ViewportHelpers />}

      {/* Scene Content */}
      {children}
    </Canvas>
  )
}
