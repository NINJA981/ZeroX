import fitz  # PyMuPDF
import time
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from core.config import settings
from core.auth import get_current_user
from agents.pipeline import run_legal_analysis
from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions

router = APIRouter()

# Response models for API documentation
class DocumentResponse(BaseModel):
    id: str
    user_id: str
    file_name: str
    file_path: str
    file_size: Optional[int]
    verdict: str
    summary: Optional[str]
    extracted_clauses: List[Dict[str, Any]]
    metadata: Dict[str, Any]
    created_at: str

def get_supabase_client(token: str) -> Client:
    """
    Initializes a Supabase client authenticated as the logged-in user.
    """
    options = ClientOptions(headers={"Authorization": f"Bearer {token}"})
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY, options=options)

def map_verdict(ai_verdict: str) -> str:
    """
    Maps LLM overallVerdict values ('safe', 'warning', 'violation', 'info')
    to DB check constraint values ('compliant', 'needs_review', 'violation', 'processing').
    """
    val = str(ai_verdict).lower().strip()
    if val == "safe":
        return "compliant"
    elif val in ("warning", "info"):
        return "needs_review"
    elif val == "violation":
        return "violation"
    else:
        return "needs_review"

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Only PDF files are supported."
        )
    
    user_id = current_user["user_id"]
    token = current_user["token"]
    
    try:
        # Read the file bytes
        file_bytes = await file.read()
        file_size = len(file_bytes)
        
        # 1. Parse text using PyMuPDF (fitz)
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            extracted_text = ""
            for page in doc:
                extracted_text += page.get_text()
            doc.close()
            extracted_text = extracted_text.strip()
        except Exception as e:
            # If parsing fails or is empty
            extracted_text = ""
            
        if not extracted_text:
            extracted_text = "no content has been detected"
            
        # 2. Upload file to Supabase Storage
        # Append a timestamp prefix to the filename to coexist separate records
        unique_name = f"{int(time.time())}_{file.filename}"
        storage_path = f"{user_id}/{unique_name}"
        
        supabase_client = get_supabase_client(token)
        
        # Upload binary stream
        storage_res = supabase_client.storage.from_("legal-vault").upload(
            path=storage_path,
            file=file_bytes,
            file_options={"content-type": "application/pdf"}
        )
        
        # 3. Run multi-agent legal analysis on the extracted text
        # If no content was detected, we provide a descriptive query to inform the analysis
        analysis_query = "Analyze this document for compliance and legal standing under Indian Law."
        if extracted_text == "no content has been detected":
            analysis_query = "The document uploaded has no readable text content (e.g. empty or scanned without OCR). Report this issue."
            
        try:
            report = await run_legal_analysis(
                query=analysis_query,
                document_text=extracted_text
            )
        except Exception as ae:
            # Fallback report structure if AI pipeline fails
            report = {
                "overallVerdict": "warning",
                "summary": f"Document uploaded successfully, but compliance analysis failed: {str(ae)}",
                "clauses": [],
                "explainabilityTree": {"incident": "Failed to analyze document", "facts": [], "applicableLaws": [], "conclusion": str(ae)},
                "rightsHeatmap": [],
                "authorityRecommendation": "N/A",
                "evidenceChecklist": [],
                "missingInfo": []
            }
            
        # 4. Map verdicts and save record to public.vault_documents table
        db_verdict = map_verdict(report.get("overallVerdict", "warning"))
        
        db_data = {
            "user_id": user_id,
            "file_name": file.filename,
            "file_path": f"legal-vault/{storage_path}",
            "file_size": file_size,
            "verdict": db_verdict,
            "summary": report.get("summary", ""),
            "extracted_clauses": report.get("clauses", []),
            "metadata": {
                "unique_name": unique_name,
                "explainabilityTree": report.get("explainabilityTree"),
                "rightsHeatmap": report.get("rightsHeatmap"),
                "authorityRecommendation": report.get("authorityRecommendation"),
                "evidenceChecklist": report.get("evidenceChecklist"),
                "missingInfo": report.get("missingInfo")
            }
        }
        
        db_res = supabase_client.table("vault_documents").insert(db_data).execute()
        if not db_res.data:
            raise Exception("Failed to insert record into vault_documents table.")
            
        inserted_record = db_res.data[0]
        return DocumentResponse(**inserted_record)
        
    except Exception as e:
        # In case of database or other errors, try to clean up the uploaded storage file
        try:
            if 'storage_path' in locals():
                supabase_client.storage.from_("legal-vault").remove([storage_path])
        except Exception:
            pass
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload or analyze document: {str(e)}"
        )

@router.get("/", response_model=List[DocumentResponse])
async def get_documents(
    current_user: dict = Depends(get_current_user)
):
    try:
        user_id = current_user["user_id"]
        token = current_user["token"]
        
        supabase_client = get_supabase_client(token)
        
        # Fetch user's documents sorted by creation date descending
        res = supabase_client.table("vault_documents") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
            
        return res.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch documents: {str(e)}"
        )

@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        user_id = current_user["user_id"]
        token = current_user["token"]
        
        supabase_client = get_supabase_client(token)
        
        # Verify ownership first
        res = supabase_client.table("vault_documents") \
            .select("file_path") \
            .eq("id", document_id) \
            .eq("user_id", user_id) \
            .execute()
            
        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found or access denied."
            )
            
        doc = res.data[0]
        file_path = doc["file_path"]
        
        # Extract storage path relative to the bucket (remove "legal-vault/" prefix)
        prefix = "legal-vault/"
        storage_path = file_path[len(prefix):] if file_path.startswith(prefix) else file_path
        
        # 1. Delete from storage bucket
        try:
            supabase_client.storage.from_("legal-vault").remove([storage_path])
        except Exception as se:
            print(f"Failed to delete file from storage: {se}")
            
        # 2. Delete database record
        supabase_client.table("vault_documents") \
            .delete() \
            .eq("id", document_id) \
            .eq("user_id", user_id) \
            .execute()
            
        return {"status": "success", "message": "Document deleted successfully."}
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete document: {str(e)}"
        )
