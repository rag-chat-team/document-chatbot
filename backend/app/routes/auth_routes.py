from app.dependencies.auth_dependency import get_current_user
from fastapi import APIRouter,Depends,HTTPException,Response
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserSignup

from app.models.user_model import User

from app.config.db_dependency import get_db

from app.utils.hashing import hash_password

from app.schemas.user_schema import UserLogin

from app.utils.hashing import verify_password

from app.utils.jwt_handler import create_access_token

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

@router.post("/login")
def login(

    user: UserLogin,
    response: Response,
    db: Session = Depends(get_db)
):

    try:

        existing_user = db.query(User).filter(
        User.email == user.email
        ).first()
        print(existing_user,"existing_user")

        if not existing_user:

            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        is_valid_password = verify_password(
            user.password,
            existing_user.password
        )
        print(is_valid_password,"is_valid_password")
        if not is_valid_password:

            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        access_token = create_access_token({
            "user_id": str(existing_user.id)
        })

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return {
            "message": "Login successful"
        }

    except Exception as error:

        print(error,"bhjbk")

        raise HTTPException(
            status_code=500,
            detail="Something went wrong"
        )

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": str(current_user.id),
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email
    }        