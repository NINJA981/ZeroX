# Sahur AI — Hybrid Implementation Plan

This document outlines the step-by-step implementation plan for building **Sahur AI** (AI-Powered Constitutional Rights & Legal Compliance Analyzer) using the hybrid architecture chosen for the ZeroX Hackathon / Hack The Planet 2026.

## 🎯 Goal
Build a high-fidelity, explainable legal compliance MVP that handles four core domains (Tenancy, Workplace, Policing, Consumer Rights) using a Next.js frontend, a FastAPI backend, and a unified Supabase backend (Auth + Storage + PostgreSQL with `pgvector`).

---

## 🛠️ Tech Stack & Architecture Decisions

| Layer | Technology | Role / Integration |
|---|---|---|
| **Frontend** | Next.js (App Router) + Tailwind CSS | UI Dashboard, User Authentication state, file upload flow, PDF export. |
| **Backend** | FastAPI (Python) | High-performance NLP, PDF parsing, LlamaIndex RAG pipeline, and Gemini reasoning. |
| **Authentication** | Supabase Auth | Sign-in on Next.js; JWT forwarded via Authorization header to FastAPI and verified using the Supabase JWT secret. |
| **Storage** | Supabase Storage | File storage for user-uploaded documents (contracts, notices) in a private bucket. |
| **Database & Vector DB** | Supabase PostgreSQL + `pgvector` | Unified storage for user metadata, chat history, and vector embeddings (legal KB + uploaded documents). |
| **AI Model & Embeddings** | Gemini 2.5 Flash + Gemini Embeddings | Fast reasoning, structured JSON outputs, and vector embeddings generation. |
| **Doc Ingestion** | PyMuPDF (fitz) | High-fidelity text extraction from complex legal PDFs on the FastAPI backend. |

---

## 📅 Phase-by-Phase Roadmap

### Phase 1: Supabase & Database Initialization
- Spin up the Supabase project.
- Configure `pgvector` extension and define database tables:
  - `documents` table for storing ingested legal codes (with embeddings column).
  - `vault_documents` table for tracking metadata of user-uploaded files.
  - `chats` / `messages` for legal advice history.
- Set up a private Supabase Storage Bucket named `legal-vault`.

### Phase 2: FastAPI RAG Engine (Supabase pgvector + Gemini)
- Create FastAPI service skeleton.
- Implement Supabase JWT verification middleware.
- Build LlamaIndex pipeline configured to use Supabase (Postgres) as the Vector Store.
- Ingest Indian legal codes (Constitution, BNS, Consumer Protection Act, Labor laws) into the vector table.
- Implement domain classifier and Gemini-based reasoning engine.

### Phase 3: Ingestion & Clause Intelligence
- Build document processing API in FastAPI:
  - Takes a Supabase Storage path/signed URL.
  - Downloads the PDF and parses text using PyMuPDF.
  - Extracts key clauses (payment terms, exit clauses, penalties) using Gemini structured JSON.
  - Compares clauses against the legal database.

### Phase 4: Next.js Frontend & Interactive Report UI
- Initialize Next.js project with Tailwind CSS.
- Integrate `@supabase/supabase-js` for user auth (login, registration) and direct file upload to `legal-vault` bucket.
- Build the **Legal Vault Interface** to list and upload documents.
- Build the **Compliance Report Dashboard** to render structured JSON reports (color-coded verdicts 🟢 🟡 🔴, cited articles, recommended escalation authority, evidence checklists).
- Build the interactive chat drawer for asking follow-up questions.

### Phase 5: Verification & End-to-End Demo
- Set up and run verification tests on both Next.js and FastAPI.
- Execute security scans and color/contrast UX audits.
- Simulate the 4 primary demo cases (Tenancy, Workplace, Policing, Consumer Rights) to ensure zero hallucination of legal references.

---

## 📋 Task Breakdown

- [ ] **Task 1: Initialize Supabase Schema & pgvector**
  - Verify: Connect to Supabase and confirm `pgvector` tables are active.
- [ ] **Task 2: Implement FastAPI Backend + JWT Verification Middleware**
  - Verify: Send request with Supabase JWT and receive successful verification.
- [ ] **Task 3: Ingest Legal Knowledge Base into pgvector**
  - Verify: Query vector store through Python and return relevant legal citations.
- [ ] **Task 4: Build PyMuPDF + Clause Extraction Route**
  - Verify: Upload a PDF to Supabase Storage, invoke FastAPI parser, and retrieve structured clauses.
- [ ] **Task 5: Next.js Auth & Storage Integration**
  - Verify: User login works, and files upload successfully to the `legal-vault` bucket.
- [ ] **Task 6: Build Next.js Dashboard UI & Compliance Viewer**
  - Verify: Render mock/live JSON compliance reports beautifully.
- [ ] **Task 7: Hook up Next.js to FastAPI End-to-End**
  - Verify: Complete walkthrough of uploading a contract and receiving an explainable compliance report.

---

## 🚨 Verification Plan

### Automated Checks
- Run security scan:
  ```bash
  python .agents/skills/vulnerability-scanner/scripts/security_scan.py .
  ```
- Run UX audit:
  ```bash
  python .agents/skills/frontend-design/scripts/ux_audit.py .
  ```

### Manual Verification
- Test all 4 demo scenarios:
  1. Tenancy eviction notice without sufficient duration.
  2. Workplace contract containing illegal termination clauses.
  3. Policing rights regarding unlawful detention.
  4. Consumer rights regarding defective merchandise replacement.
