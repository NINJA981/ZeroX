---
version: alpha
name: Sahur AI Design System
colors:
  primary: "#0F172A"
  secondary: "#14B8A6"
  background: "#FFFFFF"
  surface: "#F8FAFC"
  border: "#E2E8F0"
  text-primary: "#0F172A"
  text-secondary: "#64748B"
  success: "#22C55E"
  warning: "#F59E0B"
  danger: "#EF4444"
  info: "#3B82F6"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  subheading:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
  body-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  md: 16px
  lg: 20px
  full: 999px
components:
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 16px
---

# Sahur AI Design System

## Overview
Sahur AI is a premium legal intelligence platform built for citizens, governments, and organizations. The design system prioritizes **trust, simplicity, and explainability**. It avoids noisy AI aesthetics (like violet glows/mesh gradients) in favor of structured legal credibility reminiscent of government digital services and clean SaaS platforms (Apple, Stripe, Perplexity AI).

## Colors
The color palette represents legal authority and clean modern execution.
- **Primary Navy (`#0F172A`):** Used for key headings, primary navigation, and high-priority labels.
- **Secondary Teal (`#14B8A6`):** Applied exclusively to call-to-action buttons, key interactive state transitions, and highlights.
- **Background White (`#FFFFFF`):** Base canvas color to ensure high readability and a clean professional feel.
- **Surface (`#F8FAFC`):** Soft container background for cards and secondary page blocks.
- **Border (`#E2E8F0`):** Fine borders to establish layout hierarchy.
- **Status Colors:**
  - Success: `#22C55E` (Likely Compliant 🟢)
  - Warning: `#F59E0B` (Needs Review 🟡)
  - Danger: `#EF4444` (Potential Violation 🔴)
  - Info: `#3B82F6` (Neutral/General Guidance)

## Typography
The system uses **Inter** (with **Manrope** fallback) as the primary font family.
- **Headline Display (48px - 64px, Bold):** For main landing and greeting headings.
- **Subheading (24px - 30px, Medium):** For section dividing and primary card headings.
- **Body Text (16px - 18px, Regular):** For general readable content, legal articles, and explanation narratives.
- **Small Labels (14px, Medium):** For metadata, tags, and small utility indicators.

## Layout
- **Max Page Width:** `1280px`
- **Desktop Padding:** `80px`
- **Mobile Padding:** `24px`
- **Timeline / Pipeline:** Horizontal progression maps for desktop, converting to vertical progression layouts on mobile viewports.

## Elevation & Depth
- **Borders over Shadows:** Layout structures rely primarily on clean `#E2E8F0` borders rather than heavy shadows.
- **Subtle Shadow:** Apply subtle elevation shifts to cards on hover:
  `box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08)`

## Shapes
- **Cards Radius:** `20px` (systematic token `{rounded.lg}`)
- **Buttons Radius:** `16px` (systematic token `{rounded.md}`)
- **Input Fields Radius:** `16px` (systematic token `{rounded.md}`)
- **Badges / Chips:** `999px` (systematic token `{rounded.full}`)

## Components

### Navbar
- **Left:** Sahur AI logo mark and text.
- **Center:** Quick links (`Features`, `How it Works`, `Legal Vault`, `About`).
- **Right:** Auth toggles (`Sign In`, `Get Started` CTA).
- **Behavior:** Fixed positioning, sticky layout with a blurred backdrop-filter on scroll.

### Hero Section
- Dynamic header: "Know Your Rights. Before You Take Action."
- Interactive **Hero Compliance Card** simulating a government-issued report highlighting:
  - Risk Level (Needs Review 🟡)
  - Applicable Rights (Article 14, Article 21)
  - Applicable Law (Labour Code)
  - Confidence (94%)
  - Authority (Labour Commissioner)

### Feature Cards
- Large line icons, bold headers, and crisp typography.
- On hover: Scale up by `1.03`, add soft shadow, and translate upward slightly.

### Personal Legal Vault
- Clean file storage dashboard with drag-and-drop file upload, file details, processing status indicators, and security badges.

### Compliance Report
- Structured overview detailing:
  - Case Summary
  - Rights & Applicable Laws
  - Relevant Clauses & Mismatches
  - Reasoning Trace Timeline
  - Evidence Checklist
  - Authority Recommendation

## Do's and Don'ts
- **Do** maintain a minimum contrast ratio of 4.5:1 (WCAG AA) for all text readability.
- **Don't** use purple, violet, indigo, or magenta primary/brand colors (strictly forbidden to avoid AI clichés).
- **Do** always show clear legal reasoning and references for every AI decision.
- **Don't** use standard bento grids or mesh gradients (prefer clean spacing and fine lines).
- **Do** ensure `prefers-reduced-motion` CSS rules are applied for all micro-animations.
