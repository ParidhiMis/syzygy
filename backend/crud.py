from models import User
from security import hash_password
from security import verify_password
from models import User, Entry


def create_user(db, user):

    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:
        return {"message": "Email already exists"}

    existing_username = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_username:
        return {"message": "Username already exists"}

    db_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {
        "message": "Registration successful"
    }


def login_user(db, user):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        return {"message": "User not found"}

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Incorrect password"
        }

    return {
        "message": "Login successful",
        "username": db_user.username,
        "user_id": db_user.id,
        "email": db_user.email
    }


def create_entry(db, entry):

    db_entry = Entry(

        title=entry.title,

        media_type=entry.media_type,

        status=entry.status,

        rating=entry.rating,

        review=entry.review,

        start_date=entry.start_date,

        finish_date=entry.finish_date,

        user_id=entry.user_id

    )

    db.add(db_entry)

    db.commit()

    db.refresh(db_entry)

    return {

        "message": "Added successfully"

    }


def get_entries(db, user_id):

    return (
        db.query(Entry)
        .filter(Entry.user_id == user_id)
        .all()
    )


def get_entry(db, entry_id):

    return (
        db.query(Entry)
        .filter(Entry.id == entry_id)
        .first()
    )


def update_entry(db, entry_id, entry):

    db_entry = (
        db.query(Entry)
        .filter(Entry.id == entry_id)
        .first()
    )

    if not db_entry:
        return {"message": "Entry not found"}

    db_entry.title = entry.title
    db_entry.media_type = entry.media_type
    db_entry.status = entry.status
    db_entry.rating = entry.rating
    db_entry.review = entry.review
    db_entry.start_date = entry.start_date
    db_entry.finish_date = entry.finish_date

    db.commit()
    db.refresh(db_entry)

    return {"message": "Entry updated successfully"}


def delete_entry(db, entry_id):

    db_entry = (
        db.query(Entry)
        .filter(Entry.id == entry_id)
        .first()
    )

    if not db_entry:
        return {"message": "Entry not found"}

    db.delete(db_entry)
    db.commit()

    return {"message": "Entry deleted successfully"}


def get_user_profile(db, user_id):

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def update_user_profile(db, user_id, profile):

    db_user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not db_user:
        return {"message": "User not found"}

    db_user.username = profile.username
    db_user.bio = profile.bio
    db_user.gender = profile.gender
    db_user.pronouns = profile.pronouns
    db_user.mbti = profile.mbti
    db_user.country = profile.country

    db_user.favorite_movie = profile.favorite_movie
    db_user.favorite_anime = profile.favorite_anime
    db_user.favorite_book = profile.favorite_book
    db_user.favorite_game = profile.favorite_game

    db_user.favorite_genres = profile.favorite_genres
    db_user.profile_picture = profile.profile_picture

    db.commit()
    db.refresh(db_user)

    return db_user
