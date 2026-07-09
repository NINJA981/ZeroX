import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai
from supabase import create_client, Client

# Load environment variables
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(backend_dir, ".env"))

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env")
    sys.exit(1)

if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GEMINI_API_KEY":
    print("Error: Please set a valid GEMINI_API_KEY in .env")
    sys.exit(1)

# Initialize Supabase and Gemini
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
genai.configure(api_key=GEMINI_API_KEY)

legal_documents = [
    {
        "content": "Constitution of India - Article 14: Equality before law. The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. Prohibits discrimination on grounds of religion, race, caste, sex or place of birth.",
        "metadata": {"type": "constitution", "article": "14", "topic": "Equality, Non-discrimination"}
    },
    {
        "content": "Constitution of India - Article 19(1)(g): Right to practice any profession, or to carry on any occupation, trade or business. Subject to reasonable restrictions in the interests of the general public.",
        "metadata": {"type": "constitution", "article": "19(1)(g)", "topic": "Professional Freedom, Labor rights"}
    },
    {
        "content": "Constitution of India - Article 21: Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law. Broadly interpreted to include the right to livelihood, clean environment, privacy, and dignity.",
        "metadata": {"type": "constitution", "article": "21", "topic": "Life, Liberty, Livelihood"}
    },
    {
        "content": "Maternity Benefit Act, 1961 - Section 12: Dismissal or discharge during absence on account of pregnancy. When a woman absents herself from work in accordance with the provisions of this Act, it shall be unlawful for her employer to discharge or dismiss her during or on account of such absence or to give notice of discharge or dismissal on such a day that the notice will expire during such absence.",
        "metadata": {"type": "statute", "act": "Maternity Benefit Act, 1961", "section": "12", "topic": "Pregnancy rights, Maternity leave protection, Wrongful dismissal"}
    },
    {
        "content": "Industrial Disputes Act, 1947 - Section 25F: Conditions precedent to retrenchment of workmen. No workman employed in any industry who has been in continuous service for not less than one year under an employer shall be retrenched by that employer until: (a) the workman has been given one month's notice in writing indicating the reasons for retrenchment and the period of notice has expired, or the workman has been paid in lieu of such notice, wages for the period of the notice; (b) the workman has been paid, at the time of retrenchment, compensation which shall be equivalent to fifteen days' average pay for every completed year of continuous service or any part thereof in excess of six months.",
        "metadata": {"type": "statute", "act": "Industrial Disputes Act, 1947", "section": "25F", "topic": "Retrenchment, Dismissal process, Severance pay, Notice period"}
    },
    {
        "content": "Payment of Wages Act, 1936 - Section 5: Time of payment of wages. The wages of every person employed upon or in any railway, factory or industrial establishment shall be paid before the expiry of the seventh day (for establishments with less than 1,000 employees) or the tenth day (for other establishments) after the last day of the wage period in respect of which the wages are payable.",
        "metadata": {"type": "statute", "act": "Payment of Wages Act, 1936", "section": "5", "topic": "Salary delay, Wage payment timeline"}
    },
    {
        "content": "Bharatiya Nyaya Sanhita (BNS) - Section 302: Punishment for murder. Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Covers culpable homicide amounting to murder.",
        "metadata": {"type": "criminal_law", "act": "Bharatiya Nyaya Sanhita (BNS)", "section": "302", "topic": "Murder, Homicide punishment"}
    },
    {
        "content": "Bharatiya Nyaya Sanhita (BNS) - Section 318: Cheating. Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security... shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine. Covers contractual fraud, financial cheating, and misrepresentation.",
        "metadata": {"type": "criminal_law", "act": "Bharatiya Nyaya Sanhita (BNS)", "section": "318", "topic": "Cheating, Fraud, Contractual deception"}
    }
]

def seed():
    print(f"Generating embeddings and inserting {len(legal_documents)} documents...")
    
    for i, doc in enumerate(legal_documents):
        try:
            print(f"Processing document {i+1}: {doc['metadata']['topic']}...")
            
            # Generate embedding using text-embedding-004 (768 dimensions)
            response = genai.embed_content(
                model="models/text-embedding-004",
                content=doc["content"],
                task_type="retrieval_document"
            )
            embedding = response["embedding"]
            
            # Insert into database
            data = supabase.table("documents").insert({
                "content": doc["content"],
                "metadata": doc["metadata"],
                "embedding": embedding
            }).execute()
            
            print(f"Successfully inserted document {i+1}!")
        except Exception as e:
            print(f"Error inserting document {i+1}: {str(e)}")

if __name__ == "__main__":
    seed()
