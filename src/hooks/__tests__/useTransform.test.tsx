/**
 * Tests for useTransform hook
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTransform } from '../useTransform'
import { useSceneStore, useUIStore, useHistoryStore } from '@/store'
import type { SceneObject } from '@/types'

describe('useTransform hook', () => {
  beforeEach(() => {
    // Reset stores before each test
    useSceneStore.setState({
      id: crypto.randomUUID(),
      name: 'Test Scene',
      objects: new Map(),
      rootIds: [],
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    })

    useHistoryStore.setState({
      undoStack: [],
      redoStack: [],
      maxHistorySize: 100,
      enabled: true,
    })

    useUIStore.setState({
      ...useUIStore.getState(),
      tools: {
        gizmoMode: 'translate',
        transformSpace: 'world',
        snapToGrid: false,
        gridSnapSize: 1,
        snapAngle: false,
        angleSnapSize: 15,
      },
    })
  })

  const createTestObject = (): SceneObject => ({
    id: 'obj-1',
    name: 'Test Object',
    type: 'cube',
    transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    visible: true,
    locked: false,
    parentId: null,
    children: [],
    userData: {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })

  describe('setPosition', () => {
    it('should set position', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setPosition([1, 2, 3])
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.position).toEqual([1, 2, 3])
    })

    it('should add to undo history by default', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setPosition([1, 2, 3])
      })

      const historyState = useHistoryStore.getState()
      expect(historyState.undoStack.length).toBe(1)
      expect(historyState.undoStack[0].description).toContain('Move')
    })

    it('should skip undo history when withUndo is false', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setPosition([1, 2, 3], false)
      })

      const historyState = useHistoryStore.getState()
      expect(historyState.undoStack.length).toBe(0)
    })

    it('should apply grid snapping when enabled', () => {
      useUIStore.setState({
        ...useUIStore.getState(),
        tools: {
          ...useUIStore.getState().tools,
          snapToGrid: true,
          gridSnapSize: 0.5,
        },
      })

      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setPosition([1.3, 2.7, 3.1], false)
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      // Should snap to nearest 0.5
      // 1.3 -> 1.5, 2.7 -> 2.5, 3.1 -> 3
      expect(updated?.transform.position).toEqual([1.5, 2.5, 3])
    })

    it('should undo position change', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setPosition([1, 2, 3])
      })

      act(() => {
        useHistoryStore.getState().undo()
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.position).toEqual([0, 0, 0])
    })
  })

  describe('setRotation', () => {
    it('should set rotation', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setRotation([0.1, 0.2, 0.3])
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.rotation).toEqual([0.1, 0.2, 0.3])
    })

    it('should apply angle snapping when enabled', () => {
      useUIStore.setState({
        ...useUIStore.getState(),
        tools: {
          ...useUIStore.getState().tools,
          snapAngle: true,
          angleSnapSize: 45, // 45 degrees
        },
      })

      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      // 0.8 radians is about 45.8 degrees, should snap to 45 degrees (π/4 radians)
      const fortyFiveDegrees = Math.PI / 4

      act(() => {
        result.current.setRotation([0.8, 0, 0], false)
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.rotation[0]).toBeCloseTo(fortyFiveDegrees, 2)
    })

    it('should add to undo history', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setRotation([0.1, 0.2, 0.3])
      })

      const historyState = useHistoryStore.getState()
      expect(historyState.undoStack.length).toBe(1)
      expect(historyState.undoStack[0].description).toContain('Rotate')
    })
  })

  describe('setScale', () => {
    it('should set scale', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setScale([2, 3, 4])
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.scale).toEqual([2, 3, 4])
    })

    it('should add to undo history', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setScale([2, 2, 2])
      })

      const historyState = useHistoryStore.getState()
      expect(historyState.undoStack.length).toBe(1)
      expect(historyState.undoStack[0].description).toContain('Scale')
    })
  })

  describe('setTransform', () => {
    it('should set complete transform', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      const newTransform = {
        position: [1, 2, 3] as [number, number, number],
        rotation: [0.1, 0.2, 0.3] as [number, number, number],
        scale: [2, 2, 2] as [number, number, number],
      }

      act(() => {
        result.current.setTransform(newTransform)
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.position).toEqual([1, 2, 3])
      expect(updated?.transform.rotation).toEqual([0.1, 0.2, 0.3])
      expect(updated?.transform.scale).toEqual([2, 2, 2])
    })

    it('should apply both position and rotation snapping', () => {
      useUIStore.setState({
        ...useUIStore.getState(),
        tools: {
          gizmoMode: 'translate',
          transformSpace: 'world',
          snapToGrid: true,
          gridSnapSize: 0.5,
          snapAngle: true,
          angleSnapSize: 45,
        },
      })

      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      act(() => {
        result.current.setTransform(
          {
            position: [1.3, 2.7, 3.1],
            rotation: [0.8, 0, 0],
            scale: [1, 1, 1],
          },
          false
        )
      })

      const updated = useSceneStore.getState().objects.get('obj-1')
      expect(updated?.transform.position).toEqual([1.5, 2.5, 3])
      expect(updated?.transform.rotation[0]).toBeCloseTo(Math.PI / 4, 2)
    })
  })

  describe('snapping helpers', () => {
    it('should apply position snapping', () => {
      useUIStore.setState({
        ...useUIStore.getState(),
        tools: {
          ...useUIStore.getState().tools,
          snapToGrid: true,
          gridSnapSize: 1,
        },
      })

      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      const snapped = result.current.applyPositionSnapping([1.4, 2.6, 3.1])

      expect(snapped).toEqual([1, 3, 3])
    })

    it('should not snap when disabled', () => {
      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      const snapped = result.current.applyPositionSnapping([1.4, 2.6, 3.1])

      expect(snapped).toEqual([1.4, 2.6, 3.1])
    })

    it('should apply rotation snapping', () => {
      useUIStore.setState({
        ...useUIStore.getState(),
        tools: {
          ...useUIStore.getState().tools,
          snapAngle: true,
          angleSnapSize: 90, // 90 degrees
        },
      })

      const obj = createTestObject()
      useSceneStore.getState().addObject(obj)

      const { result } = renderHook(() => useTransform('obj-1'))

      // 1.6 radians is about 91.7 degrees, should snap to 90 degrees (π/2 radians)
      const snapped = result.current.applyRotationSnapping([1.6, 0, 0])

      expect(snapped[0]).toBeCloseTo(Math.PI / 2, 2)
    })
  })

  describe('edge cases', () => {
    it('should handle non-existent object gracefully', () => {
      const { result } = renderHook(() => useTransform('non-existent'))

      act(() => {
        result.current.setPosition([1, 2, 3])
      })

      // Should not throw and should not add to history
      const historyState = useHistoryStore.getState()
      expect(historyState.undoStack.length).toBe(0)
    })
  })
})
