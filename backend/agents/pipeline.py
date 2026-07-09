import json
import google.generativeai as genai
import os
from typing import Dict, Any, List
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Initialize Gemini
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")

supabase_client: Client = None
if SUPABASE_URL and SUPABASE_ANON_KEY:
    try:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    except Exception as e:
        print(f"Failed to initialize Supabase client: {str(e)}")

generation_config = {
    "temperature": 0.2,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 4096,
    "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    generation_config=generation_config,
)

# Predefined legal knowledge base documents for fallback
FALLBACK_LEGAL_DOCS = [
    {
        "content": "Constitution of India - Article 14: Equality before law. The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. Prohibits discrimination on grounds of religion, race, caste, sex or place of birth.",
        "type": "constitution", "article": "14", "topic": "Equality, Non-discrimination"
    },
    {
        "content": "Constitution of India - Article 19(1)(g): Right to practice any profession, or to carry on any occupation, trade or business. Subject to reasonable restrictions in the interests of the general public.",
        "type": "constitution", "article": "19(1)(g)", "topic": "Professional Freedom, Labor rights"
    },
    {
        "content": "Constitution of India - Article 21: Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law. Broadly interpreted to include the right to livelihood, clean environment, privacy, and dignity.",
        "type": "constitution", "article": "21", "topic": "Life, Liberty, Livelihood"
    },
    {
        "content": "Maternity Benefit Act, 1961 - Section 12: Dismissal or discharge during absence on account of pregnancy. When a woman absents herself from work in accordance with the provisions of this Act, it shall be unlawful for her employer to discharge or dismiss her during or on account of such absence or to give notice of discharge or dismissal on such a day that the notice will expire during such absence.",
        "type": "statute", "act": "Maternity Benefit Act, 1961", "section": "12", "topic": "Pregnancy rights, Maternity leave protection, Wrongful dismissal"
    },
    {
        "content": "Industrial Disputes Act, 1947 - Section 25F: Conditions precedent to retrenchment of workmen. No workman employed in any industry who has been in continuous service for not less than one year under an employer shall be retrenched by that employer until: (a) the workman has been given one month's notice in writing indicating the reasons for retrenchment and the period of notice has expired, or the workman has been paid in lieu of such notice, wages for the period of the notice; (b) the workman has been paid, at the time of retrenchment, compensation which shall be equivalent to fifteen days' average pay for every completed year of continuous service or any part thereof in excess of six months.",
        "type": "statute", "act": "Industrial Disputes Act, 1947", "section": "25F", "topic": "Retrenchment, Dismissal process, Severance pay, Notice period"
    },
    {
        "content": "Payment of Wages Act, 1936 - Section 5: Time of payment of wages. The wages of every person employed upon or in any railway, factory or industrial establishment shall be paid before the expiry of the seventh day (for establishments with less than 1,000 employees) or the tenth day (for other establishments) after the last day of the wage period in respect of which the wages are payable.",
        "type": "statute", "act": "Payment of Wages Act, 1936", "section": "5", "topic": "Salary delay, Wage payment timeline"
    },
    {
        "content": "Bharatiya Nyaya Sanhita (BNS) - Section 302: Punishment for murder. Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Covers culpable homicide amounting to murder.",
        "type": "criminal_law", "act": "Bharatiya Nyaya Sanhita (BNS)", "section": "302", "topic": "Murder, Homicide punishment"
    },
    {
        "content": "Bharatiya Nyaya Sanhita (BNS) - Section 318: Cheating. Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security... shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine. Covers contractual fraud, financial cheating, and misrepresentation.",
        "type": "criminal_law", "act": "Bharatiya Nyaya Sanhita (BNS)", "section": "318", "topic": "Cheating, Fraud, Contractual deception"
    }
]

