# Project TODO

**Last Updated**: 2025-11-13
**Current Phase**: Phase 0 - Project Foundation

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

## 🎯 Current Sprint: Phase 0 - Project Foundation (dev/active/editor-core-architecture/editor-core-architecture-plan.md)

### 0.1 Initialize Vite + React + TypeScript
- [ ] Run `npm create vite@latest . -- --template react-ts`
- [ ] Install dependencies and verify app runs
- [ ] Commit project initialization

### 0.2 Configure TypeScript
- [ ] Enable strict mode and path aliases (@/)
- [ ] Verify no TypeScript errors

### 0.3 Install Core Dependencies
- [ ] Install Three.js: `npm install three @types/three`
- [ ] Install React Three Fiber: `npm install @react-three/fiber @react-three/drei`
- [ ] Install Zustand: `npm install zustand`

### 0.4 Configure ESLint & Prettier
- [ ] Set up ESLint with React + TypeScript rules
- [ ] Configure Prettier and Git hooks (husky, lint-staged)

### 0.5 Configure Vitest
- [ ] Install Vitest and testing utilities
- [ ] Create test configuration and example test

### 0.6 Set Up Development Scripts
- [ ] Verify all npm scripts work (dev, build, test, lint)
- [ ] Test hot module replacement

---

## 📦 Backlog: Future Phases

### Phase 1: Core Architecture (2-3 days)
- [ ] Create directory structure (dev/active/editor-core-architecture/editor-core-architecture-tasks.md:1.1)
- [ ] Define TypeScript interfaces (tasks.md:1.2)
- [ ] Set up Zustand stores (tasks.md:1.3)
- [ ] Create core hooks (tasks.md:1.4)

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

- [x] Initial Git setup (2025-11-13)
- [x] Claude Code infrastructure integration (2025-11-13)
- [x] Session management strategy documented (2025-11-13)
- [x] TODO.md automation system designed (2025-11-13)
- [x] 3D Editor architecture planning complete (2025-11-13)
- [x] Technology stack selected: Vite + React + TypeScript + Three.js + R3F + Zustand (2025-11-13)

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
- Begin Phase 0: Project Foundation
- Initialize Vite + React + TypeScript project
- Install and configure core dependencies
- Set up development tooling (ESLint, Prettier, Vitest)

**Architecture Documentation:**
- Plan: dev/active/editor-core-architecture/editor-core-architecture-plan.md
- Context: dev/active/editor-core-architecture/editor-core-architecture-context.md
- Tasks: dev/active/editor-core-architecture/editor-core-architecture-tasks.md
