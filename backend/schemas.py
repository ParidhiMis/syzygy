from pydantic import BaseModel, EmailStr
from datetime import date


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class UserProfile(BaseModel):

    id: int

    username: str

    email: EmailStr

    bio: str | None = None

    gender: str | None = None

    pronouns: str | None = None

    mbti: str | None = None

    country: str | None = None

    favorite_movie: str | None = None

    favorite_anime: str | None = None

    favorite_book: str | None = None

    favorite_game: str | None = None

    favorite_genres: str | None = None

    profile_picture: str | None = None

    class Config:
        from_attributes = True


class UserProfileUpdate(BaseModel):

    username: str

    bio: str | None = None

    gender: str | None = None

    pronouns: str | None = None

    mbti: str | None = None

    country: str | None = None

    favorite_movie: str | None = None

    favorite_anime: str | None = None

    favorite_book: str | None = None

    favorite_game: str | None = None

    favorite_genres: str | None = None

    profile_picture: str | None = None


class EntryCreate(BaseModel):

    title: str
    media_type: str
    status: str
    rating: int | None = None
    review: str | None = None
    start_date: date | None = None
    finish_date: date | None = None
    user_id: int


class EntryResponse(EntryCreate):

    id: int

    class Config:
        from_attributes = True


class EntryCreate(BaseModel):

    title: str

    media_type: str

    status: str

    rating: int | None = None

    review: str | None = None

    start_date: date | None = None

    finish_date: date | None = None

    user_id: int
