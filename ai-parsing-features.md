# Sahur AI Novelty Features Implementation Plan

## Overview
This plan outlines the implementation of the advanced AI parsing and reasoning capabilities for Sahur AI, transforming it from a basic document parser into a multi-agent legal intelligence platform.

**Project Type:** WEB / BACKEND-HEAVY
**Primary Agents:** `backend-specialist`, `frontend-specialist`, `database-architect`

## Success Criteria
- [ ] Backend API handles PDF ingestion, extraction, and vectorization into a Personal Legal Vault.
- [ ] Multi-Agent pipeline orchestrates Fact Extraction, Constitutional Mapping, and Compliance Analysis.
- [ ] The engine generates an Explainability Tree, Rights Heatmap, and Compliance Score.
- [ ] Missing Information Detection triggers follow-up UI states in the frontend.
- [ ] "What If?" simulator allows dynamic re-prompting of the AI with altered facts.
- [ ] Final output is exportable as a Legal Compliance Passport.

## Tech Stack
- **Backend:** FastAPI, LlamaIndex, Gemini 2.5 Flash, PyMuPDF, Supabase pgvector.
- **Frontend:** Next.js, Tailwind CSS, Framer Motion (for Explainability Tree & Heatmap).
- **Architecture:** Directed Acyclic Graph (DAG) for the Multi-Agent Legal Pipeline.

## File Structure Additions

```
backend/
├── agents/                  # Multi-Agent Pipeline
│   ├── fact_extractor.py
│   ├── constitution_mapper.py
│   ├── law_retriever.py
│   └── compliance_analyzer.py
├── services/
│   ├── missing_info_detector.py
│   └── simulator.py
└── api/routers/
    ├── analyze.py           # Main analysis entrypoint
    └── simulate.py          # "What If" simulator

frontend/src/components/dashboard/
├── ExplainabilityTree.tsx
├── RightsHeatmap.tsx
├── WhatIfSimulator.tsx
└── MissingInfoPrompt.tsx
```

## Task Breakdown

### Phase 1: Core AI Pipeline & Knowledge Base
- **Task 1.1:** Set up `pgvector` schema for Official Legal Knowledge Base and Personal Vault.
  - *Agent:* `database-architect`
  - *Input:* Supabase connection → *Output:* `documents` and `vault_documents` tables with vector columns → *Verify:* Run `supabase db lint`.
- **Task 1.2:** Implement Multi-Agent Pipeline (Fact Extraction -> Constitution Mapping -> Law Retrieval -> Compliance).
  - *Agent:* `backend-specialist`
  - *Input:* User scenario string/PDF → *Output:* Structured JSON report (Score, Explainability Tree, Checklist, Authority) → *Verify:* Unit tests mocking Gemini responses.
- **Task 1.3:** Implement Missing Information Detection logic.
  - *Agent:* `backend-specialist`
  - *Input:* User scenario → *Output:* List of follow-up questions if confidence < threshold.

### Phase 2: Frontend Visualization & "What If" Simulator
- **Task 2.1:** Build `ExplainabilityTree` and `RightsHeatmap` components.
  - *Agent:* `frontend-specialist`
  - *Input:* Backend JSON report → *Output:* Visual UI components → *Verify:* Render with mock data.
- **Task 2.2:** Build Missing Information UI (dynamic follow-up questions).
  - *Agent:* `frontend-specialist`
  - *Input:* Backend `missing_info` array → *Output:* Conversational prompt UI.
- **Task 2.3:** Implement "What If?" Legal Simulator UI and Backend Route.
  - *Agent:* `frontend-specialist` + `backend-specialist`
  - *Input:* Modified fact parameters → *Output:* Re-calculated JSON report.

### Phase 3: Export & Polish
- **Task 3.1:** Legal Compliance Passport Export (PDF Generation).
  - *Agent:* `backend-specialist` (ReportLab) or `frontend-specialist` (Browser Print/PDF-lib).
  - *Output:* Downloadable PDF containing Score, Violations, Next Steps.

## Phase X: Verification
- [ ] **Lint:** `npm run lint` and `ruff check .`
- [ ] **Tests:** Run backend test suite for multi-agent pipeline.
- [ ] **E2E:** Complete a full scenario analysis, simulator tweak, and PDF export.

## ✅ PHASE X COMPLETE
- Lint: [ ] Pass
- Security: [ ] No critical issues
- Build: [ ] Success
- Date: Pending
