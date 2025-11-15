/**
 * Tests for common type utilities
 */

import { describe, it, expect } from 'vitest'
import { isUUID, isVector3, isColor, isColorWithAlpha } from '../common'

describe('common type guards', () => {
  describe('isUUID', () => {
    it('should return true for valid UUIDs (v4)', () => {
      expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
      expect(isUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479')).toBe(true)
      expect(isUUID('6ba7b814-9dad-41d1-80b4-00c04fd430c8')).toBe(true)
    })

    it('should return false for invalid UUIDs', () => {
      expect(isUUID('not-a-uuid')).toBe(false)
      expect(isUUID('550e8400-e29b-41d4-a716')).toBe(false)
      expect(isUUID('550e8400-e29b-51d4-a716-446655440000')).toBe(false) // Wrong version
      expect(isUUID('')).toBe(false)
      expect(isUUID(123)).toBe(false)
      expect(isUUID(null)).toBe(false)
      expect(isUUID(undefined)).toBe(false)
      expect(isUUID({})).toBe(false)
    })
  })

  describe('isVector3', () => {
    it('should return true for valid Vector3', () => {
      expect(isVector3([0, 0, 0])).toBe(true)
      expect(isVector3([1, 2, 3])).toBe(true)
      expect(isVector3([-1, -2, -3])).toBe(true)
      expect(isVector3([0.5, 1.5, 2.5])).toBe(true)
    })

    it('should return false for invalid Vector3', () => {
      expect(isVector3([1, 2])).toBe(false) // Too short
      expect(isVector3([1, 2, 3, 4])).toBe(false) // Too long
      expect(isVector3([1, 2, 'three'])).toBe(false) // Wrong type
      expect(isVector3([1, 2, NaN])).toBe(false) // NaN
      expect(isVector3('not an array')).toBe(false)
      expect(isVector3(null)).toBe(false)
      expect(isVector3(undefined)).toBe(false)
      expect(isVector3({})).toBe(false)
    })
  })

  describe('isColor', () => {
    it('should return true for valid Color', () => {
      expect(isColor([0, 0, 0])).toBe(true)
      expect(isColor([1, 1, 1])).toBe(true)
      expect(isColor([0.5, 0.5, 0.5])).toBe(true)
      expect(isColor([0, 0.5, 1])).toBe(true)
    })

    it('should return false for invalid Color', () => {
      expect(isColor([1, 2, 3])).toBe(false) // Out of range
      expect(isColor([-1, 0, 0])).toBe(false) // Negative
      expect(isColor([0, 0])).toBe(false) // Too short
      expect(isColor([0, 0, 0, 1])).toBe(false) // Too long
      expect(isColor([0, 0, 'blue'])).toBe(false) // Wrong type
      expect(isColor('not an array')).toBe(false)
      expect(isColor(null)).toBe(false)
    })
  })

  describe('isColorWithAlpha', () => {
    it('should return true for valid ColorWithAlpha', () => {
      expect(isColorWithAlpha([0, 0, 0, 0])).toBe(true)
      expect(isColorWithAlpha([1, 1, 1, 1])).toBe(true)
      expect(isColorWithAlpha([0.5, 0.5, 0.5, 0.5])).toBe(true)
      expect(isColorWithAlpha([0, 0.5, 1, 0.8])).toBe(true)
    })

    it('should return false for invalid ColorWithAlpha', () => {
      expect(isColorWithAlpha([1, 2, 3, 4])).toBe(false) // Out of range
      expect(isColorWithAlpha([-1, 0, 0, 1])).toBe(false) // Negative
      expect(isColorWithAlpha([0, 0, 0])).toBe(false) // Too short
      expect(isColorWithAlpha([0, 0, 0, 1, 1])).toBe(false) // Too long
      expect(isColorWithAlpha([0, 0, 0, 'alpha'])).toBe(false) // Wrong type
      expect(isColorWithAlpha('not an array')).toBe(false)
      expect(isColorWithAlpha(null)).toBe(false)
    })
  })
})
