# Project TODO

**Last Updated**: 2025-11-17
**Current Phase**: Phase 1 - Core Architecture (✅ COMPLETED)
**Project Type**: Home Decoration 3D Editor (家装行业编辑器)

---

## 🎯 Current Sprint: Project Infrastructure

### Claude Code Setup ✅

- [x] Set up .claude/ directory structure
- [x] Configure hooks (skill-activation, post-tool-use-tracker)
- [x] Create initial skills (skill-developer, learning-documentation)
- [x] Create slash commands (/dev-docs, /save-qa)
- [x] Set up learning documentation system

### Project Organization ✅

- [x] Create dual TODO system (TODO.md + NEXT_SESSION.md)
- [x] Create project-todo-manager skill for automation
- [x] Write CONTRIBUTING.md for team onboarding
- [x] Create NEXT_SESSION.template.md for personal notes
- [x] Run `/dev-docs editor-core-architecture` (dev/active/editor-core-architecture/)
- [x] Test TODO.md auto-update with /dev-docs ✓

---

## 🎯 Next Up: Phase 2 - 3D Viewport Foundation (2-3 days)

**Pre-Phase Discussion Required**: ✅ YES - Technical approach discussion needed
**Reference**: dev/active/editor-core-architecture/home-decoration-editor-phases.md#phase-2

### Discussion Topics Before Starting Phase 2

- Camera setup (perspective vs orthographic for floor plan view?)
- Performance targets (target devices and FPS goals)
- Viewport layout (single view vs multi-view for 2D/3D)
- R3F Canvas configuration (renderer settings, shadows, tone mapping)

### Tasks (High-Level)

- [ ] Set up React Three Fiber Canvas
- [ ] Implement camera controls (OrbitControls)
- [ ] Add grid helper and coordinate axes
- [ ] Add simple geometric primitives for testing
- [ ] Set up performance monitoring (r3f-perf)
- [ ] Verify 60fps on empty scene

---

## 📦 Backlog: Future Phases (Home Decoration Editor)

**Full Planning**: dev/active/editor-core-architecture/home-decoration-editor-phases.md

### Phase 3: Wall Drawing System (5-7 days) 🏗️ CORE FEATURE

**Pre-Phase Discussion Required**: ✅ YES - Critical technical decisions needed

- [ ] 2D floor plan drawing tool (CAD-style point-and-click)
- [ ] Wall creation with thickness and height parameters
- [ ] Door and window placement on walls
- [ ] Automatic room detection (closed polygons)
- [ ] 2D to 3D conversion (floor plan → extruded walls)
- [ ] CSG operations for door/window openings

**Discussion Topics**:

- 2D drawing implementation (Canvas overlay vs pure 3D raycasting)
- Wall geometry approach (ExtrudeGeometry, CSG library choice)
- Snapping system design (grid, endpoints, angles)
- Performance with complex floor plans

### Phase 4: Material System (4-5 days) 🎨

**Pre-Phase Discussion Required**: ✅ YES

- [ ] Material library management
- [ ] Wall material application (paint, wallpaper, tiles)
- [ ] Floor material application with tiling patterns
- [ ] Ceiling design and materials
- [ ] Baseboards and crown molding

**Discussion Topics**:

- Material resource sources (textures, procedural generation)
- UV mapping strategy for complex walls
- Material library architecture

### Phase 5: Furniture & Soft Decoration (5-7 days) 🛋️

**Pre-Phase Discussion Required**: ✅ YES

- [ ] GLTF/GLB model import system
- [ ] Furniture library with categories
- [ ] Furniture placement with transform controls
- [ ] Smart snapping (align to walls, other furniture)
- [ ] Furniture property editing (size, material, color)

**Discussion Topics**:

- Model sources (Sketchfab workflow, licensing)
- Model optimization strategy
- Material/color switching approach
- Snapping and collision detection

### Phase 6: Lighting, Decoration & Export (4-5 days) ✨

**Pre-Phase Discussion Required**: ✅ YES

- [ ] Dynamic lighting system
- [ ] Decorative objects (lamps, curtains, artwork, plants)
- [ ] Day/night scene toggle
- [ ] 360° panorama view
- [ ] Scene export (GLTF, screenshots)
- [ ] Project save/load

**Discussion Topics**:

- Lighting strategy (real-time vs baked)
- Panorama implementation
- Export format and project file structure

---

## ✅ Recently Completed

### Phase 1: Core Architecture (2025-11-17) ✅

**Duration**: 2 days (started 2025-11-15, completed 2025-11-17)

- [x] Created project directory structure (src/core/, src/components/, src/store/, src/hooks/, src/types/, src/utils/)
- [x] Defined TypeScript interfaces (scene.ts, editor.ts, transform.ts, common.ts)
- [x] Set up Zustand stores (sceneStore, selectionStore, uiStore, historyStore)
- [x] Created custom React hooks (useSceneObject, useSelection, useTransform, useHistory)
- [x] Wrote comprehensive unit tests (129 tests passing)
- [x] Added barrel exports (index.ts) for all modules
- [x] **Result**: Solid architectural foundation with full type safety, 129/130 tests passing

### Phase 0: Project Foundation (2025-11-13) ✅

- [x] Task 0.1: Initialize Vite + React + TypeScript (commit: 789f31e)
- [x] Task 0.2: Configure TypeScript strict mode + path aliases (@/)
- [x] Task 0.3: Install Three.js 0.181, React Three Fiber 9.4, Zustand 5.0
- [x] Task 0.4: Configure ESLint + Prettier + Git hooks (husky, lint-staged)
- [x] Task 0.5: Configure Vitest 3.2 + Testing Library
- [x] Task 0.6: Verify development environment (build, dev server, tests all passing)
- [x] **Result**: Complete development environment ready, 194KB production build, 85ms dev startup

### Infrastructure Setup (2025-11-13)

- [x] Initial Git setup
- [x] Claude Code infrastructure integration
- [x] Session management strategy documented
- [x] TODO.md automation system designed
- [x] 3D Editor architecture planning complete (6 phases, 75 tasks)
- [x] Technology stack selected and validated

---

## 📝 Notes

**About This File:**

- This file is **automatically maintained** by Claude Code via the `project-todo-manager` skill
- Tasks are extracted from `dev/docs/*.md` when using `/dev-docs` command
- Progress is updated when features are completed
- **Do not manually edit** - let Claude manage this file

**For Personal Session Planning:**

- Use `dev/NEXT_SESSION.md` (not tracked in Git)
- Copy from `dev/NEXT_SESSION.template.md` to get started

**Next Session Focus:**

- **Pre-Phase 2 Discussion**: Technical approach for 3D viewport setup
- Begin Phase 2: 3D Viewport Foundation
- Set up React Three Fiber canvas
- Implement camera controls
- Add grid and performance monitoring

**Architecture Documentation:**

- **Home Decoration Editor Phases**: dev/active/editor-core-architecture/home-decoration-editor-phases.md
- Original Plan: dev/active/editor-core-architecture/editor-core-architecture-plan.md
- Context: dev/active/editor-core-architecture/editor-core-architecture-context.md
- Original Tasks: dev/active/editor-core-architecture/editor-core-architecture-tasks.md
- **Feature Requirements**: features.md
