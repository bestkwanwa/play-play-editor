/**
 * useHistory hook - Undo/redo functionality
 *
 * This hook provides convenient access to undo/redo operations
 * and history state.
 */

import { useMemo, useCallback, useEffect } from 'react'
import { useHistoryStore } from '@/store'

/**
 * Hook to access history state and actions
 *
 * @returns History state and action methods
 *
 * @example
 * ```tsx
 * function UndoRedoButtons() {
 *   const { undo, redo, canUndo, canRedo, undoDescription } = useHistory()
 *
 *   return (
 *     <div>
 *       <button onClick={undo} disabled={!canUndo}>
 *         Undo {undoDescription && `(${undoDescription})`}
 *       </button>
 *       <button onClick={redo} disabled={!canRedo}>
 *         Redo
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useHistory() {
  const undo = useHistoryStore((state) => state.undo)
  const redo = useHistoryStore((state) => state.redo)
  const clear = useHistoryStore((state) => state.clear)
  const canUndo = useHistoryStore((state) => state.canUndo())
  const canRedo = useHistoryStore((state) => state.canRedo())
  const undoDescription = useHistoryStore((state) => state.getUndoDescription())
  const redoDescription = useHistoryStore((state) => state.getRedoDescription())

  return useMemo(
    () => ({
      undo,
      redo,
      clear,
      canUndo,
      canRedo,
      undoDescription,
      redoDescription,
    }),
    [undo, redo, clear, canUndo, canRedo, undoDescription, redoDescription]
  )
}

/**
 * Hook to set up keyboard shortcuts for undo/redo
 *
 * @param enabled - Whether keyboard shortcuts are enabled (default: true)
 *
 * @example
 * ```tsx
 * function Editor() {
 *   useUndoRedoShortcuts()
 *
 *   return <div>Editor content...</div>
 * }
 * ```
 */
export function useUndoRedoShortcuts(enabled = true) {
  const undo = useHistoryStore((state) => state.undo)
  const redo = useHistoryStore((state) => state.redo)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Check for modifier keys (Cmd on Mac, Ctrl on others)
      const isModifierKey = event.metaKey || event.ctrlKey

      if (!isModifierKey) return

      // Undo: Cmd/Ctrl + Z (without Shift)
      if (event.key === 'z' && !event.shiftKey) {
        event.preventDefault()
        undo()
      }

      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y
      if ((event.key === 'z' && event.shiftKey) || event.key === 'y') {
        event.preventDefault()
        redo()
      }
    },
    [enabled, undo, redo]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, handleKeyDown])
}

/**
 * Hook to temporarily disable history tracking
 *
 * Useful for operations that should not be recorded in history,
 * such as loading a scene or applying batch updates.
 *
 * @returns Functions to enable/disable history
 *
 * @example
 * ```tsx
 * function SceneLoader() {
 *   const { withHistoryDisabled } = useHistoryControl()
 *
 *   const loadScene = async () => {
 *     await withHistoryDisabled(async () => {
 *       // Load scene objects without recording in history
 *       const objects = await fetchSceneObjects()
 *       objects.forEach(obj => addObject(obj))
 *     })
 *   }
 *
 *   return <button onClick={loadScene}>Load Scene</button>
 * }
 * ```
 */
export function useHistoryControl() {
  const setEnabled = useHistoryStore((state) => state.setEnabled)

  const withHistoryDisabled = useCallback(
    async <T>(fn: () => T | Promise<T>): Promise<T> => {
      setEnabled(false)
      try {
        return await fn()
      } finally {
        setEnabled(true)
      }
    },
    [setEnabled]
  )

  return useMemo(
    () => ({
      enable: () => setEnabled(true),
      disable: () => setEnabled(false),
      withHistoryDisabled,
    }),
    [setEnabled, withHistoryDisabled]
  )
}
