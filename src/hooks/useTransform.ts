/**
 * useTransform hook - Transform manipulation utilities
 *
 * This hook provides utilities for manipulating object transforms
 * with support for snapping, constraints, and undo/redo.
 */

import { useCallback } from 'react'
import { useSceneStore } from '@/store'
import { useUIStore } from '@/store'
import { useHistoryStore, type Command } from '@/store'
import type { UUID, Transform, Position, Rotation, Scale } from '@/types'

/**
 * Snap a value to grid
 */
function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Snap an angle to specified increment (in radians)
 */
function snapAngle(angle: number, snapSize: number): number {
  return Math.round(angle / snapSize) * snapSize
}

/**
 * Hook for transform manipulation with snapping support
 *
 * @param objectId - The object ID to transform
 * @returns Transform manipulation methods
 *
 * @example
 * ```tsx
 * function TransformControls({ objectId }: { objectId: string }) {
 *   const { setPosition, setRotation, setScale, applySnapping } = useTransform(objectId)
 *
 *   return (
 *     <div>
 *       <button onClick={() => setPosition([0, 0, 0])}>Reset Position</button>
 *       <button onClick={() => setRotation([0, 0, 0])}>Reset Rotation</button>
 *       <button onClick={() => setScale([1, 1, 1])}>Reset Scale</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useTransform(objectId: UUID) {
  const updateObject = useSceneStore((state) => state.updateObject)
  const getObject = useSceneStore((state) => state.getObject)
  const snapToGridEnabled = useUIStore((state) => state.tools.snapToGrid)
  const gridSnapSize = useUIStore((state) => state.tools.gridSnapSize)
  const snapAngleEnabled = useUIStore((state) => state.tools.snapAngle)
  const angleSnapSize = useUIStore((state) => state.tools.angleSnapSize)
  const execute = useHistoryStore((state) => state.execute)

  /**
   * Apply snapping to a position vector
   */
  const applyPositionSnapping = useCallback(
    (position: Position): Position => {
      if (!snapToGridEnabled) return position

      return [
        snapToGrid(position[0], gridSnapSize),
        snapToGrid(position[1], gridSnapSize),
        snapToGrid(position[2], gridSnapSize),
      ]
    },
    [snapToGridEnabled, gridSnapSize]
  )

  /**
   * Apply snapping to a rotation vector (in radians)
   */
  const applyRotationSnapping = useCallback(
    (rotation: Rotation): Rotation => {
      if (!snapAngleEnabled) return rotation

      const snapSizeRadians = (angleSnapSize * Math.PI) / 180

      return [
        snapAngle(rotation[0], snapSizeRadians),
        snapAngle(rotation[1], snapSizeRadians),
        snapAngle(rotation[2], snapSizeRadians),
      ]
    },
    [snapAngleEnabled, angleSnapSize]
  )

  /**
   * Set position with undo support
   */
  const setPosition = useCallback(
    (position: Position, withUndo = true) => {
      const object = getObject(objectId)
      if (!object) return

      const snappedPosition = applyPositionSnapping(position)
      const oldTransform = { ...object.transform }
      const newTransform: Transform = {
        ...oldTransform,
        position: snappedPosition,
      }

      if (withUndo) {
        const command: Command = {
          id: crypto.randomUUID(),
          description: `Move ${object.name}`,
          execute: () => {
            updateObject(objectId, { transform: newTransform })
          },
          undo: () => {
            updateObject(objectId, { transform: oldTransform })
          },
        }
        execute(command)
      } else {
        updateObject(objectId, { transform: newTransform })
      }
    },
    [objectId, getObject, updateObject, execute, applyPositionSnapping]
  )

  /**
   * Set rotation with undo support
   */
  const setRotation = useCallback(
    (rotation: Rotation, withUndo = true) => {
      const object = getObject(objectId)
      if (!object) return

      const snappedRotation = applyRotationSnapping(rotation)
      const oldTransform = { ...object.transform }
      const newTransform: Transform = {
        ...oldTransform,
        rotation: snappedRotation,
      }

      if (withUndo) {
        const command: Command = {
          id: crypto.randomUUID(),
          description: `Rotate ${object.name}`,
          execute: () => {
            updateObject(objectId, { transform: newTransform })
          },
          undo: () => {
            updateObject(objectId, { transform: oldTransform })
          },
        }
        execute(command)
      } else {
        updateObject(objectId, { transform: newTransform })
      }
    },
    [objectId, getObject, updateObject, execute, applyRotationSnapping]
  )

  /**
   * Set scale with undo support
   */
  const setScale = useCallback(
    (scale: Scale, withUndo = true) => {
      const object = getObject(objectId)
      if (!object) return

      const oldTransform = { ...object.transform }
      const newTransform: Transform = {
        ...oldTransform,
        scale,
      }

      if (withUndo) {
        const command: Command = {
          id: crypto.randomUUID(),
          description: `Scale ${object.name}`,
          execute: () => {
            updateObject(objectId, { transform: newTransform })
          },
          undo: () => {
            updateObject(objectId, { transform: oldTransform })
          },
        }
        execute(command)
      } else {
        updateObject(objectId, { transform: newTransform })
      }
    },
    [objectId, getObject, updateObject, execute]
  )

  /**
   * Set entire transform with undo support
   */
  const setTransform = useCallback(
    (transform: Transform, withUndo = true) => {
      const object = getObject(objectId)
      if (!object) return

      const oldTransform = { ...object.transform }
      const newTransform: Transform = {
        position: applyPositionSnapping(transform.position),
        rotation: applyRotationSnapping(transform.rotation),
        scale: transform.scale,
      }

      if (withUndo) {
        const command: Command = {
          id: crypto.randomUUID(),
          description: `Transform ${object.name}`,
          execute: () => {
            updateObject(objectId, { transform: newTransform })
          },
          undo: () => {
            updateObject(objectId, { transform: oldTransform })
          },
        }
        execute(command)
      } else {
        updateObject(objectId, { transform: newTransform })
      }
    },
    [objectId, getObject, updateObject, execute, applyPositionSnapping, applyRotationSnapping]
  )

  return {
    setPosition,
    setRotation,
    setScale,
    setTransform,
    applyPositionSnapping,
    applyRotationSnapping,
  }
}
