---
name: Warm Editorial Academic
colors:
  surface: '#fff8f3'
  surface-dim: '#e0d9d3'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ec'
  surface-container: '#f4ede6'
  surface-container-high: '#eee7e1'
  surface-container-highest: '#e8e1db'
  on-surface: '#1e1b17'
  on-surface-variant: '#49454e'
  inverse-surface: '#33302c'
  inverse-on-surface: '#f7efe9'
  outline: '#7a757f'
  outline-variant: '#cbc4cf'
  surface-tint: '#675686'
  primary: '#61507f'
  on-primary: '#ffffff'
  primary-container: '#7a6899'
  on-primary-container: '#fbf3ff'
  inverse-primary: '#d2bdf4'
  secondary: '#665781'
  on-secondary: '#ffffff'
  secondary-container: '#dfccfe'
  on-secondary-container: '#63547e'
  tertiary: '#744e4f'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f6667'
  on-tertiary-container: '#fff3f2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebdcff'
  primary-fixed-dim: '#d2bdf4'
  on-primary-fixed: '#22123e'
  on-primary-fixed-variant: '#4f3e6c'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d1beef'
  on-secondary-fixed: '#21143a'
  on-secondary-fixed-variant: '#4e4068'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#ecbaba'
  on-tertiary-fixed: '#2f1314'
  on-tertiary-fixed-variant: '#613d3e'
  background: '#fff8f3'
  on-background: '#1e1b17'
  surface-variant: '#e8e1db'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Quicksand
    fontSize: 17px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Quicksand
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Quicksand
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an approachable, reassuring workspace for reviewing and correcting complex university curriculum documents. Academic syllabus tooling is traditionally dense, utilitarian, and stressful; this system counters that exhaustion with warmth, legibility, and gentle structure.

The design movement combines **Modern Document Tactility** with **Warm Editorial Minimalism**. It favors honest paper-like surfaces, generous negative space, crisp boundary lines, and rounded pill-like interactive elements. The aesthetic feels like a beautifully printed textbook meets a thoughtful modern writing canvas—calming professors, instructional designers, and department chairs while eliminating administrative visual clutter. No heavy gradients, no skeuomorphic glass, and no generic photography are used; hierarchy is established entirely through precise typography, crisp linear borders, and soft pastel state signifiers.

## Colors

The palette is anchored by soft, warm hues that reduce eye strain during extended editorial work. 

- **Canvas & Panels**: The foundational background rests on a delicate light cream (`#FFFFE0` adjusted into a calm tint range: canvas base `#FAF9E8`, elevated panel surfaces `#FFFFF2`). Pure harsh white (`#FFFFFF`) is reserved exclusively for editable inputs and focused document viewports to delineate active content from systemic chrome.
- **Brand Accents**: The primary action color `#7A6899` is an accessible, deep expression of the soft lilac `#C3B1E1`, ensuring WCAG AAA legibility against cream surfaces. Dusty rose (`#F4C2C2`) serves as an ornamental secondary accent for student-facing annotations, tag highlights, and metadata flags.
- **Functional Semantics**: Document error states demand immediate comprehension without inciting panic.
  - **Success / Validated**: Matcha mint green (`#CDEBC5`), paired with deep forest text (`#234B1D`).
  - **Warning / Review Needed**: Warm apricot amber (`#FF9E61`), paired with warm sienna text (`#5E2E0A`).
  - **Error / Missing Specification**: Soft crimson coral (`#FF6161`), paired with deep berry text (`#671212`).
- **Text & Structure**: Body text avoids pure digital black, utilizing deep warm espresso charcoal (`#2D2A26`), while secondary captions take on muted slate charcoal (`#6C6862`). Structural borders employ ultra-crisp, low-contrast warm outlines (`#E8E5CE`).

## Typography

The type system blends geometric friendliness with editorial rigor. 

- **Display & Headings (Plus Jakarta Sans)**: Provides structured clarity with gently rounded vertex terminations. It grants institutional weight to course identifiers (e.g., `CS-402`, `BIO-201`) without feeling rigid or clinical.
- **Body & Longform (Quicksand)**: Delivers a warm, rounded rhythm that makes syllabi paragraphs, prerequisite lists, and learning outcomes immediately approachable and comfortable to parse.
- **Labels & Microcopy (Plus Jakarta Sans)**: Rendered in semi-bold weights to guarantee rapid scanning within high-density review tables, version tags, and verification chips.

## Layout & Spacing

