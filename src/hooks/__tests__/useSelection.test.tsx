/**
 * Tests for useSelection hooks
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSelection, useIsSelected, useIsFocused, useMultiSelect } from '../useSelection'
import { useSelectionStore } from '@/store'

describe('useSelection hooks', () => {
  beforeEach(() => {
    // Reset store before each test
    useSelectionStore.setState({
      selectedIds: [],
      focusedId: null,
    })
  })

  describe('useSelection', () => {
    it('should return selection state', () => {
      const { result } = renderHook(() => useSelection())

      expect(result.current.selectedIds).toEqual([])
      expect(result.current.focusedId).toBe(null)
      expect(result.current.hasSelection).toBe(false)
      expect(result.current.selectionCount).toBe(0)
    })

    it('should select single object', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.select('obj-1')
      })

      expect(result.current.selectedIds).toEqual(['obj-1'])
      expect(result.current.focusedId).toBe('obj-1')
      expect(result.current.hasSelection).toBe(true)
      expect(result.current.selectionCount).toBe(1)
    })

    it('should select multiple objects', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.selectMultiple(['obj-1', 'obj-2', 'obj-3'])
      })

      expect(result.current.selectedIds).toEqual(['obj-1', 'obj-2', 'obj-3'])
      expect(result.current.selectionCount).toBe(3)
    })

    it('should deselect object', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.selectMultiple(['obj-1', 'obj-2'])
        result.current.deselect('obj-1')
      })

      expect(result.current.selectedIds).toEqual(['obj-2'])
    })

    it('should toggle selection', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.toggleSelection('obj-1')
      })

      expect(result.current.selectedIds).toContain('obj-1')

      act(() => {
        result.current.toggleSelection('obj-1')
      })

      expect(result.current.selectedIds).not.toContain('obj-1')
    })

    it('should clear selection', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.selectMultiple(['obj-1', 'obj-2', 'obj-3'])
        result.current.clearSelection()
      })

      expect(result.current.selectedIds).toEqual([])
      expect(result.current.hasSelection).toBe(false)
    })

    it('should check if object is selected', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.select('obj-1')
      })

      expect(result.current.isSelected('obj-1')).toBe(true)
      expect(result.current.isSelected('obj-2')).toBe(false)
    })

    it('should set focus', () => {
      const { result } = renderHook(() => useSelection())

      act(() => {
        result.current.setFocus('obj-1')
      })

      expect(result.current.focusedId).toBe('obj-1')
    })
  })

  describe('useIsSelected', () => {
    it('should return true for selected object', () => {
      useSelectionStore.getState().select('obj-1')

      const { result } = renderHook(() => useIsSelected('obj-1'))

      expect(result.current).toBe(true)
    })

    it('should return false for non-selected object', () => {
      const { result } = renderHook(() => useIsSelected('obj-1'))

      expect(result.current).toBe(false)
    })

    it('should update when selection changes', () => {
      const { result, rerender } = renderHook(() => useIsSelected('obj-1'))

      expect(result.current).toBe(false)

      act(() => {
        useSelectionStore.getState().select('obj-1')
      })

      rerender()

      expect(result.current).toBe(true)
    })
  })

  describe('useIsFocused', () => {
    it('should return true for focused object', () => {
      useSelectionStore.getState().setFocus('obj-1')

      const { result } = renderHook(() => useIsFocused('obj-1'))

      expect(result.current).toBe(true)
    })

    it('should return false for non-focused object', () => {
      const { result } = renderHook(() => useIsFocused('obj-1'))

      expect(result.current).toBe(false)
    })
  })

  describe('useMultiSelect', () => {
    it('should select single object without modifiers', () => {
      const { result } = renderHook(() => useMultiSelect())

      act(() => {
        result.current('obj-1')
      })

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1'])
    })

    it('should toggle with Cmd/Ctrl key', () => {
      const { result } = renderHook(() => useMultiSelect())

      act(() => {
        result.current('obj-1', { metaKey: true })
      })

      let state = useSelectionStore.getState()
      expect(state.selectedIds).toContain('obj-1')

      act(() => {
        result.current('obj-2', { metaKey: true })
      })

      state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-1', 'obj-2'])

      act(() => {
        result.current('obj-1', { ctrlKey: true })
      })

      state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-2'])
    })

    it('should add to selection with Shift key', () => {
      const { result } = renderHook(() => useMultiSelect())

      act(() => {
        result.current('obj-1')
      })

      act(() => {
        result.current('obj-2', { shiftKey: true })
      })

      const state = useSelectionStore.getState()
      // Note: Range selection is not fully implemented yet (TODO in useMultiSelect)
      // Currently it just adds the object if not already selected
      expect(state.selectedIds).toContain('obj-2')
    })

    it('should replace selection without modifiers', () => {
      const { result } = renderHook(() => useMultiSelect())

      act(() => {
        result.current('obj-1', { metaKey: true })
        result.current('obj-2', { metaKey: true })
        result.current('obj-3') // No modifier - should replace
      })

      const state = useSelectionStore.getState()
      expect(state.selectedIds).toEqual(['obj-3'])
    })
  })
})
