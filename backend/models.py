from sqlalchemy import Column, Integer, String, ForeignKey, Text, Date
from database import Base
from sqlalchemy.orm import relationship


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100), unique=True, nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    bio = Column(Text, default="")

    gender = Column(String(30), default="")

    pronouns = Column(String(30), default="")

    mbti = Column(String(10), default="")

    country = Column(String(100), default="")

    favorite_movie = Column(String(200), default="")

    favorite_anime = Column(String(200), default="")

    favorite_book = Column(String(200), default="")

    favorite_game = Column(String(200), default="")

    favorite_genres = Column(Text, default="")

    profile_picture = Column(Text)

    entries = relationship("Entry", back_populates="owner")


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    media_type = Column(String(30), nullable=False)

    status = Column(String(30), nullable=False)

    rating = Column(Integer)

    review = Column(Text)

    start_date = Column(Date)

    finish_date = Column(Date)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="entries")
