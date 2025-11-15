# `/dev-docs` Command Usage Guide

**Date**: 2025-11-13
**Category**: Claude Code
**Tags**: #slash-commands #planning #workflow #dev-docs

---

## What is `/dev-docs`?

`/dev-docs` is a **strategic planning command** that creates comprehensive, persistent documentation for complex features or phases. It generates three key files that survive context resets and serve as the single source of truth for implementation.

**Purpose**: Transform a high-level goal into detailed, actionable plans with task breakdowns.

---

## When to Use `/dev-docs`

### ✅ Should Use `/dev-docs`

1. **Starting a new feature/module**
   - Example: `/dev-docs user-authentication`
   - Example: `/dev-docs payment-integration`
   - When: Before writing any code for a non-trivial feature

2. **Beginning a new project phase**
   - Example: `/dev-docs phase-1-core-architecture`
   - Example: `/dev-docs phase-2-3d-viewport`
   - When: At major project milestones

3. **Planning large refactoring**
   - Example: `/dev-docs refactor-state-management`
   - Example: `/dev-docs migrate-to-typescript`
   - When: Before touching multiple files/modules

4. **Complex tasks needing detailed planning**
   - Example: `/dev-docs implement-undo-redo-system`
   - Example: `/dev-docs websocket-real-time-sync`
   - When: Task has >5 subtasks or affects multiple areas

5. **Architecture decisions**
   - Example: `/dev-docs editor-core-architecture`
   - Example: `/dev-docs database-schema-design`
   - When: Need to document technical decisions and trade-offs

### ❌ Should NOT Use `/dev-docs`

1. **Bug fixes** (unless complex root cause analysis needed)
   - "Fix button alignment" → Just fix it
   - "Fix state synchronization bug" → Might need `/dev-docs` if complex

2. **Small UI tweaks**
   - "Change button color to blue" → Just change it
   - "Adjust padding" → Just adjust it

3. **Simple configuration changes**
   - "Update API endpoint URL" → Just update it
   - "Add new environment variable" → Just add it

4. **Documentation updates**
   - "Update README" → Just update it
   - Unless: "Document entire API" → Use `/dev-docs api-documentation`

5. **Already planned work**
   - If you already have a detailed plan in `dev/active/`, just follow it
   - Don't re-plan what's already planned

---

## How `/dev-docs` Works

### Command Format

```bash
/dev-docs <topic-name>
```

**Examples**:

- `/dev-docs user-authentication`
- `/dev-docs phase-1-core-architecture`
- `/dev-docs refactor-database-layer`

### What It Generates

Creates `dev/active/<topic-name>/` with three files:

#### 1. `<topic>-plan.md` - The Master Plan

**Content**:

- Executive Summary
- Current State Analysis
- Proposed Future State
- Implementation Phases (broken into logical sections)
- Detailed Tasks (with acceptance criteria)
- Risk Assessment & Mitigation Strategies
- Success Metrics
- Timeline Estimates

**Purpose**: Comprehensive reference document with all context and rationale

#### 2. `<topic>-context.md` - Implementation Context

**Content**:

- Key technical decisions and why
- Dependencies and their versions
- File structure and organization
- Performance considerations
- Testing strategy
- Related documentation links

**Purpose**: Quick reference for implementation details

#### 3. `<topic>-tasks.md` - Actionable Checklist

**Content**:

- Numbered task list for each phase
- Clear acceptance criteria per task
- Effort estimates (S/M/L/XL)
- Dependencies between tasks
- Verification checklists

**Purpose**: Step-by-step execution guide

### Automatic Integration

After creating these files, `/dev-docs` automatically:

1. **Extracts tasks** from `tasks.md`
2. **Updates `dev/TODO.md`** with these tasks in "Current Sprint"
3. **Informs you**: "✅ Added X tasks to TODO.md from planning docs"

---

## Typical Workflow

### Phase 1: Planning (Use `/dev-docs`)

```
User: "I want to implement user authentication"
      ↓
User: /dev-docs user-authentication
      ↓
Claude creates:
  - dev/active/user-authentication/user-authentication-plan.md
  - dev/active/user-authentication/user-authentication-context.md
  - dev/active/user-authentication/user-authentication-tasks.md
      ↓
Claude updates:
  - dev/TODO.md (adds tasks to Current Sprint)
      ↓
Result: Complete plan ready, tasks tracked
```

