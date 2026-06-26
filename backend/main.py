from database import engine
from models import Base
from pydantic import BaseModel
from fastapi import FastAPI

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Welcome to Syzygy"}


class User(BaseModel):

    username: str
    email: str
    password: str


@app.post("/register")
def register(user: User):

    return user
