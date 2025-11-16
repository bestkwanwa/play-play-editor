# Git Workflow Quick Reference

**Project**: play-play-editor
**Strategy**: Git Flow + Phase-Based Naming

---

## Branch Naming

```bash
# Feature branches
feature/phase-{N}-{description}
Examples:
  feature/phase-1-core-architecture
  feature/phase-1-typescript-types
  feature/phase-2-camera-controls

# Release branches
release/v{MAJOR}.{MINOR}.{PATCH}-phase{N}
Example: release/v0.1.0-phase1

# Hotfix branches
hotfix/v{MAJOR}.{MINOR}.{PATCH}-{description}
Example: hotfix/v1.0.1-security-patch
```

---

## Common Commands

### Start New Phase

```bash
git checkout develop
git pull origin develop
git checkout -b feature/phase-{N}-{name}
git push -u origin feature/phase-{N}-{name}

# Or just say to Claude: "Start Phase {N}"
```

### Work on Task Within Phase

```bash
git checkout feature/phase-{N}-{name}
git checkout -b feature/phase-{N}-{task}
git push -u origin feature/phase-{N}-{task}

# Or just say to Claude: "Work on {task}"
```

### Sync Personal Branch (Daily - Recommended)

```bash
# Rebase to get latest changes (keeps history clean)
git checkout feature/phase-{N}-{task}
git fetch origin
git rebase feature/phase-{N}-{name}

# If conflicts: resolve, then git rebase --continue
# If already pushed: git push --force-with-lease

# Or just say to Claude: "Update my branch"
```

### Clean Up Commits Before Merge (Optional)

```bash
# Interactive rebase to squash/reword commits
git rebase -i HEAD~5  # Last 5 commits

# In editor: change "pick" to "squash" or "reword"
# Save and close

# Force push if already pushed
git push --force-with-lease

# Or just say to Claude: "Clean up my commits"
```

### Complete Task (Merge to Phase Branch)

```bash
git checkout feature/phase-{N}-{name}
git merge feature/phase-{N}-{task} --no-ff
git push origin feature/phase-{N}-{name}
git branch -d feature/phase-{N}-{task}

# Or just say to Claude: "Task complete"
```

### Complete Phase (Release)

```bash
# Step 1: Merge to develop
git checkout develop
git merge feature/phase-{N}-{name} --no-ff
git push origin develop

# Step 2: Create release
git checkout -b release/v{X}.{Y}.{Z}-phase{N}
# Update package.json version, CHANGELOG.md
git commit -am "chore(release): prepare v{X}.{Y}.{Z}"

# Step 3: Merge to main
git checkout main
git merge release/v{X}.{Y}.{Z}-phase{N} --no-ff
git tag -a v{X}.{Y}.{Z} -m "Phase {N} complete"
git push origin main --tags

# Step 4: Merge back to develop
git checkout develop
git merge release/v{X}.{Y}.{Z}-phase{N} --no-ff
git push origin develop

# Or just say to Claude: "Phase complete"
```

### Emergency Hotfix

```bash
# From main (not develop!)
git checkout main
git pull origin main
git checkout -b hotfix/v{X}.{Y}.{Z+1}-{description}

# Fix the bug
git commit -am "fix: {description}"

# Merge to main
git checkout main
git merge hotfix/v{X}.{Y}.{Z+1}-{description} --no-ff
git tag -a v{X}.{Y}.{Z+1} -m "Hotfix: {description}"
git push origin main --tags

# Merge to develop (important!)
git checkout develop
git merge hotfix/v{X}.{Y}.{Z+1}-{description} --no-ff
git push origin develop

# Or just say to Claude: "Critical bug in production"
```

---

## Decision Tree

```
What do you want to do?
│
├─ Start new Phase
│  → git checkout develop
│  → git checkout -b feature/phase-{N}-{name}
│
├─ Work on task in Phase
│  → git checkout feature/phase-{N}-{name}
│  → git checkout -b feature/phase-{N}-{task}
│
├─ Finish task
│  → git checkout feature/phase-{N}-{name}
│  → git merge feature/phase-{N}-{task} --no-ff
│
├─ Finish Phase (release)
│  → Merge to develop → Create release → Merge to main
│
└─ Fix production bug
   → git checkout main
   → git checkout -b hotfix/v{X}.{Y}.{Z+1}-{desc}
```

---

## Rules to Remember

### ✅ DO

- Always branch from `develop` (not `main`)
- Use `--no-ff` when merging to public branches
- Include Phase number in branch names
- Rebase personal branches daily (keeps history clean)
- Use `--force-with-lease` (not `--force`) when needed
- Clean up commits before merging (optional but nice)
- Let Claude guide you if unsure

### ❌ DON'T

- Never commit directly to `main`
- Never commit directly to `develop` (use feature branches)
- Never force push to `main` or `develop`
- Never delete `main` or `develop` branches
- Never rebase public/shared branches (main, develop, Phase branches)
- Never use `--force` (use `--force-with-lease` instead)

---

## Phase → Version Mapping

| Phase   | Version | Description                                  |
| ------- | ------- | -------------------------------------------- |
| Phase 0 | v0.0.0  | Project Foundation                           |
| Phase 1 | v0.1.0  | Core Architecture                            |
| Phase 2 | v0.2.0  | 3D Viewport Foundation                       |
| Phase 3 | v0.3.0  | Scene Management                             |
| Phase 4 | v0.4.0  | UI Components                                |
| Phase 5 | v0.5.0  | History & Advanced Features                  |
| Phase 6 | v1.0.0  | Polish & Optimization (First Stable Release) |

---

## When in Doubt

Just ask Claude in natural language:

- "Start Phase 2"
- "Work on TypeScript types"
- "Update my branch" → Rebase to latest
- "Clean up my commits" → Interactive rebase
- "Task complete" → Merge with --no-ff
- "Phase done" → Release workflow
- "Critical bug in production" → Hotfix workflow

Claude will execute the correct Git commands for you!

## Merge vs Rebase Quick Reference

| Scenario                   | Use        | Command                                      |
| -------------------------- | ---------- | -------------------------------------------- |
| Sync personal branch daily | **Rebase** | `git rebase feature/phase-{N}-{name}`        |
| Clean up commits           | **Rebase** | `git rebase -i HEAD~5`                       |
| Task → Phase branch        | **Merge**  | `git merge --no-ff feature/phase-{N}-{task}` |
| Phase → Develop            | **Merge**  | `git merge --no-ff feature/phase-{N}-{name}` |
| Release → Main             | **Merge**  | `git merge --no-ff release/v{X}.{Y}.{Z}`     |
| Get others' updates        | **Merge**  | `git merge feature/phase-{N}-{name}`         |
| Update from develop        | **Either** | Rebase (clean) or Merge (safe)               |
| Shared branch              | **NEVER**  | ❌ Don't rebase public branches              |

**Golden Rule**: Rebase private branches, Merge public milestones

---

**Full Documentation**: dev/GIT_WORKFLOW.md
