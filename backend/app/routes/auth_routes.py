from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.user_schema import UserSignup

from app.models.user_model import User

from app.config.db_dependency import get_db

from app.utils.hashing import hash_password


router = APIRouter()


@router.post("/signup")
def signup(
    user: UserSignup,
    db: Session = Depends(get_db)
):

    # check existing user

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # hash password

    hashed_password = hash_password(
        user.password
    )

    # create new user

    new_user = User(

        first_name=user.first_name,

        last_name=user.last_name,

        email=user.email,

        password=hashed_password
    )

    # save user

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }