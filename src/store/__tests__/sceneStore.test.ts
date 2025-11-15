/**
 * Tests for sceneStore
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useSceneStore } from '../sceneStore'
import type { SceneObject } from '@/types'

describe('sceneStore', () => {
  beforeEach(() => {
    // Reset store before each test
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
  })

  describe('addObject', () => {
    it('should add object to store', () => {
      const { addObject } = useSceneStore.getState()

      const obj: SceneObject = {
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
      }

      addObject(obj)

      const state = useSceneStore.getState()
      expect(state.objects.get('obj-1')).toEqual(obj)
    })

    it('should add root object to rootIds', () => {
      const { addObject } = useSceneStore.getState()

      const obj: SceneObject = {
        id: 'obj-1',
        name: 'Root Object',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(obj)

      const state = useSceneStore.getState()
      expect(state.rootIds).toContain('obj-1')
    })

    it('should add child to parent', () => {
      const { addObject } = useSceneStore.getState()

      const parent: SceneObject = {
        id: 'parent',
        name: 'Parent',
        type: 'group',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      const child: SceneObject = {
        id: 'child',
        name: 'Child',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: 'parent',
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(parent)
      addObject(child)

      const state = useSceneStore.getState()
      const updatedParent = state.objects.get('parent')
      expect(updatedParent?.children).toContain('child')
    })
  })

  describe('removeObject', () => {
    it('should remove object from store', () => {
      const { addObject, removeObject } = useSceneStore.getState()

      const obj: SceneObject = {
        id: 'obj-1',
        name: 'Test',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(obj)
      expect(useSceneStore.getState().objects.has('obj-1')).toBe(true)

      removeObject('obj-1')
      expect(useSceneStore.getState().objects.has('obj-1')).toBe(false)
    })

    it('should remove object from rootIds', () => {
      const { addObject, removeObject } = useSceneStore.getState()

      const obj: SceneObject = {
        id: 'obj-1',
        name: 'Test',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(obj)
      expect(useSceneStore.getState().rootIds).toContain('obj-1')

      removeObject('obj-1')
      expect(useSceneStore.getState().rootIds).not.toContain('obj-1')
    })

    it('should recursively remove children', () => {
      const { addObject, removeObject } = useSceneStore.getState()

      const parent: SceneObject = {
        id: 'parent',
        name: 'Parent',
        type: 'group',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      const child: SceneObject = {
        id: 'child',
        name: 'Child',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: 'parent',
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(parent)
      addObject(child)

      removeObject('parent')

      const state = useSceneStore.getState()
      expect(state.objects.has('parent')).toBe(false)
      expect(state.objects.has('child')).toBe(false)
    })
  })

  describe('updateObject', () => {
    it('should update object properties', () => {
      const { addObject, updateObject } = useSceneStore.getState()

      const obj: SceneObject = {
        id: 'obj-1',
        name: 'Original Name',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(obj)

      updateObject('obj-1', { name: 'New Name', visible: false })

      const state = useSceneStore.getState()
      const updated = state.objects.get('obj-1')
      expect(updated?.name).toBe('New Name')
      expect(updated?.visible).toBe(false)
    })
  })

  describe('setParent', () => {
    it('should change object parent', () => {
      const { addObject, setParent } = useSceneStore.getState()

      const parent1: SceneObject = {
        id: 'parent1',
        name: 'Parent 1',
        type: 'group',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      const parent2: SceneObject = {
        id: 'parent2',
        name: 'Parent 2',
        type: 'group',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      const child: SceneObject = {
        id: 'child',
        name: 'Child',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: 'parent1',
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(parent1)
      addObject(parent2)
      addObject(child)

      setParent('child', 'parent2')

      const state = useSceneStore.getState()
      const updatedChild = state.objects.get('child')
      const updatedParent1 = state.objects.get('parent1')
      const updatedParent2 = state.objects.get('parent2')

      expect(updatedChild?.parentId).toBe('parent2')
      expect(updatedParent1?.children).not.toContain('child')
      expect(updatedParent2?.children).toContain('child')
    })
  })

  describe('clearScene', () => {
    it('should clear all objects', () => {
      const { addObject, clearScene } = useSceneStore.getState()

      const obj: SceneObject = {
        id: 'obj-1',
        name: 'Test',
        type: 'cube',
        transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        visible: true,
        locked: false,
        parentId: null,
        children: [],
        userData: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      addObject(obj)
      expect(useSceneStore.getState().objects.size).toBe(1)

      clearScene()

      const state = useSceneStore.getState()
      expect(state.objects.size).toBe(0)
      expect(state.rootIds).toEqual([])
    })
  })
})
