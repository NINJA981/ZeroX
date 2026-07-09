# Sahur AI Landing Page Plan

## Overview
Design and implement a high-conversion, trust-first landing page for Sahur AI. The page must optimize for maximum impressions and user engagement by leveraging human psychology (problem agitation, social proof, clear resolution) and strict anti-slop design principles (no generic AI purple gradients, no centered-everything layouts, no fake-screenshot divs).

**Design Read**: B2C Legal Tech / Public Trust hybrid. The audience is everyday citizens seeking legal clarity. The vibe must be authoritative yet accessible.
**Dials**: VARIANCE: 7 | MOTION: 5 | DENSITY: 4

## Project Type
**WEB** (Next.js + Tailwind CSS)

## Success Criteria
- [ ] Hero section communicates the value proposition in under 20 words of subtext.
- [ ] Design strictly follows the `frontend-design` anti-slop rules (no excessive eyebrows, one clear CTA intent).
- [ ] Color palette evokes trust (e.g., Deep Forest Green or Cobalt + Cream) rather than generic "AI startup" neon.
- [ ] Typography is legible and authoritative (e.g., Geist or a modern sans-serif like Cabinet Grotesk, avoiding overused serifs unless strictly necessary).
- [ ] All interactive elements have proper tactile feedback and WCAG AA contrast.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: `motion/react` (for restrained, motivated scroll-reveals)
- **Icons**: `@phosphor-icons/react` or `lucide-react` (if already installed)

## File Structure
```text
frontend/
├── app/
│   ├── page.tsx                 # Main landing page composition
│   └── layout.tsx               # Root layout and fonts
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx      # High-impact entry
│   │   ├── TrustStrip.tsx       # Logo/social proof wall
│   │   ├── ProblemAgitation.tsx # Psychological hook (the "Why")
│   │   ├── BentoFeatures.tsx    # Asymmetric feature grid (Vault, RAG, etc.)
│   │   └── FinalCTA.tsx         # Bottom conversion point
│   └── ui/                      # Base primitives (buttons, cards)
```

## Task Breakdown

### Task 1: Foundation & Design System
- **Agent**: `frontend-specialist` (Skill: `frontend-design`)
- **Input**: Set up global typography, color variables, and spacing in `index.css`/`tailwind.config.ts`.
- **Output**: Verified global styles.
- **Verify**: Contrast checker passes, no "AI purple" defaults, proper typography scale.

### Task 2: Hero Section & Trust Strip
- **Agent**: `frontend-specialist` (Skill: `frontend-design`)
- **Input**: Build `HeroSection.tsx` and `TrustStrip.tsx`. Max 2 lines headline, max 20 words subtext. One primary CTA ("Analyze Your Case").
- **Output**: Responsive hero component.
- **Verify**: Renders perfectly on mobile without layout jumping (use `min-h-[100dvh]`), no wrapped CTAs on desktop.

### Task 3: Problem Agitation (Psychology Hook)
- **Agent**: `frontend-specialist`
- **Input**: Build `ProblemAgitation.tsx` focusing on relatable legal pain points (Tenancy, Workplace, Consumer). Use asymmetrical layout or scroll-reveal stagger.
- **Output**: Problem section component.
- **Verify**: Content is concise; layout breaks the zigzag repetition rule.

### Task 4: Solution Bento Grid (The Vault & Compliance)
- **Agent**: `frontend-specialist`
- **Input**: Build `BentoFeatures.tsx`. 3 to 5 cells maximum. Must showcase the Personal Legal Vault and Explainable AI Compliance Reports.
- **Output**: Bento grid component.
- **Verify**: Exact cell count matches content. Diverse backgrounds per cell (no white-on-white monotony).

### Task 5: Final CTA & Footer
- **Agent**: `frontend-specialist`
- **Input**: Build `FinalCTA.tsx`. Strong singular intent matching the Hero CTA.
- **Output**: Final CTA and footer components.
- **Verify**: No duplicate CTA intents on the page.

## ✅ Phase X: Verification Checklist
- [ ] **Lint**: `npm run lint` passes
- [ ] **Accessibility**: All buttons and forms pass WCAG AA contrast.
- [ ] **Design Rules**: No purple/violet hex codes (unless explicitly branded), max 1 eyebrow per 3 sections, no wrapped CTAs on desktop.
- [ ] **Build**: `npm run build` succeeds without errors.
- [ ] **Performance**: Lighthouse audit for desktop/mobile performance.
