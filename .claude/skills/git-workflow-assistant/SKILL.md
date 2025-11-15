---
name: git-workflow-assistant
description: Enforces Git Flow + Phase naming workflow, automates branch operations, and guides developers
triggers:
  keywords:
    - start phase
    - begin phase
    - finish phase
    - complete phase
    - create branch
    - merge branch
    - git checkout
    - git merge
  intent_patterns:
    - (start|begin|create).*?phase
    - (finish|complete|done).*?phase
    - (create|make|new).*?branch
enforcement: block
priority: critical
---

# Git Workflow Assistant

**Mission**: Be the invisible guardian of the project's Git workflow. Developers should not need to memorize Git Flow + Phase naming conventions - you will guide them through it automatically.

---

## Core Principles

1. **Automate First** - Do the right thing automatically before asking
2. **Detect Violations** - Monitor for operations that violate the workflow
3. **Block Gently** - Stop violations with clear, friendly explanations
4. **Educate Always** - Point to documentation when blocking
5. **Context Aware** - Read current Git state and TODO.md to provide smart suggestions

---

## Automatic Actions (No Permission Needed)

### 1. When User Wants to Start a New Phase

**Detect**:
- User says: "start phase {N}", "begin phase {N}", "work on phase {N}"
- User says: "start phase-{N}-{name}"

**Auto-execute**:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/phase-{N}-{name}
git push -u origin feature/phase-{N}-{name}
```

**Auto-inform**:
```
✅ Created `feature/phase-{N}-{name}` from develop
📋 Updated TODO.md: Phase {N} → Current Sprint
📖 Phase {N} tasks: dev/active/editor-core-architecture/editor-core-architecture-tasks.md#phase-{N}

Ready to start coding!
```

**Example**:
```
User: "Start Phase 1"

Claude:
[Runs git commands automatically]
✅ Created `feature/phase-1-core-architecture` from develop
📋 Phase 1 tasks loaded:
   - [ ] Create directory structure
   - [ ] Define TypeScript interfaces
   - [ ] Set up Zustand stores
   - [ ] Create custom hooks

Which task would you like to work on first?
```

---

### 2. When User Wants to Work on a Specific Task

**Detect**:
- User says: "work on {task}", "implement {task}", "start {task}"
- User is on a Phase branch: `feature/phase-{N}-{name}`

**Auto-execute**:
```bash
git checkout feature/phase-{N}-{name}
git pull origin feature/phase-{N}-{name}
git checkout -b feature/phase-{N}-{task}
git push -u origin feature/phase-{N}-{task}
```

**Auto-inform**:
```
✅ Created `feature/phase-{N}-{task}` from feature/phase-{N}-{name}
📝 Tracking in TODO.md
💡 When done, say "task complete" and I'll merge it back
```

**Example**:
```
User: "Work on TypeScript types"
(Currently on feature/phase-1-core-architecture)

Claude:
✅ Created `feature/phase-1-typescript-types`
📝 Task: Create src/types/scene.ts, editor.ts, transform.ts, common.ts

Let me know when you're done, and I'll merge it back to feature/phase-1-core-architecture!
```

---

### 3. When User Completes a Task

**Detect**:
- User says: "task done", "task complete", "finished {task}"
- TodoWrite shows task marked as completed
- User is on a task branch: `feature/phase-{N}-{task}`

**Auto-ask**:
```
🎉 Task complete!

Ready to merge `feature/phase-{N}-{task}` into `feature/phase-{N}-{name}`?
[Yes/No]
```

**If Yes, auto-execute**:
```bash
git checkout feature/phase-{N}-{name}
git pull origin feature/phase-{N}-{name}
git merge feature/phase-{N}-{task} --no-ff -m "chore(phase-{N}): merge {task} implementation"
git push origin feature/phase-{N}-{name}
git branch -d feature/phase-{N}-{task}
git push origin --delete feature/phase-{N}-{task}
```

**Auto-update**:
- Update TODO.md: `- [x] {Task name}`
- project-todo-manager skill syncs the change

**Auto-inform**:
```
✅ Merged feature/phase-{N}-{task} → feature/phase-{N}-{name}
✅ Updated TODO.md
✅ Deleted task branch (cleanup)

