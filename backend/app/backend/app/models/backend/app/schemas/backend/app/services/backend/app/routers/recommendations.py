from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import Recommendation
from app.schemas.schemas import RecommendationCreate, RecommendationResponse

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

@router.get("/", response_model=List[RecommendationResponse])
def get_recommendations(db: Session = Depends(get_db)):
    return db.query(Recommendation).order_by(Recommendation.created_at.desc()).all()

@router.post("/", response_model=RecommendationResponse)
def create_recommendation(rec: RecommendationCreate, db: Session = Depends(get_db)):
    item = Recommendation(**rec.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.patch("/{rec_id}/complete", response_model=RecommendationResponse)
def mark_completed(rec_id: int, db: Session = Depends(get_db)):
    item = db.query(Recommendation).filter(Recommendation.id == rec_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    item.is_completed = True
    db.commit()
    db.refresh(item)
    return item
