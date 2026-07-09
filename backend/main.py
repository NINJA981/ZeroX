from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app = FastAPI(
    title="Sahur AI API",
    description="Backend API for Sahur AI Legal Compliance Platform",
    version="1.0.0"
)

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.routers import documents, analyze, simulate

app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(analyze.router, prefix="/api/analyze", tags=["Analyze"])
app.include_router(simulate.router, prefix="/api/simulate", tags=["Simulate"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Sahur AI Backend is running."}
