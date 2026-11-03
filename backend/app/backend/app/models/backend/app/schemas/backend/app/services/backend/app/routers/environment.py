from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import EnvironmentalMeasurement
from app.schemas.schemas import EnvironmentalMeasurementCreate, EnvironmentalMeasurementResponse

router = APIRouter(prefix="/api/environment", tags=["Environmental Measurements"])

@router.get("/", response_model=List[EnvironmentalMeasurementResponse])
def get_measurements(db: Session = Depends(get_db)):
    return db.query(EnvironmentalMeasurement).order_by(EnvironmentalMeasurement.recorded_at.desc()).limit(50).all()

@router.post("/", response_model=EnvironmentalMeasurementResponse)
def add_measurement(data: EnvironmentalMeasurementCreate, db: Session = Depends(get_db)):
    record = EnvironmentalMeasurement(**data.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
