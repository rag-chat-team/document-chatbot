from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.config.database import engine
from app.models.user_model import User,Base

app = FastAPI()

app.include_router(
    auth_router,
    prefix="/api/auth", 
    tags=["Auth"]
)


Base.metadata.create_all(bind=engine)
@app.get("/test-db")
def test_db():
    return {"message": "Database connected"}
@app.get("/")
def home():
    return {"message": "Backend running successfully"}