# Hooks Module

Custom React hooks for the 3D editor.

## Purpose

This module contains reusable React hooks that encapsulate common logic:

- Scene object manipulation hooks
- Selection management hooks
- Transform operation hooks
- History/undo hooks
- UI state hooks

## Structure

```
hooks/
├── README.md              # This file
├── index.ts              # Public hook exports
├── useSceneObject.ts     # Scene object manipulation (future)
├── useSelection.ts       # Selection management (future)
├── useTransform.ts       # Transform operations (future)
└── useHistory.ts         # Undo/redo operations (future)
```

## Usage

```typescript
import { useSceneObject, useSelection } from '@/hooks'

function ObjectEditor({ objectId }: { objectId: string }) {
  const object = useSceneObject(objectId)
  const { select, isSelected } = useSelection()

  // ...
}
```

## Guidelines

- Follow React hooks rules (use- prefix, don't call conditionally)
- Use memoization (useMemo, useCallback) for performance
- Keep hooks focused and composable
- Write tests for hook logic
- Document parameters and return values
- Use TypeScript generics where appropriate
