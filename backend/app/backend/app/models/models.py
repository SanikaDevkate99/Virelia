from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Plant(Base):
    __tablename__ = "plants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    species = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)
    health_status = Column(String(50), default="Healthy") # Healthy, Attention, Critical
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnoses = relationship("Diagnosis", back_populates="plant", cascade="all, delete-orphan")
    measurements = relationship("EnvironmentalMeasurement", back_populates="plant", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="plant", cascade="all, delete-orphan")

class Diagnosis(Base):
    __tablename__ = "diagnoses"
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    symptoms = Column(Text, nullable=False)
    simulated_condition = Column(String(150), nullable=False)
    confidence_score = Column(Float, nullable=False)
    is_simulated = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    plant = relationship("Plant", back_populates="diagnoses")

class EnvironmentalMeasurement(Base):
    __tablename__ = "environmental_measurements"
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    temperature_c = Column(Float, nullable=False)
    humidity_pct = Column(Float, nullable=False)
    soil_moisture_pct = Column(Float, nullable=False)
    sunlight_lux = Column(Float, nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    plant = relationship("Plant", back_populates="measurements")

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    category = Column(String(50), nullable=False) # Watering, Sunlight, Humidity, Disease
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), default="Medium") # High, Medium, Low
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    plant = relationship("Plant", back_populates="recommendations")
