/**
 * useSceneObject hook - Access and manipulate a specific scene object
 *
 * This hook provides convenient access to a scene object and its properties.
 */

import { useMemo } from 'react'
import { useSceneStore } from '@/store'
import type { UUID, SceneObject, Transform } from '@/types'

/**
 * Hook to access a scene object by ID
 *
 * @param id - The object ID
 * @returns The scene object, or undefined if not found
 *
 * @example
 * ```tsx
 * function ObjectEditor({ objectId }: { objectId: string }) {
 *   const object = useSceneObject(objectId)
 *
 *   if (!object) return <div>Object not found</div>
 *
 *   return <div>{object.name}</div>
 * }
 * ```
 */
export function useSceneObject(id: UUID): SceneObject | undefined {
  return useSceneStore((state) => state.objects.get(id))
}

/**
 * Hook to get an object's transform
 *
 * @param id - The object ID
 * @returns The object's transform, or undefined if not found
 */
export function useObjectTransform(id: UUID): Transform | undefined {
  return useSceneStore((state) => state.objects.get(id)?.transform)
}

/**
 * Hook to get an object's children
 *
 * @param id - The object ID
 * @returns Array of child object IDs
 */
export function useObjectChildren(id: UUID): UUID[] {
  return useSceneStore((state) => state.objects.get(id)?.children ?? [])
}

/**
 * Hook to get an object's parent
 *
 * @param id - The object ID
 * @returns The parent object, or undefined if no parent or not found
 */
export function useObjectParent(id: UUID): SceneObject | undefined {
  return useSceneStore((state) => {
    const object = state.objects.get(id)
    if (!object?.parentId) return undefined
    return state.objects.get(object.parentId)
  })
}

/**
 * Hook to check if an object is visible (including parent visibility)
 *
 * @param id - The object ID
 * @returns true if the object and all ancestors are visible
 */
export function useIsObjectVisible(id: UUID): boolean {
  return useSceneStore((state) => {
    let current = state.objects.get(id)
    if (!current) return false

    // Check this object and all ancestors
    while (current) {
      if (!current.visible) return false

      if (current.parentId) {
        current = state.objects.get(current.parentId)
      } else {
        break
      }
    }

    return true
  })
}

/**
 * Hook to get object manipulation actions
 *
 * @param id - The object ID
 * @returns Object with action methods
 *
 * @example
 * ```tsx
 * function ObjectControls({ objectId }: { objectId: string }) {
 *   const { updateTransform, setVisible, setName } = useObjectActions(objectId)
 *
 *   return (
 *     <>
 *       <button onClick={() => setVisible(false)}>Hide</button>
 *       <button onClick={() => setName('New Name')}>Rename</button>
 *     </>
 *   )
 * }
 * ```
 */
export function useObjectActions(id: UUID) {
  const updateObject = useSceneStore((state) => state.updateObject)
  const removeObject = useSceneStore((state) => state.removeObject)
  const setParent = useSceneStore((state) => state.setParent)

  return useMemo(
    () => ({
      /**
       * Update the object's transform
       */
      updateTransform: (transform: Partial<Transform>) => {
        const object = useSceneStore.getState().objects.get(id)
        if (!object) return

        updateObject(id, {
          transform: {
            ...object.transform,
            ...transform,
          },
        })
      },

      /**
       * Set object visibility
       */
      setVisible: (visible: boolean) => {
        updateObject(id, { visible })
      },

      /**
       * Set object locked state
       */
      setLocked: (locked: boolean) => {
        updateObject(id, { locked })
      },

      /**
       * Set object name
       */
      setName: (name: string) => {
        updateObject(id, { name })
      },

      /**
       * Remove this object
       */
      remove: () => {
        removeObject(id)
      },

      /**
       * Change object's parent
       */
      reparent: (parentId: UUID | null) => {
        setParent(id, parentId)
      },
    }),
    [id, updateObject, removeObject, setParent]
  )
}
