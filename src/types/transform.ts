/**
 * Transform-related types and interfaces
 *
 * This module defines types for 3D transformations (position, rotation, scale).
 */

import type { Vector3 } from './common'

/**
 * 3D position in world space
 */
export type Position = Vector3

/**
 * 3D rotation in Euler angles (radians)
 * Order: [x, y, z] representing rotations around respective axes
 */
export type Rotation = Vector3

/**
 * 3D scale factors
 * [x, y, z] where 1.0 is original size
 */
export type Scale = Vector3

/**
 * Complete 3D transformation
 */
export interface Transform {
  /** Position in world space */
  position: Position

  /** Rotation in Euler angles (radians) */
  rotation: Rotation

  /** Scale factors */
  scale: Scale
}

/**
 * Default identity transform
 */
export const DEFAULT_TRANSFORM: Readonly<Transform> = Object.freeze({
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
})

/**
 * Type guard to check if a value is a valid Transform
 */
export function isTransform(value: unknown): value is Transform {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const t = value as Transform

  return (
    Array.isArray(t.position) &&
    t.position.length === 3 &&
    Array.isArray(t.rotation) &&
    t.rotation.length === 3 &&
    Array.isArray(t.scale) &&
    t.scale.length === 3 &&
    t.position.every((v) => typeof v === 'number' && !isNaN(v)) &&
    t.rotation.every((v) => typeof v === 'number' && !isNaN(v)) &&
    t.scale.every((v) => typeof v === 'number' && !isNaN(v))
  )
}

/**
 * Creates a new transform with default values
 */
export function createTransform(partial?: Partial<Transform>): Transform {
  return {
    position: partial?.position ?? [...DEFAULT_TRANSFORM.position],
    rotation: partial?.rotation ?? [...DEFAULT_TRANSFORM.rotation],
    scale: partial?.scale ?? [...DEFAULT_TRANSFORM.scale],
  }
}

/**
 * Clones a transform
 */
export function cloneTransform(transform: Transform): Transform {
  return {
    position: [...transform.position],
    rotation: [...transform.rotation],
    scale: [...transform.scale],
  }
}
