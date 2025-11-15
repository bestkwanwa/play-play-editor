# Git Workflow Guide

**Project**: play-play-editor
**Strategy**: Git Flow + Phase-Based Naming
**Last Updated**: 2025-11-15

---

## Table of Contents

1. [Overview](#overview)
2. [Branch Strategy](#branch-strategy)
3. [Branch Naming Convention](#branch-naming-convention)
4. [Complete Workflow](#complete-workflow)
5. [Common Scenarios](#common-scenarios)
6. [Integration with TODO.md](#integration-with-todomd)
7. [Guardrails and Automation](#guardrails-and-automation)
8. [FAQ](#faq)
9. [Quick Reference](#quick-reference)

---

## Overview

### Why This Workflow?

This project uses a **hybrid Git Flow + Phase-Based naming** strategy that combines:

✅ **Git Flow's multi-developer collaboration strength**
✅ **Phase-based naming for project context visibility**
✅ **AI-assisted automation and guardrails**

### Key Principles

1. **Don't Memorize, Let AI Guide** - Claude will help you follow the workflow automatically
2. **Phase Visibility** - Branch names reflect project phases (Phase 1, Phase 2, etc.)
3. **Documentation Alignment** - Git structure mirrors `dev/TODO.md` and `dev/active/` docs
4. **Safe Collaboration** - Multiple developers can work in parallel without conflicts

### The Invisible Guardian

You don't need to remember all the rules. **Claude acts as an invisible guardian**:

- 🤖 **Automates** correct operations (creating branches, merging, tagging)
- 🛡️ **Blocks** dangerous operations (committing to main, wrong branch names)
- 📚 **Guides** when you're unsure (points to this documentation)

---

## Branch Strategy

### Branch Types and Lifespan

```
main (permanent)
  │
  └── develop (permanent)
       │
       ├── feature/phase-{N}-{name} (temporary, Phase-level)
       │     ├── feature/phase-{N}-{task} (temporary, task-level)
       │     └── feature/phase-{N}-{task} (temporary, task-level)
       │
       ├── release/v{version}-phase{N} (temporary)
       │
       └── hotfix/v{version}-{description} (temporary)
```

### Branch Descriptions

| Branch Type                   | Purpose                                  | Lifetime             | Example                             |
| ----------------------------- | ---------------------------------------- | -------------------- | ----------------------------------- |
| `main`                        | Production-ready code only               | Permanent            | `main`                              |
| `develop`                     | Development mainline, integration branch | Permanent            | `develop`                           |
| `feature/phase-{N}-{name}`    | Phase-level feature development          | Until Phase complete | `feature/phase-1-core-architecture` |
| `feature/phase-{N}-{task}`    | Specific task within a Phase             | Until task complete  | `feature/phase-1-typescript-types`  |
| `release/v{version}-phase{N}` | Release preparation                      | Until released       | `release/v0.1.0-phase1`             |
| `hotfix/v{version}-{desc}`    | Emergency production fixes               | Until fixed          | `hotfix/v0.1.1-camera-crash`        |

### Why Two Permanent Branches?

**`main`**:

- Always deployable
- Reflects production state
- Only receives merges from `release` or `hotfix` branches
- Tagged with version numbers

**`develop`**:

- Integration branch for ongoing development
- May be unstable during active development
- All feature branches start from here
- All feature branches merge back here first

**Why not commit directly to `main`?**
Because `main` represents production. By using `develop` as a buffer, we can:

- Test integration before releasing
- Keep `main` always stable
- Allow hotfixes without disrupting ongoing development

---

## Branch Naming Convention

### Format Rules

```bash
# Feature branches (Phase-level)
feature/phase-{N}-{phase-name}
Example: feature/phase-1-core-architecture

# Feature branches (Task-level)
feature/phase-{N}-{task-description}
Example: feature/phase-1-typescript-types

# Release branches
release/v{MAJOR}.{MINOR}.{PATCH}-phase{N}
Example: release/v0.1.0-phase1

# Hotfix branches
hotfix/v{MAJOR}.{MINOR}.{PATCH}-{description}
Example: hotfix/v0.1.1-fix-camera-crash
```

### Naming Guidelines

✅ **Good Examples**:

```
feature/phase-1-core-architecture
feature/phase-1-typescript-types
feature/phase-1-zustand-stores
feature/phase-2-3d-viewport
feature/phase-2-camera-controls
release/v0.1.0-phase1
hotfix/v1.0.1-security-patch
```

❌ **Bad Examples**:

```
my-feature              # Missing phase context
fix-bug                 # Missing phase number
new-stuff               # Not descriptive
phase1                  # Missing feature/ prefix
feature-auth            # Missing phase number
```

### Why Phase Numbers in Branch Names?

1. **Context at a glance**: `git branch` shows project progress
2. **AI-friendly**: Claude knows which `dev/active/phase-{N}-*/` docs to read
3. **Documentation alignment**: Matches `dev/TODO.md` structure
4. **Clear project timeline**: Anyone can see which Phase we're on

---

## Complete Workflow

### Phase 1: Starting a New Phase

**Scenario**: Beginning Phase 1 - Core Architecture

```bash
# 1. Ensure you're on develop and it's up to date
git checkout develop
git pull origin develop

# 2. Create Phase branch
git checkout -b feature/phase-1-core-architecture

# 3. Claude automatically:
#    - Updates TODO.md to mark Phase 1 as "Current Sprint"
#    - Creates corresponding task tracking

# 4. Push to remote
git push -u origin feature/phase-1-core-architecture
```

**AI Automation**: When you say "start Phase 1", Claude will:

- ✅ Run the above commands automatically
- ✅ Update `dev/TODO.md`
- ✅ Remind you of the Phase 1 tasks from `dev/active/phase-1-*/tasks.md`

---

### Phase 2: Working on Phase Tasks

**Scenario**: Multiple developers working on Phase 1 tasks in parallel

#### Developer A: TypeScript Types

```bash
# From Phase 1 branch, create task branch
git checkout feature/phase-1-core-architecture
git checkout -b feature/phase-1-typescript-types

# Do your work
# Edit src/types/scene.ts, src/types/editor.ts, etc.

# Commit frequently
git add src/types/
git commit -m "feat(phase-1): add Scene and Editor type definitions"

# Push to remote
git push -u origin feature/phase-1-typescript-types
```

#### Developer B: Zustand Stores (in parallel)

```bash
# From Phase 1 branch, create another task branch
git checkout feature/phase-1-core-architecture
git checkout -b feature/phase-1-zustand-stores

# Do your work
# Edit src/store/sceneStore.ts, etc.

# Commit
git add src/store/
git commit -m "feat(phase-1): implement sceneStore and selectionStore"

# Push to remote
git push -u origin feature/phase-1-zustand-stores
```

**AI Automation**: Claude tracks both developers' progress in TODO.md independently.

---

### Phase 3: Completing a Task

**Scenario**: Developer A finished TypeScript types

```bash
# 1. Ensure task branch is up to date
git checkout feature/phase-1-typescript-types
git pull origin feature/phase-1-typescript-types

# 2. Switch to Phase branch and update it
git checkout feature/phase-1-core-architecture
git pull origin feature/phase-1-core-architecture

# 3. Merge task into Phase branch (preserve history)
git merge feature/phase-1-typescript-types --no-ff -m "chore(phase-1): merge typescript types implementation"

# 4. Push Phase branch
git push origin feature/phase-1-core-architecture

# 5. Delete task branch (cleanup)
git branch -d feature/phase-1-typescript-types
git push origin --delete feature/phase-1-typescript-types
```

**AI Automation**: When you say "task completed", Claude will:

- ✅ Ask: "Ready to merge into feature/phase-1-core-architecture?"
- ✅ Run the merge with `--no-ff` automatically
- ✅ Update TODO.md: `- [x] Create TypeScript interfaces`
- ✅ Delete the task branch
- ✅ Inform you: "Ready for next task!"

---

### Phase 4: Completing a Phase

**Scenario**: All Phase 1 tasks are done

```bash
# 1. Ensure Phase branch is clean and up to date
git checkout feature/phase-1-core-architecture
git pull origin feature/phase-1-core-architecture
# Verify all task branches are merged

# 2. Merge Phase into develop
git checkout develop
git pull origin develop
git merge feature/phase-1-core-architecture --no-ff -m "feat: complete Phase 1 - Core Architecture"
git push origin develop

# 3. Create release branch
git checkout -b release/v0.1.0-phase1

# 4. Prepare release (update version, CHANGELOG, etc.)
# Edit package.json: "version": "0.1.0"
# Update CHANGELOG.md with Phase 1 achievements
git commit -am "chore(release): prepare v0.1.0-phase1"

# 5. Merge release to main
git checkout main
git pull origin main
git merge release/v0.1.0-phase1 --no-ff -m "release: v0.1.0 - Phase 1 complete"
git tag -a v0.1.0 -m "Phase 1: Core Architecture complete"
git push origin main --tags

# 6. Merge release back to develop (to get version updates)
git checkout develop
git merge release/v0.1.0-phase1 --no-ff
git push origin develop

# 7. Cleanup
git branch -d release/v0.1.0-phase1
git branch -d feature/phase-1-core-architecture
git push origin --delete release/v0.1.0-phase1
git push origin --delete feature/phase-1-core-architecture
```

**AI Automation**: When all Phase 1 tasks are completed, Claude will:

- 🎉 Detect: "Phase 1 complete! All tasks done."
- 📋 Guide through release process step-by-step
- ✅ Update TODO.md: Move Phase 1 to "Recently Completed"
- ✅ Update "Current Phase" to Phase 2
- 🏷️ Create tag `v0.1.0` with Phase 1 summary
- 📝 Suggest CHANGELOG entries

---

### Phase 5: Hotfixes (Emergency Production Fixes)

**Scenario**: Critical bug found in production v0.1.0

```bash
# 1. Create hotfix branch from main (not develop!)
git checkout main
git pull origin main
git checkout -b hotfix/v0.1.1-fix-camera-crash

# 2. Fix the bug
# Edit src/components/Camera.tsx
git commit -am "fix: prevent camera crash on null scene"

# 3. Merge to main
git checkout main
git merge hotfix/v0.1.1-fix-camera-crash --no-ff
git tag -a v0.1.1 -m "Hotfix: camera crash fix"
git push origin main --tags

# 4. Merge to develop (so ongoing work gets the fix)
git checkout develop
git merge hotfix/v0.1.1-fix-camera-crash --no-ff
git push origin develop

# 5. Cleanup
git branch -d hotfix/v0.1.1-fix-camera-crash
```

**AI Automation**: When you say "critical bug in production", Claude will:

- 🚨 Guide you through hotfix process
- ✅ Ensure fix goes to both `main` and `develop`
- ✅ Increment patch version (0.1.0 → 0.1.1)
- 📝 Update CHANGELOG.md

---

## Common Scenarios

### Scenario 1: "I want to start working on Phase 2"

**You say**: "Start Phase 2"

**Claude does**:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/phase-2-3d-viewport
git push -u origin feature/phase-2-3d-viewport
```

**Claude says**:

> ✅ Created `feature/phase-2-3d-viewport` from develop
> 📋 Updated TODO.md: Phase 2 → Current Sprint
> 📖 Phase 2 tasks: dev/active/editor-core-architecture/editor-core-architecture-tasks.md#phase-2

---

### Scenario 2: "I'm working on task 2.1 - Create viewport component"

**You say**: "Work on viewport component"

**Claude does**:

```bash
git checkout feature/phase-2-3d-viewport
git checkout -b feature/phase-2-viewport-component
```

**Claude says**:

> ✅ Created `feature/phase-2-viewport-component`
> 💡 When done, I'll merge it back to `feature/phase-2-3d-viewport`
> 📝 Tracking in TODO.md

---

### Scenario 3: "I accidentally committed to main"

**You do**:

```bash
git checkout main
# Make some changes
git add .
git commit -m "oops"
```

**Claude detects and blocks**:

> ⛔ **BLOCKED**: Direct commits to `main` are not allowed.
>
> The `main` branch is for production-ready code only.
>
> **What to do**:
>
> 1. Undo this commit: `git reset HEAD~1`
> 2. Switch to proper branch: `git checkout develop`
> 3. Create feature branch: `git checkout -b feature/phase-{N}-{name}`
>
> Should I fix this for you? [Yes/No]
>
> 📖 Learn why: dev/GIT_WORKFLOW.md#why-not-commit-to-main

---

### Scenario 4: "I want to create a branch but forgot the naming convention"

**You say**: "Create a new branch for authentication"

**Claude asks**:

> Which Phase does authentication belong to?
>
> - Phase 1: Core Architecture
> - Phase 2: 3D Viewport
> - Phase 3: Scene Management
> - Other?

**You answer**: "Phase 3"

**Claude does**:

```bash
git checkout develop
git checkout -b feature/phase-3-user-authentication
```

**Claude says**:

> ✅ Created `feature/phase-3-user-authentication`
> 📝 Branch naming: feature/phase-{N}-{description}
> 📖 See: dev/GIT_WORKFLOW.md#branch-naming-convention

---

### Scenario 5: "Multiple people working on the same Phase"

**Setup**:

- Alice: `feature/phase-1-typescript-types` (from `feature/phase-1-core-architecture`)
- Bob: `feature/phase-1-zustand-stores` (from `feature/phase-1-core-architecture`)
- Charlie: `feature/phase-1-custom-hooks` (from `feature/phase-1-core-architecture`)

**Workflow**:

1. **Alice finishes first**:
   - Merges `feature/phase-1-typescript-types` → `feature/phase-1-core-architecture`
   - `feature/phase-1-core-architecture` now has TypeScript types

2. **Bob needs Alice's types**:

   ```bash
   git checkout feature/phase-1-zustand-stores
   git merge feature/phase-1-core-architecture  # Get Alice's types
   # Continue working with types available
   ```

3. **Bob finishes**:
   - Merges `feature/phase-1-zustand-stores` → `feature/phase-1-core-architecture`

4. **Charlie finishes**:
   - Merges `feature/phase-1-custom-hooks` → `feature/phase-1-core-architecture`

5. **Phase 1 complete**:
   - `feature/phase-1-core-architecture` has all three tasks
   - Ready to merge to `develop` → `release` → `main`

---

## Integration with TODO.md

### Automatic Synchronization

The Git workflow is tightly integrated with `dev/TODO.md`:

| Git Event           | TODO.md Update                     | Who Does It        |
| ------------------- | ---------------------------------- | ------------------ |
| Create Phase branch | Add Phase to "Current Sprint"      | Claude (automatic) |
| Complete task       | Mark task `[x]`                    | Claude (automatic) |
| Complete Phase      | Move Phase to "Recently Completed" | Claude (automatic) |
| Create release tag  | Update "Current Phase"             | Claude (automatic) |

### Example Sync

**Git operations**:

```bash
git checkout -b feature/phase-1-core-architecture
# ... work on tasks ...
git commit -m "feat(phase-1): implement stores"
# ... complete all tasks ...
git tag v0.1.0
```

**TODO.md automatically updates**:

```markdown
## 🎯 Current Sprint: Phase 1 - Core Architecture

### 1.1 Create Directory Structure

- [x] Create all core directories (src/core/, src/components/, etc.)
- [x] Add index.ts barrel exports
- [x] Create README.md for each major module

### 1.2 Define TypeScript Interfaces

- [x] Create src/types/scene.ts (SceneObject, SceneNode)
- [x] Create src/types/editor.ts (EditorState, ViewportState)
      ...

## ✅ Recently Completed

### Phase 1: Core Architecture (2025-11-15) ✅

- [x] All Phase 1 tasks completed (commit: a1b2c3d, tag: v0.1.0)
```

### Reading TODO.md to Guide Git Operations

Claude uses TODO.md to guide you:

```
You: "What should I work on next?"

Claude (reads TODO.md):
📋 Current Sprint: Phase 1 - Core Architecture

Pending tasks:
- [ ] Create src/store/sceneStore.ts
- [ ] Create src/store/selectionStore.ts

Would you like to:
1. Work on sceneStore (create branch: feature/phase-1-scene-store)
2. Work on selectionStore (create branch: feature/phase-1-selection-store)
3. Something else?
```

---

## Guardrails and Automation

### What Claude Blocks (Guardrails)

| Dangerous Operation           | Detection                                   | Response                       |
| ----------------------------- | ------------------------------------------- | ------------------------------ |
| ❌ Commit to `main`           | Current branch = `main` + git commit        | Block + guide to develop       |
| ❌ Create feature from `main` | On `main` + git checkout -b feature/        | Block + auto-switch to develop |
| ❌ Wrong branch name          | Branch name doesn't match pattern           | Block + show correct format    |
| ❌ Merge without `--no-ff`    | git merge without flag (on public branches) | Warn + suggest `--no-ff`       |
| ⚠️ Rebase public branch       | git rebase on main/develop/Phase branches   | Block + explain danger         |
| ❌ Force push to main/develop | git push --force origin main                | Block + warn about dangers     |
| ❌ Delete main/develop        | git branch -d main                          | Block + prevent disaster       |

### What Claude Automates (No Permission Needed)

| Situation               | Claude's Action                   | Example                                                           |
| ----------------------- | --------------------------------- | ----------------------------------------------------------------- |
| ✅ Start Phase          | Create Phase branch from develop  | "Start Phase 1" → creates `feature/phase-1-core-architecture`     |
| ✅ Sync personal branch | Rebase to latest Phase branch     | "Update my branch" → git rebase feature/phase-1-core-architecture |
| ✅ Complete task        | Merge task branch to Phase branch | "Task done" → merges + updates TODO.md                            |
| ✅ Complete Phase       | Guide through release process     | "Phase done" → step-by-step release guide                         |
| ✅ Update TODO.md       | Sync Git status to TODO.md        | After every merge/tag                                             |
| ✅ Suggest next task    | Read TODO.md pending tasks        | "What's next?" → shows pending tasks                              |
| ✅ Cleanup commits      | Suggest interactive rebase        | Before merge → "Clean up commits? git rebase -i HEAD~5"           |

### Example: Blocking Wrong Branch Name

**You try**:

```bash
git checkout -b my-feature
```

**Claude blocks**:

```
⛔ Branch name doesn't follow project convention.

Expected format:
  feature/phase-{N}-{description}

Your branch: my-feature ❌
Should be:   feature/phase-?-my-feature ✅

Which Phase is this feature for? [1-6]

📖 See: dev/GIT_WORKFLOW.md#branch-naming-convention
```

**You answer**: "Phase 2"

**Claude fixes**:

```bash
git branch -m feature/phase-2-my-feature
```

```
✅ Renamed to: feature/phase-2-my-feature
You're all set!
```

---

## FAQ

### Q1: Do I need to memorize all these Git commands?

**A**: No! Claude will guide you through everything. Just tell Claude what you want to do in natural language:

- "Start working on Phase 2"
- "I finished the TypeScript types"
- "Ready to release Phase 1"

Claude translates your intent into correct Git operations.

---

### Q2: What if I'm used to a different Git workflow?

**A**: That's fine! Claude will:

- Detect when you use your familiar commands
- Gently guide you to the project's convention
- Translate your workflow to ours automatically

Example:

```
You: git checkout -b fix-bug-123
Claude: ⚠️ Detected different naming. This project uses: feature/phase-{N}-{description}
        Should I rename to: feature/phase-2-fix-bug-123? [Yes/No]
```

---

### Q3: Can I work on multiple Phases at once?

**A**: Technically yes, but not recommended:

- ✅ Multiple developers on same Phase: Great! (parallel task branches)
- ⚠️ One developer on multiple Phases: Confusing, easy to mix up context
- ❌ Multiple Phase branches active: Causes merge conflicts

**Recommended**: Focus on one Phase at a time, complete it, then move to next.

---

### Q4: What if I need to work on Phase 3 while Phase 2 is still in progress?

**A**: You can, but be careful:

```bash
# Phase 2 is on feature/phase-2-3d-viewport (not merged to develop yet)

# Option 1: Create Phase 3 from develop (independent)
git checkout develop
git checkout -b feature/phase-3-scene-management
# Phase 3 won't have Phase 2's changes

# Option 2: Create Phase 3 from Phase 2 (dependent)
git checkout feature/phase-2-3d-viewport
git checkout -b feature/phase-3-scene-management
# Phase 3 will include Phase 2's changes
# But: if Phase 2 changes, you need to merge them into Phase 3
```

**Claude will ask**: "Does Phase 3 depend on Phase 2? [Yes/No]" and choose the right option.

---

### Q5: How do I handle merge conflicts?

**A**: Claude can't auto-resolve conflicts (requires human judgment), but will guide you:

```
git merge feature/phase-1-typescript-types
# CONFLICT (content): Merge conflict in src/types/scene.ts

Claude detects conflict:
⚠️ Merge conflict detected in src/types/scene.ts

Steps to resolve:
1. Open src/types/scene.ts
2. Look for <<<<<<< HEAD markers
3. Choose which version to keep (or combine both)
4. Remove conflict markers
5. git add src/types/scene.ts
6. git commit -m "chore: resolve merge conflict in scene types"

Need help understanding the conflict? I can explain what each side changed.
```

---

### Q6: When should I create a `hotfix` vs a `feature` branch?

| Situation                            | Branch Type                    | Example                           |
| ------------------------------------ | ------------------------------ | --------------------------------- |
| Bug in production (v1.0.0)           | `hotfix/v1.0.1-{desc}`         | Camera crashes in released app    |
| Bug in development (not released)    | `feature/phase-{N}-fix-{desc}` | Camera issue found during Phase 2 |
| Security vulnerability in production | `hotfix/v1.0.1-security-patch` | XSS vulnerability found           |
| New feature                          | `feature/phase-{N}-{feature}`  | Adding authentication             |

**Rule of thumb**: If it affects users using a released version → `hotfix`. Otherwise → `feature`.

---

### Q7: What if I mess up and need to undo?

**A**: Tell Claude what happened, and it will help:

**Common undo operations**:

```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes) - DANGEROUS
git reset --hard HEAD~1

# Undo a merge
git merge --abort  # While merge is in progress
git reset --hard HEAD~1  # After merge is committed

# Recover deleted branch (if not pushed yet)
git reflog  # Find the commit hash
git checkout -b feature/phase-1-recovered <hash>
```

**Claude will**:

- Ask what you want to undo
- Suggest the safest approach
- Warn about data loss
- Provide exact commands

---

### Q8: How do version numbers work?

**A**: We follow **Semantic Versioning (SemVer)**:

```
v1.2.3
│ │ └─ PATCH: Bug fixes, no new features (v1.2.3 → v1.2.4)
│ └─── MINOR: New features, backward compatible (v1.2.3 → v1.3.0)
└───── MAJOR: Breaking changes (v1.2.3 → v2.0.0)
```

**Mapping to Phases**:

- Phase 0 (Foundation): v0.0.0 (pre-release)
- Phase 1 (Core Architecture): v0.1.0
- Phase 2 (3D Viewport): v0.2.0
- Phase 3 (Scene Management): v0.3.0
- Phase 4 (UI Components): v0.4.0
- Phase 5 (History & Advanced): v0.5.0
- Phase 6 (Polish & Optimization): v1.0.0 (first stable release)

**Hotfixes increment PATCH**:

- v0.1.0 → hotfix → v0.1.1
- v1.0.0 → hotfix → v1.0.1

---

### Q9: Should I use `git rebase` or `git merge`?

**A**: We use a **hybrid strategy** - rebase for cleanup, merge for integration.

This combines the best of both worlds: clean linear history on personal branches, clear feature boundaries on shared branches.

---

#### The Golden Rule

> **Rebase private branches, Merge public milestones**

```
Private branches (you alone)        → Rebase (keep clean)
Public milestones (team integration) → Merge --no-ff (preserve context)
```

---

#### When to Use REBASE ✅

**1. Sync your personal task branch with latest Phase branch**

```bash
# You're working on: feature/phase-1-typescript-types (only you use this)
# Phase branch updated: feature/phase-1-core-architecture has new commits

git checkout feature/phase-1-typescript-types
git fetch origin
git rebase feature/phase-1-core-architecture
```

**Why**: Keeps your commits on top of latest code, cleaner than merge commits

**2. Clean up your commits before merging**

```bash
# You have 5 messy commits, want to combine into 2 clean ones
git rebase -i HEAD~5

# Interactive rebase allows you to:
# - Squash multiple commits into one
# - Reword commit messages
# - Reorder commits
# - Delete unnecessary commits
```

**Why**: Makes code review easier, history more readable

**3. Update your branch from develop/Phase branch**

```bash
# Alternative to: git merge develop
git rebase develop

# This keeps your branch's commits on top of develop
```

**Why**: Linear history, easier to follow

---

#### When to Use MERGE --no-ff ✅

**1. Integrate completed task into Phase branch (REQUIRED)**

```bash
git checkout feature/phase-1-core-architecture
git merge feature/phase-1-typescript-types --no-ff -m "feat(phase-1): add TypeScript type definitions"
```

**Why**:

- Preserves "this is a complete feature" boundary
- Can revert entire feature with one command
- Code review has clear scope

**2. Complete Phase merge to develop (REQUIRED)**

```bash
git checkout develop
git merge feature/phase-1-core-architecture --no-ff -m "feat: complete Phase 1 - Core Architecture"
```

**Why**: Phase is a major milestone, must be visible in graph

**3. Release to main (REQUIRED)**

```bash
git checkout main
git merge release/v0.1.0-phase1 --no-ff
```

**Why**: Production releases need clear boundaries

---

#### Safety Rules for Rebase ⚠️

**✅ Safe to rebase when**:

1. Branch hasn't been pushed yet
2. Branch pushed, but only you are using it
3. You've communicated with team and everyone agrees

**❌ NEVER rebase when**:

1. Commits already merged to develop/main
2. Other developers have branches based on yours
3. Commits have been tagged
4. After creating a Pull Request (unless explicitly required by team)

**How to rebase safely**:

```bash
# Use --force-with-lease instead of --force
git push --force-with-lease origin feature/phase-1-typescript-types

# This protects against overwriting others' work
# It fails if remote has commits you don't have locally
```

---

#### Visual Comparison

**Using Rebase (Personal Branch)**:

```
Before rebase:
* Your commit C
* Your commit B
* Your commit A
|
| * Someone else's commit
|/
* Old base

After rebase:
* Your commit C (new hash)
* Your commit B (new hash)
* Your commit A (new hash)
* Someone else's commit
* Old base
```

Linear history, your commits on top ✅

---

**Using Merge --no-ff (Feature Integration)**:

```
After merge:
*   Merge: Add TypeScript types
|\
| * Your commit C
| * Your commit B
| * Your commit A
|/
* Phase branch continues...
```

Feature boundary preserved ✅

---

#### Recommended Daily Workflow

**Morning (start work on your task)**:

```bash
git checkout feature/phase-1-typescript-types
git fetch origin
git rebase feature/phase-1-core-architecture  # Get latest Phase changes
# Resolve conflicts if any
git push --force-with-lease  # If already pushed
```

**During work**:

```bash
# Make small, frequent commits
git commit -m "wip: add Scene interface"
git commit -m "wip: add Editor interface"
git commit -m "fix typo in Scene interface"
```

**Before requesting merge (cleanup)**:

```bash
# Clean up your commits
git rebase -i HEAD~10
# Squash "wip" commits, fix commit messages

# Final push
git push --force-with-lease
```

**Task complete (integrate)**:

```bash
# Switch to Phase branch
git checkout feature/phase-1-core-architecture
git pull

# Merge with --no-ff (DO NOT REBASE HERE)
git merge feature/phase-1-typescript-types --no-ff -m "feat(phase-1): add TypeScript type definitions

- Add SceneObject and SceneNode interfaces
- Add EditorState and ViewportState
- Export all types from index.ts"

git push origin feature/phase-1-core-architecture
```

---

#### Claude's Role

Claude will **guide** you through this:

- ✅ Suggest rebase when syncing personal branches
- ✅ Suggest interactive rebase before merging
- ⚠️ Warn when rebase is dangerous
- ✅ Auto-use merge --no-ff for integration points
- 🛡️ Block rebase on protected branches (main, develop)

**Examples**:

```
You: "Update my branch with latest changes"
Claude: "You're on feature/phase-1-typescript-types (personal branch).
         I'll rebase to feature/phase-1-core-architecture for clean history.
         git rebase feature/phase-1-core-architecture"

You: "My task is complete"
Claude: "Ready to merge into feature/phase-1-core-architecture.
         I'll use --no-ff to preserve feature boundary.
         git merge feature/phase-1-typescript-types --no-ff"

You: "git rebase develop" (while on develop)
Claude: "⛔ BLOCKED: Cannot rebase develop (shared branch).
         This would rewrite history for the entire team.
         If you want to update: git pull origin develop"
```

---

#### Summary: Hybrid Strategy Benefits

✅ **Clean history**: Personal branches stay linear (rebase)
✅ **Clear boundaries**: Features and Phases visible (merge --no-ff)
✅ **Safe collaboration**: Public branches protected from rewrites
✅ **Best of both worlds**: Like Vue.js daily work + GitHub PR workflow
✅ **Flexible**: You can rebase when it makes sense, merge when safety matters

**Rule of thumb**:

- Rebase = Clean up your own work
- Merge = Integrate with team's work

---

### Q10: What's the difference between this and GitHub Flow?

| Feature          | GitHub Flow                        | Our Workflow (Git Flow + Phase)                      |
| ---------------- | ---------------------------------- | ---------------------------------------------------- |
| Branch count     | 1 main + feature branches          | 2 permanent (main, develop) + feature/release/hotfix |
| Deployment       | Every merge to main                | Only from release/hotfix to main                     |
| Complexity       | Simple                             | Moderate                                             |
| Best for         | Continuous deployment, small teams | Scheduled releases, multi-developer                  |
| Phase visibility | None                               | Built into branch names                              |
| Hotfix support   | Same as features                   | Dedicated hotfix branches                            |

**Why we chose Git Flow + Phase**:

- This project has distinct development phases
- Not every commit is ready for production
- Need to support multiple developers on same Phase
- Branch names themselves serve as documentation

---

## Quick Reference

### Branch Creation Cheat Sheet

```bash
# Start new Phase
git checkout develop
git checkout -b feature/phase-{N}-{name}

# Work on specific task within Phase
git checkout feature/phase-{N}-{name}
git checkout -b feature/phase-{N}-{task}

# Create release
git checkout develop
git checkout -b release/v{X}.{Y}.{Z}-phase{N}

# Emergency hotfix
git checkout main
git checkout -b hotfix/v{X}.{Y}.{Z+1}-{description}
```

### Merge Cheat Sheet

```bash
# Merge task into Phase branch
git checkout feature/phase-{N}-{name}
git merge feature/phase-{N}-{task} --no-ff

# Merge Phase into develop
git checkout develop
git merge feature/phase-{N}-{name} --no-ff

# Merge release to main
git checkout main
git merge release/v{X}.{Y}.{Z}-phase{N} --no-ff
git tag -a v{X}.{Y}.{Z} -m "Phase {N} complete"

# Merge hotfix to main AND develop
git checkout main
git merge hotfix/v{X}.{Y}.{Z}-{desc} --no-ff
git tag -a v{X}.{Y}.{Z} -m "Hotfix: {description}"
git checkout develop
git merge hotfix/v{X}.{Y}.{Z}-{desc} --no-ff
```

### Common Commands

```bash
# See all branches
git branch -a

# See current branch
git branch --show-current

# See recent commits with graph
git log --oneline --graph --all -10

# Update current branch from remote
git pull

# Push current branch to remote
git push

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Create and push tag
git tag -a v0.1.0 -m "Phase 1 complete"
git push origin v0.1.0

# See all tags
git tag -l
```

### Decision Tree

```
Need to do work?
│
├─ New Phase starting?
│  → git checkout develop
│  → git checkout -b feature/phase-{N}-{name}
│
├─ Task within existing Phase?
│  → git checkout feature/phase-{N}-{name}
│  → git checkout -b feature/phase-{N}-{task}
│
├─ Phase complete, ready to release?
│  → git checkout develop
│  → git checkout -b release/v{X}.{Y}.{Z}-phase{N}
│
└─ Bug in production?
   → git checkout main
   → git checkout -b hotfix/v{X}.{Y}.{Z+1}-{desc}
```

---

## Visual Workflow Diagram

```
Time →

main:      v0.0.0 ─────────────────────┬─ v0.1.0 ────────────────┬─ v0.2.0
                                       │                         │
                                    [merge]                   [merge]
                                       │                         │
develop:          ┌────────────────────┴───────┐                 │
                  │                            │                 │
                [start]                     [merge]           [start]
                  │                            │                 │
feature/phase-1:  ├──┬──┬──┬─────────────────┘                 │
                  │  │  │  │                                     │
                  │  │  │  └─ feature/phase-1-custom-hooks      │
                  │  │  └──── feature/phase-1-zustand-stores    │
                  │  └─────── feature/phase-1-typescript-types  │
                  │                                              │
                  │                                              │
feature/phase-2:  └──────────────────────────────────────────────┼──┬──┬──
                                                                 │  │  │
                                                                 │  │  └─ feature/phase-2-camera
                                                                 │  └──── feature/phase-2-canvas
                                                                 │
                                                              [Phase 2 work continues...]
```

---

## Summary

### Core Workflow in 3 Steps

1. **Start from `develop`**: All new work branches from `develop`
2. **Merge back to `develop`**: Complete work merges to `develop` first
3. **Release to `main`**: Only release branches merge to `main` (with tags)

### Remember

- 🚫 Never commit directly to `main`
- 🚫 Never commit directly to `develop` (use feature branches)
- ✅ Always use `--no-ff` when merging
- ✅ Always include Phase number in branch names
- ✅ Let Claude guide you when unsure

### Get Help

- 📖 Read this document: `dev/GIT_WORKFLOW.md`
- 🤖 Ask Claude: "How do I [do something with Git]?"
- 🎯 Quick reference: `dev/GIT_WORKFLOW_QUICK_REF.md`
- 📋 See current phase: `dev/TODO.md`

---

**Last Updated**: 2025-11-15
**Maintained by**: Claude Code (git-workflow-assistant skill)
