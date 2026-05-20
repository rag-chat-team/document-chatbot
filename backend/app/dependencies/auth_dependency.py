from fastapi import Request
from fastapi import HTTPException
from fastapi import Depends

from sqlalchemy.orm import Session

from app.config.db_dependency import get_db

from app.utils.jwt_handler import verify_access_token

from app.models.user_model import User


def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):

    token = request.cookies.get(
        "access_token"
    )

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    payload = verify_access_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user_id = payload.get("user_id")

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user