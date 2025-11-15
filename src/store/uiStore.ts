/**
 * UI Store - Manages UI state and preferences
 *
 * This store handles:
 * - Panel visibility
 * - Viewport settings
 * - Tool state (gizmo mode, snap settings)
 * - Play mode
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {
  EditorState,
  GizmoMode,
  TransformSpace,
  ViewportMode,
  CameraType,
  DEFAULT_EDITOR_STATE,
} from '@/types'

/**
 * UI store state
 */
interface UIStore extends EditorState {
  // Panel actions
  togglePanel: (panel: keyof EditorState['panels']) => void
  showPanel: (panel: keyof EditorState['panels']) => void
  hidePanel: (panel: keyof EditorState['panels']) => void

  // Viewport actions
  setViewportMode: (mode: ViewportMode) => void
  setCameraType: (type: CameraType) => void
  toggleGrid: () => void
  toggleAxes: () => void
  toggleStats: () => void
  setBackgroundColor: (color: [number, number, number]) => void

  // Tool actions
  setGizmoMode: (mode: GizmoMode) => void
  setTransformSpace: (space: TransformSpace) => void
  toggleSnapToGrid: () => void
  setGridSnapSize: (size: number) => void
  toggleSnapAngle: () => void
  setAngleSnapSize: (size: number) => void

  // General actions
  setPlayMode: (playMode: boolean) => void
  setBusy: (busy: boolean) => void
  resetToDefaults: () => void
}

/**
 * UI store hook with persistence
 */
export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state from defaults
        viewport: { ...DEFAULT_EDITOR_STATE.viewport },
        panels: { ...DEFAULT_EDITOR_STATE.panels },
        selection: { ...DEFAULT_EDITOR_STATE.selection },
        tools: { ...DEFAULT_EDITOR_STATE.tools },
        playMode: DEFAULT_EDITOR_STATE.playMode,
        busy: DEFAULT_EDITOR_STATE.busy,

        // Panel actions
        togglePanel: (panel) => {
          set((state) => ({
            panels: {
              ...state.panels,
              [panel]: !state.panels[panel],
            },
          }))
        },

        showPanel: (panel) => {
          set((state) => ({
            panels: {
              ...state.panels,
              [panel]: true,
            },
          }))
        },

        hidePanel: (panel) => {
          set((state) => ({
            panels: {
              ...state.panels,
              [panel]: false,
            },
          }))
        },

        // Viewport actions
        setViewportMode: (mode) => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              mode,
            },
          }))
        },

        setCameraType: (type) => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              camera: {
                ...state.viewport.camera,
                type,
              },
            },
          }))
        },

        toggleGrid: () => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              showGrid: !state.viewport.showGrid,
            },
          }))
        },

        toggleAxes: () => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              showAxes: !state.viewport.showAxes,
            },
          }))
        },

        toggleStats: () => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              showStats: !state.viewport.showStats,
            },
          }))
        },

        setBackgroundColor: (color) => {
          set((state) => ({
            viewport: {
              ...state.viewport,
              backgroundColor: color,
            },
          }))
        },

        // Tool actions
        setGizmoMode: (mode) => {
          set((state) => ({
            tools: {
              ...state.tools,
              gizmoMode: mode,
            },
          }))
        },

        setTransformSpace: (space) => {
          set((state) => ({
            tools: {
              ...state.tools,
              transformSpace: space,
            },
          }))
        },

        toggleSnapToGrid: () => {
          set((state) => ({
            tools: {
              ...state.tools,
              snapToGrid: !state.tools.snapToGrid,
            },
          }))
        },

        setGridSnapSize: (size) => {
          set((state) => ({
            tools: {
              ...state.tools,
              gridSnapSize: size,
            },
          }))
        },

        toggleSnapAngle: () => {
          set((state) => ({
            tools: {
              ...state.tools,
              snapAngle: !state.tools.snapAngle,
            },
          }))
        },

        setAngleSnapSize: (size) => {
          set((state) => ({
            tools: {
              ...state.tools,
              angleSnapSize: size,
            },
          }))
        },

        // General actions
        setPlayMode: (playMode) => {
          set({ playMode })
        },

        setBusy: (busy) => {
          set({ busy })
        },

        resetToDefaults: () => {
          set({
            viewport: { ...DEFAULT_EDITOR_STATE.viewport },
            panels: { ...DEFAULT_EDITOR_STATE.panels },
            tools: { ...DEFAULT_EDITOR_STATE.tools },
            playMode: DEFAULT_EDITOR_STATE.playMode,
            busy: DEFAULT_EDITOR_STATE.busy,
          })
        },
      }),
      {
        name: 'ui-storage', // localStorage key
        partialize: (state) => ({
          // Only persist these properties
          viewport: state.viewport,
          panels: state.panels,
          tools: state.tools,
        }),
      }
    ),
    { name: 'UIStore' }
  )
)
