import json
import google.generativeai as genai
import os
from typing import Dict, Any, List

# Initialize Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

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
  "overallVerdict": "compliant" | "needs_review" | "violation",
  "complianceScore": 0-100,
  "summary": "Brief summary of the legal standing.",
  "clauses": [
    { "text": "Extracted fact/clause", "law": "Applicable law/article", "status": "compliant" | "violation", "explanation": "Why" }
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
    prompt = f"{SYSTEM_PROMPT}\n\nUser Query/Scenario: {query}"
    if document_text:
        prompt += f"\n\nDocument Context:\n{document_text[:10000]}" # Truncate if too long
        
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(prompt)
    
    try:
        report = json.loads(response.text)
        return report
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {response.text}")
        raise ValueError("LLM returned malformed JSON.")
