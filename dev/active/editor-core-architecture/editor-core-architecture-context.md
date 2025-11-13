# Editor Core Architecture - Context

**Last Updated**: 2025-11-13
**Related Plan**: editor-core-architecture-plan.md
**Status**: Planning Complete, Ready for Implementation

---

## Project Overview

**Name**: Play-Play Editor
**Type**: 3D Editor
**Core Technology**: Three.js via React Three Fiber
**Primary Use Case**: 3D scene creation and manipulation

---

## Key Technical Decisions

### Technology Stack (Based on 2024-2025 Best Practices)

| Category | Choice | Rationale |
|----------|--------|-----------|
| **UI Framework** | React 18+ | Industry standard, excellent ecosystem |
| **Build Tool** | Vite | Fastest dev experience, CRA deprecated |
| **3D Library** | Three.js + R3F | Declarative 3D in React, active community |
| **State Management** | Zustand | Lightweight (<1kb), zero boilerplate, 2024-2025 winner |
| **Language** | TypeScript 5+ | Type safety, better DX |
| **Testing** | Vitest | Vite-optimized, Jest-compatible API |
| **Linting** | ESLint | Industry standard |
| **Formatting** | Prettier | Code consistency |

### Research Sources
- Web search: "React Three Fiber vs Three.js 2025"
- Key finding: R3F is recommended for React apps due to declarative API and better integration
- Web search: "React state management 2024 2025 Zustand Redux"
- Key finding: Zustand is "absolute winner" for most use cases, lightweight and fast
- Web search: "Vite React TypeScript 2024 2025 best setup"
- Key finding: Vite is "new standard" for React development after CRA deprecation

---

## Architecture Patterns

### Component Hierarchy
```
<App>
  ├── <EditorLayout>
  │   ├── <Toolbar>
  │   ├── <Viewport> (R3F Canvas)
  │   │   ├── <Scene>
  │   │   ├── <Camera>
  │   │   ├── <Lights>
  │   │   └── <Objects>
  │   ├── <HierarchyPanel>
  │   └── <PropertiesPanel>
```

### State Management Pattern
```typescript
// Zustand store pattern
const useSceneStore = create<SceneState>((set) => ({
  objects: [],
  addObject: (obj) => set((state) => ({
    objects: [...state.objects, obj]
  })),
  removeObject: (id) => set((state) => ({
    objects: state.objects.filter(o => o.id !== id)
  }))
}))
```

### Data Flow
```
User Interaction → Event Handler → Zustand Action → State Update → React Re-render → Three.js Update
```

---

## Core Modules

### 1. Scene Management (`src/core/scene/`)
**Purpose**: Manage 3D scene graph and objects
**Key Files**:
- `SceneManager.ts` - Central scene controller
- `SceneObject.ts` - Base class for all 3D objects
- `SceneNode.ts` - Scene graph node structure

**Responsibilities**:
- Add/remove objects from scene
- Maintain object hierarchy
- Handle object lifecycle (create, update, destroy)

---

### 2. Selection System (`src/core/selection/`)
**Purpose**: Handle object selection and visual feedback
**Key Files**:
- `SelectionManager.ts` - Selection state and logic
- `SelectionOutline.ts` - Visual selection feedback
- `Raycaster.ts` - Mouse picking logic

**Responsibilities**:
- Single and multi-select
- Click detection via raycasting
- Visual feedback (outline, bounding box)

---

### 3. Transform System (`src/core/transform/`)
**Purpose**: Object manipulation (move, rotate, scale)
**Key Files**:
- `TransformGizmo.ts` - Interactive transform controls
- `TransformManager.ts` - Transform state management
- `Snapping.ts` - Grid snapping logic

**Responsibilities**:
- Gizmo rendering and interaction
- Local vs world space transforms
- Snap to grid functionality

---

### 4. History System (`src/core/history/`)
**Purpose**: Undo/redo functionality
**Key Files**:
- `CommandPattern.ts` - Command interface
- `HistoryManager.ts` - History stack management
- `Commands/` - Specific command implementations

**Responsibilities**:
- Record all user actions as commands
- Undo/redo with bounded history
- Command serialization

---

### 5. State Management (`src/store/`)
**Purpose**: Global application state
**Key Files**:
- `sceneStore.ts` - Scene objects and hierarchy
- `selectionStore.ts` - Selected objects
- `uiStore.ts` - UI panel states
- `historyStore.ts` - Undo/redo stack

**Pattern**: Separate stores for separation of concerns

---

## Dependencies

