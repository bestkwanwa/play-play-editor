# Core Module

Core business logic and engine functionality for the 3D editor.

## Purpose

This module contains the fundamental systems that power the editor:

- Scene graph management
- Object lifecycle management
- Core algorithms and utilities
- Engine-level abstractions

## Structure

```
core/
├── README.md          # This file
├── index.ts          # Public API exports
└── [future files]    # Core systems will be added here
```

## Usage

```typescript
import {} from /* core utilities */ '@/core'
```

## Guidelines

- Keep this module framework-agnostic (no React dependencies)
- Focus on pure business logic
- Maintain high test coverage
- Export only stable public APIs