SYSTEM_PROMPT = """
You are a highly advanced multi-agent legal intelligence system for Indian Law. 
You act as several distinct agents orchestrated together:
1. Fact Extractor: Pull out the key facts, entities, and timelines from the user scenario.
2. Constitution Mapper: Identify relevant Constitutional Articles and Fundamental Rights.
3. Law Retriever: Identify applicable statutes and precedents (BNS, Labor laws, etc.).
4. Compliance Analyzer: Determine overall verdict, compliance score, and explainability tree.
5. Authority Recommendation Engine: Recommend the correct authority to approach.
6. Missing Information Detector: Identify what facts are missing.

Your output must strictly be a valid JSON object following this exact schema:
{
  "overallVerdict": "safe" | "warning" | "violation" | "info",
  "complianceScore": 0-100,
  "summary": "Brief summary of the legal standing.",
  "clauses": [
    { "id": "c1", "originalText": "Extracted fact/clause", "citedLaw": "Applicable law/article", "verdict": "safe" | "warning" | "violation" | "info", "explanation": "Why", "recommendation": "Optional advice" }
  ],
  "explainabilityTree": {
    "incident": "Summary of incident",
    "facts": ["Fact 1", "Fact 2"],
    "constitutionArticles": ["Article X: ..."],
    "applicableLaws": ["Act Y, Section Z"],
    "precedents": ["Case Law XYZ (if any)"],
    "conclusion": "Final logical conclusion"
  },
  "rightsHeatmap": [
    { "right": "Right to Equality (Art 14)", "confidence": 0-100, "status": "affected" | "intact" }
  ],
  "authorityRecommendation": "Name of Authority (e.g. Labour Commissioner, Consumer Court)",
  "evidenceChecklist": ["Employment contract", "Salary slips", "Emails"],
  "missingInfo": ["Question 1 to ask user", "Question 2 to ask user"]
}
"""

async def run_legal_analysis(query: str, document_text: str = None) -> Dict[str, Any]:
    # Step 1: Perform RAG retrieval from Supabase or fallback
    rag_context = ""
    retrieved_docs_count = 0
    
    if supabase_client and GEMINI_API_KEY:
        try:
            # Generate query embedding
            embedding_response = genai.embed_content(
                model="models/text-embedding-004",
                content=query,
                task_type="retrieval_query"
            )
            query_embedding = embedding_response["embedding"]
            
            # Query pgvector match_documents function
            result = supabase_client.rpc("match_documents", {
                "query_embedding": query_embedding,
                "match_threshold": 0.15,
                "match_count": 4
            }).execute()
            
            if hasattr(result, 'data') and result.data:
                retrieved_docs_count = len(result.data)
                for doc in result.data:
                    act_name = doc.get('metadata', {}).get('act', doc.get('metadata', {}).get('article', 'Statute'))
                    rag_context += f"Legal Knowledge Source: {act_name}\nContent: {doc['content']}\n\n"
        except Exception as e:
            print(f"Vector search failed, falling back to local database. Error: {str(e)}")
            
    # Fallback to predefined local docs if no documents were retrieved
    if not rag_context:
        print("Using local fallback legal knowledge base...")
        # Include all fallback documents in the prompt context so that the Gemini model can select
        # the most relevant ones.
        for doc in FALLBACK_LEGAL_DOCS:
            act_name = doc.get('act', doc.get('article', 'Statute'))
            rag_context += f"Legal Knowledge Source: {act_name}\nContent: {doc['content']}\n\n"
            retrieved_docs_count += 1

    # Step 2: Build the prompt combining query, RAG context, and document context
    prompt = f"{SYSTEM_PROMPT}\n\n"
    prompt += f"--- RETRIEVED LEGAL KNOWLEDGE BASE (Use these to map rights and laws) ---\n{rag_context}\n\n"
    
    if document_text:
        prompt += f"--- USER PROVIDED DOCUMENT TEXT ---\n{document_text[:10000]}\n\n"
        
    prompt += f"--- USER QUERY / SCENARIO ---\n{query}\n\n"
    prompt += "Analyze the user scenario and provided document against the legal knowledge base. Correctly map the fundamental rights, relevant articles, and BNS/statute violations. Generate the full structured JSON report."

    # Step 3: Call Gemini API
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(prompt)
    
    try:
        report = json.loads(response.text)
        # Inject metadata about search if useful
        report["rag_retrieved_docs"] = retrieved_docs_count
        return report
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {response.text}")
        raise ValueError("LLM returned malformed JSON.")
