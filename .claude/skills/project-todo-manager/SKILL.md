---
name: project-todo-manager
description: Manages project TODO.md synchronization with dev docs and tracks project progress
triggers:
  keywords:
    - update todo
    - sync todo
    - 更新待办
    - 同步进度
  file_paths:
    - "dev/docs/**/*.md"
    - "dev/TODO.md"
---

# Project TODO Manager

This skill ensures **automatic synchronization** between `dev/docs/` planning documents and `dev/TODO.md` project tracking.

## Core Responsibilities

### 1. Auto-Generate TODO Items from Dev Docs

**When `/dev-docs` command is executed:**
- Extract all task items from the generated planning document
- Format them as markdown checkboxes `- [ ]`
- Add them to `dev/TODO.md` under appropriate sections
- Preserve existing completed items

**Example:**
```markdown
# dev/docs/user-authentication.md
## Implementation Steps
1. Create user schema
2. Implement JWT tokens
3. Add login endpoint

→ Automatically added to dev/TODO.md:
## Current Sprint: User Authentication
- [ ] Create user schema (dev/docs/user-authentication.md:1057)
- [ ] Implement JWT tokens (dev/docs/user-authentication.md:1058)
- [ ] Add login endpoint (dev/docs/user-authentication.md:1059)
```

### 2. Auto-Update Progress

**When completing implementation:**
- After finishing a feature, ASK: "Should I mark the corresponding TODO items as completed?"
- Update `dev/TODO.md` with `[x]` for completed items
- Add reference to the implementation (file paths, commit hash if available)

**Example:**
```markdown
Before:
- [ ] Create user schema

After implementation:
- [x] Create user schema (src/models/User.ts:12)
```

### 3. Maintain Sync with Dev Docs

**When `/dev-docs-update` is executed:**
- Compare current `dev/docs/*.md` with `dev/TODO.md`
- Add new tasks discovered in updated docs
- Keep completed items as completed
- Archive old irrelevant tasks to "Completed" section

### 4. Remind About Personal Session Notes

**At session end or major milestone:**
- Remind user: "Consider updating your `dev/NEXT_SESSION.md` with next steps"
- Do NOT edit NEXT_SESSION.md automatically (it's personal)

## File Structure

```
dev/
├── TODO.md              # Auto-maintained by Claude
├── NEXT_SESSION.md      # User's personal notes (not auto-updated)
└── docs/
    └── feature-x.md     # Source of truth for tasks
```

## TODO.md Format

```markdown
# Project TODO

**Last Updated**: YYYY-MM-DD
**Current Phase**: [Phase name]

## 🎯 Current Sprint

### Feature A (dev/docs/feature-a.md)
- [x] Completed task (src/file.ts:123)
- [ ] Pending task
- [ ] Another task

### Feature B (dev/docs/feature-b.md)
- [ ] Task 1
- [ ] Task 2

## 📦 Backlog
- [ ] Future task 1
- [ ] Future task 2

## ✅ Recently Completed
- [x] Old task 1 (completed YYYY-MM-DD)
- [x] Old task 2 (completed YYYY-MM-DD)
```

## Automation Rules

### ✅ DO Auto-Update TODO.md

1. **After `/dev-docs <topic>`**:
   ```
   → Extract tasks from dev/docs/<topic>.md
   → Add to "Current Sprint" section
   → Format: - [ ] Task name (dev/docs/topic.md:line)
   ```

2. **After feature completion**:
   ```
   → Ask: "Should I mark TODO items as complete?"
   → Update: - [x] Task name (implementation-file.ts:line)
   → Add timestamp if major milestone
   ```

3. **After `/dev-docs-update`**:
   ```
   → Re-sync tasks from updated docs
   → Move completed items to "Recently Completed"
   → Add new tasks to "Current Sprint"
   ```

### ❌ DO NOT Auto-Update

1. **NEXT_SESSION.md** - User's personal file
2. **TODO.md** - Without explicit trigger or permission
3. **Backlog section** - Unless user specifically requests

## Integration with Other Files

### With Dev Docs (`dev/docs/*.md`)
- **Source of truth** for detailed planning
- TODO.md is the **summary view**
- Always extract tasks FROM docs TO todo

### With NEXT_SESSION.md
- **Independent files** with different purposes
- TODO.md = Project-level tracking (team-visible)
- NEXT_SESSION.md = Personal session planning (individual)
- Remind user to check TODO.md when planning NEXT_SESSION.md

### With Git Commits
- **Include TODO.md in commits** when tasks are completed
- Commit message should mention which TODO items were finished
- Example: `feat: implement user auth [TODO: user-authentication items]`

## Usage Examples

### Example 1: Starting New Feature

**User:** "Let's plan the user authentication feature"

**Claude:**
```
I'll create a planning document using /dev-docs user-authentication
[Creates dev/docs/user-authentication.md with detailed steps]

Now I'll update dev/TODO.md with the tasks from this plan...
[Adds tasks to TODO.md under "Current Sprint"]

✅ Created:
- dev/docs/user-authentication.md (detailed plan)
- dev/TODO.md (updated with 5 new tasks)
```

### Example 2: Completing Feature

**User:** "I've finished implementing the JWT tokens"

**Claude:**
```
Great! Should I mark the corresponding TODO item as completed?

[If yes:]
✅ Updated dev/TODO.md:
- [x] Implement JWT tokens (src/auth/jwt.ts:45)
```

### Example 3: Session End

**Claude:**
```
We've completed the user schema and JWT implementation.

📋 Project TODO (dev/TODO.md) has been updated
💡 Consider updating your dev/NEXT_SESSION.md with:
   - Next: Implement login endpoint
   - Reference: dev/docs/user-authentication.md
```

## Best Practices

1. **Always reference source**
   - Include file paths in TODO items
   - Link back to dev docs: `(dev/docs/feature.md:line)`
   - Link to implementation: `(src/file.ts:line)`

2. **Keep TODO.md concise**
   - One line per task
   - Detailed info stays in dev/docs/
   - Use clear action verbs: "Create", "Implement", "Fix", "Refactor"

3. **Maintain temporal sections**
   - Current Sprint = Active work
   - Backlog = Planned but not started
   - Recently Completed = Last 2-3 weeks

4. **Sync frequency**
   - After every `/dev-docs` execution
   - After completing significant features
   - Before major commits
   - When user explicitly requests

## Troubleshooting

**Q: TODO.md and dev docs out of sync?**
A: Run `/dev-docs-update` to re-sync

**Q: Too many completed items cluttering TODO.md?**
A: Archive old items to a "Completed Archive" section or separate file

**Q: User wants to manually edit TODO.md?**
A: Discourage for consistency, but if they do, respect their changes

**Q: NEXT_SESSION.md not updating?**
A: By design - it's a personal file, user maintains it

## Summary

- **Automate**: TODO.md ↔ dev/docs/ synchronization
- **Track**: Project-level progress visible to all team members
- **Preserve**: Personal NEXT_SESSION.md for individual planning
- **Commit**: Always include updated TODO.md in commits
- **Remind**: Prompt user about NEXT_SESSION.md at session end
