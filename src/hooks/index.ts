/**
 * Hooks module - Custom React hooks
 *
 * This module exports reusable React hooks that encapsulate
 * common logic and state management patterns.
 */

// Scene object hooks
export {
  useSceneObject,
  useObjectTransform,
  useObjectChildren,
  useObjectParent,
  useIsObjectVisible,
  useObjectActions,
} from './useSceneObject'

// Selection hooks
export { useSelection, useIsSelected, useIsFocused, useMultiSelect } from './useSelection'

// Transform hooks
export { useTransform } from './useTransform'

// History hooks
export { useHistory, useUndoRedoShortcuts, useHistoryControl } from './useHistory'