The application organizes data using a responsive 12-column split-panel architecture optimized for document review workflows:
- **Left Panel (Document Navigation & Validation Index)**: 3 columns on desktop, tracking course module checklists and error aggregates.
- **Center Canvas (Course Specification Document)**: 6 columns, centered, featuring comfortable margins mirroring paper manuscripts.
- **Right Panel (Inspector & Audit Panel)**: 3 columns, detailing active rule violations and recommended changes.

On viewports below `1024px`, the system collapses down into an overlaid contextual drawer format, giving priority to the primary specification sheet. Element spacing relies strictly on multiples of `0.25rem` (4px), maintaining generous vertical breathing room between document sections (`space-xl`) while packing inline audit parameters cleanly with `space-sm`.

## Elevation & Depth

Visual hierarchy does not depend on muddy drop shadows or multi-stage blur effects. Instead, it relies on **Layered Cream Tiers and Crisp Outlines**:

- **Level 0 (App Shell Background)**: Soft base cream (`#FAF9E8`).
- **Level 1 (Panels & Workspace Sheets)**: Crisp warm off-white (`#FFFFF2`) bound by a distinct 1px solid border (`#E8E5CE`).
- **Level 2 (Floating Inspect Toolbars & Popovers)**: Pure parchment surface (`#FFFFFF`) with a subtle tactile border (`#DDD9BF`) and a warm ambient lift: `0 4px 16px -2px rgba(84, 76, 52, 0.08)`.
- **Level 3 (Modal Dialogs & Decision Prompts)**: `#FFFFFF` framed by a clean 1.5px border in soft lilac (`#C3B1E1`), accompanied by a soft non-blur backdrop veil: `rgba(45, 42, 38, 0.3)`.

## Shapes

The interface embraces organic, comfortable silhouettes that balance precision with approachability:
- Primary containers, course module cards, and document sections carry an 8px (`0.5rem`) radius to evoke physical stationery sheets.
- Floating controls, chips, status tags, and action buttons use full pill roundedness (`9999px`) to create tactile, playful affordances that feel distinct against rectangular document grids.
- Input fields and editable document blocks adopt a consistent 8px curvature, preserving crisp text alignment along vertical reading margins.

## Components

### Buttons
- **Primary Action (Approve / Auto-Fix)**: Solid primary `#7A6899` with pure white text, pill-shaped, 1px subtle internal border highlight. On hover, shifts to slightly deeper violet `#6B5989`.
- **Secondary Action (Flag for Review / Diff)**: Warm off-white `#FFFFF2` with 1px border in `#C3B1E1`, colored text in `#7A6899`.
- **Ghost / Tool Buttons**: Background transparent, pill-shaped, soft hover fill `#F3EFE0`.

### Status Chips & Validation Badges
Pill-shaped badges with distinct background-and-text combinations:
- **Valid (`#CDEBC5`)**: Deep green text `#234B1D`, 1px border in `#B7E0AC`.
- **Warning (`#FF9E61` at 20% tint)**: Rich amber text `#9E480C`, 1px border in `#FF9E61`.
- **Invalid / Error (`#FF6161` at 18% tint)**: Crimson text `#A81B1B`, 1px border in `#FF6161`.
Chips include a 6px solid circular indicator dot preceding label text to support quick scanning.

### Document Tables
Built specifically for academic outcome and credit validation matrices:
- Background: Flat warm white (`#FFFFF2`), separated with clean horizontal dividers (`#E8E5CE`), no vertical interior lines.
- Headers: Plus Jakarta Sans, uppercase label style (`label-sm`), warm gray text `#6C6862`, padded generously (`space-sm` top/bottom).
- Row Hover: Gentle tint shift to `#FAF7E1`, never pure gray.

### Form Inputs & Syllabus Fields
- Canvas: Flat `#FFFFFF` surface framed by a 1px border in `#DCD7BD`.
- Focus State: Border color transitions directly to soft lilac (`#C3B1E1`) with a 3px soft outer ring tint `rgba(195, 177, 225, 0.35)`.
- Inline Error Input: Border shifts to `#FF6161` with a discreet coral pill badge attached to the right edge.

### Cards & Module Containers
- Fixed 1px border treatment (`#E8E5CE`), zero drop shadow. Active editing states illuminate the container border using dusty rose (`#F4C2C2`) or lilac (`#C3B1E1`), clearly conveying system focus.

### Academic Specification Diffs
- Side-by-side or inline strikethrough comparisons. Removed outdated course text is highlighted in soft dusty rose tint (`rgba(244, 194, 194, 0.35)`) with red-slate text; recommended corrections display in soft mint tint (`rgba(205, 235, 197, 0.45)`) with deep spruce text.