# 3D Editor Core Architecture Plan

**Last Updated**: 2025-11-13
**Project**: Play-Play Editor
**Type**: 3D Editor using Three.js
**Status**: Planning Phase

---

## Executive Summary

This document outlines the architectural design for a modern 3D editor built with React, Three.js, and TypeScript. The editor will leverage industry-standard tools and patterns from 2024-2025, prioritizing performance, maintainability, and developer experience.

**Key Technology Decisions:**
- **React 18+** with TypeScript 5+ for UI layer
- **React Three Fiber (R3F)** for declarative 3D scene management
- **Vite** for blazing-fast development and optimized builds
- **Zustand** for lightweight state management (<1kb, zero boilerplate)
- **Three.js** as the core 3D rendering engine

**Architecture Goals:**
1. **Modularity**: Clear separation between 3D engine, UI, and state
2. **Performance**: 60fps rendering with optimized scene management
3. **Extensibility**: Plugin-ready architecture for future features
4. **Developer Experience**: Fast HMR, TypeScript safety, clear patterns
5. **Scalability**: Support for complex 3D scenes with multiple objects

---

## Current State Analysis

### Existing Infrastructure
- ✅ Git repository initialized
- ✅ Claude Code infrastructure (hooks, skills, commands)
- ✅ Development workflow established (TODO.md, dev docs pattern)
- ❌ No package.json or dependencies installed
- ❌ No source code structure
- ❌ No build configuration

### Technical Requirements (Inferred)
- 3D scene rendering and manipulation
- Object selection and transformation (move, rotate, scale)
- Camera controls (orbit, pan, zoom)
- UI panels for properties and tools
- Undo/redo system
- Export/import functionality
- Performance monitoring

---

## Proposed Future State

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application Layer                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   UI Layer   │  │  3D Viewport │  │  Side Panels │      │
│  │  (React)     │  │   (R3F)      │  │  (React)     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                   │
│                   ┌────────▼────────┐                         │
│                   │  Zustand Store  │                         │
│                   │  (State Mgmt)   │                         │
│                   └────────┬────────┘                         │
│                            │                                   │
│         ┌──────────────────┼──────────────────┐               │
│         │                  │                  │               │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐      │
│  │   Scene      │  │  Selection   │  │  Transform   │      │
│  │   Manager    │  │   System     │  │   System     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Three.js Engine Layer                      │
├─────────────────────────────────────────────────────────────┤
│  WebGL Renderer │ Scene Graph │ Camera │ Lights │ Objects   │
└─────────────────────────────────────────────────────────────┘
```

### Core Module Structure

```
src/
├── core/                    # Core 3D engine logic
│   ├── scene/              # Scene management
│   ├── objects/            # 3D object abstractions
│   ├── camera/             # Camera controls
│   ├── selection/          # Selection system
│   ├── transform/          # Transform gizmos
│   └── history/            # Undo/redo system
│
├── components/             # React components
│   ├── viewport/           # 3D viewport (R3F)
│   ├── panels/             # UI panels
│   ├── toolbar/            # Toolbar components
│   └── common/             # Shared UI components
│
├── store/                  # Zustand state management
│   ├── sceneStore.ts       # Scene state
│   ├── selectionStore.ts   # Selection state
│   ├── uiStore.ts          # UI state
│   └── historyStore.ts     # History state
│
├── hooks/                  # Custom React hooks
│   ├── useSceneObject.ts
│   ├── useSelection.ts
│   └── useTransform.ts
│
├── types/                  # TypeScript definitions
│   ├── scene.ts
│   ├── objects.ts
│   └── editor.ts
│
└── utils/                  # Utility functions
    ├── math.ts
    ├── serialization.ts
    └── performance.ts
