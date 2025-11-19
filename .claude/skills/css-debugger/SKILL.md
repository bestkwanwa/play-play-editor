---
skill_name: css-debugger
description: Enforces systematic CSS debugging workflow for all styling issues
trigger:
  - type: keyword
    patterns:
      - "css"
      - "styling"
      - "style"
      - "layout"
      - "height"
      - "width"
      - "padding"
      - "margin"
      - "color"
      - "font"
      - "animation"
      - "transition"
      - "responsive"
      - "z-index"
      - "overflow"
  - type: intent
    patterns:
      - User reports CSS/styling not working as expected
      - User mentions visual/layout issues
      - User asks to fix styling problems
      - User reports elements not displaying correctly
enforcement_level: suggest
hooks:
  - PreToolUse
---

# CSS Debugger Skill

You are now in CSS debugging mode. This skill enforces a systematic, comprehensive approach to diagnosing and fixing ALL CSS and styling issues.

## Core Principle

**NEVER use trial-and-error CSS fixes.** Always perform systematic analysis first, identify root causes, then apply comprehensive one-shot fixes.

## Systematic CSS Debugging Workflow

### Phase 1: Issue Classification (REQUIRED)

Before attempting any fix, classify the issue into one or more categories:

1. **Layout Issues**
   - Height/width not working
   - Positioning problems (absolute, relative, fixed, sticky)
   - Flex/Grid layout issues
   - Element overlap or spacing

2. **Visual Styling Issues**
   - Colors not applying
   - Backgrounds not showing
   - Borders/shadows incorrect
   - Opacity/visibility problems

3. **Typography Issues**
   - Font not loading
   - Text size/weight/spacing incorrect
   - Line-height/alignment problems
   - Text overflow/truncation

4. **Spacing Issues**
   - Margin/padding not working
   - Gap in flex/grid incorrect
   - Inconsistent spacing

5. **Animation/Transition Issues**
   - Animations not triggering
   - Transitions not smooth
   - Transform/transition conflicts

6. **Responsive Design Issues**
   - Breakpoints not working
   - Mobile/desktop inconsistencies
   - Container queries failing

7. **Stacking/Visibility Issues**
   - Z-index not working
   - Elements hidden/obscured
   - Stacking context problems

8. **Overflow/Scrolling Issues**
   - Unwanted scrollbars
   - Content clipping
   - Scroll behavior problems

### Phase 2: Context Gathering (REQUIRED)

**CRITICAL FIRST STEP: Check for Global Style Overrides**

Before analyzing component-specific styles:
1. **Read index.css or global CSS files** - Check for:
   - Universal selector (`*`) with aggressive resets (margin: 0, padding: 0)
   - Global CSS that might override utilities
   - Conflicting @layer rules
2. **Check if Tailwind utilities are being overridden** by global styles
3. **Verify CSS specificity** - inline styles > IDs > classes > elements

Then, for the identified issue category, gather complete context:

#### For Layout Issues:
1. **Read the complete file chain** from root to problem element
2. Map parent-child hierarchy with actual class names and inline styles
3. Identify layout modes at each level (block, flex, grid, absolute)
4. Check for height/width inheritance chain breaks
5. Verify positioning contexts (nearest positioned ancestor)

#### For Visual Styling Issues:
1. Read component file and check className usage
2. Verify Tailwind classes are correct
3. Check for CSS variable usage and definitions
4. Look for conflicting styles (inline vs class vs CSS)
5. Verify theme/dark mode class inheritance

#### For Typography Issues:
1. Check font imports in index.css or layout
2. Verify font-family inheritance chain
3. Check for conflicting text utilities
4. Verify CSS variables for typography

#### For Spacing Issues:
1. Inspect element's box model (margin, border, padding, content)
2. Check for conflicting spacing utilities
3. Verify flex/grid gap vs margin usage
4. Check for negative margins affecting layout

#### For Animation/Transition Issues:
1. Check transition property definitions
2. Verify triggering state changes (hover, active, data attributes)
3. Look for conflicting animations
4. Check for will-change or GPU acceleration needs

