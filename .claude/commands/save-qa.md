---
description: Save specific Q&A rounds as reusable knowledge
argument-hint: <positions...> [topic-name] (e.g., "-3 -1" or "-5 -3 -1 session-mgmt")
---

You are a knowledge extraction specialist. Extract specific Q&A exchanges by position and document them as reusable technical knowledge.

## Parse Arguments

**Format**: `$ARGUMENTS = "<position1> [position2...] [optional-topic-name]"`

**Position Syntax:**
- Negative numbers = relative position (倒数第N轮)
- `-1` = last round (最后一轮)
- `-2` = second to last (倒数第二轮)
- `-5` = fifth from last (倒数第五轮)

**Examples:**
- `"-1"` → Save last round, auto-generate topic
- `"-3 -1"` → Save rounds at positions -3 and -1, auto-generate topic
- `"-5 -3 -1 session-management"` → Save 3 specific rounds, topic="session-management"
- `"-4 -2"` → Save 2 non-consecutive rounds, auto-generate topic

**Parsing Logic:**
1. Split $ARGUMENTS by space
2. Tokens starting with `-` and followed by digits = positions
3. Remaining text (non-position tokens) = topic name
4. If no topic provided, generate from conversation content
5. Sort positions and extract those specific rounds

**Examples of Parsing:**
- Input: `"-3 -1"` → Positions: [-3, -1], Topic: auto-generate
- Input: `"-5 -3 -1 session-management"` → Positions: [-5, -3, -1], Topic: "session-management"
- Input: `"-2 git workflow"` → Positions: [-2], Topic: "git-workflow"

---

## Extract Specific Rounds

**For each position:**
1. Count backwards from most recent exchange
2. `-1` = the very last user question + Claude answer
3. `-2` = second to last exchange
4. Extract only those specific rounds
5. Preserve the chronological order in the document (earliest first)

**Example:**
If positions are `-5, -3, -1`:
- Find the exchange at position -5
- Find the exchange at position -3
- Find the exchange at position -1
- Document them in order: -5 first, then -3, then -1

---

## Make It Generic

**Remove ALL project-specific information:**
- NO specific project names (use "your-project" or "the-project")
- NO specific file paths (use generic: "src/components/")
- NO personal names or company references
- Focus on universal concepts and patterns
- Make it applicable to anyone learning the topic

---

## Document Structure

### For Single Round (one position):

```markdown
# [Topic Name]

**Date**: YYYY-MM-DD
**Category**: [Claude Code/Git/React/TypeScript/etc]
**Tags**: #tag1 #tag2

---

## Question

[User's question, generalized if needed]

---

## Answer

[Claude's answer with all project-specific details removed]

### Key Concepts

- Concept 1
- Concept 2

### Explanation

[Detailed explanation focusing on "what" and "why"]

### Code Examples

```language
// Generic, reusable examples
```

### Important Notes

- Note 1
- Note 2

---

## Practical Application

When to use this knowledge:
- Scenario 1
- Scenario 2

## Related Topics

- Topic 1
- Topic 2
```

### For Multiple Rounds (multiple positions):

```markdown
# [Topic Name]

**Date**: YYYY-MM-DD
**Category**: [Category]
**Tags**: #tag1 #tag2
**Rounds**: [N] selected exchanges

---

## Overview

[Brief summary of what these selected conversations covered and how they relate]

---

## Q1: [First selected question]

**Position**: Round -5 (for reference)

[Question, generalized]

### Answer

[Answer with key concepts]

**Key Points:**
- Point 1
- Point 2

---

## Q2: [Second selected question]

**Position**: Round -3

[Question]

### Answer

[Answer]

**Key Points:**
- Point 1
- Point 2

---

## Q3: [Third selected question]

**Position**: Round -1

[Question]

### Answer

[Answer]

**Key Points:**
- Point 1

---

## Synthesized Summary

[Combine all selected rounds into cohesive takeaways]

### Core Insights

- Insight 1 (from combining multiple answers)
- Insight 2

### Best Practices

- Practice 1
- Practice 2

### Common Patterns

- Pattern 1
- Pattern 2

---

## Practical Application

How to apply this knowledge:
- Application 1
- Application 2

## Related Topics

- Topic 1
- Topic 2

## Further Reading

- Resource 1
- Resource 2
```

---

## Topic Name Generation

**If no topic name provided in $ARGUMENTS:**

1. Analyze the content of selected rounds
2. Identify the common theme or main topic
3. Generate concise name (2-4 words, kebab-case)

**Examples:**
- Questions about sessions → "session-management"
- Questions about git workflow → "git-workflow-guide"
- Questions about React patterns → "react-patterns"

---

## Save Location

1. Determine category from content (claude-code, git, react, typescript, etc.)
2. Use topic from $ARGUMENTS or auto-generated
3. Create: `dev/learning/[category]/[topic-name].md`
4. If file exists, append timestamp: `[topic-name]-YYYYMMDD-HHMM.md`

---

## Quality Standards

- **Technically accurate** - Preserve all technical correctness
- **Universally applicable** - Remove project-specific details
- **Self-contained** - Understandable without conversation context
- **Searchable** - Use clear keywords and terms
- **Practical** - Include actionable examples
- **Connected** - Show how multiple rounds relate to each other

---

## Date Format

- Use correct current date in format: YYYY-MM-DD
- Double-check the date from system time
- Example: 2025-11-13 for November 13, 2025

---

## Output

After creating the documentation:

1. **Confirm file path**: Show exact location where saved
2. **Show selection**: List which positions were saved (e.g., "Saved rounds: -5, -3, -1")
3. **Category and topic**: Display the category and topic name used
4. **Brief summary**: 1-2 sentences about what was documented
5. **Suggest related topics**: 2-3 related topics to explore next

---

## Examples

**Example 1: Single round**
```
User input: /save-qa -1
Result: Save last round, auto-generate topic like "react-hooks-basics"
```

**Example 2: Multiple specific rounds**
```
User input: /save-qa -5 -3 -1 session-management
Result: Save rounds at -5, -3, -1 with topic "session-management"
```

**Example 3: Non-consecutive rounds**
```
User input: /save-qa -7 -4 -2
Result: Save 3 specific rounds, skip -6, -5, -3, -1, auto-generate topic
```

---

Make the documentation clear enough that anyone without context about your specific project or conversation can understand and apply the knowledge immediately.
