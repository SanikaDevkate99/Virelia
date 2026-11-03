from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import plants, diagnoses, environment, recommendations

Base.metadata.create_all(bind=engine)

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

app.include_router(plants.router)
app.include_router(diagnoses.router)
app.include_router(environment.router)
app.include_router(recommendations.router)

@app.get("/")
def health_check():
    return {"status": "online", "system": "Virelia Backend API"}