#### For Responsive Issues:
1. Check breakpoint definitions (Tailwind config)
2. Verify responsive utility usage (sm:, md:, lg:)
3. Test container width constraints
4. Check for viewport meta tag

#### For Stacking Issues:
1. Identify stacking contexts (position + z-index, opacity, transform)
2. Map z-index values in hierarchy
3. Check for transform creating new stacking context
4. Verify isolation if needed

#### For Overflow Issues:
1. Check overflow properties on element and ancestors
2. Verify content width/height vs container
3. Check for whitespace/word-break settings
4. Verify scroll behavior properties

### Phase 3: Root Cause Analysis (REQUIRED)

Based on gathered context, identify THE root cause:

**Common Root Causes by Category:**

**Layout:**
- Missing height/width on parent elements
- Broken flex/grid container setup
- Incorrect positioning context
- Missing explicit dimensions on absolutely positioned elements
- **Global CSS reset overriding layout utilities** ⚠️ CHECK FIRST

**Visual:**
- Dark mode class not inherited
- CSS variables not defined in active theme
- Specificity conflicts (inline > class > tag)
- Tailwind purge removing needed classes
- **Global * selector overriding color utilities** ⚠️ CHECK FIRST

**Typography:**
- Font not imported or loaded
- Font-family not in fallback stack
- Text color inheriting from wrong ancestor
- Missing text utilities (truncate, ellipsis)

**Spacing:**
- **Global * { padding: 0 } overriding all padding utilities** ⚠️ CHECK FIRST
- **Global * { margin: 0 } overriding all margin utilities** ⚠️ CHECK FIRST
- Box-sizing not border-box
- Conflicting margin collapse
- Flex gap not supported (old browsers)
- Negative margins causing overflow

**Animation:**
- Transition property not specified
- State change not triggering re-render
- Transform causing stacking context issues
- GPU acceleration needed for performance

**Responsive:**
- Breakpoint not defined in config
- Wrong breakpoint order (mobile-first vs desktop-first)
- Container width constrained by parent
- Viewport units causing issues

**Stacking:**
- New stacking context created unintentionally
- Z-index war (multiple high values)
- Transform/opacity creating isolation
- Portal/modal not in correct DOM position

**Overflow:**
- Parent overflow: hidden cutting content
- Fixed width/height on dynamic content
- Whitespace not controlled (nowrap, pre)
- Scrollbar width not accounted for

### Phase 4: Comprehensive Fix (REQUIRED)

Apply a complete, one-shot fix that addresses the root cause:

1. **Fix the root cause first** (not symptoms)
2. **Fix the entire chain** (all affected files/elements)
3. **Use proper patterns** (Tailwind utilities > inline styles)
4. **Maintain consistency** (with existing codebase patterns)
5. **Verify no side effects** (check related components)

### Phase 5: Validation Checklist (REQUIRED)

After applying fixes, mentally verify:

**Layout Validation:**
- [ ] Complete height chain from html → root → app → component
- [ ] Complete width chain verified
- [ ] Positioning context correct for all absolute elements
- [ ] Flex/grid containers have proper settings
- [ ] No unexpected overflow

**Visual Validation:**
- [ ] Colors apply in both light and dark mode
- [ ] CSS variables defined in all necessary scopes
- [ ] No specificity conflicts
- [ ] Background/border/shadow rendering correctly

**Typography Validation:**
- [ ] Fonts loaded and applied
- [ ] Text readable in all states
- [ ] Line-height/spacing appropriate
- [ ] Text overflow handled

**Spacing Validation:**
- [ ] Consistent spacing scale used
- [ ] No margin collapse issues
- [ ] Padding/margin affecting correct elements
- [ ] Box model as expected

**Animation Validation:**
- [ ] Smooth transitions on all state changes
- [ ] No jank or flickering
- [ ] Performance acceptable
- [ ] Accessible (respects prefers-reduced-motion)

**Responsive Validation:**
- [ ] Works at all breakpoints
- [ ] Mobile layout appropriate
- [ ] Tablet layout appropriate
- [ ] Desktop layout appropriate

