# dev/ Directory Structure Rules

**Purpose**: Define strict rules for what files and directories can exist in `dev/`
**Last Updated**: 2025-11-17
**Why this exists**: To prevent arbitrary file creation and maintain project organization

---

## ⚠️ Core Principle

**DO NOT create files in `dev/` unless explicitly allowed by this document.**

If you think a new file type is needed, **discuss with the team first** and update this document.

---

## ✅ Allowed Directory Structure

```
dev/
├── TODO.md                      ✅ Project-wide task tracking (auto-updated by Claude)
├── CONTRIBUTING.md              ✅ Team collaboration guide
├── DEV_DIRECTORY_RULES.md       ✅ This file (structure rules)
│
├── learning/                    ✅ General knowledge base (team-wide)
│   ├── README.md
│   ├── git-workflow/           ✅ Git workflow documentation
│   ├── [topic-name]/           ✅ Q&A sessions, tutorials, examples
│   └── index.md
│
├── active/                      ✅ Active development planning (feature-specific)
│   └── [feature-name]/         ✅ Created by /dev-docs command
│       ├── [feature]-plan.md
│       ├── [feature]-context.md
│       └── [feature]-tasks.md
│
└── NEXT_SESSION.md              ❌ Personal notes (NOT committed to Git)
```

---

## 📋 File Type Definitions

### 1. TODO.md

- **Purpose**: Project-wide task tracking visible across all sessions
- **Managed by**: Claude Code (via project-todo-manager skill)
- **Update triggers**:
  - `/dev-docs` command creates new tasks
  - Feature completion marks tasks as done
- **Manual editing**: ❌ Avoid (let Claude maintain it)

### 2. CONTRIBUTING.md

- **Purpose**: Onboarding guide for new team members
- **Content**: Workflow, commands, best practices
- **Updates**: When team processes change
- **Manual editing**: ✅ Allowed (requires team discussion)

### 3. DEV_DIRECTORY_RULES.md (this file)

- **Purpose**: Define what can exist in `dev/`
- **Content**: Allowed files, directory structure, rules
- **Updates**: When new file types are needed
- **Manual editing**: ✅ Allowed (requires team discussion)

### 4. learning/

- **Purpose**: General knowledge that applies across features
- **Examples**:
  - Git workflow guides
  - Q&A sessions saved with `/save-qa`
  - Architectural patterns
  - Best practices
- **Structure**: Topic-based subdirectories
- **Creation**:
  - Use `/save-qa [topic]` for Q&A
  - Manually create for guides/tutorials

### 5. active/ (or docs/)

- **Purpose**: Feature-specific planning documents
- **Created by**: `/dev-docs [feature-name]` command
- **Content**: Plan, context, task checklist for a specific feature
- **Lifecycle**:
  - Created when planning a feature
  - Updated during development
  - Moved to archive after completion (optional)

### 6. NEXT_SESSION.md

- **Purpose**: Personal session planning (individual developer's notes)
- **Git status**: ❌ NOT committed (in .gitignore)
- **Template**: `NEXT_SESSION.template.md`
- **Usage**: Optional, for personal workflow

---

## ❌ What NOT to Create

### Forbidden File Types

| File Type           | Why Forbidden                    | Alternative                         |
| ------------------- | -------------------------------- | ----------------------------------- |
| `PROJECT_STATUS.md` | Duplicate of TODO.md             | Use TODO.md "Current Phase" section |
| `ROADMAP.md`        | Duplicate of TODO.md             | Use TODO.md "Backlog" section       |
| `ARCHITECTURE.md`   | Should be in active/             | Create via `/dev-docs architecture` |
| `CHANGELOG.md`      | Git commit history is sufficient | Use `git log` or GitHub releases    |
| Random `.txt` files | No defined purpose               | Use appropriate category            |
| Personal notes      | Belongs in NEXT_SESSION.md       | Don't commit to Git                 |

### Why So Strict?

1. **Avoid duplication**: Multiple files with overlapping content get out of sync
2. **Clear ownership**: Each file has a clear purpose and maintainer
3. **Easier onboarding**: New developers know where to find information
4. **Automation-friendly**: Claude can update files programmatically

---

## 🤖 Claude Code Rules

### When Claude Can Create Files

✅ **Automatically allowed**:

- Creating subdirectories in `learning/` (via `/save-qa`)
- Creating subdirectories in `active/` (via `/dev-docs`)
- Updating `TODO.md` (via project-todo-manager skill)

❌ **Requires discussion**:

- New top-level files in `dev/`
- New file types not listed in this document
- Renaming existing structure

### When User Requests a New File

**Claude should**:

1. ❌ **Stop** - Don't create the file immediately
2. 🤔 **Question** - "This file type isn't in DEV_DIRECTORY_RULES.md. Can you explain why it's needed?"
3. 💡 **Suggest** - Point to existing alternatives (TODO.md, learning/, active/)
4. ✅ **Discuss** - If truly needed, propose updating this document first

**Example**:

```
User: "Create a PROJECT_STATUS.md to track progress"

Claude: "I notice PROJECT_STATUS.md isn't in our DEV_DIRECTORY_RULES.md.
The project status is already tracked in TODO.md with:
- Current Phase
- Next Session Focus
- Recently Completed

Would that work for your needs? Or is there specific information
missing that we should add to TODO.md?"
```

---

## 📚 Reference Links

### For Developers

- **How to contribute**: `CONTRIBUTING.md`
- **Git workflow**: `learning/git-workflow/GIT_WORKFLOW.md`
- **Current tasks**: `TODO.md`

### For Claude Code

- **project-todo-manager skill**: Auto-updates TODO.md
- **learning-documentation skill**: Creates learning/ content
- **/dev-docs command**: Creates active/ planning docs

---

## 🔄 Evolution of This Document

### When to Update

Update this document when:

- ✅ Team agrees a new file type is needed
- ✅ Workflow changes require new documentation
- ✅ Directory structure needs reorganization

### Process

1. **Propose change**: Discuss with team (or in Claude session)
2. **Update this file**: Add new allowed file type with purpose
3. **Update CONTRIBUTING.md**: If workflow changes
4. **Commit together**: `git commit -m "docs: update dev/ structure rules"`

---

## 💡 Philosophy

> "A place for everything, and everything in its place."

The `dev/` directory should be:

- 📋 **Organized**: Clear hierarchy, no orphaned files
- 🎯 **Purposeful**: Every file has a defined role
- 🔄 **Maintainable**: Easy to keep up-to-date
- 🤝 **Collaborative**: Shared understanding across team

**Remember**: When in doubt, ask "Where does this belong?" before creating a file.

---

**Last Updated**: 2025-11-17
**Maintainers**: Development team
**Questions?**: Ask in Claude session or team discussion
