/**
 * useSelection hook - Manage object selection
 *
 * This hook provides convenient access to selection state and actions.
 */

import { useMemo, useCallback } from 'react'
import { useSelectionStore } from '@/store'
import type { UUID } from '@/types'

/**
 * Hook to access selection state and actions
 *
 * @returns Selection state and action methods
 *
 * @example
 * ```tsx
 * function ObjectList() {
 *   const { selectedIds, select, toggleSelection, isSelected } = useSelection()
 *
 *   return (
 *     <div>
 *       {objects.map(obj => (
 *         <div
 *           key={obj.id}
 *           onClick={() => select(obj.id)}
 *           style={{ background: isSelected(obj.id) ? 'blue' : 'white' }}
 *         >
 *           {obj.name}
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useSelection() {
  const selectedIds = useSelectionStore((state) => state.selectedIds)
  const focusedId = useSelectionStore((state) => state.focusedId)
  const select = useSelectionStore((state) => state.select)
  const selectMultiple = useSelectionStore((state) => state.selectMultiple)
  const deselect = useSelectionStore((state) => state.deselect)
  const toggleSelection = useSelectionStore((state) => state.toggleSelection)
  const clearSelection = useSelectionStore((state) => state.clearSelection)
  const isSelected = useSelectionStore((state) => state.isSelected)
  const setFocus = useSelectionStore((state) => state.setFocus)

  return useMemo(
    () => ({
      selectedIds,
      focusedId,
      select,
      selectMultiple,
      deselect,
      toggleSelection,
      clearSelection,
      isSelected,
      setFocus,
      hasSelection: selectedIds.length > 0,
      selectionCount: selectedIds.length,
    }),
    [
      selectedIds,
      focusedId,
      select,
      selectMultiple,
      deselect,
      toggleSelection,
      clearSelection,
      isSelected,
      setFocus,
    ]
  )
}

/**
 * Hook to check if a specific object is selected
 *
 * @param id - The object ID
 * @returns true if the object is selected
 */
export function useIsSelected(id: UUID): boolean {
  return useSelectionStore((state) => state.selectedIds.includes(id))
}

/**
 * Hook to check if a specific object is focused
 *
 * @param id - The object ID
 * @returns true if the object is focused
 */
export function useIsFocused(id: UUID): boolean {
  return useSelectionStore((state) => state.focusedId === id)
}

/**
 * Hook for multi-selection with modifier keys
 *
 * @returns Function to handle selection with modifier keys
 *
 * @example
 * ```tsx
 * function ObjectItem({ objectId }: { objectId: string }) {
 *   const handleSelect = useMultiSelect()
 *
 *   return (
 *     <div onClick={(e) => handleSelect(objectId, e)}>
 *       Click to select (Cmd/Ctrl for multi)
 *     </div>
 *   )
 * }
 * ```
 */
export function useMultiSelect() {
  const select = useSelectionStore((state) => state.select)
  const toggleSelection = useSelectionStore((state) => state.toggleSelection)
  const selectMultiple = useSelectionStore((state) => state.selectMultiple)
  const selectedIds = useSelectionStore((state) => state.selectedIds)

  return useCallback(
    (id: UUID, event?: { shiftKey?: boolean; metaKey?: boolean; ctrlKey?: boolean }) => {
      if (!event) {
        // No modifiers - single select
        select(id)
        return
      }

      const isMultiSelect = event.metaKey || event.ctrlKey

      if (isMultiSelect) {
        // Cmd/Ctrl click - toggle selection
        toggleSelection(id)
      } else if (event.shiftKey && selectedIds.length > 0) {
        // Shift click - range select
        // TODO: Implement range selection based on visual order
        // For now, just add to selection
        if (!selectedIds.includes(id)) {
          selectMultiple([...selectedIds, id])
        }
      } else {
        // No modifiers - single select
        select(id)
      }
    },
    [select, toggleSelection, selectMultiple, selectedIds]
  )
}