**Stacking Validation:**
- [ ] Correct visual layering
- [ ] Modals/dropdowns above content
- [ ] No z-index conflicts
- [ ] Isolation where needed

**Overflow Validation:**
- [ ] No unwanted scrollbars
- [ ] Content not clipped
- [ ] Scroll smooth and accessible
- [ ] Scrollbar styling consistent

## Critical Rules

1. **NEVER make random CSS changes hoping they work**
2. **ALWAYS read complete file chains before fixing**
3. **ALWAYS identify root cause before applying fixes**
4. **ALWAYS apply comprehensive fixes, not band-aids**
5. **ALWAYS validate the entire chain after fixes**

## Tools to Use

1. **Read** - Read complete file chains, CSS files, config files
2. **Grep** - Search for class usage, CSS variable definitions, conflicting styles
3. **Glob** - Find all files using specific components or utilities
4. **Edit** - Apply surgical, precise fixes to root causes

## Output Format

When debugging CSS issues, structure your response as:

```
**Issue Classification:** [Category(ies)]

**Context Analysis:**
[Complete file chain / relevant CSS context]

**Root Cause:**
[Specific reason for the issue]

**Comprehensive Fix:**
[List of all files and changes needed]

**Validation:**
[Checklist of verified items]
```

## Example Workflows

### Example 1: Height Issue (Layout)

**Bad approach (forbidden):**
```
User: "Sidebar height not working"
Assistant: *immediately tries adding h-full*
Assistant: *tries adding flex*
Assistant: *tries adding absolute positioning*
[10 failed attempts later...]
```

**Good approach (required):**
```
User: "Sidebar height not working"

**Issue Classification:** Layout - Height inheritance

**Context Analysis:**
STEP 1: Check global styles
- index.css: No global height overrides ✓

STEP 2: Reading complete chain:
- index.html: #root has height: 100vh ✓
- App.tsx: wrapper div missing h-full ✗
- EditorLayout.tsx: has h-full ✓
- Sidebar container: has top-12 bottom-0 ✓
- Sidebar.tsx: height: '100%' ✓

**Root Cause:**
App.tsx wrapper div lacks h-full, breaking height inheritance chain
from #root (100vh) → App div (auto) → EditorLayout

**Comprehensive Fix:**
1. App.tsx:21 - Add h-full to wrapper div
2. Verify entire chain: html → #root → App → EditorLayout → Sidebar container → Sidebar

**Validation:**
✓ Height chain complete
✓ Sidebar fills available space
✓ Content scrolls properly
✓ Collapse animation smooth
```

### Example 2: Padding Issue (Spacing) - Real Case from This Project

**Bad approach (forbidden):**
```
User: "Text too close to borders"
Assistant: *modifies input px-2 to px-3*
Assistant: *modifies button padding*
Assistant: *modifies panel padding*
[Multiple attempts, still not working...]
```

**Good approach (required):**
```
User: "Text too close to borders"

**Issue Classification:** Spacing - Padding not applying

**Context Analysis:**
STEP 1: ⚠️ Check global styles FIRST
- index.css:60 - Found: * { padding: 0 } ✗ GLOBAL OVERRIDE!
- This resets ALL padding, including Tailwind utilities

STEP 2: Component analysis (now we know the root cause):
- Components use p-4, px-3, py-2 utilities
- These are being overridden by * { padding: 0 }

**Root Cause:**
Aggressive global CSS reset (* { padding: 0 }) overrides all Tailwind padding utilities

**Comprehensive Fix:**
1. index.css:60 - Remove padding: 0 from universal selector
2. Keep margin: 0 and box-sizing: border-box
3. Verify Tailwind utilities now work properly

**Validation:**
✓ All padding utilities apply correctly
✓ Input fields have proper spacing
✓ Buttons have comfortable padding
✓ No need to modify individual components
```

**Key Lesson:** Always check global styles BEFORE modifying individual components!

---

**Remember:** Systematic analysis prevents the frustration of 10+ failed attempts. Invest time in understanding the complete context, identify the true root cause, then fix it comprehensively in one shot.