Back on feature/phase-{N}-{name}, ready for next task!
```

---

### 4. When User Completes an Entire Phase

**Detect**:
- All tasks in a Phase are marked `[x]` in TODO.md
- User says: "phase complete", "phase done", "finish phase {N}"
- TodoWrite shows all Phase tasks completed

**Auto-announce**:
```
🎉 Phase {N} complete! All tasks done.

Ready to release Phase {N}?
This will:
1. Merge feature/phase-{N}-{name} → develop
2. Create release/v{X}.{Y}.{Z}-phase{N}
3. Merge to main and tag v{X}.{Y}.{Z}
4. Update TODO.md: Phase {N} → Recently Completed

Proceed with release? [Yes/No/Guide me step-by-step]
```

**If "Yes", auto-execute full release**:
```bash
# Step 1: Merge to develop
git checkout develop
git pull origin develop
git merge feature/phase-{N}-{name} --no-ff -m "feat: complete Phase {N} - {Phase name}"
git push origin develop

# Step 2: Create release branch
git checkout -b release/v{X}.{Y}.{Z}-phase{N}

# Step 3: Prepare release (version bump, changelog)
# [Prompt user to update package.json, CHANGELOG.md]
git commit -am "chore(release): prepare v{X}.{Y}.{Z}-phase{N}"

# Step 4: Merge to main
git checkout main
git pull origin main
git merge release/v{X}.{Y}.{Z}-phase{N} --no-ff -m "release: v{X}.{Y}.{Z} - Phase {N} complete"
git tag -a v{X}.{Y}.{Z} -m "Phase {N}: {Phase name} complete"
git push origin main --tags

# Step 5: Merge back to develop
git checkout develop
git merge release/v{X}.{Y}.{Z}-phase{N} --no-ff
git push origin develop

# Step 6: Cleanup
git branch -d release/v{X}.{Y}.{Z}-phase{N}
git branch -d feature/phase-{N}-{name}
git push origin --delete release/v{X}.{Y}.{Z}-phase{N}
git push origin --delete feature/phase-{N}-{name}
```

**If "Guide me step-by-step", provide interactive guidance**:
```
Let's release Phase {N} step-by-step.

Step 1/6: Merge Phase {N} to develop
Command: git checkout develop && git merge feature/phase-{N}-{name} --no-ff
Ready? [Yes/Explain/Skip]
```

**Auto-update TODO.md**:
- Move Phase {N} to "Recently Completed"
- Update "Current Phase" to Phase {N+1}
- Update "Last Updated" date

---

### 5. When User Needs a Hotfix

**Detect**:
- User says: "critical bug", "production bug", "hotfix needed"
- User mentions a version number: "bug in v1.0.0"

**Auto-ask**:
```
🚨 Hotfix needed for production?

Current production version: v{X}.{Y}.{Z}
New hotfix version will be: v{X}.{Y}.{Z+1}

What's the bug description? (will be used in branch name)
Example: "camera-crash", "security-patch"
```

**After user provides description, auto-execute**:
```bash
git checkout main
git pull origin main
git checkout -b hotfix/v{X}.{Y}.{Z+1}-{description}
git push -u origin hotfix/v{X}.{Y}.{Z+1}-{description}
```

**Auto-inform**:
```
✅ Created `hotfix/v{X}.{Y}.{Z+1}-{description}` from main

⚠️ IMPORTANT: Hotfixes must be merged to BOTH main AND develop!

When you're done fixing:
1. Say "hotfix complete"
2. I'll merge to main (production)
3. I'll merge to develop (ongoing work gets the fix)
4. I'll tag v{X}.{Y}.{Z+1}
```

---

## Guardrails (Block with Guidance)

### ❌ BLOCK: Committing Directly to `main`

**Detect**:
- Current branch is `main`
- User runs: `git add` / `git commit` / attempts to make changes

**Block message**:
```
⛔ **BLOCKED**: Direct commits to `main` are not allowed.

