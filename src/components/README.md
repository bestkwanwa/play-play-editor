# Components Module

React components for the 3D editor UI.

## Purpose

This module contains all React components used throughout the application:

- 3D viewport components
- UI panels and controls
- Layout components
- Shared/reusable components

## Structure

```
components/
├── README.md          # This file
├── index.ts          # Public component exports
├── viewport/         # 3D rendering components (future)
├── panels/           # UI panels (hierarchy, properties, etc.) (future)
├── toolbar/          # Toolbar components (future)
└── shared/           # Reusable UI components (future)
```

## Usage

```typescript
import { Viewport, HierarchyPanel } from '@/components'
```

## Guidelines

- Follow React best practices
- Use TypeScript strict mode
- Write unit tests for complex logic
- Keep components focused and composable
- Use hooks from `@/hooks` for state management
