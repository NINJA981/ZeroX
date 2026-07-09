from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from agents.pipeline import run_legal_analysis

router = APIRouter()

class SimulateRequest(BaseModel):
    original_query: str
    scenario: str
    document_text: Optional[str] = None

class SimulateResponse(BaseModel):
    overallVerdict: str
    complianceScore: int
    summary: str
    clauses: List[Dict[str, Any]]
    explainabilityTree: Optional[Dict[str, Any]] = None
    rightsHeatmap: Optional[List[Dict[str, Any]]] = None
    missingInfo: Optional[List[str]] = None
    authorityRecommendation: Optional[str] = None
    evidenceChecklist: Optional[List[str]] = None

@router.post("/", response_model=SimulateResponse)
async def simulate_scenario(request: SimulateRequest):
    try:
        # We append the 'what if' scenario to the original query
        combined_query = f"{request.original_query}\n\nHYPOTHETICAL WHAT-IF SCENARIO TO SIMULATE:\n{request.scenario}"
        
        report = await run_legal_analysis(
            query=combined_query, 
            document_text=request.document_text
        )
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
