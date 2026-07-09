from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
# We'll import the pipeline engine here
from agents.pipeline import run_legal_analysis

router = APIRouter()

class AnalyzeRequest(BaseModel):
    query: str
    document_id: Optional[str] = None
    document_text: Optional[str] = None

class AnalyzeResponse(BaseModel):
    overallVerdict: str
    complianceScore: int
    summary: str
    clauses: List[Dict[str, Any]]
    explainabilityTree: Optional[Dict[str, Any]] = None
    rightsHeatmap: Optional[List[Dict[str, Any]]] = None
    missingInfo: Optional[List[str]] = None
    authorityRecommendation: Optional[str] = None
    evidenceChecklist: Optional[List[str]] = None

@router.post("/", response_model=AnalyzeResponse)
async def analyze_case(request: AnalyzeRequest):
    try:
        # Step 1: Run the multi-agent pipeline
        report = await run_legal_analysis(
            query=request.query, 
            document_text=request.document_text
        )
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