```

---

## Implementation Phases

### Phase 0: Project Foundation (Effort: M)
**Goal**: Set up development environment and tooling

#### Tasks

**0.1 Initialize Vite + React + TypeScript** (Effort: S)
- Run `npm create vite@latest . -- --template react-ts`
- Verify project scaffolding
- **Acceptance Criteria**:
  - package.json exists with Vite dependencies
  - tsconfig.json configured with strict mode
  - Basic React app renders

**0.2 Configure TypeScript** (Effort: S)
- Enable strict type checking
- Configure path aliases (@/ for src/)
- Set up tsconfig for optimal DX
- **Acceptance Criteria**:
  - `"strict": true` enabled
  - Path aliases work in imports
  - No TypeScript errors on build

**0.3 Install Core Dependencies** (Effort: S)
- Install Three.js: `npm install three @types/three`
- Install R3F: `npm install @react-three/fiber @react-three/drei`
- Install Zustand: `npm install zustand`
- **Acceptance Criteria**:
  - All packages installed without conflicts
  - TypeScript types available for all libraries

**0.4 Configure ESLint & Prettier** (Effort: S)
- Set up ESLint with React + TypeScript rules
- Configure Prettier with project style guide
- Add lint-staged + husky for pre-commit hooks
- **Acceptance Criteria**:
  - `npm run lint` passes
  - Code auto-formats on save
  - Pre-commit hooks block bad commits

**0.5 Configure Vitest** (Effort: M)
- Install Vitest and testing utilities
- Set up test configuration
- Create example test
- **Acceptance Criteria**:
  - `npm run test` executes
  - Can test React components
  - Can test utility functions

**0.6 Set Up Development Scripts** (Effort: S)
- Configure npm scripts (dev, build, preview, test, lint)
- Set up hot reload
- Configure build optimization
- **Acceptance Criteria**:
  - `npm run dev` starts dev server
  - HMR works for React and CSS
  - Production build optimized

---

### Phase 1: Core Architecture (Effort: L)
**Goal**: Establish foundational architecture patterns

#### Tasks

**1.1 Create Directory Structure** (Effort: S)
- Create all core directories (see structure above)
- Add index.ts barrel exports
- Create README.md for each major module
- **Acceptance Criteria**:
  - All directories exist
  - Clean import paths work
  - Documentation explains module purpose

**1.2 Define TypeScript Interfaces** (Effort: M)
- Define Scene types (SceneObject, SceneNode, etc.)
- Define Editor types (EditorState, ViewportState, etc.)
- Define Transform types (Position, Rotation, Scale)
- Create utility types (UUID, Serializable, etc.)
- **Acceptance Criteria**:
  - All core types documented
  - No `any` types used
  - Type safety enforced

**1.3 Set Up Zustand Stores** (Effort: M)
- Create sceneStore (objects, add, remove, update)
- Create selectionStore (selected IDs, multi-select)
- Create uiStore (panels, viewport settings)
- Create historyStore (undo/redo stack)
- **Acceptance Criteria**:
  - All stores tested
  - DevTools integration works
  - State updates trigger re-renders

**1.4 Create Core Hooks** (Effort: M)
- `useSceneObject(id)` - Access scene object by ID
- `useSelection()` - Manage selection state
- `useTransform(id)` - Handle object transforms
- `useHistory()` - Undo/redo operations
- **Acceptance Criteria**:
  - Hooks follow React best practices
  - Proper memoization used
  - TypeScript types correct

---

### Phase 2: 3D Viewport Foundation (Effort: L)
**Goal**: Render basic 3D scene with camera controls

#### Tasks

**2.1 Create Viewport Component** (Effort: M)
- Set up React Three Fiber Canvas
- Configure renderer settings (shadows, tone mapping)
- Add basic lighting (ambient + directional)
- **Acceptance Criteria**:
  - 3D canvas renders full screen
  - 60fps performance on empty scene
  - Lighting looks correct

**2.2 Implement Camera Controls** (Effort: M)
- Integrate OrbitControls from drei
- Configure camera settings (FOV, near/far)
- Add keyboard shortcuts (reset view, etc.)
- **Acceptance Criteria**:
  - Can orbit, pan, zoom smoothly
  - Camera settings persist in state
  - Reset to default view works

**2.3 Create Grid and Axes** (Effort: S)
- Add infinite grid helper
- Add XYZ axis indicators
- Make grid toggle-able
- **Acceptance Criteria**:
  - Grid visible and aligned to world
  - Axes show correct orientation
  - Toggle works from UI

**2.4 Implement Basic Scene Objects** (Effort: M)
- Create Cube primitive component
- Create Sphere primitive component
- Create Plane primitive component
- Add object wrapper with common props
- **Acceptance Criteria**:
  - Can add objects to scene
  - Objects render correctly
  - Props (color, position) work

**2.5 Performance Monitoring** (Effort: S)
- Integrate r3f-perf for FPS tracking
- Add stats overlay (triangles, draw calls)
- Set up performance budgets
- **Acceptance Criteria**:
  - Can see FPS in dev mode
  - Performance warnings trigger
  - Stats accurate

---

### Phase 3: Scene Management (Effort: XL)
**Goal**: Full CRUD operations for 3D objects

#### Tasks

**3.1 Scene Object Manager** (Effort: L)
- Implement object creation system
- Add object hierarchy (parent/child)
- Handle object deletion with cleanup
- Implement object duplication
- **Acceptance Criteria**:
  - Can create/delete/duplicate objects
  - Parent-child relationships work
  - No memory leaks on deletion

**3.2 Object Properties System** (Effort: M)
- Position, rotation, scale properties
- Material properties (color, roughness, metalness)
- Geometry properties (dimensions)
- Name and metadata
- **Acceptance Criteria**:
  - All properties editable
  - Changes reflect immediately
  - Properties serializable

**3.3 Selection System** (Effort: L)
- Click to select objects
- Multi-select (Shift/Ctrl)
- Bounding box visualization
- Selection outline shader
- **Acceptance Criteria**:
  - Click selects correct object
  - Multi-select works
  - Visual feedback clear

**3.4 Transform System** (Effort: XL)
- Implement transform gizmo (translate, rotate, scale)
- Handle local vs world space
- Snap to grid functionality
- Keyboard shortcuts for tools
- **Acceptance Criteria**:
  - Gizmo interactive and accurate
  - Space toggle works
  - Snapping precise

**3.5 Scene Serialization** (Effort: M)
- Serialize scene to JSON
- Deserialize JSON to scene
- Handle references and IDs
- Validate scene data
- **Acceptance Criteria**:
  - Can save/load scenes
  - All object data preserved
  - Corrupted data handled

---

### Phase 4: UI Components (Effort: L)
**Goal**: Build editor UI panels and controls

#### Tasks

**4.1 Hierarchy Panel** (Effort: M)
- Tree view of scene objects
- Drag-and-drop reordering
- Visibility toggles
- Context menu (delete, duplicate, etc.)
- **Acceptance Criteria**:
  - Hierarchy matches scene
  - Drag-drop works smoothly
  - Actions trigger correctly

**4.2 Properties Panel** (Effort: M)
- Display selected object properties
- Input fields for transform values
- Material editor
- Geometry settings
- **Acceptance Criteria**:
  - Shows correct values
  - Edits apply immediately
  - Validation works

**4.3 Toolbar** (Effort: M)
- Tool selection (select, move, rotate, scale)
- Add object menu
- View options
- Undo/redo buttons
- **Acceptance Criteria**:
  - Tools switchable
  - Icons clear and responsive
  - Keyboard shortcuts work

**4.4 Top Menu Bar** (Effort: S)
- File menu (new, open, save)
- Edit menu (undo, redo, delete)
- View menu (grid, axes, stats)
- Help menu
- **Acceptance Criteria**:
  - Menus functional
  - Shortcuts documented
  - Keyboard nav works

**4.5 Responsive Layout** (Effort: M)
- Resizable panels
- Collapsible sidebars
- Full-screen viewport mode
- Layout persistence
- **Acceptance Criteria**:
  - Panels resize smoothly
  - Layout saves to localStorage
  - Works on different screen sizes

---

### Phase 5: History & Advanced Features (Effort: L)
**Goal**: Undo/redo system and polish

#### Tasks

**5.1 Command Pattern for Undo/Redo** (Effort: L)
- Implement Command interface
- Create commands for all operations
- Build history stack with limits
- Keyboard shortcuts (Ctrl+Z/Y)
- **Acceptance Criteria**:
  - All actions undoable
  - History bounded (max 50 steps)
  - Fast undo/redo performance

**5.2 Keyboard Shortcuts** (Effort: M)
- Implement global shortcut system
- Document all shortcuts
- Customizable key bindings
- Conflict detection
- **Acceptance Criteria**:
  - All major actions have shortcuts
  - Shortcuts configurable
  - Help overlay shows keys

**5.3 Export Functionality** (Effort: M)
- Export scene as JSON
- Export as GLB/GLTF
- Export screenshot
- Export settings panel
- **Acceptance Criteria**:
  - Multiple export formats work
  - Files valid and loadable
  - Settings saved with export

**5.4 Import Functionality** (Effort: M)
- Import JSON scenes
- Import GLB/GLTF models
- Drag-and-drop file support
- Import validation
- **Acceptance Criteria**:
  - Can load external models
  - Invalid files handled gracefully
  - Drag-drop works

**5.5 Optimization & Polish** (Effort: M)
- Implement object pooling
- Add level-of-detail (LOD) system
- Optimize render loop
- Add loading states
- **Acceptance Criteria**:
  - 60fps with 100+ objects
  - Smooth interactions
  - Professional look and feel

---

## Risk Assessment and Mitigation Strategies

### Technical Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|---------------------|
| **Performance degradation** with many objects | High | High | - Implement object pooling early<br>- Use instancing for repeated geometries<br>- Add LOD system<br>- Profile regularly with r3f-perf |
| **Three.js version** conflicts with R3F | Medium | High | - Pin exact versions in package.json<br>- Test upgrades thoroughly<br>- Monitor R3F compatibility |
| **State management** complexity with Zustand | Low | Medium | - Keep stores simple and focused<br>- Document state patterns<br>- Use selectors to prevent re-renders |
| **Transform gizmo** bugs in edge cases | High | Medium | - Extensive testing of transformations<br>- Handle gimbal lock<br>- Validate transform matrices |
| **Browser compatibility** issues | Low | Medium | - Test on Chrome, Firefox, Safari<br>- Check WebGL support<br>- Provide fallback messages |
| **Memory leaks** from Three.js objects | Medium | High | - Implement proper cleanup (dispose)<br>- Use useEffect cleanup functions<br>- Monitor with Chrome DevTools |

### Development Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|---------------------|
| **Scope creep** with feature requests | High | Medium | - Strict adherence to MVP features<br>- Maintain backlog for future features<br>- Regular scope reviews |
| **Technical debt** from rapid prototyping | Medium | Medium | - Regular refactoring sprints<br>- Code review practices<br>- Maintain TODO.md |
| **Dependency updates** breaking changes | Medium | Low | - Use lockfile (package-lock.json)<br>- Test updates in separate branch<br>- Read changelogs carefully |

---

## Success Metrics

### Technical Metrics
- ✅ **Performance**: 60fps with 50+ objects in scene
- ✅ **Build Time**: Dev server starts in <2s
- ✅ **Bundle Size**: Production bundle <500kb (gzipped)
- ✅ **Type Coverage**: 100% TypeScript (no `any` types)
- ✅ **Test Coverage**: >70% for core modules

### Functional Metrics
- ✅ **Core Features**: All Phase 3 tasks completed
- ✅ **UI Completeness**: All Phase 4 tasks completed
- ✅ **Undo/Redo**: Full history system working
- ✅ **Export/Import**: At least JSON format supported

### Developer Experience Metrics
- ✅ **Hot Reload**: Changes reflect in <1s
- ✅ **TypeScript**: No errors on build
- ✅ **Linting**: Passes all ESLint rules
- ✅ **Documentation**: All core modules documented

---

## Required Resources and Dependencies

### External Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.170.0",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.117.0",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.170.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.2",
    "vite": "^6.0.1",
    "eslint": "^9.15.0",
    "prettier": "^3.3.3",
    "vitest": "^2.1.5",
    "husky": "^9.1.7",
    "lint-staged": "^15.2.11",
    "@react-three/test-renderer": "^9.4.0",
    "r3f-perf": "^7.2.2"
  }
}
```