### Phase 2: Execution (Follow the plan)

```
Developer reads:
  - user-authentication-tasks.md (what to do)
  - user-authentication-context.md (how to do it)
  - user-authentication-plan.md (why we're doing it)
      ↓
Claude uses TodoWrite to track session progress
      ↓
As tasks complete:
  - TodoWrite marks them complete (session-level)
  - project-todo-manager syncs to TODO.md (project-level)
      ↓
When all tasks done:
  - project-todo-manager moves to "Recently Completed"
  - Updates "Current Phase"
```

### Phase 3: Evolution (Use `/dev-docs-update`)

```
If plans change during implementation:
      ↓
User: /dev-docs-update user-authentication
      ↓
Claude:
  - Reviews current implementation
  - Updates the three docs with new insights
  - Re-syncs TODO.md with updated tasks
      ↓
Result: Plans stay current with reality
```

---

## Real-World Examples

### Example 1: Starting Project Architecture

**Scenario**: New 3D editor project, need to plan architecture

**Command**:

```bash
/dev-docs editor-core-architecture
```

**Generated**:

- `dev/active/editor-core-architecture/editor-core-architecture-plan.md` (558 lines)
  - 6 phases, 75 tasks, timeline estimates
- `dev/active/editor-core-architecture/editor-core-architecture-context.md` (290 lines)
  - Tech stack decisions, file structure, performance targets
- `dev/active/editor-core-architecture/editor-core-architecture-tasks.md` (230 lines)
  - Detailed task checklist for all 6 phases

**TODO.md Updated**:

- Added "Phase 0: Project Foundation" tasks
- Added "Phase 1: Core Architecture" to backlog

**Outcome**: Complete roadmap for 19-26 days of development

---

### Example 2: Feature Planning

**Scenario**: Need to add real-time collaboration to editor

**Command**:

```bash
/dev-docs real-time-collaboration
```

**Generated**:

- Plan: Architecture for websocket sync, operational transforms, conflict resolution
- Context: Libraries chosen (Socket.io vs WebRTC), data model, security
- Tasks: 15 implementation tasks across 3 phases

**TODO.md Updated**:

- Added "Real-time Collaboration" section
- 15 tasks added to Current Sprint

**Workflow**:

1. Implement Phase 1 (websocket setup)
2. Mark tasks complete in TODO.md as you go
3. When complete, Phase 1 moves to "Recently Completed"
4. Continue to Phase 2

---

### Example 3: Refactoring

**Scenario**: State management becoming messy, need to refactor

**Command**:

```bash
/dev-docs refactor-state-management
```

**Generated**:

- Plan: Current problems, proposed solution (Zustand consolidation), migration strategy
- Context: Which components affected, data flow changes, testing approach
- Tasks: 10 tasks (audit current state, create new stores, migrate components, test)

**TODO.md Updated**:

- Added "Refactoring: State Management" section
- Risk assessment documented (what could break)

**Safe Execution**:

- Follow task order (designed to minimize breakage)
- Each task has rollback plan
- Acceptance criteria ensure nothing breaks

---

## Integration with Other Tools

### With `project-todo-manager` Skill

```
/dev-docs creates docs
      ↓
project-todo-manager extracts tasks
      ↓
Tasks added to dev/TODO.md
      ↓
As you work, TodoWrite tracks progress
      ↓
project-todo-manager syncs TODO.md
      ↓
Completion triggers TODO.md update
```

**Benefit**: Single source of truth maintained automatically

### With Session Management

```
Session 1: /dev-docs feature-x (planning)
Session 1: Start implementing Phase 1
Session 1 ends
      ↓
Session 2 starts
Session 2: Read dev/active/feature-x/ docs
Session 2: Continue from TODO.md checkpoint
Session 2: Complete Phase 1
      ↓
Session 3: Phase 2
...
```

**Benefit**: Plans persist across sessions, no context loss

### With Git

```
Create plan: /dev-docs feature-x
Commit: "docs: plan feature-x implementation"
      ↓
Implement Phase 1
Commit: "feat: implement feature-x phase 1"
      ↓
Update plan: /dev-docs-update feature-x
Commit: "docs: update feature-x plan with learnings"
```

**Benefit**: Plans versioned alongside code

---

## Best Practices

### 1. Plan Before You Code

