/**
 * Tests for historyStore
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useHistoryStore, type Command } from '../historyStore'

describe('historyStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useHistoryStore.setState({
      undoStack: [],
      redoStack: [],
      maxHistorySize: 100,
      enabled: true,
    })
  })

  describe('execute', () => {
    it('should execute command and add to undo stack', () => {
      const { execute } = useHistoryStore.getState()
      const executeFn = vi.fn()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: executeFn,
        undo: vi.fn(),
      }

      execute(command)

      expect(executeFn).toHaveBeenCalledOnce()

      const state = useHistoryStore.getState()
      expect(state.undoStack).toContain(command)
    })

    it('should clear redo stack when executing new command', () => {
      const { execute, undo } = useHistoryStore.getState()

      const cmd1: Command = {
        id: 'cmd-1',
        description: 'Command 1',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      const cmd2: Command = {
        id: 'cmd-2',
        description: 'Command 2',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(cmd1)
      undo()
      execute(cmd2)

      const state = useHistoryStore.getState()
      expect(state.redoStack).toEqual([])
    })

    it('should respect maxHistorySize', () => {
      useHistoryStore.setState({ maxHistorySize: 2 })
      const { execute } = useHistoryStore.getState()

      const cmd1: Command = {
        id: 'cmd-1',
        description: 'Command 1',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      const cmd2: Command = {
        id: 'cmd-2',
        description: 'Command 2',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      const cmd3: Command = {
        id: 'cmd-3',
        description: 'Command 3',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(cmd1)
      execute(cmd2)
      execute(cmd3)

      const state = useHistoryStore.getState()
      expect(state.undoStack.length).toBe(2)
      expect(state.undoStack).not.toContain(cmd1)
      expect(state.undoStack).toContain(cmd2)
      expect(state.undoStack).toContain(cmd3)
    })

    it('should not add to history when disabled', () => {
      useHistoryStore.setState({ enabled: false })
      const { execute } = useHistoryStore.getState()

      const executeFn = vi.fn()
      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: executeFn,
        undo: vi.fn(),
      }

      execute(command)

      expect(executeFn).toHaveBeenCalledOnce()

      const state = useHistoryStore.getState()
      expect(state.undoStack).toEqual([])
    })
  })

  describe('undo', () => {
    it('should undo last command', () => {
      const { execute, undo } = useHistoryStore.getState()
      const undoFn = vi.fn()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: vi.fn(),
        undo: undoFn,
      }

      execute(command)
      undo()

      expect(undoFn).toHaveBeenCalledOnce()
    })

    it('should move command to redo stack', () => {
      const { execute, undo } = useHistoryStore.getState()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(command)
      undo()

      const state = useHistoryStore.getState()
      expect(state.undoStack).not.toContain(command)
      expect(state.redoStack).toContain(command)
    })

    it('should do nothing when undo stack is empty', () => {
      const { undo } = useHistoryStore.getState()

      undo()

      const state = useHistoryStore.getState()
      expect(state.undoStack).toEqual([])
      expect(state.redoStack).toEqual([])
    })
  })

  describe('redo', () => {
    it('should redo last undone command', () => {
      const { execute, undo, redo } = useHistoryStore.getState()
      const executeFn = vi.fn()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: executeFn,
        undo: vi.fn(),
      }

      execute(command)
      undo()

      executeFn.mockClear()
      redo()

      expect(executeFn).toHaveBeenCalledOnce()
    })

    it('should move command back to undo stack', () => {
      const { execute, undo, redo } = useHistoryStore.getState()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(command)
      undo()
      redo()

      const state = useHistoryStore.getState()
      expect(state.undoStack).toContain(command)
      expect(state.redoStack).not.toContain(command)
    })
  })

  describe('canUndo / canRedo', () => {
    it('should return correct undo/redo availability', () => {
      const { execute, undo, canUndo, canRedo } = useHistoryStore.getState()

      expect(canUndo()).toBe(false)
      expect(canRedo()).toBe(false)

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(command)

      expect(canUndo()).toBe(true)
      expect(canRedo()).toBe(false)

      undo()

      expect(canUndo()).toBe(false)
      expect(canRedo()).toBe(true)
    })
  })

  describe('clear', () => {
    it('should clear all history', () => {
      const { execute, undo, clear } = useHistoryStore.getState()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(command)
      undo()

      clear()

      const state = useHistoryStore.getState()
      expect(state.undoStack).toEqual([])
      expect(state.redoStack).toEqual([])
    })
  })

  describe('getUndoDescription / getRedoDescription', () => {
    it('should return correct descriptions', () => {
      const { execute, undo, getUndoDescription, getRedoDescription } = useHistoryStore.getState()

      const command: Command = {
        id: 'cmd-1',
        description: 'Test Command',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(command)

      expect(getUndoDescription()).toBe('Test Command')
      expect(getRedoDescription()).toBe(null)

      undo()

      expect(getUndoDescription()).toBe(null)
      expect(getRedoDescription()).toBe('Test Command')
    })
  })

  describe('setMaxHistorySize', () => {
    it('should trim undo stack when reducing size', () => {
      const { execute, setMaxHistorySize } = useHistoryStore.getState()

      const cmd1: Command = {
        id: 'cmd-1',
        description: 'Command 1',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      const cmd2: Command = {
        id: 'cmd-2',
        description: 'Command 2',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      const cmd3: Command = {
        id: 'cmd-3',
        description: 'Command 3',
        execute: vi.fn(),
        undo: vi.fn(),
      }

      execute(cmd1)
      execute(cmd2)
      execute(cmd3)

      setMaxHistorySize(2)

      const state = useHistoryStore.getState()
      expect(state.undoStack.length).toBe(2)
      expect(state.undoStack).toContain(cmd2)
      expect(state.undoStack).toContain(cmd3)
    })
  })
})
