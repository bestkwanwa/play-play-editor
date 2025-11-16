/**
 * Tests for useHistory hooks
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useHistory, useUndoRedoShortcuts, useHistoryControl } from '../useHistory'
import { useHistoryStore, type Command } from '@/store'

describe('useHistory hooks', () => {
  beforeEach(() => {
    // Reset store before each test
    useHistoryStore.setState({
      undoStack: [],
      redoStack: [],
      maxHistorySize: 100,
      enabled: true,
    })
  })

  describe('useHistory', () => {
    it('should return history state', () => {
      const { result } = renderHook(() => useHistory())

      expect(result.current.canUndo).toBe(false)
      expect(result.current.canRedo).toBe(false)
      expect(result.current.undoDescription).toBe(null)
      expect(result.current.redoDescription).toBe(null)
    })

    it('should undo command', () => {
      const undoFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: undoFn,
      }

      useHistoryStore.getState().execute(command)

      const { result } = renderHook(() => useHistory())

      expect(result.current.canUndo).toBe(true)

      act(() => {
        result.current.undo()
      })

      expect(undoFn).toHaveBeenCalled()
      expect(result.current.canUndo).toBe(false)
      expect(result.current.canRedo).toBe(true)
    })

    it('should redo command', () => {
      const executeFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: executeFn,
        undo: vi.fn(),
      }

      useHistoryStore.getState().execute(command)
      useHistoryStore.getState().undo()

      const { result } = renderHook(() => useHistory())

      executeFn.mockClear()

      act(() => {
        result.current.redo()
      })

      expect(executeFn).toHaveBeenCalled()
      expect(result.current.canUndo).toBe(true)
      expect(result.current.canRedo).toBe(false)
    })

    it('should return descriptions', () => {
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      useHistoryStore.getState().execute(command)

      const { result } = renderHook(() => useHistory())

      expect(result.current.undoDescription).toBe('Test Command')
      expect(result.current.redoDescription).toBe(null)

      act(() => {
        result.current.undo()
      })

      expect(result.current.undoDescription).toBe(null)
      expect(result.current.redoDescription).toBe('Test Command')
    })

    it('should clear history', () => {
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      useHistoryStore.getState().execute(command)

      const { result } = renderHook(() => useHistory())

      act(() => {
        result.current.clear()
      })

      expect(result.current.canUndo).toBe(false)
      expect(result.current.canRedo).toBe(false)
    })
  })

  describe('useUndoRedoShortcuts', () => {
    afterEach(() => {
      // Clean up event listeners
      vi.restoreAllMocks()
    })

    it('should trigger undo on Cmd+Z', () => {
      const undoFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: undoFn,
      }

      useHistoryStore.getState().execute(command)

      renderHook(() => useUndoRedoShortcuts())

      const event = new KeyboardEvent('keydown', { key: 'z', metaKey: true })
      window.dispatchEvent(event)

      expect(undoFn).toHaveBeenCalled()
    })

    it('should trigger redo on Cmd+Shift+Z', () => {
      const executeFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: executeFn,
        undo: vi.fn(),
      }

      useHistoryStore.getState().execute(command)
      useHistoryStore.getState().undo()

      renderHook(() => useUndoRedoShortcuts())

      executeFn.mockClear()

      const event = new KeyboardEvent('keydown', {
        key: 'z',
        metaKey: true,
        shiftKey: true,
      })
      window.dispatchEvent(event)

      expect(executeFn).toHaveBeenCalled()
    })

    it('should trigger redo on Cmd+Y', () => {
      const executeFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: executeFn,
        undo: vi.fn(),
      }

      useHistoryStore.getState().execute(command)
      useHistoryStore.getState().undo()

      renderHook(() => useUndoRedoShortcuts())

      executeFn.mockClear()

      const event = new KeyboardEvent('keydown', { key: 'y', metaKey: true })
      window.dispatchEvent(event)

      expect(executeFn).toHaveBeenCalled()
    })

    it('should work with Ctrl key (Windows/Linux)', () => {
      const undoFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: undoFn,
      }

      useHistoryStore.getState().execute(command)

      renderHook(() => useUndoRedoShortcuts())

      const event = new KeyboardEvent('keydown', { key: 'z', ctrlKey: true })
      window.dispatchEvent(event)

      expect(undoFn).toHaveBeenCalled()
    })

    it('should not trigger when disabled', () => {
      const undoFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: undoFn,
      }

      useHistoryStore.getState().execute(command)

      renderHook(() => useUndoRedoShortcuts(false))

      const event = new KeyboardEvent('keydown', { key: 'z', metaKey: true })
      window.dispatchEvent(event)

      expect(undoFn).not.toHaveBeenCalled()
    })
  })

  describe('useHistoryControl', () => {
    it('should enable and disable history', () => {
      const { result } = renderHook(() => useHistoryControl())

      act(() => {
        result.current.disable()
      })

      expect(useHistoryStore.getState().enabled).toBe(false)

      act(() => {
        result.current.enable()
      })

      expect(useHistoryStore.getState().enabled).toBe(true)
    })

    it('should execute with history disabled', async () => {
      const { result } = renderHook(() => useHistoryControl())

      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      await act(async () => {
        await result.current.withHistoryDisabled(() => {
          useHistoryStore.getState().execute(command)
        })
      })

      const state = useHistoryStore.getState()
      expect(state.undoStack).toEqual([])
      expect(state.enabled).toBe(true) // Should be re-enabled after
    })

    it('should re-enable history even if function throws', async () => {
      const { result } = renderHook(() => useHistoryControl())

      try {
        await act(async () => {
          await result.current.withHistoryDisabled(() => {
            throw new Error('Test error')
          })
        })
      } catch {
        // Expected error
      }

      const state = useHistoryStore.getState()
      expect(state.enabled).toBe(true)
    })

    it('should handle async functions', async () => {
      const { result } = renderHook(() => useHistoryControl())

      const asyncFn = vi.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10))
        return 'result'
      })

      const returnValue = await act(async () => {
        return await result.current.withHistoryDisabled(asyncFn)
      })

      expect(asyncFn).toHaveBeenCalled()
      expect(returnValue).toBe('result')
      expect(useHistoryStore.getState().enabled).toBe(true)
    })
  })
})
