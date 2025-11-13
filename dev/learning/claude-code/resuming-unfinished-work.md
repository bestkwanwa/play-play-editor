# Resuming Unfinished Work Across Sessions

**Date**: 2025-11-13
**Category**: Claude Code
**Tags**: #session-management #workflow #context-continuity #best-practices
**Rounds**: 2 selected exchanges

---

## Overview

When working on complex development tasks, you often need to pause work and start a new session later. This guide explains how to properly prepare for session transitions and resume work without losing context or repeating completed tasks.

The two key questions covered:

1. When should you start a new session vs. continue the current one?
2. How do you properly resume unfinished work in a new session?

---

## Q1: When Should I Start a New Session?

**Context**: You're in the middle of a multi-phase project (e.g., Phase 0 of a 6-phase architecture implementation) and wondering if this is the right time to start a new session.

### The Decision Framework

#### Continue Current Session When:

- ✅ **Token usage < 80%** - Still have plenty of context space
- ✅ **High task relevance** - Next task is directly related to current work
- ✅ **Natural continuity** - Work flows logically (e.g., planning → initialization)
- ✅ **Simple next steps** - Upcoming tasks won't consume much context

#### Start New Session When:

- ❌ **Token usage > 80%** - Context space running low
- ❌ **Context shift** - Switching to unrelated work area
- ❌ **Natural breakpoint** - Just finished a major phase/milestone
- ❌ **Complex upcoming work** - Next tasks need full context space

### Example Analysis

**Scenario**: Just finished architecture planning (32% tokens used), ready to start project initialization (Phase 0)

**Analysis**:

```
Token Health:     32% used, 68% remaining → ✅ Continue
Task Relevance:   Planning → Implementation → ✅ Continue
Workflow:         Planning naturally flows to setup → ✅ Continue
Next Task Size:   Phase 0 is simple (install deps, configs) → ✅ Continue
```

**Decision**: Continue current session, complete Phase 0, then start new session for Phase 1 (core development)

### Key Principles

1. **Token budget**: Keep track of context usage
2. **Task coherence**: Related tasks benefit from shared context
3. **Natural boundaries**: End sessions at logical stopping points
4. **Complexity assessment**: Save context space for complex work

**Best Practice**: Complete simple setup/configuration work in current session, start fresh for core implementation.

---

## Q2: How Do I Resume Unfinished Work in a New Session?

**Context**: You need to pause work mid-phase (e.g., halfway through Phase 0) and want to know the proper workflow for resuming in a new session.

### The Three-Step Workflow

#### Step 1: Prepare Before Ending Current Session

##### A. Commit Current Progress

```bash
# Commit all completed work with descriptive message
git add .
git commit -m "wip: Phase 0 in progress - completed tasks 0.1-0.3"
```

**Key points**:

- Use "wip:" prefix for work-in-progress commits
- Specify exactly what's completed
- Include enough detail to understand state

##### B. Update Project TODO

Mark completed tasks clearly:

```markdown
## Current Sprint: Phase 0

### Task 0.1: Initialize Project

- [x] Run initialization command ✓
- [x] Verify project structure ✓
- [x] Commit initialization ✓

### Task 0.2: Configure TypeScript

- [x] Enable strict mode ✓
- [x] Add path aliases ✓

### Task 0.3: Install Dependencies

- [x] Install core library ✓
- [ ] Install UI library ← STOPPED HERE
- [ ] Install state management library

### Task 0.4: Configure Linting

- [ ] Not started yet
```

**Important**: Use clear markers like "← STOPPED HERE" or "⏳ In Progress"

##### C. Create Personal Session Notes (Recommended)

Create or update `dev/NEXT_SESSION.md`:

```markdown
# Next Session Plan

**Date**: 2025-11-13
**Focus**: Continue Phase 0 - Project Initialization

## 📋 Current Progress

### Completed ✓

- [x] Project initialized
- [x] TypeScript configured
- [x] Core library installed

### In Progress ⏳

- [ ] UI library installation (Task 0.3)
  - Command to run: `npm install @ui/library`
  - Currently halfway through dependency installation

### Not Started 📋

- [ ] State management library (Task 0.3)
- [ ] Linting configuration (Task 0.4)
- [ ] Testing setup (Task 0.5)

## 🎯 Next Session Goals

1. Complete Task 0.3: Install remaining dependencies
2. Complete Task 0.4: Configure ESLint & Prettier
3. Complete Task 0.5: Configure testing framework
4. Complete Task 0.6: Verify development environment

## 📚 Key References

- `dev/active/project-name/tasks.md` - Detailed task checklist
- `dev/TODO.md` - Current project status
- Last commit: "wip: Phase 0 in progress - completed 0.1-0.3"

## 💡 Important Notes

- Previous issues encountered: None
- Special considerations: TypeScript strict mode requires compatible linting config
- Dependencies versions: Using latest stable versions
```