### Development Tools
- **Editor**: VS Code with extensions (ESLint, Prettier, TypeScript)
- **Browser**: Chrome with React DevTools + Three.js Inspector
- **Version Control**: Git with conventional commits
- **Performance**: Chrome DevTools Performance tab + r3f-perf

### Knowledge Resources
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Vite Docs](https://vitejs.dev/)

---

## Timeline Estimates

### Phase-by-Phase Breakdown

| Phase | Tasks | Effort | Est. Duration | Dependencies |
|-------|-------|--------|---------------|--------------|
| **Phase 0**: Foundation | 6 | Medium | 1-2 days | None |
| **Phase 1**: Core Architecture | 4 | Large | 2-3 days | Phase 0 |
| **Phase 2**: 3D Viewport | 5 | Large | 3-4 days | Phase 1 |
| **Phase 3**: Scene Management | 5 | X-Large | 5-7 days | Phase 2 |
| **Phase 4**: UI Components | 5 | Large | 4-5 days | Phase 3 |
| **Phase 5**: Advanced Features | 5 | Large | 4-5 days | Phase 4 |

**Total Estimated Time**: 19-26 days (full-time equivalent)

### Critical Path
```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
  ↓         ↓         ↓         ↓         ↓         ↓
 2 days   3 days   4 days   7 days   5 days   5 days
```

### Milestones
- **M1**: Project runnable (Phase 0 complete) - Day 2
- **M2**: Basic 3D scene renders (Phase 2 complete) - Day 9
- **M3**: Can manipulate objects (Phase 3 complete) - Day 16
- **M4**: Full editor UI (Phase 4 complete) - Day 21
- **M5**: Production-ready (Phase 5 complete) - Day 26

---

## Next Steps

1. **Immediate Actions** (Today):
   - Run `npm create vite@latest . -- --template react-ts`
   - Install core dependencies
   - Set up ESLint and Prettier
   - Create directory structure

2. **Short-term** (This Week):
   - Complete Phase 0 and Phase 1
   - Get basic 3D scene rendering
   - Implement camera controls

3. **Medium-term** (Next 2 Weeks):
   - Complete Phase 2 and Phase 3
   - Full scene manipulation working
   - Begin UI development

4. **Long-term** (Next Month):
   - Complete all phases
   - Production-ready editor
   - Documentation complete

---

## Appendix: Architecture Decision Records (ADRs)

### ADR-001: Use React Three Fiber over vanilla Three.js
**Decision**: Use React Three Fiber as the primary 3D rendering layer
**Rationale**:
- Declarative API aligns with React patterns
- Better integration with React state and hooks
- Automatic cleanup and memory management
- Active community and ecosystem (drei, postprocessing)
- Easier testing with @react-three/test-renderer

**Trade-offs**:
- Small learning curve for Three.js developers
- Slight abstraction overhead (negligible in practice)

---

### ADR-002: Use Zustand over Redux Toolkit
**Decision**: Use Zustand for state management
**Rationale**:
- Lightweight (<1kb) vs Redux (~8kb)
- Zero boilerplate (no actions, reducers, providers)
- Excellent TypeScript support
- Fast performance with minimal re-renders
- Simple to learn and use
- Industry trend in 2024-2025

**Trade-offs**:
- Less tooling than Redux DevTools (but integration exists)
- Smaller ecosystem (but sufficient for needs)

---

### ADR-003: Use Vite over Webpack
**Decision**: Use Vite as the build tool
**Rationale**:
- Near-instant dev server startup
- Lightning-fast HMR
- Optimized production builds (Rollup)
- First-class TypeScript support
- Industry standard in 2024-2025 (CRA deprecated)

**Trade-offs**:
- None significant for this project

---

### ADR-004: Use Vitest over Jest
**Decision**: Use Vitest for testing
**Rationale**:
- Optimized for Vite (shares config)
- Faster test execution
- Same API as Jest (easy migration)
- Better ESM support
- Modern and actively maintained

**Trade-offs**:
- Smaller ecosystem (but growing rapidly)
- Less mature (but stable enough)

---

**End of Plan**
