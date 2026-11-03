from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PlantBase(BaseModel):
    name: str
    species: str
    location: str
    health_status: Optional[str] = "Healthy"
    image_url: Optional[str] = None

class PlantCreate(PlantBase):
    pass

class PlantResponse(PlantBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class DiagnosisCreate(BaseModel):
    plant_id: int
    symptoms: str

class DiagnosisResponse(BaseModel):
    id: int
    plant_id: int
    symptoms: str
    simulated_condition: str
    confidence_score: float
    is_simulated: bool
    created_at: datetime
    class Config:
        orm_mode = True

class EnvironmentalMeasurementCreate(BaseModel):
    plant_id: int
    temperature_c: float
    humidity_pct: float
    soil_moisture_pct: float
    sunlight_lux: float

class EnvironmentalMeasurementResponse(EnvironmentalMeasurementCreate):
    id: int
    recorded_at: datetime
    class Config:
        orm_mode = True

class RecommendationCreate(BaseModel):
    plant_id: int
    category: str
    title: str
    description: str
    priority: str = "Medium"

class RecommendationResponse(RecommendationCreate):
    id: int
    is_completed: bool
    created_at: datetime
    class Config:
        orm_mode = True
