# CSS Debugger Skill

Enforces systematic CSS debugging workflow for all styling issues in the play-play-editor project.

## Purpose

This skill prevents inefficient trial-and-error CSS debugging by enforcing a systematic, comprehensive approach to diagnosing and fixing ALL CSS and styling issues.

## When This Skill Activates

The skill automatically activates when:

1. **Keywords detected:** css, styling, style, layout, height, width, padding, margin, color, font, animation, transition, responsive, z-index, overflow (and Chinese equivalents)

2. **Intent patterns matched:**
   - User reports CSS/styling not working as expected
   - User mentions visual/layout issues
   - User asks to fix styling problems
   - User reports elements not displaying correctly

3. **Example triggers:**
   - "Sidebar height not working"
   - "Colors not applying"
   - "Animation is broken"
   - "Layout issues on mobile"
   - "样式不对" (style is wrong)

## Coverage

This skill covers ALL CSS issues across 8 categories:

1. **Layout Issues** - Height, width, positioning, flex, grid
2. **Visual Styling** - Colors, backgrounds, borders, shadows
3. **Typography** - Fonts, text sizing, spacing, line-height
4. **Spacing** - Margin, padding, gaps
5. **Animations/Transitions** - CSS animations, transitions, transforms
6. **Responsive Design** - Breakpoints, mobile/desktop layouts
7. **Stacking/Visibility** - Z-index, stacking contexts, visibility
8. **Overflow/Scrolling** - Scrollbars, content clipping, scroll behavior

## Workflow

When activated, the skill enforces this systematic approach:

### Phase 1: Issue Classification
Identify which category(ies) the issue falls into

### Phase 2: Context Gathering
- Read complete file chains
- Map DOM/component hierarchy
- Check relevant CSS properties
- Identify conflicting styles

### Phase 3: Root Cause Analysis
Identify THE root cause (not just symptoms)

### Phase 4: Comprehensive Fix
Apply one-shot fix addressing the root cause

### Phase 5: Validation
Verify fix works and has no side effects

## Key Principles

1. **NEVER use trial-and-error** - Always analyze first
2. **ALWAYS read complete file chains** - Don't guess
3. **ALWAYS identify root cause** - Fix causes, not symptoms
4. **ALWAYS apply comprehensive fixes** - Not band-aids
5. **ALWAYS validate** - Ensure fix works completely

## Example Usage

**Bad (prevented by this skill):**
```
User: "Sidebar height not working"
Assistant: *tries h-full*
Assistant: *tries flex*
Assistant: *tries absolute positioning*
[10 failed attempts...]
```

**Good (enforced by this skill):**
```
User: "Sidebar height not working"

Issue Classification: Layout - Height inheritance

Context Analysis:
- #root: height: 100vh ✓
- App wrapper: missing h-full ✗
- EditorLayout: h-full ✓
- Sidebar: height: 100% ✓

Root Cause: App wrapper breaks height chain

Fix: Add h-full to App.tsx:17 wrapper div

Validation: ✓ Complete height chain verified
```

## Benefits

- Prevents frustration from repeated failed attempts
- Saves time by identifying root causes upfront
- Ensures comprehensive fixes, not temporary patches
- Builds understanding of CSS behavior
- Creates consistent debugging patterns

## Configuration

- **Type:** domain
- **Enforcement:** suggest (appears when triggered, doesn't block)
- **Priority:** high (activates frequently for CSS work)

## Related Skills

- `skill-developer` - For creating/modifying this skill
- Future: `css-architecture-agent` - For deep diagnostic analysis

## Validation & Improvement

After using this skill, we'll evaluate:
1. Does it reduce CSS debugging iterations?
2. Are fixes more comprehensive?
3. Does it catch all CSS issue types?
4. Should enforcement level increase to "warn" or "block"?

Based on validation, we may:
- Create a complementary Agent for deep diagnosis
- Adjust trigger patterns
- Refine workflow steps
- Update enforcement level