The `main` branch represents production-ready code and should only receive merges from:
- `release/*` branches (for new releases)
- `hotfix/*` branches (for emergency fixes)

What to do:
1. Undo uncommitted changes: git reset HEAD
2. Switch to develop: git checkout develop
3. Create feature branch: git checkout -b feature/phase-{N}-{description}

Or, if this is a hotfix for production:
1. Create hotfix branch: git checkout -b hotfix/v{X}.{Y}.{Z+1}-{description}

Should I create the right branch for you? [Yes/No]

📖 Learn why: dev/GIT_WORKFLOW.md#why-not-commit-to-main
```

**Auto-offer to fix**:
```
I can fix this for you. What type of work is this?
1. New feature → Create feature/phase-{N}-{description}
2. Bug fix in ongoing Phase → Create feature/phase-{N}-fix-{description}
3. Production hotfix → Create hotfix/v{X}.{Y}.{Z+1}-{description}
4. Cancel (let me do it manually)
```

---

### ❌ BLOCK: Committing Directly to `develop`

**Detect**:
- Current branch is `develop`
- User runs: `git commit` with changes

**Block message**:
```
⚠️ **WARNING**: Direct commits to `develop` are discouraged.

While not strictly forbidden, `develop` should primarily receive merges from feature branches.

Recommended workflow:
1. Create feature branch: git checkout -b feature/phase-{N}-{description}
2. Make your changes there
3. Merge back to develop when done

Do you want to:
1. Move these changes to a new feature branch (recommended)
2. Commit to develop anyway (not recommended, but allowed)
3. Cancel

📖 See: dev/GIT_WORKFLOW.md#why-use-feature-branches
```

**If user chooses "1. Move to feature branch"**:
```bash
# Stash changes
git stash

# Create feature branch
git checkout -b feature/phase-{N}-{description}

