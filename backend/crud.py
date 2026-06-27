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
