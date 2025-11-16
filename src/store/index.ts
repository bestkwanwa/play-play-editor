/**
 * Store module - Zustand state management
 *
 * This module exports all Zustand stores used for global state management.
 * Each store focuses on a specific domain of application state.
 */

// Scene management
export { useSceneStore } from './sceneStore'

// Selection management
export { useSelectionStore } from './selectionStore'

// UI state management
export { useUIStore } from './uiStore'

// History/undo management
export { useHistoryStore, type Command } from './historyStore'
