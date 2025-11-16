# Store Module

Zustand state management stores for the 3D editor.

## Purpose

This module contains all global state management using Zustand:

- Scene state (objects, hierarchy)
- Selection state (selected objects)
- UI state (panels, settings)
- History state (undo/redo)

## Structure

```
store/
├── README.md             # This file
├── index.ts             # Public store exports
├── sceneStore.ts        # Scene and object management (future)
├── selectionStore.ts    # Object selection state (future)
├── uiStore.ts          # UI state (panels, settings) (future)
└── historyStore.ts     # Undo/redo history (future)
```

## Usage

```typescript
import { useSceneStore, useSelectionStore } from '@/store'

function MyComponent() {
  const objects = useSceneStore((state) => state.objects)
  const selected = useSelectionStore((state) => state.selected)
  // ...
}
```

## Guidelines

- Use Zustand's slice pattern for complex stores
- Keep stores focused on single responsibilities
- Enable DevTools integration for debugging
- Write comprehensive unit tests
- Document all store actions and selectors
