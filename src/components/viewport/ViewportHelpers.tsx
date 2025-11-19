/**
 * ViewportHelpers - Grid and axis helpers for 3D viewport
 */

import { Grid } from '@react-three/drei'

export interface ViewportHelpersProps {
  showGrid?: boolean
  showAxes?: boolean
  gridSize?: number
  gridDivisions?: number
}

export function ViewportHelpers({
  showGrid = true,
  showAxes = true,
  gridSize = 20,
  gridDivisions = 20,
}: ViewportHelpersProps) {
  return (
    <>
      {/* Grid Helper */}
      {showGrid && (
        <Grid
          args={[gridSize, gridDivisions]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={50}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
        />
      )}

      {/* Coordinate Axes */}
      {showAxes && <axesHelper args={[5]} />}
    </>
  )
}
