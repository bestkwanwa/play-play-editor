---
name: learning-documentation
description: Guidelines for documenting learning conversations, Q&A sessions, and technical discussions. Use when saving conversations, creating learning notes, documenting explanations, or building a knowledge base from Claude Code interactions.
---

# Learning Documentation Guidelines

## Purpose

Systematic approach to capturing and organizing learning from Claude Code conversations into reusable documentation.

## When to Use This Skill

- Saving valuable Q&A conversations
- Documenting technical concepts learned
- Creating reference guides from discussions
- Building a personal knowledge base
- Recording problem-solving sessions

---

## Quick Start: Save Current Conversation

Use the `/save-qa [topic-name]` command to quickly save the current conversation.

**Example**:
```
/save-qa claude-code-infrastructure
```

This will create structured Q&A documentation in `dev/learning/[topic-name]/`

---

## Documentation Structure

### Directory Organization

```
dev/learning/
├── claude-code-setup/
│   ├── qa-2025-01-13.md
│   └── summary.md
├── skill-system/
│   ├── qa-2025-01-13.md
│   └── examples/
└── git-integration/
    └── qa-2025-01-13.md
```

### Document Format

```markdown
# [Topic] - Learning Notes

**Date**: 2025-01-13
**Duration**: ~2 hours
**Topics Covered**: Hooks, Skills, Agents, Commands

---

## Context

Why this conversation happened and what prompted it.

---

## Questions & Answers

### Q1: What are Skills in Claude Code?

**Context**: Initial confusion about the skill system

**Answer**:
[Detailed explanation...]

**Key Takeaways**:
- Skills are knowledge bases
- Auto-activate via hooks
- Project-specific rules

**Code Examples**:
```json
{
  "skill-name": {
    "type": "domain",
    "enforcement": "suggest"
  }
}
```

---

## Visual Aids

[Include diagrams, flowcharts if discussed]

---

## Summary

- Learned about...
- Understood how...
- Key insight: ...

## Action Items

- [ ] Try creating first skill
- [ ] Test skill activation
- [ ] Review documentation

## Related Topics

- See: hooks-mechanism.md
- See: agents-vs-skills.md
```

---

## Best Practices

### DO

✅ **Capture Context**: Include why the question was asked
✅ **Preserve Examples**: Keep all code snippets and commands
✅ **Add Timestamps**: Note when information might become outdated
✅ **Use Visual Hierarchy**: Headers, bullets, code blocks
✅ **Cross-Reference**: Link to related topics
✅ **Include Action Items**: Next steps to apply the learning

### DON'T

❌ Don't just copy-paste - organize and structure
❌ Don't lose context - explain the "why"
❌ Don't skip examples - they're crucial for understanding
❌ Don't forget to tag topics for searchability
❌ Don't create monolithic docs - split by topic

---

## File Naming Conventions

### Q&A Sessions
- Format: `qa-YYYY-MM-DD.md` or `qa-001.md`
- Example: `qa-2025-01-13.md`

### Topic Summaries
- Format: `[topic-name]-summary.md`
- Example: `skill-system-summary.md`

### Deep Dives
- Format: `[topic-name]-deep-dive.md`
- Example: `hooks-mechanism-deep-dive.md`

### Code Examples
- Format: `examples/[example-name].tsx`
- Example: `examples/skill-activation-test.ts`

---

## Quick Commands Reference

### Save Current Conversation
```
/save-qa [topic-name]
```

### Document Specific Topic
```
使用 documentation-architect 代理为 [topic] 创建学习文档
```

### Update Existing Documentation
```
/dev-docs-update
```

---

## Integration with Claude Code Workflow

### During Active Learning
1. Have the conversation naturally
2. When reaching a good stopping point, use `/save-qa`
3. Review and refine the generated documentation

### Before Context Reset
1. Use `/save-qa` to capture current session
2. Tag important discoveries
3. Note any unresolved questions

### After Context Reset
1. Read previous learning docs from `dev/learning/`
2. Continue from where you left off
3. Build on previous knowledge

---

## Example Workflow

```
1. User: [Asks complex question about Skills]
2. Claude: [Provides detailed explanation]
3. User: [Follow-up questions]
4. Claude: [More details, examples, comparisons]

[After good understanding is reached]

5. User: /save-qa skill-system
6. Claude: [Creates structured documentation]
7. System: Saved to dev/learning/skill-system/qa-2025-01-13.md

[Later, new session]

8. User: [New related question]
9. Claude: [Refers to previous learning doc]
10. User: Great, let's expand on that...
```

---

## Templates

### Q&A Template

```markdown
### Q: [Question]

**Context**: [Why this question came up]

**Answer**:
[Main explanation]

**Key Points**:
- Point 1
- Point 2

**Examples**:
[Code or concrete examples]

**Further Reading**:
- Related doc 1
- Related doc 2
```

### Topic Summary Template

```markdown
# [Topic] Summary

## What I Learned

1. **Concept 1**: Brief explanation
2. **Concept 2**: Brief explanation

## How It Works

[High-level overview]

## Why It Matters

[Practical implications]

## How to Use It

[Step-by-step guide]

## Common Pitfalls

- Mistake 1: How to avoid
- Mistake 2: How to avoid

## Resources

- Documentation: [link]
- Examples: [link]
```

---

## Tips for Effective Documentation

### Make It Searchable
- Use clear, specific headings
- Include keywords in context
- Tag related concepts

### Make It Reusable
- Write for "future you"
- Assume no prior context
- Include complete examples

### Make It Maintainable
- Date all entries
- Note version-specific information
- Update when patterns change

### Make It Discoverable
- Create index files
- Use consistent naming
- Maintain table of contents

---

## Related Files

- **Commands**: `.claude/commands/save-qa.md`
- **Learning Directory**: `dev/learning/`
- **Documentation Agent**: `.claude/agents/documentation-architect.md`

---

**Last Updated**: 2025-01-13
**Status**: Active
**Line Count**: < 500 ✅
