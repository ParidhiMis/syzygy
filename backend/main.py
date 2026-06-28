from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base
from schemas import UserCreate, UserLogin, EntryCreate
from crud import (
    create_user,
    login_user,
    create_entry,
    get_entries,
    get_entry,
    update_entry,
    delete_entry
)
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


@app.post("/entry")
def add_entry(
    entry: EntryCreate,
    db: Session = Depends(get_db)
):

    return create_entry(db, entry)


@app.get("/entry/{entry_id}")
def read_entry(

    entry_id: int,

    db: Session = Depends(get_db)

):

    return get_entry(db, entry_id)


@app.put("/entry/{entry_id}")
def edit_entry(

    entry_id: int,

    entry: EntryCreate,

    db: Session = Depends(get_db)

):

    return update_entry(db, entry_id, entry)


@app.delete("/entries/{entry_id}")
def remove_entry(

    entry_id: int,

    db: Session = Depends(get_db)

):

    return delete_entry(db, entry_id)


@app.get("/entries/{user_id}")
def read_entries(

    user_id: int,

    db: Session = Depends(get_db)

):

    return get_entries(db, user_id)
