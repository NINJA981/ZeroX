# Phase 4: Compliance Report Dashboard & Chat Drawer

## Overview
This plan outlines the final steps of Phase 4 of the Sahur AI project. The primary goal is to build the frontend components required to visualize the AI's legal analysis and allow users to interact with it via a chat drawer.

## Project Type
WEB

## Success Criteria
- Users can view a structured JSON report (verdicts, cited articles, escalation authority, evidence).
- Visual color-coding is implemented for verdicts (🟢 Safe, 🟡 Warning, 🔴 Violation).
- Users can open an interactive chat drawer to ask follow-up questions about the compliance report.

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- React

## File Structure
```
frontend/src/
├── components/
│   ├── dashboard/
│   │   ├── ComplianceReport.tsx  (New)
│   │   ├── VerdictBadge.tsx      (New)
│   │   ├── ChatDrawer.tsx        (New)
│   │   └── ChatMessage.tsx       (New)
```

## Task Breakdown

### Task 1: Compliance Report UI
- **Agent**: `frontend-specialist`
- **Skill**: `frontend-architecture`, `frontend-design`
- **Priority**: P1
- **Dependencies**: None
- **INPUT**: Mock JSON data representing a compliance analysis result.
- **OUTPUT**: `ComplianceReport.tsx` component that renders the data cleanly.
- **VERIFY**: Run `npm run dev` and visually confirm layout, typography, and color-coded verdicts rendering correctly.

### Task 2: Interactive Chat Drawer
- **Agent**: `frontend-specialist`
- **Skill**: `frontend-design`
- **Priority**: P2
- **Dependencies**: Task 1
- **INPUT**: Next.js UI structure for a slide-out drawer or sidebar.
- **OUTPUT**: `ChatDrawer.tsx` allowing user text input and displaying mock conversation history.
- **VERIFY**: Toggle drawer open/close state, verify mobile responsiveness, ensure it doesn't overlap critical report info.

### Task 3: Integration into Dashboard Page
- **Agent**: `frontend-specialist`
- **Skill**: `frontend-architecture`
- **Priority**: P1
- **Dependencies**: Task 1, Task 2
- **INPUT**: `page.tsx` for the dashboard.
- **OUTPUT**: Dashboard layout updated to include both the report view and the chat drawer trigger.
- **VERIFY**: Ensure seamless navigation between analysis input, report viewing, and chatting.

## Phase X: Verification
- [ ] Lint & Type Check: `npm run lint && npx tsc --noEmit`
- [ ] UX Audit: `python .agents/skills/frontend-design/scripts/ux_audit.py .`
- [ ] Visual QA: Run the app and test with browser on standard viewport and mobile viewport.
