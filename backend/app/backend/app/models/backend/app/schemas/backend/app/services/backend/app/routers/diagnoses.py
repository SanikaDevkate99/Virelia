from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import Diagnosis, Plant
from app.schemas.schemas import DiagnosisCreate, DiagnosisResponse
from app.services.ai_demo_service import run_simulated_cnn_diagnosis

router = APIRouter(prefix="/api/diagnoses", tags=["Diagnoses"])

@router.get("/", response_model=List[DiagnosisResponse])
def list_diagnoses(db: Session = Depends(get_db)):
    return db.query(Diagnosis).order_by(Diagnosis.created_at.desc()).all()

@router.post("/", response_model=DiagnosisResponse)
def create_diagnosis(payload: DiagnosisCreate, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == payload.plant_id).first()
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    
    ai_result = run_simulated_cnn_diagnosis(plant.species, payload.symptoms)
    
    new_diag = Diagnosis(
        plant_id=plant.id,
        symptoms=payload.symptoms,
        simulated_condition=ai_result["simulated_condition"],
        confidence_score=ai_result["confidence_score"],
        is_simulated=ai_result["is_simulated"]
    )
    db.add(new_diag)
    db.commit()
    db.refresh(new_diag)
    return new_diag
