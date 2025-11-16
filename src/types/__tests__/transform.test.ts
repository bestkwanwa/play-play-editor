/**
 * Tests for transform utilities
 */

import { describe, it, expect } from 'vitest'
import { DEFAULT_TRANSFORM, isTransform, createTransform, cloneTransform } from '../transform'

describe('transform utilities', () => {
  describe('DEFAULT_TRANSFORM', () => {
    it('should have identity transform values', () => {
      expect(DEFAULT_TRANSFORM.position).toEqual([0, 0, 0])
      expect(DEFAULT_TRANSFORM.rotation).toEqual([0, 0, 0])
      expect(DEFAULT_TRANSFORM.scale).toEqual([1, 1, 1])
    })

    it('should be immutable', () => {
      expect(Object.isFrozen(DEFAULT_TRANSFORM)).toBe(true)
    })
  })

  describe('isTransform', () => {
    it('should return true for valid transforms', () => {
      expect(
        isTransform({
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        })
      ).toBe(true)

      expect(
        isTransform({
          position: [1, 2, 3],
          rotation: [0.1, 0.2, 0.3],
          scale: [2, 2, 2],
        })
      ).toBe(true)
    })

    it('should return false for invalid transforms', () => {
      expect(isTransform(null)).toBe(false)
      expect(isTransform(undefined)).toBe(false)
      expect(isTransform({})).toBe(false)
      expect(isTransform({ position: [0, 0, 0] })).toBe(false) // Missing properties

      // Invalid position
      expect(
        isTransform({
          position: [0, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        })
      ).toBe(false)

      // Invalid rotation
      expect(
        isTransform({
          position: [0, 0, 0],
          rotation: [0, 0, NaN],
          scale: [1, 1, 1],
        })
      ).toBe(false)

      // Invalid scale
      expect(
        isTransform({
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: [1, 'two', 3],
        })
      ).toBe(false)
    })
  })

  describe('createTransform', () => {
    it('should create transform with default values', () => {
      const transform = createTransform()

      expect(transform.position).toEqual([0, 0, 0])
      expect(transform.rotation).toEqual([0, 0, 0])
      expect(transform.scale).toEqual([1, 1, 1])
    })

    it('should create transform with partial values', () => {
      const transform = createTransform({
        position: [1, 2, 3],
      })

      expect(transform.position).toEqual([1, 2, 3])
      expect(transform.rotation).toEqual([0, 0, 0])
      expect(transform.scale).toEqual([1, 1, 1])
    })

    it('should create new arrays (not references)', () => {
      const transform1 = createTransform()
      const transform2 = createTransform()

      expect(transform1.position).not.toBe(transform2.position)
      expect(transform1.rotation).not.toBe(transform2.rotation)
      expect(transform1.scale).not.toBe(transform2.scale)
    })
  })

  describe('cloneTransform', () => {
    it('should create a deep copy', () => {
      const original = {
        position: [1, 2, 3] as [number, number, number],
        rotation: [0.1, 0.2, 0.3] as [number, number, number],
        scale: [2, 3, 4] as [number, number, number],
      }

      const cloned = cloneTransform(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.position).not.toBe(original.position)
      expect(cloned.rotation).not.toBe(original.rotation)
      expect(cloned.scale).not.toBe(original.scale)
    })

    it('should not affect original when modified', () => {
      const original = createTransform()
      const cloned = cloneTransform(original)

      cloned.position[0] = 999

      expect(original.position[0]).toBe(0)
      expect(cloned.position[0]).toBe(999)
    })
  })
})
