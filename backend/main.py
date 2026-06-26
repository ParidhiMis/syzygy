from pydantic import BaseModel
from fastapi import FastAPI

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
