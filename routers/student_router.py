from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.student_schema import (
    StudentCreate,
    StudentResponse
)

from services.student_service import (
    create_student,
    get_students,
    get_student,
    update_student,
    delete_student,
    filter_students
)

router = APIRouter()

# CREATE
@router.post("/students", response_model=StudentResponse)
def add_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    return create_student(db, student)

# GET ALL
@router.get("/students")
def fetch_students(
    db: Session = Depends(get_db)
):
    return get_students(db)

# GET ONE
@router.get("/students/{student_id}")
def fetch_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = get_student(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student

# UPDATE
@router.put("/students/{student_id}")
def edit_student(
    student_id: int,
    updated_student: StudentCreate,
    db: Session = Depends(get_db)
):

    student = update_student(
        db,
        student_id,
        updated_student
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student

# DELETE
@router.delete("/students/{student_id}")
def remove_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = delete_student(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student deleted successfully"
    }

# FILTER
@router.get("/filter")
def filter_student_data(
    course: str = None,
    min_age: int = None,
    db: Session = Depends(get_db)
):

    return filter_students(
        db,
        course,
        min_age
    )