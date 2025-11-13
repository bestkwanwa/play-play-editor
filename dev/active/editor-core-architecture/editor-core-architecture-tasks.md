# Editor Core Architecture - Task Checklist

**Last Updated**: 2025-11-13
**Related Plan**: editor-core-architecture-plan.md
**Current Phase**: Phase 0 - Project Foundation

---

## Phase 0: Project Foundation (1-2 days)

### 0.1 Initialize Vite + React + TypeScript [S]
- [ ] Run `npm create vite@latest . -- --template react-ts`
- [ ] Verify package.json created
- [ ] Verify tsconfig.json created
- [ ] Run `npm install`
- [ ] Run `npm run dev` and verify app loads
- [ ] Commit: "chore: initialize Vite + React + TypeScript project"

### 0.2 Configure TypeScript [S]
- [ ] Enable `"strict": true` in tsconfig.json
- [ ] Add path alias `@/` → `src/`
- [ ] Configure `moduleResolution: "bundler"`
- [ ] Add `skipLibCheck: true` for faster builds
- [ ] Verify no TypeScript errors
- [ ] Commit: "chore: configure TypeScript strict mode and aliases"

### 0.3 Install Core Dependencies [S]
- [ ] Run `npm install three @types/three`
- [ ] Run `npm install @react-three/fiber @react-three/drei`
- [ ] Run `npm install zustand`
- [ ] Verify all packages in package.json
- [ ] Run `npm run dev` to test
- [ ] Commit: "chore: install core dependencies (Three.js, R3F, Zustand)"

### 0.4 Configure ESLint & Prettier [S]
- [ ] Install ESLint: `npm install -D eslint`
- [ ] Configure ESLint for React + TypeScript
- [ ] Install Prettier: `npm install -D prettier`
- [ ] Create `.prettierrc` config
- [ ] Install lint-staged and husky: `npm install -D lint-staged husky`
- [ ] Set up pre-commit hooks
- [ ] Run `npm run lint` and fix errors
- [ ] Commit: "chore: configure ESLint, Prettier, and Git hooks"

### 0.5 Configure Vitest [M]
- [ ] Install Vitest: `npm install -D vitest @vitest/ui`
- [ ] Install testing utilities: `npm install -D @testing-library/react @testing-library/jest-dom`
- [ ] Create `vitest.config.ts`
- [ ] Create example test file
- [ ] Add test script to package.json
- [ ] Run `npm run test` and verify passes
- [ ] Commit: "chore: configure Vitest testing framework"

### 0.6 Set Up Development Scripts [S]
- [ ] Verify `npm run dev` works
- [ ] Verify `npm run build` works
- [ ] Verify `npm run preview` works
- [ ] Add `npm run lint` script
- [ ] Add `npm run format` script
- [ ] Test HMR (edit component, see instant update)
- [ ] Commit: "chore: verify development scripts and HMR"

---

## Phase 1: Core Architecture (2-3 days)

### 1.1 Create Directory Structure [S]
- [ ] Create `src/core/` directory
- [ ] Create `src/components/` directory
- [ ] Create `src/store/` directory
- [ ] Create `src/hooks/` directory
- [ ] Create `src/types/` directory
- [ ] Create `src/utils/` directory
- [ ] Create subdirectories per architecture plan
- [ ] Add `README.md` to each major module
- [ ] Add `index.ts` barrel exports
- [ ] Commit: "chore: create project directory structure"

### 1.2 Define TypeScript Interfaces [M]
- [ ] Create `src/types/scene.ts` (SceneObject, SceneNode)
- [ ] Create `src/types/editor.ts` (EditorState, ViewportState)
- [ ] Create `src/types/transform.ts` (Position, Rotation, Scale)
- [ ] Create `src/types/common.ts` (UUID, Serializable)
- [ ] Document all types with JSDoc comments
- [ ] Export all types from `src/types/index.ts`
- [ ] Verify no `any` types used
- [ ] Commit: "feat: define core TypeScript interfaces"

### 1.3 Set Up Zustand Stores [M]
- [ ] Create `src/store/sceneStore.ts`
- [ ] Create `src/store/selectionStore.ts`
- [ ] Create `src/store/uiStore.ts`
- [ ] Create `src/store/historyStore.ts`
- [ ] Add TypeScript types to all stores
- [ ] Add DevTools integration
- [ ] Write unit tests for stores
- [ ] Commit: "feat: create Zustand state management stores"

### 1.4 Create Core Hooks [M]
- [ ] Create `src/hooks/useSceneObject.ts`
- [ ] Create `src/hooks/useSelection.ts`
- [ ] Create `src/hooks/useTransform.ts`
- [ ] Create `src/hooks/useHistory.ts`
- [ ] Add proper memoization (useMemo, useCallback)
- [ ] Add TypeScript types
- [ ] Write tests for hooks
- [ ] Commit: "feat: create custom React hooks"

