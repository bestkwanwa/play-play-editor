# Utils Module

Utility functions and helpers for the 3D editor.

## Purpose

This module contains reusable utility functions:

- Math utilities (vectors, matrices, etc.)
- UUID generation
- Data validation
- Format conversion
- Helper functions

## Structure

```
utils/
├── README.md          # This file
├── index.ts          # Public utility exports
├── math.ts           # Math utilities (future)
├── uuid.ts           # UUID generation (future)
├── validation.ts     # Data validation (future)
└── format.ts         # Format conversion (future)
```

## Usage

```typescript
import { generateUUID, clamp, validateTransform } from '@/utils'

const id = generateUUID()
const clamped = clamp(value, 0, 100)
const isValid = validateTransform(transform)
```

## Guidelines

- Keep functions pure (no side effects)
- Use TypeScript strict mode
- Write comprehensive unit tests
- Document function parameters and return values
- Export only stable, reusable utilities
- Consider performance for frequently-called functions
