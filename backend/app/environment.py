from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/api/environment", tags=["Environmental Measurements"])

@router.get("/")
def get_measurements(db: Session = Depends(get_db)):
    return db.query(models.EnvironmentalMeasurement).all()
