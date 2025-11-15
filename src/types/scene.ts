/**
 * Scene-related types and interfaces
 *
 * This module defines the structure of scenes and scene objects.
 */

import type { UUID, Timestamp, Color } from './common'
import type { Transform } from './transform'

/**
 * Types of 3D objects that can be created in the scene
 */
export type ObjectType =
  | 'group'
  | 'cube'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'plane'
  | 'torus'
  | 'light'
  | 'camera'

/**
 * Base interface for all scene objects
 */
export interface SceneObject {
  /** Unique identifier */
  id: UUID

  /** Display name */
  name: string

  /** Object type */
  type: ObjectType

  /** 3D transformation */
  transform: Transform

  /** Visibility flag */
  visible: boolean

  /** Whether the object is locked (non-editable) */
  locked: boolean

  /** Parent object ID (null for root objects) */
  parentId: UUID | null

  /** Child object IDs */
  children: UUID[]

  /** Custom user data */
  userData: Record<string, unknown>

  /** Creation timestamp */
  createdAt: Timestamp

  /** Last modification timestamp */
  updatedAt: Timestamp
}

/**
 * Material properties for renderable objects
 */
export interface Material {
  /** Base color */
  color: Color

  /** Metalness (0 = dielectric, 1 = metallic) */
  metalness: number

  /** Roughness (0 = smooth, 1 = rough) */
  roughness: number

  /** Opacity (0 = transparent, 1 = opaque) */
  opacity: number

  /** Whether the material should be wireframe */
  wireframe: boolean
}

/**
 * Default material properties
 */
export const DEFAULT_MATERIAL: Readonly<Material> = Object.freeze({
  color: [0.8, 0.8, 0.8],
  metalness: 0,
  roughness: 0.5,
  opacity: 1,
  wireframe: false,
})

/**
 * Renderable object with material properties
 */
export interface RenderableObject extends SceneObject {
  /** Material properties */
  material: Material
}

/**
 * Scene node in the hierarchy tree
 */
export interface SceneNode {
  /** The scene object */
  object: SceneObject

  /** Parent node (null for root) */
  parent: SceneNode | null

  /** Child nodes */
  children: SceneNode[]

  /** Depth in the hierarchy (0 for root) */
  depth: number
}

/**
 * Complete scene structure
 */
export interface Scene {
  /** Scene unique identifier */
  id: UUID

  /** Scene name */
  name: string

  /** All objects in the scene (flat map) */
  objects: Map<UUID, SceneObject>

  /** Root object IDs (objects with no parent) */
  rootIds: UUID[]

  /** Scene metadata */
  metadata: {
    createdAt: Timestamp
    updatedAt: Timestamp
    author?: string
    description?: string
  }
}

/**
 * Type guard to check if an object is renderable
 */
export function isRenderableObject(object: SceneObject): object is RenderableObject {
  const renderableTypes: ObjectType[] = ['cube', 'sphere', 'cylinder', 'cone', 'plane', 'torus']
  return renderableTypes.includes(object.type)
}

/**
 * Creates a new scene object with default values
 */
export function createSceneObject(
  partial: Partial<SceneObject> & Pick<SceneObject, 'id' | 'name' | 'type'>
): SceneObject {
  const now = Date.now()

  return {
    visible: true,
    locked: false,
    parentId: null,
    children: [],
    userData: {},
    createdAt: now,
    updatedAt: now,
    transform: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    ...partial,
  }
}
