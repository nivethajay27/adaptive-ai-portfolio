from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .db import get_history, get_history_item, get_shared_result, init_db, save_tailored_version
from .generator import generate_with_groq
from .models import HistoryItem, TailorRequest, TailoredPortfolio

app = FastAPI(title="Adaptive Portfolio API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://adaptive-ai-portfolio-nfnh25dla-nivethajay27s-projects.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/tailor", response_model=TailoredPortfolio)
def tailor_portfolio(payload: TailorRequest) -> TailoredPortfolio:
    generated = generate_with_groq(payload)
    session_id, share_id = save_tailored_version(payload, generated)
    return generated.model_copy(update={"sessionId": session_id, "shareId": share_id})


@app.get("/api/history", response_model=list[HistoryItem])
def get_tailor_history() -> list[HistoryItem]:
    return get_history()


@app.get("/api/history/{session_id}", response_model=HistoryItem)
def get_tailor_history_item(session_id: int) -> HistoryItem:
    item = get_history_item(session_id)
    if not item:
        raise HTTPException(status_code=404, detail="History item not found")
    return item


@app.get("/api/share/{share_id}", response_model=TailoredPortfolio)
def get_shared_portfolio(share_id: str) -> TailoredPortfolio:
    result = get_shared_result(share_id)
    if not result:
        raise HTTPException(status_code=404, detail="Shared result not found")
    return result
