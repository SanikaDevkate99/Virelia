from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models

router = APIRouter(prefix="/api/plants", tags=["Plants"])

@router.get("/")
def get_plants(db: Session = Depends(get_db)):
    return db.query(models.Plant).all()

@router.post("/")
def create_plant(plant_name: str, species: str, location: str, db: Session = Depends(get_db)):
    db_plant = models.Plant(name=plant_name, species=species, location=location)
    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant

