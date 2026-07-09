# Product Requirements Document (PRD)

## Sahur AI — AI-Powered Constitutional Rights & Legal Compliance Analyzer

**Version:** 1.0
**Date:** July 9, 2026
**Team:** Team Velocity (Sai Charan – Team Lead, Manushree, Mahathi, Mera Shree)
**Context:** Hack The Planet 2026 / ZeroX Hackathon (OWASP) — Problem Statement GEN-017

---

## 1. Executive Summary

Sahur AI is an AI-powered legal compliance platform that helps everyday citizens understand their constitutional rights and legal standing in real-world situations. Users describe a situation or upload a personal document (contract, agreement, notice), and the system analyzes it against India's constitutional and statutory framework using a Retrieval-Augmented Generation (RAG) pipeline, returning an explainable, structured compliance report with a clear verdict and next steps.

**One-line pitch:** Sahur AI analyzes real-world situations, identifies applicable constitutional rights and laws, compares them with a user's legal documents, and generates an explainable compliance report backed by official legal references.

---

## 2. Problem Statement

Most citizens lack accessible ways to understand whether their rights are being violated or whether a contract/agreement they've signed is legally sound. Legal consultation is expensive, legal language is dense and unfamiliar, and existing AI tools tend to give unexplained, generic answers ("black-box" outputs) with no grounding in actual statutes or the user's own documents. There is no tool that combines:
- Plain-language legal reasoning,
- Grounding in verifiable legal sources (not hallucinated answers), and
- Personalization based on a user's own contracts and documents.

---

## 3. Goals & Objectives

| Goal | Description |
|---|---|
| Accessibility | Let any citizen describe a legal issue in plain language and get a clear answer |
| Explainability | Every verdict must show *why* — cited rights, laws, and reasoning steps |
| Personalization | Ground analysis in the user's own uploaded documents, not just generic law |
| Trust | Ground all outputs in official legal sources via RAG, minimizing hallucination |
| Actionability | Point users to the right authority and the evidence they should gather |

### Non-Goals (Out of Scope for MVP)
- Sahur AI does not provide certified legal advice or represent a substitute for a licensed lawyer.
- No court filing, litigation drafting, or binding legal opinions.
- No real-time multilingual support in MVP (planned for future roadmap).

---

## 4. Target Users

- **Primary:** Individual citizens facing everyday legal situations — tenants, employees, consumers, and people interacting with law enforcement.
- **Secondary:** Students, first-time renters/employees, small business owners without in-house legal counsel.
- **Hackathon Demo Scope:** Four legal domains — **Tenancy, Workplace, Policing, and Consumer Rights.**

---

## 5. User Stories

1. *As a tenant*, I want to describe a dispute with my landlord so I can find out if my rights are being violated and what law protects me.
2. *As an employee*, I want to upload my offer letter and describe my situation so I can check if my employer's action complies with labour law.
3. *As a consumer*, I want to describe a faulty product/service experience so I can know whether I have grounds for a complaint and where to file it.
4. *As a citizen interacting with police*, I want to understand my constitutional rights in that moment so I can act with confidence.
5. *As any user*, I want a plain-language report — not legal jargon — with a clear verdict (compliant / needs review / violation).
6. *As any user*, if I haven't given enough detail, I want the AI to ask me clarifying follow-up questions rather than guess.

---

## 6. Core Features (MVP)

### 6.1 Natural Language Legal Analysis
Users describe their situation in plain language. The system performs NLP-based fact extraction and identifies the relevant legal domain (tenancy, workplace, policing, consumer).

### 6.2 Constitutional Rights Mapping
Automatically identifies relevant Fundamental Rights and constitutional provisions, with plain-language explanations of what they mean in context.

### 6.3 Legal Provision Identification
Maps the scenario to applicable Indian laws, including (scoped to the four demo domains):
- Constitution of India
- Bharatiya Nyaya Sanhita (BNS)
- Consumer Protection Act
- Labour Laws
- Tenancy Laws
*(IT Act and Education Regulations noted as future-scope domains beyond the four selected for demo.)*

### 6.4 Explainable AI Reasoning
Every output includes:
- Why a specific law applies
- Which rights are involved
- How the conclusion was reached (reasoning trace)
- A confidence level

### 6.5 Compliance Assessment
A clear, easy-to-understand verdict:
- 🟢 Likely Compliant
- 🟡 Needs Review
- 🔴 Potential Violation

### 6.6 Legal Compliance Report
A structured report containing:
- Case Summary
- Constitutional Rights
- Applicable Laws
- Compliance Status
- Reasoning
- Official References
- Recommended Authority

---

## 7. Novel / Differentiating Features

### 7.1 Personal Legal Vault ⭐
Users can upload personal documents (employment contracts, rental agreements, admission letters, offer letters, loan agreements, insurance policies, government notices). These are indexed for personalized, document-grounded analysis.

### 7.2 Contract Clause Intelligence ⭐
Extracts key clauses — notice period, payment terms, responsibilities, rights, penalties, restrictions — and compares each against applicable law to flag mismatches.

### 7.3 Personalized Legal Reasoning ⭐
Combines the user's stated scenario + uploaded personal documents + the official legal knowledge base to produce context-aware, not generic, guidance.

### 7.4 Missing Information Detection
If the user's description lacks sufficient detail, the system asks targeted follow-up questions before rendering a verdict (e.g., "Was there a written agreement?", "Is the institution private or government?", "Did you receive written notice?").

### 7.5 Evidence Checklist
Suggests concrete documents/evidence the user should gather (contracts, emails, notices, receipts, payment records).

### 7.6 Authority Recommendation
Directs the user to the appropriate escalation authority: Labour Commissioner, Consumer Commission, Human Rights Commission, UGC Grievance Cell, Police, or Legal Services Authority.

---

## 8. User Flow

1. User opens Sahur AI and either types a description of their situation and/or uploads a relevant document.
2. System extracts facts via NLP and classifies the legal domain.
3. If information is insufficient, system asks clarifying follow-up questions.
4. RAG engine retrieves relevant content from (a) the user's Personal Legal Vault and (b) the official legal knowledge base.
5. AI reasoning model synthesizes retrieved content into a structured, explainable analysis.
6. System renders the Compliance Report with verdict, reasoning, references, evidence checklist, and recommended authority.
7. User can ask follow-up questions or export/download the report.

---

## 9. Technical Architecture

```
User Query / Document Upload
            │
            ▼
    NLP & Fact Extraction
            │
            ▼
 ┌───────────────────────┐
 │ Personal Legal Vault  │
 │ Contracts & Documents │
 └───────────────────────┘
            +
 ┌───────────────────────┐
 │ Official Legal KB     │
 │ Constitution & Laws   │
 └───────────────────────┘
            │
            ▼
      RAG Retrieval Engine
            │
            ▼
   Gemini AI Reasoning
            │
            ▼
 Explainable Compliance Report
```

### 9.1 Tech Stack

| Component | Technology |
|---|---|
| Frontend | React + Tailwind CSS |
| Backend | FastAPI (Python) |
| AI Model | Gemini 2.5 Flash |
| RAG Framework | LangChain / LlamaIndex |
| Vector Database | ChromaDB |
| Database | PostgreSQL / SQLite |
| Document Parser | PyMuPDF + OCR |
| Embeddings | Gemini Embeddings |
| PDF Report Generation | ReportLab |

---

## 10. Success Metrics (Hackathon Demo)

- Accurate domain classification across all 4 demo scenarios (tenancy, workplace, policing, consumer rights)
- Compliance report generated end-to-end within demo time constraints (target: under 15–20 seconds per query)
- Each report cites at least one constitutional right and one applicable statute with a clear reasoning trace
- Judges can trace every verdict back to a cited legal source (no unexplained answers)
- Personal Legal Vault demo: at least one uploaded document successfully parsed, clause-extracted, and referenced in the final report

---

## 11. Risks & Open Questions

| Risk / Open Item | Notes |
|---|---|
| Legal accuracy & liability | Must clearly disclaim "not a substitute for a licensed lawyer" throughout UI |
| RAG grounding quality | Legal KB must be curated/verified to avoid hallucinated citations |
| Scope confirmation | Validate that tenancy, workplace, policing, and consumer rights are the final 4 demo domains |
| Product naming | Confirm final name — document uses "Sahur AI"; earlier team materials referenced "Nyaya AI" |
| Role assignments | Finalize team member responsibilities (frontend, backend/RAG, legal KB curation, pitch/demo) |
| Document security | Personal Legal Vault holds sensitive documents — needs a clear data-handling/privacy stance for the pitch |

---

## 12. Roadmap Beyond MVP

- Multilingual support (regional Indian languages)
- Additional legal domains (IT Act, Education Regulations, Insurance)
- Mobile app version
- Lawyer/NGO referral network integration
- Case outcome tracking and follow-up reminders

---

## 13. Why Sahur AI Stands Out

- Explainable AI instead of black-box answers
- Grounded in official legal resources via RAG, not model memory alone
- Personalized through the Personal Legal Vault
- Produces structured compliance reports rather than open-ended chat responses
- Recommends the correct escalation authority and supporting evidence
- Architected to scale toward multilingual support and additional legal domains

**Closing Pitch:** Sahur AI empowers every citizen to understand their legal rights through explainable, personalized, and trustworthy AI — bridging the gap between complex laws and everyday decisions.
