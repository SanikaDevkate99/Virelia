from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Force Python to inspect the internal folder path directly
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

# Direct local file injections matching your workspace layout
import database
import models
import plants
import diagnoses
import environment
import recommendations

# Bind physical PostgreSQL schema layouts
database.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Virelia Botanical Intelligence API",
    version="1.0.0",
    description="AI-powered plant health monitoring and environmental advisory system."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach routes cleanly
app.include_router(plants.router)
app.include_router(diagnoses.router)
app.include_router(environment.router)
app.include_router(recommendations.router)

@app.get("/")
def health_check():
    return {"status": "online", "system": "Virelia Backend API"}