### Production Dependencies
```json
{
  "react": "^18.3.1",                    // UI framework
  "react-dom": "^18.3.1",                // React DOM renderer
  "three": "^0.170.0",                   // 3D engine
  "@react-three/fiber": "^8.17.0",       // React renderer for Three.js
  "@react-three/drei": "^9.117.0",       // R3F helper components
  "zustand": "^5.0.2"                    // State management
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.3.12",            // React types
  "@types/react-dom": "^18.3.1",         // React DOM types
  "@types/three": "^0.170.0",            // Three.js types
  "@vitejs/plugin-react": "^4.3.4",      // Vite React plugin
  "typescript": "~5.6.2",                // TypeScript compiler
  "vite": "^6.0.1",                      // Build tool
  "eslint": "^9.15.0",                   // Linter
  "prettier": "^3.3.3",                  // Formatter
  "vitest": "^2.1.5",                    // Test runner
  "husky": "^9.1.7",                     // Git hooks
  "lint-staged": "^15.2.11",             // Pre-commit linting
  "r3f-perf": "^7.2.2"                   // Performance monitoring
}
```

---

## File Structure

```
play-play-editor/
├── .claude/                  # Claude Code configuration
├── dev/                      # Development documentation
│   ├── active/               # Active task plans
│   ├── learning/             # Knowledge base
│   ├── CONTRIBUTING.md       # Team guidelines
│   └── TODO.md              # Project tasks
├── src/
│   ├── core/                # Core 3D engine logic
│   │   ├── scene/           # Scene management
│   │   ├── objects/         # 3D object abstractions
│   │   ├── camera/          # Camera controls
│   │   ├── selection/       # Selection system
│   │   ├── transform/       # Transform gizmos
│   │   └── history/         # Undo/redo
│   ├── components/          # React components
│   │   ├── viewport/        # 3D viewport (R3F)
│   │   ├── panels/          # UI panels
│   │   ├── toolbar/         # Toolbar
│   │   └── common/          # Shared components
│   ├── store/               # Zustand stores
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── eslint.config.js         # ESLint config
└── .prettierrc              # Prettier config
```

---

## Performance Considerations

### Targets
- **FPS**: Maintain 60fps with 50+ objects
- **Startup**: Dev server starts in <2s
- **HMR**: Changes reflect in <1s
- **Bundle Size**: Production bundle <500kb gzipped

### Optimization Strategies
1. **Object Pooling**: Reuse Three.js geometries and materials
2. **Instancing**: Use InstancedMesh for repeated objects
3. **LOD System**: Level-of-detail for distant objects
4. **Frustum Culling**: Don't render off-screen objects (automatic in Three.js)
5. **Lazy Loading**: Load UI components on demand

### Monitoring
- Use `r3f-perf` for real-time performance stats
- Chrome DevTools Performance tab for profiling
- Memory snapshots to detect leaks

---

## Testing Strategy

### Unit Tests
- Test core logic: SceneManager, SelectionManager, TransformManager
- Test Zustand stores: State updates, selectors
- Test utility functions: Math helpers, serialization

### Integration Tests
- Test component interaction with stores
- Test 3D scene operations end-to-end
- Test undo/redo system

### E2E Tests (Future)
- Test full user workflows
- Test export/import functionality

---

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Active development
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Convention
- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `chore:` - Build, deps, etc.

### Code Review Checklist
- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Tests added/updated
- [ ] No console.log statements
- [ ] Performance impact considered

---

## Known Constraints

### Browser Support
- **Target**: Modern browsers with WebGL 2.0 support
- **Chrome**: 56+
- **Firefox**: 51+
- **Safari**: 15+
- **Edge**: 79+

### Performance Limits
- Max objects in scene: ~500 (with optimization)
- Max undo history: 50 steps
- Max texture size: 4096x4096

---

## Related Documentation

### Internal Docs
- `dev/TODO.md` - Project task tracking
- `dev/CONTRIBUTING.md` - Team workflow guide
- `dev/learning/claude-code/session-management-strategies.md` - Session management

### External Resources
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Manual](https://threejs.org/manual/)
- [Zustand Guide](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## Questions & Clarifications

### Open Questions
- **Q**: What specific 3D objects should be supported initially?
  - **A**: Start with primitives (cube, sphere, plane), expand later

- **Q**: Should we support custom materials?
  - **A**: Phase 1 uses basic materials, custom materials in Phase 5+

- **Q**: Export formats needed?
  - **A**: JSON (internal format), GLB/GLTF (standard 3D format)

### Assumptions
- User has basic understanding of 3D concepts
- Desktop-first design (mobile support future)
- Single-user editor (no collaboration features initially)

---

## Change Log

### 2025-11-13 - Initial Planning
- Created architecture plan
- Researched and selected technology stack
- Defined 6 implementation phases
- Estimated timeline: 19-26 days

---

**End of Context Document**
