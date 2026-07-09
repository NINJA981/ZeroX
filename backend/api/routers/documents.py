# Document routes
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_documents():
    return {"message": "Document routes initialized"}
