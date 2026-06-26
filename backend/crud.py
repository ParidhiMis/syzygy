from models import User


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
        password=user.password
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

    if db_user.password != user.password:
        return {"message": "Incorrect password"}

    return {
        "message": "Login successful",
        "username": db_user.username
    }
