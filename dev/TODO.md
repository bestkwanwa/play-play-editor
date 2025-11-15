# Project TODO

**Last Updated**: 2025-11-13
**Current Phase**: Phase 1 - Core Architecture

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

## 🎯 Current Sprint: Phase 1 - Core Architecture (2-3 days)

**Reference**: dev/active/editor-core-architecture/editor-core-architecture-tasks.md

### 1.1 Create Directory Structure

- [ ] Create all core directories (src/core/, src/components/, etc.)
- [ ] Add index.ts barrel exports
- [ ] Create README.md for each major module

### 1.2 Define TypeScript Interfaces

- [ ] Create src/types/scene.ts (SceneObject, SceneNode)
- [ ] Create src/types/editor.ts (EditorState, ViewportState)
- [ ] Create src/types/transform.ts (Position, Rotation, Scale)
- [ ] Create src/types/common.ts (UUID, Serializable)
- [ ] Export all types from src/types/index.ts

### 1.3 Set Up Zustand Stores

- [ ] Create src/store/sceneStore.ts
- [ ] Create src/store/selectionStore.ts
- [ ] Create src/store/uiStore.ts
- [ ] Create src/store/historyStore.ts
- [ ] Write unit tests for stores

### 1.4 Create Core Hooks

- [ ] Create src/hooks/useSceneObject.ts
- [ ] Create src/hooks/useSelection.ts
- [ ] Create src/hooks/useTransform.ts
- [ ] Create src/hooks/useHistory.ts

---

## 📦 Backlog: Future Phases

### Phase 2: 3D Viewport Foundation (3-4 days)

- [ ] Create viewport component with R3F Canvas (tasks.md:2.1)
- [ ] Implement camera controls (tasks.md:2.2)
- [ ] Add grid and axes helpers (tasks.md:2.3)
- [ ] Implement basic 3D primitives (tasks.md:2.4)
- [ ] Add performance monitoring (tasks.md:2.5)

### Phase 3: Scene Management (5-7 days)

- [ ] Scene object manager (tasks.md:3.1)
- [ ] Object properties system (tasks.md:3.2)
- [ ] Selection system (tasks.md:3.3)
- [ ] Transform gizmo system (tasks.md:3.4)
- [ ] Scene serialization (tasks.md:3.5)

### Phase 4: UI Components (4-5 days)

- [ ] Hierarchy panel (tasks.md:4.1)
- [ ] Properties panel (tasks.md:4.2)
- [ ] Toolbar (tasks.md:4.3)
- [ ] Top menu bar (tasks.md:4.4)
- [ ] Responsive layout (tasks.md:4.5)

### Phase 5: History & Advanced Features (4-5 days)

- [ ] Undo/redo system (tasks.md:5.1)
- [ ] Keyboard shortcuts (tasks.md:5.2)
- [ ] Export functionality (tasks.md:5.3)
- [ ] Import functionality (tasks.md:5.4)
- [ ] Optimization & polish (tasks.md:5.5)

---

## ✅ Recently Completed

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

- Begin Phase 1: Core Architecture
- Create project directory structure
- Define TypeScript type system
- Set up Zustand state management stores
- Create custom React hooks

**Architecture Documentation:**

- Plan: dev/active/editor-core-architecture/editor-core-architecture-plan.md
- Context: dev/active/editor-core-architecture/editor-core-architecture-context.md
- Tasks: dev/active/editor-core-architecture/editor-core-architecture-tasks.md
