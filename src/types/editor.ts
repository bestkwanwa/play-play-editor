/**
 * Editor state types and interfaces
 *
 * This module defines the overall editor state and viewport configuration.
 */

import type { UUID } from './common'
import type { Vector3 } from './common'

/**
 * Transform gizmo mode
 */
export type GizmoMode = 'translate' | 'rotate' | 'scale'

/**
 * Transform space (local or world coordinates)
 */
export type TransformSpace = 'local' | 'world'

/**
 * Viewport rendering mode
 */
export type ViewportMode = 'solid' | 'wireframe' | 'shaded'

/**
 * Camera type
 */
export type CameraType = 'perspective' | 'orthographic'

/**
 * Camera configuration
 */
export interface CameraState {
  /** Camera type */
  type: CameraType

  /** Camera position in world space */
  position: Vector3

  /** Point the camera is looking at */
  target: Vector3

  /** Field of view (in degrees, for perspective camera) */
  fov: number

  /** Zoom level (for orthographic camera) */
  zoom: number

  /** Near clipping plane */
  near: number

  /** Far clipping plane */
  far: number
}

/**
 * Default camera configuration
 */
export const DEFAULT_CAMERA: Readonly<CameraState> = Object.freeze({
  type: 'perspective',
  position: [10, 10, 10],
  target: [0, 0, 0],
  fov: 50,
  zoom: 1,
  near: 0.1,
  far: 1000,
})

/**
 * Viewport state
 */
export interface ViewportState {
  /** Camera configuration */
  camera: CameraState

  /** Rendering mode */
  mode: ViewportMode

  /** Whether grid is visible */
  showGrid: boolean

  /** Whether axes helper is visible */
  showAxes: boolean

  /** Whether statistics are visible */
  showStats: boolean

  /** Background color */
  backgroundColor: [number, number, number]
}

/**
 * Default viewport state
 */
export const DEFAULT_VIEWPORT: Readonly<ViewportState> = Object.freeze({
  camera: DEFAULT_CAMERA,
  mode: 'solid',
  showGrid: true,
  showAxes: true,
  showStats: false,
  backgroundColor: [0.1, 0.1, 0.1],
})

/**
 * UI panel visibility state
 */
export interface PanelState {
  /** Whether hierarchy panel is visible */
  hierarchy: boolean

  /** Whether properties panel is visible */
  properties: boolean

  /** Whether toolbar is visible */
  toolbar: boolean
}

/**
 * Default panel state
 */
export const DEFAULT_PANELS: Readonly<PanelState> = Object.freeze({
  hierarchy: true,
  properties: true,
  toolbar: true,
})

/**
 * Selection state
 */
export interface SelectionState {
  /** IDs of selected objects */
  selectedIds: UUID[]

  /** ID of the focused object (for keyboard input) */
  focusedId: UUID | null
}

/**
 * Editor tool state
 */
export interface ToolState {
  /** Active gizmo mode */
  gizmoMode: GizmoMode

  /** Transform space */
  transformSpace: TransformSpace

  /** Snap to grid enabled */
  snapToGrid: boolean

  /** Grid snap size */
  gridSnapSize: number

  /** Angle snap enabled (for rotation) */
  snapAngle: boolean

  /** Angle snap size in degrees */
  angleSnapSize: number
}

/**
 * Default tool state
 */
export const DEFAULT_TOOL_STATE: Readonly<ToolState> = Object.freeze({
  gizmoMode: 'translate',
  transformSpace: 'world',
  snapToGrid: false,
  gridSnapSize: 1,
  snapAngle: false,
  angleSnapSize: 15,
})

/**
 * Complete editor state
 */
export interface EditorState {
  /** Viewport configuration */
  viewport: ViewportState

  /** Panel visibility */
  panels: PanelState

  /** Selection state */
  selection: SelectionState

  /** Tool state */
  tools: ToolState

  /** Whether the editor is in play mode */
  playMode: boolean

  /** Whether any operation is in progress */
  busy: boolean
}

/**
 * Default editor state
 */
export const DEFAULT_EDITOR_STATE: Readonly<EditorState> = Object.freeze({
  viewport: DEFAULT_VIEWPORT,
  panels: DEFAULT_PANELS,
  selection: {
    selectedIds: [],
    focusedId: null,
  },
  tools: DEFAULT_TOOL_STATE,
  playMode: false,
  busy: false,
})
