/**
 * Scene Store - Manages scene objects and hierarchy
 *
 * This store handles:
 * - Adding/removing/updating scene objects
 * - Maintaining object hierarchy
 * - Scene metadata
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UUID, Scene, SceneObject } from '@/types'

/**
 * Scene store state
 */
interface SceneStore extends Scene {
  // Actions
  addObject: (object: SceneObject) => void
  removeObject: (id: UUID) => void
  updateObject: (id: UUID, updates: Partial<SceneObject>) => void
  getObject: (id: UUID) => SceneObject | undefined
  setParent: (childId: UUID, parentId: UUID | null) => void
  clearScene: () => void
}

/**
 * Create initial empty scene
 */
function createEmptyScene(): Scene {
  return {
    id: crypto.randomUUID(),
    name: 'Untitled Scene',
    objects: new Map(),
    rootIds: [],
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  }
}

/**
 * Scene store hook
 */
export const useSceneStore = create<SceneStore>()(
  devtools(
    (set, get) => ({
      ...createEmptyScene(),

      /**
       * Add a new object to the scene
       */
      addObject: (object) => {
        set((state) => {
          const newObjects = new Map(state.objects)
          newObjects.set(object.id, object)

          // Add to root if no parent
          const newRootIds = [...state.rootIds]
          if (object.parentId === null && !newRootIds.includes(object.id)) {
            newRootIds.push(object.id)
          }

          // If has parent, add to parent's children
          if (object.parentId) {
            const parent = newObjects.get(object.parentId)
            if (parent && !parent.children.includes(object.id)) {
              newObjects.set(object.parentId, {
                ...parent,
                children: [...parent.children, object.id],
                updatedAt: Date.now(),
              })
            }
          }

          return {
            objects: newObjects,
            rootIds: newRootIds,
            metadata: {
              ...state.metadata,
              updatedAt: Date.now(),
            },
          }
        })
      },

      /**
       * Remove an object from the scene
       */
      removeObject: (id) => {
        set((state) => {
          const object = state.objects.get(id)
          if (!object) return state

          const newObjects = new Map(state.objects)

          // Recursively remove children
          const removeRecursive = (objId: UUID) => {
            const obj = newObjects.get(objId)
            if (!obj) return

            // Remove all children first
            obj.children.forEach(removeRecursive)

            // Remove from map
            newObjects.delete(objId)
          }

          // Remove from parent's children
          if (object.parentId) {
            const parent = newObjects.get(object.parentId)
            if (parent) {
              newObjects.set(object.parentId, {
                ...parent,
                children: parent.children.filter((childId) => childId !== id),
                updatedAt: Date.now(),
              })
            }
          }

          // Remove the object and its children
          removeRecursive(id)

          // Update root IDs
          const newRootIds = state.rootIds.filter((rootId) => rootId !== id)

          return {
            objects: newObjects,
            rootIds: newRootIds,
            metadata: {
              ...state.metadata,
              updatedAt: Date.now(),
            },
          }
        })
      },

      /**
       * Update an object's properties
       */
      updateObject: (id, updates) => {
        set((state) => {
          const object = state.objects.get(id)
          if (!object) return state

          const newObjects = new Map(state.objects)
          newObjects.set(id, {
            ...object,
            ...updates,
            updatedAt: Date.now(),
          })

          return {
            objects: newObjects,
            metadata: {
              ...state.metadata,
              updatedAt: Date.now(),
            },
          }
        })
      },

      /**
       * Get an object by ID
       */
      getObject: (id) => {
        return get().objects.get(id)
      },

      /**
       * Set an object's parent
       */
      setParent: (childId, parentId) => {
        set((state) => {
          const child = state.objects.get(childId)
          if (!child) return state

          const newObjects = new Map(state.objects)
          const newRootIds = [...state.rootIds]

          // Remove from old parent
          if (child.parentId) {
            const oldParent = newObjects.get(child.parentId)
            if (oldParent) {
              newObjects.set(child.parentId, {
                ...oldParent,
                children: oldParent.children.filter((id) => id !== childId),
                updatedAt: Date.now(),
              })
            }
          } else {
            // Was a root object
            const index = newRootIds.indexOf(childId)
            if (index !== -1) {
              newRootIds.splice(index, 1)
            }
          }

          // Add to new parent
          if (parentId) {
            const newParent = newObjects.get(parentId)
            if (newParent) {
              newObjects.set(parentId, {
                ...newParent,
                children: [...newParent.children, childId],
                updatedAt: Date.now(),
              })
            }
          } else {
            // Becoming a root object
            if (!newRootIds.includes(childId)) {
              newRootIds.push(childId)
            }
          }

          // Update child
          newObjects.set(childId, {
            ...child,
            parentId,
            updatedAt: Date.now(),
          })

          return {
            objects: newObjects,
            rootIds: newRootIds,
            metadata: {
              ...state.metadata,
              updatedAt: Date.now(),
            },
          }
        })
      },

      /**
       * Clear the entire scene
       */
      clearScene: () => {
        set(createEmptyScene())
      },
    }),
    { name: 'SceneStore' }
  )
)
