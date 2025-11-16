/**
 * History Store - Manages undo/redo history
 *
 * This store handles:
 * - Undo/redo operations
 * - History stack management
 * - Command pattern implementation
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * Command interface for undo/redo
 */
export interface Command {
  /** Unique identifier for this command */
  id: string

  /** Human-readable description */
  description: string

  /** Execute the command */
  execute: () => void

  /** Undo the command */
  undo: () => void

  /** Optional: merge with another command if they're similar */
  merge?: (other: Command) => Command | null
}

/**
 * History store state
 */
interface HistoryStore {
  /** Undo stack (past commands) */
  undoStack: Command[]

  /** Redo stack (future commands) */
  redoStack: Command[]

  /** Maximum history size */
  maxHistorySize: number

  /** Whether history is enabled */
  enabled: boolean

  // Actions
  execute: (command: Command) => void
  undo: () => void
  redo: () => void
  clear: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  getUndoDescription: () => string | null
  getRedoDescription: () => string | null
  setEnabled: (enabled: boolean) => void
  setMaxHistorySize: (size: number) => void
}

/**
 * History store hook
 */
export const useHistoryStore = create<HistoryStore>()(
  devtools(
    (set, get) => ({
      undoStack: [],
      redoStack: [],
      maxHistorySize: 100,
      enabled: true,

      /**
       * Execute a command and add it to history
       */
      execute: (command) => {
        if (!get().enabled) {
          command.execute()
          return
        }

        set((state) => {
          // Try to merge with the last command
          const lastCommand = state.undoStack[state.undoStack.length - 1]
          if (lastCommand?.merge) {
            const merged = lastCommand.merge(command)
            if (merged) {
              // Execute the command
              command.execute()

              // Replace last command with merged version
              const newUndoStack = [...state.undoStack]
              newUndoStack[newUndoStack.length - 1] = merged

              return {
                undoStack: newUndoStack,
                redoStack: [], // Clear redo stack
              }
            }
          }

          // Execute the command
          command.execute()

          // Add to undo stack
          const newUndoStack = [...state.undoStack, command]

          // Trim if exceeds max size
          if (newUndoStack.length > state.maxHistorySize) {
            newUndoStack.shift()
          }

          return {
            undoStack: newUndoStack,
            redoStack: [], // Clear redo stack
          }
        })
      },

      /**
       * Undo the last command
       */
      undo: () => {
        if (!get().canUndo()) return

        set((state) => {
          const newUndoStack = [...state.undoStack]
          const command = newUndoStack.pop()

          if (!command) return state

          // Undo the command
          command.undo()

          // Move to redo stack
          const newRedoStack = [...state.redoStack, command]

          return {
            undoStack: newUndoStack,
            redoStack: newRedoStack,
          }
        })
      },

      /**
       * Redo the last undone command
       */
      redo: () => {
        if (!get().canRedo()) return

        set((state) => {
          const newRedoStack = [...state.redoStack]
          const command = newRedoStack.pop()

          if (!command) return state

          // Re-execute the command
          command.execute()

          // Move to undo stack
          const newUndoStack = [...state.undoStack, command]

          return {
            undoStack: newUndoStack,
            redoStack: newRedoStack,
          }
        })
      },

      /**
       * Clear all history
       */
      clear: () => {
        set({
          undoStack: [],
          redoStack: [],
        })
      },

      /**
       * Check if undo is available
       */
      canUndo: () => {
        return get().undoStack.length > 0
      },

      /**
       * Check if redo is available
       */
      canRedo: () => {
        return get().redoStack.length > 0
      },

      /**
       * Get description of the next undo operation
       */
      getUndoDescription: () => {
        const { undoStack } = get()
        return undoStack[undoStack.length - 1]?.description ?? null
      },

      /**
       * Get description of the next redo operation
       */
      getRedoDescription: () => {
        const { redoStack } = get()
        return redoStack[redoStack.length - 1]?.description ?? null
      },

      /**
       * Enable or disable history tracking
       */
      setEnabled: (enabled) => {
        set({ enabled })
      },

      /**
       * Set maximum history size
       */
      setMaxHistorySize: (size) => {
        set((state) => {
          const newUndoStack = [...state.undoStack]

          // Trim if current stack exceeds new size
          while (newUndoStack.length > size) {
            newUndoStack.shift()
          }

          return {
            maxHistorySize: size,
            undoStack: newUndoStack,
          }
        })
      },
    }),
    { name: 'HistoryStore' }
  )
)
