/**
 * Selection Store - Manages object selection state
 *
 * This store handles:
 * - Single and multi-object selection
 * - Selection add/remove/toggle
 * - Focus management
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UUID, SelectionState } from '@/types'

/**
 * Selection store state
 */
interface SelectionStore extends SelectionState {
  // Actions
  select: (id: UUID) => void
  selectMultiple: (ids: UUID[]) => void
  deselect: (id: UUID) => void
  toggleSelection: (id: UUID) => void
  clearSelection: () => void
  isSelected: (id: UUID) => boolean
  setFocus: (id: UUID | null) => void
}

/**
 * Selection store hook
 */
export const useSelectionStore = create<SelectionStore>()(
  devtools(
    (set, get) => ({
      selectedIds: [],
      focusedId: null,

      /**
       * Select a single object (replaces current selection)
       */
      select: (id) => {
        set({
          selectedIds: [id],
          focusedId: id,
        })
      },

      /**
       * Select multiple objects (replaces current selection)
       */
      selectMultiple: (ids) => {
        set({
          selectedIds: ids,
          focusedId: ids[0] ?? null,
        })
      },

      /**
       * Deselect an object
       */
      deselect: (id) => {
        set((state) => {
          const newSelectedIds = state.selectedIds.filter((selectedId) => selectedId !== id)
          return {
            selectedIds: newSelectedIds,
            focusedId: state.focusedId === id ? (newSelectedIds[0] ?? null) : state.focusedId,
          }
        })
      },

      /**
       * Toggle selection of an object (add if not selected, remove if selected)
       */
      toggleSelection: (id) => {
        set((state) => {
          const isCurrentlySelected = state.selectedIds.includes(id)

          if (isCurrentlySelected) {
            const newSelectedIds = state.selectedIds.filter((selectedId) => selectedId !== id)
            return {
              selectedIds: newSelectedIds,
              focusedId: state.focusedId === id ? (newSelectedIds[0] ?? null) : state.focusedId,
            }
          } else {
            return {
              selectedIds: [...state.selectedIds, id],
              focusedId: id,
            }
          }
        })
      },

      /**
       * Clear all selections
       */
      clearSelection: () => {
        set({
          selectedIds: [],
          focusedId: null,
        })
      },

      /**
       * Check if an object is selected
       */
      isSelected: (id) => {
        return get().selectedIds.includes(id)
      },

      /**
       * Set the focused object
       */
      setFocus: (id) => {
        set({ focusedId: id })
      },
    }),
    { name: 'SelectionStore' }
  )
)