---

## Phase 2: 3D Viewport Foundation (3-4 days)

### 2.1 Create Viewport Component [M]
- [ ] Create `src/components/viewport/Viewport.tsx`
- [ ] Set up React Three Fiber Canvas
- [ ] Configure renderer (shadows, tone mapping)
- [ ] Add ambient light
- [ ] Add directional light
- [ ] Make viewport fill available space
- [ ] Verify 60fps on empty scene
- [ ] Commit: "feat: create 3D viewport with lighting"

### 2.2 Implement Camera Controls [M]
- [ ] Add OrbitControls from @react-three/drei
- [ ] Set camera position and FOV
- [ ] Configure near/far planes
- [ ] Add camera reset function
- [ ] Bind keyboard shortcuts (R for reset)
- [ ] Save camera state to store
- [ ] Commit: "feat: implement camera controls and shortcuts"

### 2.3 Create Grid and Axes [S]
- [ ] Add grid helper to scene
- [ ] Add axes helper (XYZ indicators)
- [ ] Make grid toggle-able from UI
- [ ] Align grid to world origin
- [ ] Commit: "feat: add grid and axes helpers"

### 2.4 Implement Basic Scene Objects [M]
- [ ] Create Cube primitive component
- [ ] Create Sphere primitive component
- [ ] Create Plane primitive component
- [ ] Add object wrapper with common props
- [ ] Add objects to scene via button
- [ ] Test color, position, scale props
- [ ] Commit: "feat: implement basic 3D primitives"

### 2.5 Performance Monitoring [S]
- [ ] Install r3f-perf: `npm install r3f-perf`
- [ ] Add Perf component to viewport
- [ ] Add stats overlay (FPS, triangles, calls)
- [ ] Set performance warning thresholds
- [ ] Verify stats accuracy
- [ ] Commit: "feat: add performance monitoring with r3f-perf"

---

## Phase 3: Scene Management (5-7 days)

### 3.1 Scene Object Manager [L]
- [ ] Create `src/core/scene/SceneManager.ts`
- [ ] Implement object creation system
- [ ] Implement object hierarchy (parent/child)
- [ ] Implement object deletion with cleanup
- [ ] Implement object duplication
- [ ] Add UUID generation for objects
- [ ] Write tests for all operations
- [ ] Commit: "feat: implement scene object manager"

### 3.2 Object Properties System [M]
- [ ] Add position properties (x, y, z)
- [ ] Add rotation properties (x, y, z)
- [ ] Add scale properties (x, y, z)
- [ ] Add material properties (color, roughness, metalness)
- [ ] Add geometry properties (dimensions)
- [ ] Add name and metadata
- [ ] Test property updates
- [ ] Commit: "feat: implement object properties system"

### 3.3 Selection System [L]
- [ ] Create `src/core/selection/SelectionManager.ts`
- [ ] Implement raycaster for mouse picking
- [ ] Implement single-click selection
- [ ] Implement multi-select (Shift/Ctrl)
- [ ] Add bounding box visualization
- [ ] Add selection outline shader
- [ ] Test selection edge cases
- [ ] Commit: "feat: implement object selection system"

### 3.4 Transform System [XL]
- [ ] Create `src/core/transform/TransformGizmo.ts`
- [ ] Implement translate gizmo
- [ ] Implement rotate gizmo
- [ ] Implement scale gizmo
- [ ] Handle local vs world space toggle
- [ ] Implement snap to grid
- [ ] Add keyboard shortcuts (G/R/S for tools)
- [ ] Test transform accuracy
- [ ] Commit: "feat: implement transform gizmo system"

### 3.5 Scene Serialization [M]
- [ ] Create `src/utils/serialization.ts`
- [ ] Implement scene to JSON serialization
- [ ] Implement JSON to scene deserialization
- [ ] Handle object references and IDs
- [ ] Add validation for scene data
- [ ] Test save/load cycle
- [ ] Commit: "feat: implement scene serialization"

---

## Phase 4: UI Components (4-5 days)

### 4.1 Hierarchy Panel [M]
- [ ] Create `src/components/panels/HierarchyPanel.tsx`
- [ ] Implement tree view of scene objects
- [ ] Add drag-and-drop reordering
- [ ] Add visibility toggles
- [ ] Add context menu (delete, duplicate)
- [ ] Test hierarchy updates
- [ ] Commit: "feat: implement hierarchy panel"