##### D. Optional: Update Architecture Docs

If significant changes or discoveries:

```bash
# Update planning documents with new insights
/dev-docs-update Brief description of what changed
```

---

#### Step 2: Begin New Session

##### A. Read Project State (5 minutes, priority order)

**1. Read `dev/TODO.md` (2 minutes)**

```
Purpose: Understand current phase and task status
Look for:
- "Current Sprint" section → What phase/milestone?
- Completed tasks [x] → What's already done?
- Pending tasks [ ] → What's left?
- Special markers → Where did work stop?
```

**2. Read `dev/NEXT_SESSION.md` (1 minute)**

```
Purpose: Your own notes about exact state
Look for:
- Progress summary
- Next steps list
- Important notes or blockers
- Reference to specific commands or files
```

**3. Read Detailed Task Docs (2 minutes)**

```
Purpose: Understand task requirements and acceptance criteria
File: dev/active/[project-name]/tasks.md
Look for:
- Specific task requirements
- Acceptance criteria
- Effort estimates
- Dependencies between tasks
```

##### B. Provide Clear Context to Claude

**Good opening message template**:

```
I'm continuing [Phase/Task Name] from the previous session.

Progress so far:
- Completed: [Task X, Task Y]
- In progress: [Task Z - specific state]
- Next: [What needs to be done]

Please help me complete [specific tasks].
```

**Example**:

```
I'm continuing Phase 0 project initialization.

Progress so far:
- Completed: Tasks 0.1 (Vite init) and 0.2 (TypeScript config)
- In progress: Task 0.3 - installed core library, need UI library and state management
- Next: Complete Task 0.3, then configure linting and testing

Please help me install the remaining dependencies and set up linting.
```

##### C. Claude's Standard Response

When you provide clear context, Claude will:

1. ✅ Read `dev/TODO.md` to confirm progress
2. ✅ Read relevant task documentation
3. ✅ Create a new TodoWrite task list for the session
4. ✅ Continue from the correct stopping point
5. ✅ Not repeat completed work

---

#### Step 3: Verify Correct Resumption

##### ✅ Success Indicators

- Claude accurately states what was completed
- Claude lists remaining tasks correctly
- Claude starts from the right point
- No duplication of finished work

##### ❌ Failure Indicators (Requires Correction)

- Claude doesn't know previous progress
- Claude wants to restart from beginning
- Claude skips or forgets completed tasks

**If resumption fails, say**:

```
Wait, Tasks 0.1 and 0.2 were already completed in the previous session.
Please check dev/TODO.md to confirm the current progress.
```

---

## Key Files and Their Roles

### Project-Level Files (Git Tracked)

| File                          | Purpose                   | When Updated              | Maintained By |
| ----------------------------- | ------------------------- | ------------------------- | ------------- |
| **`dev/TODO.md`**             | Project progress overview | After completing tasks    | Claude (auto) |
| **`dev/active/*/tasks.md`**   | Detailed task checklist   | Rarely (during planning)  | Claude (auto) |
| **`dev/active/*/context.md`** | Architecture & context    | When architecture changes | Claude (auto) |
| **`dev/active/*/plan.md`**    | Implementation plan       | During planning phase     | Claude (auto) |

### Personal Files (Git Ignored)

| File                      | Purpose                | When Updated      | Maintained By |
| ------------------------- | ---------------------- | ----------------- | ------------- |
| **`dev/NEXT_SESSION.md`** | Personal session notes | Session start/end | You (manual)  |

**Important**: Personal session notes are NOT tracked in Git. Each team member maintains their own.

---

## Synthesized Summary

### Core Insights

1. **Session boundaries are strategic decisions** - Don't restart arbitrarily; consider token budget, task coherence, and natural breakpoints.

2. **Documentation enables continuity** - Three key files (TODO.md, tasks.md, NEXT_SESSION.md) provide the necessary context to resume work seamlessly.

3. **Clear communication is critical** - When starting a new session, explicitly tell Claude what's done, what's in progress, and what's next.

4. **Git commits mark progress** - Use descriptive "wip:" commits to checkpoint progress and communicate state through commit messages.

### Best Practices

#### Session End Checklist

```
✅ Commit current code with clear message
✅ Update TODO.md with progress markers
✅ Write NEXT_SESSION.md with detailed state
✅ Optional: Update architecture docs if needed
```

#### Session Start Checklist

```
✅ Read TODO.md (2 min)
✅ Read NEXT_SESSION.md (1 min)
✅ Read detailed task docs (2 min)
✅ Tell Claude: what's done, in progress, next
```

#### Progress Marking Conventions

```markdown
- [x] Task ✓ Completed
- [x] Task ✓ Completed (file.ts:123)
- [ ] Task ⏳ In Progress (50% done)
- [ ] Task ← STOPPED HERE
- [ ] Task 📋 Not Started
```

### Common Patterns

