from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/api/diagnoses", tags=["Diagnoses"])

@router.get("/")
def list_diagnoses(db: Session = Depends(get_db)):
    return db.query(models.Diagnosis).all()