# Apply changes
git stash pop
```

---

### ❌ BLOCK: Creating Feature Branch from `main`

**Detect**:
- Current branch is `main`
- User runs: `git checkout -b feature/*`

**Block message**:
```
⛔ **BLOCKED**: Feature branches should be created from `develop`, not `main`.

Why?
- `main` = production-ready code
- `develop` = integration branch for ongoing development
- Feature branches need to integrate with other ongoing work, which is on `develop`

Correct workflow:
1. Switch to develop: git checkout develop
2. Update develop: git pull origin develop
3. Create feature: git checkout -b feature/phase-{N}-{description}

Should I do this for you? [Yes/No]

📖 See: dev/GIT_WORKFLOW.md#creating-feature-branches
```

**Auto-fix if user says Yes**:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/phase-{N}-{description}
```

---

### ❌ BLOCK: Wrong Branch Naming Convention

**Detect**:
- User creates branch with name that doesn't match:
  - `feature/phase-{N}-{description}`
  - `release/v{X}.{Y}.{Z}-phase{N}`
  - `hotfix/v{X}.{Y}.{Z}-{description}`

**Block message**:
```
⛔ **BLOCKED**: Branch name doesn't follow project convention.

Your branch: {actual-name} ❌

Expected formats:
  feature/phase-{N}-{description}  ✅ (for feature work)
  release/v{X}.{Y}.{Z}-phase{N}    ✅ (for releases)
  hotfix/v{X}.{Y}.{Z}-{description} ✅ (for hotfixes)

Examples:
  ✅ feature/phase-1-typescript-types
  ✅ feature/phase-2-camera-controls
  ✅ release/v0.1.0-phase1
  ✅ hotfix/v1.0.1-security-patch

  ❌ my-feature
  ❌ fix-bug
  ❌ new-stuff

Should I rename this branch for you? [Yes/No]

📖 See: dev/GIT_WORKFLOW.md#branch-naming-convention
```

**Auto-fix**:
```
Which Phase is this work for? [1-6]

[User answers: 2]

What should I call this feature? (current name: {actual-name})
Suggested: {suggested-description}

[User provides description or accepts suggestion]

Renaming: {actual-name} → feature/phase-2-{description}
```

```bash
git branch -m feature/phase-{N}-{description}
```

---

### ✅ SUGGEST: Sync Personal Branch with Rebase

**Detect**:
- User says: "update my branch", "sync with latest", "get latest changes"
- User is on a personal task branch: `feature/phase-{N}-{task}`
- Parent Phase branch has new commits

**Suggest**:
```
💡 Your branch feature/phase-{N}-{task} is behind feature/phase-{N}-{name}.

I recommend rebasing to keep your commits on top of latest changes:
  git rebase feature/phase-{N}-{name}

This will:
- ✅ Keep your branch history linear
- ✅ Make eventual merge cleaner
- ✅ Resolve conflicts now (easier than later)

Proceed with rebase? [Yes/No/Merge instead]

📖 See: dev/GIT_WORKFLOW.md#q9-should-i-use-git-rebase-or-git-merge
```

**If Yes, auto-execute**:
```bash
git fetch origin
git rebase feature/phase-{N}-{name}

# If conflicts occur, guide user through resolution
# If already pushed, remind about --force-with-lease
```

**If conflicts during rebase**:
```
⚠️ Rebase conflict in: {file}

Steps to resolve:
1. Open {file}
2. Look for conflict markers (<<<, ===, >>>)
3. Edit to keep correct version
4. git add {file}
5. git rebase --continue

Or, to abort rebase:
  git rebase --abort

Need help? I can explain what changed on each side.
```

**After successful rebase (if branch was pushed)**:
```
✅ Rebase complete! Your commits are now on top of latest changes.

⚠️ Your branch history was rewritten.
If you've already pushed this branch, you need to force push:
  git push --force-with-lease origin feature/phase-{N}-{task}

--force-with-lease is safer than --force (protects against overwriting others' work)

Push now? [Yes/No]
```

---

### ✅ SUGGEST: Interactive Rebase Before Merge

**Detect**:
- User says: "task complete", "ready to merge"
- User is on a task branch with >5 commits
- Some commits have "wip", "tmp", "fix typo" messages

**Suggest**:
```
💡 Before merging, would you like to clean up your commits?

You have 8 commits:
  - wip: add Scene interface
  - wip: add Editor interface
  - fix typo
  - wip: add Transform types
  - fix another typo
  - add Common types
  - update exports
  - fix formatting

I recommend using interactive rebase to:
- Squash "wip" commits into meaningful ones
- Fix commit messages
- Remove "fix typo" commits (squash into parent)

Result: 2-3 clean commits instead of 8 messy ones

Clean up commits before merging? [Yes/No/Skip]

📖 See: dev/GIT_WORKFLOW.md#when-to-use-rebase
```

**If Yes**:
```
I'll start interactive rebase for last 8 commits:
  git rebase -i HEAD~8

In the editor that opens:
- Change "pick" to "squash" (or "s") to combine commits
- Change "pick" to "reword" (or "r") to edit commit message
- Delete lines to remove commits entirely

Example:
  pick abc1234 wip: add Scene interface
  squash def5678 wip: add Editor interface  ← Squash into previous
  squash ghi9012 fix typo                    ← Squash into previous
  pick jkl3456 add Transform types
  squash mno7890 fix another typo            ← Squash into previous
  reword pqr1234 add Common types            ← Change message
  squash stu5678 update exports              ← Squash into previous
  squash vwx9012 fix formatting              ← Squash into previous

Ready? [Yes/Show me example/Cancel]
```

---

### ⚠️ WARN: Merging Without `--no-ff` (on Public Branches)

**Detect**:
- User runs: `git merge {branch}` without `--no-ff` flag

**Warn message**:
```
⚠️ **WARNING**: Merge without `--no-ff` will fast-forward.

Recommended: Use `--no-ff` to preserve branch history.

Why?
- Preserves complete history of when branches were merged
- Makes it easy to see Phase boundaries in git log
- Easier to revert entire features if needed

Suggested command:
  git merge {branch} --no-ff -m "chore(phase-{N}): merge {description}"

Should I run this for you? [Yes/No/Proceed with fast-forward]

📖 See: dev/GIT_WORKFLOW.md#why-no-ff
```

---

### ❌ BLOCK: Rebasing Public/Shared Branches

**Detect**:
- User runs: `git rebase {anything}` while on `main`, `develop`, or a Phase branch
- These are shared branches where multiple developers may have based work

**Block message**:
```
⛔ **BLOCKED**: Cannot rebase `{branch-name}` (shared branch).

You're trying to rebase a public branch that others might be using.

Why this is dangerous:
- ❌ Rewrites history for everyone
- ❌ Breaks other developers' branches
- ❌ Can cause lost commits and merge disasters

Current branch: {branch-name}
Branch type: {main/develop/Phase branch} (PUBLIC - multiple people use this)

What to do instead:
- If you want latest changes: git pull origin {branch-name}
- If you want to update from another branch: git merge {other-branch}

Safe to rebase:
✅ Personal task branches (feature/phase-{N}-{specific-task})
❌ Main, develop, or Phase branches (feature/phase-{N}-{phase-name})

📖 See: dev/GIT_WORKFLOW.md#safety-rules-for-rebase
```

**Exception**:
If user insists and can prove they coordinate with team:
```
⚠️ Rebasing shared branches requires team coordination.

Have you:
[ ] Confirmed no one else has branches based on this?
[ ] Informed all team members?
[ ] Have everyone's approval?

If yes to all, you can proceed with:
  git rebase {target} --force-with-lease

But be VERY careful!
```

---

### ❌ BLOCK: Force Pushing to `main` or `develop`

**Detect**:
- User runs: `git push --force origin main` or `git push --force origin develop`

**Block message**:
```
⛔ **BLOCKED**: Force push to {main/develop} is DANGEROUS!

Force pushing rewrites history and can cause:
- ❌ Lost commits for other developers
- ❌ Broken CI/CD pipelines
- ❌ Corrupted production deployments

If you need to undo something on {branch}:
1. Use `git revert {commit}` instead (creates new commit that undoes changes)
2. Or, discuss with team before force pushing shared branches

Force push is only safe on:
- ✅ Your personal feature branches (before others have pulled them)
- ✅ After coordinating with all team members

Proceed anyway? [No/Yes, I'm sure/Help me find an alternative]

📖 See: dev/GIT_WORKFLOW.md#why-no-force-push
```

---

### ❌ BLOCK: Deleting `main` or `develop` Branches

**Detect**:
- User runs: `git branch -d main` or `git branch -d develop`
- User runs: `git push origin --delete main` or similar

**Block message**:
```
⛔ **BLOCKED**: Cannot delete {main/develop} branch!

These are permanent branches that form the backbone of the workflow.

If you're trying to:
- Clean up old branches → Delete feature/release/hotfix branches instead
- Reset branch → Use `git reset` instead of deleting
- Fix a mistake → Tell me what happened, and I'll help you fix it

Deleting {main/develop} would break the entire workflow!

📖 See: dev/GIT_WORKFLOW.md#branch-types
```

---

## Smart Context-Aware Suggestions

### Reading Current Git State

Before any Git operation, **always check**:

```bash
# Get current branch
git branch --show-current

# Get current status
git status

# Get recent commits
git log --oneline -5

# Get all branches
git branch -a
```

Use this information to provide context-aware suggestions.

---

### Example: User Asks "What should I work on?"

**Claude reads**:
1. Current Git branch: `feature/phase-1-core-architecture`
2. dev/TODO.md Current Sprint tasks
3. TodoWrite session tasks

**Claude responds**:
```
📋 You're on: feature/phase-1-core-architecture

Current Phase 1 tasks from TODO.md:

Completed:
- [x] Create directory structure

Pending:
- [ ] Define TypeScript interfaces (src/types/)
- [ ] Set up Zustand stores (src/store/)
- [ ] Create custom hooks (src/hooks/)

Would you like to:
1. Work on TypeScript interfaces → Create feature/phase-1-typescript-types
2. Work on Zustand stores → Create feature/phase-1-zustand-stores
3. Work on custom hooks → Create feature/phase-1-custom-hooks
4. Something else?
```

---

### Example: User Is Lost

**User says**: "I'm not sure what to do next"

**Claude reads**:
- Current branch: `main`
- Latest commit on main: `v0.1.0 - Phase 1 complete`
- dev/TODO.md shows Phase 2 in "Current Sprint"

**Claude responds**:
```
📍 Current Status:
- You're on `main` (production branch)
- Latest release: v0.1.0 (Phase 1 complete)
- Next: Phase 2 - 3D Viewport Foundation

To start Phase 2:
1. Say: "Start Phase 2"
2. I'll create feature/phase-2-3d-viewport from develop
3. You'll be ready to work on Phase 2 tasks

Or, if you want to work on a different Phase:
- Available phases: Phase 1 (✅ complete), Phase 2 (⏳ ready), Phase 3-6 (📦 planned)

What would you like to do?
```

---

### Example: User Made a Mistake

**User says**: "Oh no, I accidentally committed to main!"

**Claude checks**:
```bash
git log --oneline -1  # Get last commit
git branch --show-current  # Confirm on main
```

**Claude responds**:
```
Don't worry, I can fix this! 🔧

Last commit on main: abc1234 "Add new feature"

Option 1: Move commit to a feature branch (recommended)
  git reset HEAD~1           # Undo commit (keep changes)
  git checkout develop
  git checkout -b feature/phase-{N}-{description}
  git add .
  git commit -m "..."

Option 2: Revert the commit (safer if already pushed)
  git revert HEAD            # Creates new commit that undoes changes

Which option do you prefer? Or tell me more about what you were trying to do.
```

---

## Integration with Other Skills

### With `project-todo-manager`

**Collaboration**:
- When `git-workflow-assistant` creates a Phase branch → `project-todo-manager` updates TODO.md
- When task is merged → `project-todo-manager` marks task as `[x]`
- When Phase is complete → `project-todo-manager` moves Phase to "Recently Completed"

**Communication**:
```
git-workflow-assistant: "Creating feature/phase-1-core-architecture..."
project-todo-manager: "Updating TODO.md: Phase 1 → Current Sprint"

git-workflow-assistant: "Merged feature/phase-1-typescript-types"
project-todo-manager: "Marking task complete: ✅ Define TypeScript interfaces"

git-workflow-assistant: "Tagged v0.1.0 - Phase 1 complete"
project-todo-manager: "Moving Phase 1 to Recently Completed, Current Phase → Phase 2"
```

---

### With `skill-developer`

If user asks about the Git workflow skill itself:
- Defer to `skill-developer` for skill modification
- This skill focuses on Git operations, not skill development

---

## Error Handling

### When Git Commands Fail

**Example**: Merge conflict

```bash
git merge feature/phase-1-typescript-types --no-ff
# CONFLICT (content): Merge conflict in src/types/scene.ts
```

**Claude responds**:
```
⚠️ Merge conflict detected in: src/types/scene.ts

This means both branches modified the same part of the file.

Steps to resolve:
1. Open src/types/scene.ts
2. Look for conflict markers:
   <<<<<<< HEAD
   (your changes)
   =======
   (their changes)
   >>>>>>> feature/phase-1-typescript-types

3. Edit the file to keep the correct version (or combine both)
4. Remove the conflict markers (<<<, ===, >>>)
5. git add src/types/scene.ts
6. git commit -m "chore: resolve merge conflict in scene types"

Would you like me to:
1. Show you what each side changed (explain the conflict)
2. Guide you through resolution step-by-step
3. Abort the merge (git merge --abort)
```

---

### When Branch Doesn't Exist

**Example**: User tries to merge non-existent branch

```bash
git merge feature/phase-1-nonexistent --no-ff
# error: pathspec 'feature/phase-1-nonexistent' did not match any file(s) known to git
```

**Claude responds**:
```
❌ Branch not found: feature/phase-1-nonexistent

Available Phase 1 branches:
- feature/phase-1-core-architecture (main Phase branch)
- feature/phase-1-typescript-types
- feature/phase-1-zustand-stores

Did you mean one of these? Or would you like to create a new branch?
```

---

### When Remote Push Fails

**Example**: Rejected push (behind remote)

```bash
git push origin feature/phase-1-core-architecture
# ! [rejected] feature/phase-1-core-architecture -> feature/phase-1-core-architecture (non-fast-forward)
```

**Claude responds**:
```
⚠️ Push rejected: Your local branch is behind the remote.

Someone else pushed changes to this branch since your last pull.

To fix:
1. Pull remote changes: git pull origin feature/phase-1-core-architecture
2. Resolve any conflicts (if they occur)
3. Push again: git push origin feature/phase-1-core-architecture

Should I run these commands for you? [Yes/No]

⚠️ If you see "CONFLICT" after pulling, I'll guide you through resolution.
```

---

## Developer Experience Scenarios

### New Developer Joining the Project

**Developer**: "I'm new to this project, where do I start?"

**Claude**:
```
👋 Welcome to play-play-editor!

This project uses Git Flow + Phase-based naming. Don't worry - I'll guide you through everything!

Quick Setup:
1. Clone the repository (you've probably done this ✅)
2. Checkout develop: git checkout develop
3. Tell me what you want to work on, and I'll create the right branch for you!

Current project status:
- Phase 0: ✅ Complete (Project Foundation)
- Phase 1: ⏳ In Progress (Core Architecture)
- Phase 2-6: 📦 Planned

You can:
- Join Phase 1 work (say: "work on Phase 1")
- Read the full Git guide: dev/GIT_WORKFLOW.md
- Ask me anything: "How do I create a branch?", "What's the workflow?"

What would you like to do?
```

---

### Experienced Developer from Different Workflow

**Developer** (tries their usual workflow):
```bash
git checkout -b fix-auth-bug
```

**Claude** (detects different convention):
```
⚠️ I noticed you're using a different branch naming convention.

This project uses: feature/phase-{N}-{description}

Your branch:      fix-auth-bug ❌
This project:     feature/phase-3-fix-auth-bug ✅ (example)

I can adapt! Which Phase is this bug fix for?
1. Phase 1 - Core Architecture
2. Phase 2 - 3D Viewport
3. Phase 3 - Scene Management
4. Other

I'll rename the branch to match the project convention.

💡 Tip: In the future, just tell me "fix auth bug in Phase 3" and I'll create the right branch automatically!

📖 Full naming guide: dev/GIT_WORKFLOW.md#branch-naming-convention
```

---

## Summary

### What This Skill Does

✅ **Automates** Git operations according to Git Flow + Phase naming
✅ **Blocks** dangerous operations (commits to main, wrong branch names, force pushes)
✅ **Guides** developers through complex workflows (releases, hotfixes, merges)
✅ **Educates** by pointing to documentation when blocking or warning
✅ **Integrates** with project-todo-manager to keep TODO.md in sync
✅ **Adapts** to different developer habits and translates to project conventions

### What Developers Experience

🎯 **Less friction**: "Start Phase 2" → branch created, ready to code
🛡️ **Fewer mistakes**: Blocked before breaking the workflow
📚 **Continuous learning**: Clear explanations when blocked
🤖 **Invisible help**: Git operations happen correctly without memorization

### Philosophy

> "Developers should focus on building features, not memorizing Git commands. Claude handles the Git workflow complexity."

---

**Maintained by**: Claude Code
**Documentation**: dev/GIT_WORKFLOW.md
**Quick Reference**: dev/GIT_WORKFLOW_QUICK_REF.md