#### Pattern 1: Mid-Phase Interruption

```
Scenario: Need to stop halfway through Phase 0
Action:
  1. Commit with "wip: Phase 0 partial - completed 0.1-0.3"
  2. Mark Task 0.4 with "⏳ In Progress"
  3. Note exact state in NEXT_SESSION.md
  4. New session: Read docs → Tell Claude state → Continue
```

#### Pattern 2: Natural Phase Boundary

```
Scenario: Just completed Phase 0, ready for Phase 1
Action:
  1. Commit with "feat: complete Phase 0 - project foundation"
  2. Update TODO.md: Phase 0 → Recently Completed
  3. Start new session with fresh context for Phase 1
  4. New session: Tell Claude "Phase 0 complete, starting Phase 1"
```

#### Pattern 3: Daily Work Rhythm

```
Morning:
  - Read TODO.md and NEXT_SESSION.md
  - Tell Claude the plan for today
  - Work on tasks

End of Day:
  - Commit progress
  - Update TODO.md
  - Update NEXT_SESSION.md for tomorrow
  - New session next day
```

---

## Practical Application

### When to Use This Knowledge

1. **Long-running projects** - Multi-phase implementations that span days or weeks
2. **Daily development workflow** - Starting fresh each work session
3. **Context preservation** - When you need to maintain continuity across interruptions
4. **Team collaboration** - Multiple developers working on the same project
5. **Complex implementations** - When task state needs careful tracking

### Example Scenarios

#### Scenario 1: Running Out of Context

```
Situation: 85% token usage, still have work to do
Decision: End session now
Actions:
  - Commit current work
  - Update TODO.md and NEXT_SESSION.md
  - Start fresh session immediately or later
Result: New session with full context capacity
```

#### Scenario 2: End of Work Day

```
Situation: Need to stop for the day, mid-task
Decision: Prepare for tomorrow
Actions:
  - Commit with detailed state
  - Write detailed NEXT_SESSION.md
  - Tomorrow: Read notes, resume work
Result: Smooth continuation next day
```

#### Scenario 3: Emergency Interruption

```
Situation: Must stop immediately
Minimum Actions:
  - Quick commit: "wip: saving current state"
  - Mental note or quick text file with state
  - Later: Reconstruct from commit and code
Result: Can resume with some context reconstruction
```

---

## Related Topics

- **Session Management Strategies** - When to continue vs. start new sessions
- **Git Workflow Best Practices** - Effective commit messages and branching
- **Documentation Patterns** - Using dev docs pattern for complex projects
- **Context Management** - Maximizing effectiveness within token limits
- **Team Collaboration** - Sharing progress and coordinating work

---

## Tips and Tricks

### For Maximum Continuity

1. **Commit frequently with good messages**

   ```bash
   # Good
   git commit -m "wip: auth module 70% - login works, signup pending"

   # Bad
   git commit -m "wip"
   ```

2. **Use emoji markers in TODO.md**

   ```markdown
   - [x] Task ✓
   - [ ] Task ⏳
   - [ ] Task ← YOU ARE HERE
   - [ ] Task 📋
   ```

3. **Write NEXT_SESSION.md as if for someone else**
   - Be specific about exact state
   - Include command snippets
   - Note any gotchas or blockers

4. **Keep file references handy**
   ```markdown
   ## Quick Links

   - Plan: dev/active/project/plan.md
   - Tasks: dev/active/project/tasks.md
   - Current: Task 0.3 in tasks.md
   - Last commit: abc1234
   ```

### Debugging Resumption Issues

If Claude doesn't correctly resume:

1. **Check TODO.md** - Is progress clearly marked?
2. **Check last commit** - Does message indicate state?
3. **Be explicit** - Tell Claude: "Task X is done, Task Y is 50% done, start at Task Y"
4. **Show files** - Paste relevant section of TODO.md if needed

---

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│ Session End Workflow                        │
├─────────────────────────────────────────────┤
│ 1. git commit -m "wip: state description"   │
│ 2. Update TODO.md with progress markers     │
│ 3. Write NEXT_SESSION.md with details       │
│ 4. Optional: /dev-docs-update if needed     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Session Start Workflow                      │
├─────────────────────────────────────────────┤
│ 1. Read TODO.md (2 min)                     │
│ 2. Read NEXT_SESSION.md (1 min)             │
│ 3. Read task docs (2 min)                   │
│ 4. Tell Claude: Done / In Progress / Next   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ File Roles                                  │
├─────────────────────────────────────────────┤
│ TODO.md        → Project status (Git)       │
│ tasks.md       → Task details (Git)         │
│ NEXT_SESSION   → Personal notes (No Git)    │
└─────────────────────────────────────────────┘
```

---

**Remember**: The goal is to make resuming work feel seamless. Invest 3-5 minutes in proper documentation at session end, and you'll save 15+ minutes of context reconstruction at session start.
