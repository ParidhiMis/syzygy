from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base
from schemas import UserCreate, UserLogin
from crud import create_user, login_user
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to Syzygy"}


@app.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)


@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    return login_user(db, user)