```
❌ Bad:
User: "I'll just start coding the auth system"
→ Gets lost halfway
→ Forgets edge cases
→ No clear completion criteria

✅ Good:
User: /dev-docs user-authentication
→ Comprehensive plan created
→ All edge cases considered
→ Clear acceptance criteria
→ Implementation focused
```

### 2. Use Descriptive Topic Names

```
❌ Bad: /dev-docs stuff
❌ Bad: /dev-docs phase1
❌ Bad: /dev-docs todo

✅ Good: /dev-docs user-authentication
✅ Good: /dev-docs phase-1-core-architecture
✅ Good: /dev-docs refactor-state-management
```

**Reason**: Topic names become directory names and file references

### 3. Read All Three Docs

```
Before coding:
1. Read plan.md → Understand the "why"
2. Read context.md → Understand the "how"
3. Read tasks.md → Understand the "what"

Then: Start implementing with full context
```

### 4. Update Plans When They Change

```
During implementation, you discover:
- Better approach
- Additional complexity
- New requirements

Don't ignore! Update the plan:
/dev-docs-update <topic>

→ Plans stay accurate
→ Future you thanks past you
→ Team members get accurate info
```

### 5. One Plan Per Feature

```
❌ Bad: /dev-docs everything
→ Plan becomes massive and unwieldy

✅ Good:
/dev-docs user-authentication
/dev-docs payment-system
/dev-docs notification-center

→ Each plan focused and manageable
```

---

## Decision Tree: Should I Use `/dev-docs`?

```
Is this task complex (>3 subtasks)?
│
├─ Yes → Will this affect multiple files/modules?
│         │
│         ├─ Yes → Use /dev-docs
│         │
│         └─ No → Is this a new feature?
│                  │
│                  ├─ Yes → Use /dev-docs
│                  │
│                  └─ No → Just implement directly
│
└─ No → Is this a major phase/milestone?
         │
         ├─ Yes → Use /dev-docs
         │
         └─ No → Just implement directly
```

---

## Common Questions

### Q: What if I already started coding without `/dev-docs`?

**A**: You can still create a plan mid-stream:

```
/dev-docs <feature-name>
→ Documents what you've done so far
→ Plans the remaining work
→ Better late than never
```

### Q: Can I modify the generated docs?

**A**: Yes! The docs are markdown files you can edit. But consider:

- If making significant changes, commit them
- Document why the plan changed
- Re-sync TODO.md if tasks changed

### Q: What if my feature is simple but I want documentation?

**A**: Use `/dev-docs` anyway if:

- It's part of a larger system
- Others will maintain it
- You want architectural decision records

Skip `/dev-docs` if:

- Truly trivial (< 30 minutes work)
- Personal project, no team
- Throwaway prototype

### Q: How do I know when a plan is "done"?

**A**: When all tasks in `<topic>-tasks.md` are checked off and moved to "Recently Completed" in TODO.md.

### Q: Can I have multiple active plans?

**A**: Yes! You can have:

```
dev/active/
├── user-authentication/   (Phase 1)
├── payment-integration/   (Phase 2)
└── notification-system/   (Phase 3)
```

But: Focus on one at a time in "Current Sprint"

---

## Summary

### Key Takeaways

1. **`/dev-docs` is for planning**, not implementation
2. **Use it for non-trivial features**, skip it for simple changes
3. **It generates 3 files**: plan, context, tasks
4. **Automatically updates TODO.md** with extracted tasks
5. **Plans persist across sessions**, surviving context resets
6. **Update plans with `/dev-docs-update`** when they change

### Quick Reference

```bash
# Create new plan
/dev-docs <topic-name>

# Update existing plan
/dev-docs-update <topic-name>

# Files created
dev/active/<topic>/
  ├── <topic>-plan.md      # Why and how
  ├── <topic>-context.md   # Implementation details
  └── <topic>-tasks.md     # What to do

# Automatic updates
dev/TODO.md  # Tasks added to Current Sprint
```

### Related Documentation

- **project-todo-manager skill** - How TODO.md auto-updates
- **Session Management Strategies** - When to continue vs new session
- **Resuming Unfinished Work** - How to continue after interruption

---

**Remember**: `/dev-docs` is your friend for complex work. It takes 5-10 minutes to create a plan, but saves hours of confusion and rework.