### 4.2 Properties Panel [M]
- [ ] Create `src/components/panels/PropertiesPanel.tsx`
- [ ] Display selected object properties
- [ ] Add input fields for transform values
- [ ] Add material editor controls
- [ ] Add geometry settings
- [ ] Test property changes apply immediately
- [ ] Commit: "feat: implement properties panel"

### 4.3 Toolbar [M]
- [ ] Create `src/components/toolbar/Toolbar.tsx`
- [ ] Add tool selection buttons (select, move, rotate, scale)
- [ ] Add "Add Object" dropdown menu
- [ ] Add view option toggles
- [ ] Add undo/redo buttons
- [ ] Add keyboard shortcut hints
- [ ] Commit: "feat: implement editor toolbar"

### 4.4 Top Menu Bar [S]
- [ ] Create `src/components/menu/MenuBar.tsx`
- [ ] Add File menu (new, open, save)
- [ ] Add Edit menu (undo, redo, delete)
- [ ] Add View menu (grid, axes, stats)
- [ ] Add Help menu
- [ ] Test all menu actions
- [ ] Commit: "feat: implement top menu bar"

### 4.5 Responsive Layout [M]
- [ ] Create `src/components/layout/EditorLayout.tsx`
- [ ] Implement resizable panels
- [ ] Add collapsible sidebars
- [ ] Add full-screen viewport mode
- [ ] Save layout state to localStorage
- [ ] Test on different screen sizes
- [ ] Commit: "feat: implement responsive layout system"

---

## Phase 5: History & Advanced Features (4-5 days)

### 5.1 Command Pattern for Undo/Redo [L]
- [ ] Create `src/core/history/Command.ts` interface
- [ ] Implement AddObjectCommand
- [ ] Implement DeleteObjectCommand
- [ ] Implement TransformCommand
- [ ] Create `src/core/history/HistoryManager.ts`
- [ ] Implement history stack with max limit (50)
- [ ] Add Ctrl+Z/Y keyboard shortcuts
- [ ] Test undo/redo performance
- [ ] Commit: "feat: implement undo/redo system"

### 5.2 Keyboard Shortcuts [M]
- [ ] Create `src/utils/shortcuts.ts`
- [ ] Implement global shortcut system
- [ ] Document all shortcuts
- [ ] Add customizable key bindings
- [ ] Add conflict detection
- [ ] Create shortcut help overlay (?)
- [ ] Commit: "feat: implement keyboard shortcut system"

### 5.3 Export Functionality [M]
- [ ] Create `src/utils/export.ts`
- [ ] Implement export as JSON
- [ ] Implement export as GLB/GLTF
- [ ] Implement export screenshot
- [ ] Create export settings panel
- [ ] Test exported files load correctly
- [ ] Commit: "feat: implement export functionality"

### 5.4 Import Functionality [M]
- [ ] Create `src/utils/import.ts`
- [ ] Implement import JSON scenes
- [ ] Implement import GLB/GLTF models
- [ ] Add drag-and-drop file support
- [ ] Add file validation
- [ ] Handle invalid files gracefully
- [ ] Commit: "feat: implement import functionality"

### 5.5 Optimization & Polish [M]
- [ ] Implement object pooling for geometries
- [ ] Add LOD system for distant objects
- [ ] Optimize render loop
- [ ] Add loading states for heavy operations
- [ ] Test with 100+ objects
- [ ] Profile and fix performance bottlenecks
- [ ] Commit: "perf: optimize editor performance"

---

## Verification Checklist

### After Phase 0
- [ ] Dev server starts in <2s
- [ ] HMR updates in <1s
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Tests run and pass

### After Phase 2
- [ ] 3D scene renders at 60fps
- [ ] Camera controls smooth
- [ ] Can add basic objects to scene
- [ ] Performance stats visible

### After Phase 3
- [ ] Can select objects by clicking
- [ ] Can transform objects with gizmo
- [ ] Can save/load scenes
- [ ] Parent-child relationships work

### After Phase 4
- [ ] All UI panels functional
- [ ] Layout resizable and persistent
- [ ] Hierarchy matches scene
- [ ] Properties panel updates live

### After Phase 5
- [ ] Undo/redo works for all actions
- [ ] Can export to GLB format
- [ ] Can import GLB models
- [ ] Maintains 60fps with 100+ objects

---

## Notes

- Mark tasks as completed when fully done (no bugs, tested)
- Create follow-up tasks if issues discovered
- Update TODO.md when completing major phases
- Commit frequently with descriptive messages

---

**Total Tasks**: 75 across 6 phases
**Estimated Duration**: 19-26 days (full-time)
**Current Status**: Ready to begin Phase 0

---

**End of Task Checklist**
