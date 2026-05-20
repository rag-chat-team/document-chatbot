from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class UserSignup(BaseModel):

    first_name: str = Field(
        min_length=2,
        max_length=50
    )

    last_name: str = Field(
        
        max_length=50
    )

    email: EmailStr

    password: str = Field(
        min_length=6,
        max_length=100
    )