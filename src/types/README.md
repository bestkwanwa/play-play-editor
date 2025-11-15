# Types Module

TypeScript type definitions and interfaces for the 3D editor.

## Purpose

This module contains all TypeScript type definitions, interfaces, and type utilities:

- Scene object types
- Editor state types
- Transform types (position, rotation, scale)
- Common utility types
- Type guards and validators

## Structure

```
types/
├── README.md          # This file
├── index.ts          # Public type exports
├── scene.ts          # Scene and object types (future)
├── editor.ts         # Editor state types (future)
├── transform.ts      # Transform-related types (future)
└── common.ts         # Common utility types (future)
```

## Usage

```typescript
import type { SceneObject, EditorState, Transform } from '@/types'

const object: SceneObject = {
  id: 'obj-123',
  name: 'Cube',
  transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
}
```

## Guidelines

- Use `type` for unions/intersections, `interface` for object shapes
- Export types with `export type` or `export interface`
- Document complex types with JSDoc comments
- Use strict TypeScript mode (no `any`)
- Create type guards for runtime validation
- Keep types DRY - use utility types and generics
