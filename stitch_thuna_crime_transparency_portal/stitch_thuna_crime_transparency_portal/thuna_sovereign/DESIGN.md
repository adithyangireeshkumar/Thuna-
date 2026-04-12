# Design System Strategy: The Sovereign Archive

## 1. Overview & Creative North Star
The visual identity of this design system is guided by the Creative North Star: **"The Sovereign Archive."** 

In designing for a crime transparency portal, we must balance the heavy weight of governmental authority with the absolute clarity required for public trust. This is not a "dashboard"—it is a digital record of truth. We move beyond generic government templates by utilizing **High-End Editorial** layouts: think of a premium printed broadsheet meets a modern architectural blueprint. 

The system rejects the "boxed-in" feeling of traditional portals. Instead, it uses **intentional asymmetry**, massive negative space, and a high-contrast palette to create a sense of monumental importance. Elements should feel like they are "placed" onto a solid foundation rather than "slotted" into a grid, utilizing overlapping layers to break the digital plane.

---

## 2. Colors: Tonal Authority
The palette is rooted in a tri-color foundation: **Primary Khaki** for institutional weight, **Deep Navy** for navigational precision, and **Surface White** for absolute transparency.

### Color Tokens
*   **Primary (Authority):** `#00152d` (Deep Navy) - Used for primary actions and deep-tier navigation.
*   **Secondary (Accents):** `#6b5c42` (Derived Khaki) - Used for headers and "Sovereign" moments of authority.
*   **Surface:** `#f8f9fb` - The base of the entire portal.
*   **Functional:** Green (`#2E7D32`), Orange (`#F57C00`), Red (`#ba1a1a`) - Used sparingly for status and urgency.

### The "No-Line" Rule
To maintain a premium editorial feel, **1px solid borders are prohibited for sectioning.** We define boundaries through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low` to define content blocks.
*   **Tonal Transitions:** Using subtle shifts in the neutral scale to guide the eye without creating "visual noise" with hard lines.

### The Glass & Gradient Rule
While the theme is minimalist, we avoid "flatness." 
*   **Floating Navigation:** Use `surface_container_lowest` with a 20% opacity and a `24px` backdrop-blur (Glassmorphism) to keep the UI feeling airy and modern.
*   **Signature Textures:** For Hero sections or high-level CTAs, use a subtle linear gradient from `primary` (`#00152d`) to `primary_container` (`#0b2a4a`) at a 135-degree angle. This provides a "brushed steel" depth that flat hex codes lack.

---

## 3. Typography: Editorial Gravity
We use the **Inter** family to bridge the gap between technical precision and readability. 

*   **Display Scales:** Use `display-lg` (3.5rem) for major data milestones. This creates a "monumental" feel.
*   **Headline Scales:** The `headline-lg` (2rem/Bold) is our primary voice. It should feel declarative and final.
*   **Title Scales:** `title-md` (1.125rem/Medium) acts as the bridge, providing structure to archival lists.
*   **Labeling:** `label-md` (0.75rem) should always be used with `0.05rem` letter-spacing and uppercase styling for a "documentary" aesthetic.

**Hierarchy Strategy:** Use `primary` (Navy) for headlines to establish gravity, and `secondary` (Khaki) for sub-headers to inject the brand’s unique institutional character.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a crutch for poor layout. This design system uses **Layering Principles** to convey hierarchy.

*   **The Stack:** 
    *   Level 0: `surface` (The floor)
    *   Level 1: `surface-container-low` (The background for large content regions)
    *   Level 2: `surface-container-lowest` (The "Sheet": used for cards or interaction zones)
*   **Ambient Shadows:** When an element must float (e.g., a modal or floating action), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 21, 45, 0.06);`. The shadow is tinted Navy, not Grey, to ensure it feels integrated into the palette.
*   **The "Ghost Border" Fallback:** If a container sits on a background of the same color, use a "Ghost Border": `outline: 1px solid rgba(116, 119, 127, 0.15)`. It should be felt, not seen.

---

## 5. Components: Minimalist Primitives

### Buttons
*   **Primary:** Solid `primary_container` (#0b2a4a). No border. `0.25rem` (sm) corner radius. Typography should be `label-md` uppercase.
*   **Secondary:** Ghost style. No background. `ghost-border` (15% opacity Navy).
*   **Tertiary:** Text-only with a Khaki (#C3B091) bottom-accent line (2px) that appears on hover.

### Cards & Data Lists
*   **Rule:** Forbid divider lines between list items. 
*   **Alternative:** Use `16px` of vertical white space and a subtle background hover state (`surface-container-high`).
*   **Structure:** Cards should use the `surface-container-lowest` color to "lift" off the page naturally.

### Inputs & Search
*   **Field Style:** Minimalist bottom-line only or a full `surface-container-low` fill.
*   **States:** On focus, the bottom-line transitions from `outline-variant` to `primary` (Navy) with a smooth 300ms ease.

### Additional Signature Component: "The Transparency Pillar"
A custom component for this portal: A vertical progress/status indicator that uses `secondary` (Khaki) to show the progression of a crime report or case. It should use heavy vertical weights (4px) to feel like a structural architectural element.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Allow at least `48px` of margin between major content sections to let the data "breathe."
*   **Use Asymmetry:** Place high-level stats off-center to create a modern, editorial rhythm.
*   **Respect the Max Width:** Stick strictly to the `1200px` container to ensure readability on large displays.

### Don’t:
*   **Don't use Rounded Corners > 8px:** This is a government authority portal; overly rounded "bubble" corners diminish the seriousness of the content.
*   **Don't use Pure Black:** Always use `on_surface` (#191c1e) for text to maintain a high-end, ink-on-paper feel.
*   **Don't use Traditional Dividers:** Avoid horizontal rules `<hr>`. Use spacing and color blocks to define hierarchy.

---

*This document serves as the foundation for all future iterations of the design system, ensuring a legacy of authority, transparency, and sophisticated digital craftsmanship.*