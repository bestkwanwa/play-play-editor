/**
 * Tests for scene utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DEFAULT_MATERIAL, isRenderableObject, createSceneObject } from '../scene'
import type { SceneObject, ObjectType } from '../scene'

describe('scene utilities', () => {
  beforeEach(() => {
    // Mock Date.now for consistent timestamps
    vi.setSystemTime(new Date('2025-01-01T00:00:00.000Z'))
  })

  describe('DEFAULT_MATERIAL', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_MATERIAL.color).toEqual([0.8, 0.8, 0.8])
      expect(DEFAULT_MATERIAL.metalness).toBe(0)
      expect(DEFAULT_MATERIAL.roughness).toBe(0.5)
      expect(DEFAULT_MATERIAL.opacity).toBe(1)
      expect(DEFAULT_MATERIAL.wireframe).toBe(false)
    })

    it('should be immutable', () => {
      expect(Object.isFrozen(DEFAULT_MATERIAL)).toBe(true)
    })
  })

  describe('isRenderableObject', () => {
    it('should return true for renderable object types', () => {
      const renderableTypes = ['cube', 'sphere', 'cylinder', 'cone', 'plane', 'torus']

      renderableTypes.forEach((type) => {
        const obj: SceneObject = {
          id: 'test-id',
          name: 'Test',
          type: type as ObjectType,
          transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
          visible: true,
          locked: false,
          parentId: null,
          children: [],
          userData: {},
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        expect(isRenderableObject(obj)).toBe(true)
      })
    })

    it('should return false for non-renderable object types', () => {
      const nonRenderableTypes = ['group', 'light', 'camera']

      nonRenderableTypes.forEach((type) => {
        const obj: SceneObject = {
          id: 'test-id',
          name: 'Test',
          type: type as ObjectType,
          transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
          visible: true,
          locked: false,
          parentId: null,
          children: [],
          userData: {},
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        expect(isRenderableObject(obj)).toBe(false)
      })
    })
  })

  describe('createSceneObject', () => {
    it('should create object with required fields', () => {
      const obj = createSceneObject({
        id: 'test-123',
        name: 'Test Object',
        type: 'cube',
      })

      expect(obj.id).toBe('test-123')
      expect(obj.name).toBe('Test Object')
      expect(obj.type).toBe('cube')
    })

    it('should set default values', () => {
      const obj = createSceneObject({
        id: 'test-123',
        name: 'Test Object',
        type: 'cube',
      })

      expect(obj.visible).toBe(true)
      expect(obj.locked).toBe(false)
      expect(obj.parentId).toBe(null)
      expect(obj.children).toEqual([])
      expect(obj.userData).toEqual({})
      expect(obj.transform).toEqual({
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      })
    })

    it('should set timestamps', () => {
      const now = Date.now()
      const obj = createSceneObject({
        id: 'test-123',
        name: 'Test Object',
        type: 'cube',
      })

      expect(obj.createdAt).toBe(now)
      expect(obj.updatedAt).toBe(now)
    })

    it('should allow partial overrides', () => {
      const obj = createSceneObject({
        id: 'test-123',
        name: 'Test Object',
        type: 'cube',
        visible: false,
        locked: true,
        parentId: 'parent-123',
        children: ['child-1', 'child-2'],
        userData: { custom: 'data' },
        transform: {
          position: [1, 2, 3],
          rotation: [0.1, 0.2, 0.3],
          scale: [2, 2, 2],
        },
      })

      expect(obj.visible).toBe(false)
      expect(obj.locked).toBe(true)
      expect(obj.parentId).toBe('parent-123')
      expect(obj.children).toEqual(['child-1', 'child-2'])
      expect(obj.userData).toEqual({ custom: 'data' })
      expect(obj.transform.position).toEqual([1, 2, 3])
    })
  })
})
