/**
 * Common utility types and interfaces
 *
 * This module provides fundamental types used across the application.
 */

/**
 * Unique identifier type (UUID v4 format)
 * @example "550e8400-e29b-41d4-a716-446655440000"
 */
export type UUID = string

/**
 * 3D vector as tuple [x, y, z]
 */
export type Vector3 = [number, number, number]

/**
 * RGB color as tuple [r, g, b] where each component is 0-1
 */
export type Color = [number, number, number]

/**
 * RGBA color as tuple [r, g, b, a] where each component is 0-1
 */
export type ColorWithAlpha = [number, number, number, number]

/**
 * Interface for objects that can be serialized to/from JSON
 */
export interface Serializable<T = unknown> {
  /**
   * Serialize the object to a plain JSON-compatible object
   */
  toJSON(): T

  /**
   * Create an instance from a plain JSON-compatible object
   */
  fromJSON(data: T): void
}

/**
 * Timestamp in milliseconds since Unix epoch
 */
export type Timestamp = number

/**
 * Type guard to check if a value is a valid UUID
 */
export function isUUID(value: unknown): value is UUID {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}

/**
 * Type guard to check if a value is a valid Vector3
 */
export function isVector3(value: unknown): value is Vector3 {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((v) => typeof v === 'number' && !isNaN(v))
  )
}

/**
 * Type guard to check if a value is a valid Color
 */
export function isColor(value: unknown): value is Color {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((v) => typeof v === 'number' && v >= 0 && v <= 1)
  )
}

/**
 * Type guard to check if a value is a valid ColorWithAlpha
 */
export function isColorWithAlpha(value: unknown): value is ColorWithAlpha {
  return (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every((v) => typeof v === 'number' && v >= 0 && v <= 1)
  )
}
