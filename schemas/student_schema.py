from pydantic import BaseModel

# Request Body
class StudentCreate(BaseModel):
    name: str
    age: int
    course: str

# Response Body
class StudentResponse(StudentCreate):
    id: int

    class Config:
        from_attributes = True