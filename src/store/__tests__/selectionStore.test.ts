/**
 * Tests for selectionStore
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useSelectionStore } from '../selectionStore'

describe('selectionStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useSelectionStore.setState({
      selectedIds: [],
      focusedId: null,
    })
  })

  describe('select', () => {
    it('should select a single object', () => {
      const { select } = useSelectionStore.getState()

      select('obj-1')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1'])
      expect(state.focusedId).toBe('obj-1')
    })

    it('should replace previous selection', () => {
      const { select } = useSelectionStore.getState()

      select('obj-1')
      select('obj-2')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-2'])
      expect(state.focusedId).toBe('obj-2')
    })
  })

  describe('selectMultiple', () => {
    it('should select multiple objects', () => {
      const { selectMultiple } = useSelectionStore.getState()

      selectMultiple(['obj-1', 'obj-2', 'obj-3'])

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1', 'obj-2', 'obj-3'])
      expect(state.focusedId).toBe('obj-1')
    })

    it('should handle empty array', () => {
      const { selectMultiple } = useSelectionStore.getState()

      selectMultiple([])

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual([])
      expect(state.focusedId).toBe(null)
    })
  })

  describe('deselect', () => {
    it('should remove object from selection', () => {
      const { selectMultiple, deselect } = useSelectionStore.getState()

      selectMultiple(['obj-1', 'obj-2', 'obj-3'])
      deselect('obj-2')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1', 'obj-3'])
    })

    it('should update focus if deselected object was focused', () => {
      const { select, deselect } = useSelectionStore.getState()

      select('obj-1')
      deselect('obj-1')

      const state = useSelectionStore.getState()
      expect(state.focusedId).toBe(null)
    })

    it('should not change focus if deselected object was not focused', () => {
      const { selectMultiple, deselect } = useSelectionStore.getState()

      selectMultiple(['obj-1', 'obj-2'])
      deselect('obj-2')

      const state = useSelectionStore.getState()
      expect(state.focusedId).toBe('obj-1')
    })
  })

  describe('toggleSelection', () => {
    it('should add object if not selected', () => {
      const { toggleSelection } = useSelectionStore.getState()

      toggleSelection('obj-1')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toContain('obj-1')
    })

    it('should remove object if already selected', () => {
      const { select, toggleSelection } = useSelectionStore.getState()

      select('obj-1')
      toggleSelection('obj-1')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).not.toContain('obj-1')
    })

    it('should maintain other selections', () => {
      const { selectMultiple, toggleSelection } = useSelectionStore.getState()

      selectMultiple(['obj-1', 'obj-2'])
      toggleSelection('obj-3')

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1', 'obj-2', 'obj-3'])
    })
  })

  describe('clearSelection', () => {
    it('should clear all selections', () => {
      const { selectMultiple, clearSelection } = useSelectionStore.getState()

      selectMultiple(['obj-1', 'obj-2', 'obj-3'])
      clearSelection()

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual([])
      expect(state.focusedId).toBe(null)
    })
  })

  describe('isSelected', () => {
    it('should return true for selected objects', () => {
      const { select, isSelected } = useSelectionStore.getState()

      select('obj-1')

      expect(isSelected('obj-1')).toBe(true)
    })

    it('should return false for non-selected objects', () => {
      const { select, isSelected } = useSelectionStore.getState()

      select('obj-1')

      expect(isSelected('obj-2')).toBe(false)
    })
  })

  describe('setFocus', () => {
    it('should set focused object', () => {
      const { setFocus } = useSelectionStore.getState()

      setFocus('obj-1')

      const state = useSelectionStore.getState()
      expect(state.focusedId).toBe('obj-1')
    })

    it('should clear focus when set to null', () => {
      const { select, setFocus } = useSelectionStore.getState()

      select('obj-1')
      setFocus(null)

      const state = useSelectionStore.getState()
      expect(state.focusedId).toBe(null)
    })
  })
})
