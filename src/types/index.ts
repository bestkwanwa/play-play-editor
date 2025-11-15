/**
 * Types module - TypeScript type definitions
 *
 * This module exports all TypeScript types and interfaces used throughout
 * the application. Types are organized by domain.
 */

// Common types
export type { UUID, Vector3, Color, ColorWithAlpha, Serializable, Timestamp } from './common'
export { isUUID, isVector3, isColor, isColorWithAlpha } from './common'

// Transform types
export type { Position, Rotation, Scale, Transform } from './transform'
export { DEFAULT_TRANSFORM, isTransform, createTransform, cloneTransform } from './transform'

// Scene types
export type { ObjectType, SceneObject, Material, RenderableObject, SceneNode, Scene } from './scene'
export { DEFAULT_MATERIAL, isRenderableObject, createSceneObject } from './scene'

// Editor types
export type {
  GizmoMode,
  TransformSpace,
  ViewportMode,
  CameraType,
  CameraState,
  ViewportState,
  PanelState,
  SelectionState,
  ToolState,
  EditorState,
} from './editor'
export {
  DEFAULT_CAMERA,
  DEFAULT_VIEWPORT,
  DEFAULT_PANELS,
  DEFAULT_TOOL_STATE,
  DEFAULT_EDITOR_STATE,
} from './editor'
