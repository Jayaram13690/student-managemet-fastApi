from sqlalchemy.orm import Session
from database.model import Student
from schemas.student_schema import StudentCreate

# CREATE
def create_student(db: Session, student: StudentCreate):

    db_student = Student(
        name=student.name,
        age=student.age,
        course=student.course
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student

# GET ALL
def get_students(db: Session):
    return db.query(Student).all()

# GET ONE
def get_student(db: Session, student_id: int):
    return db.query(Student).filter(Student.id == student_id).first()

# UPDATE
def update_student(
    db: Session,
    student_id: int,
    updated_student: StudentCreate
):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student:
        student.name = updated_student.name
        student.age = updated_student.age
        student.course = updated_student.course

        db.commit()
        db.refresh(student)

    return student

# DELETE
def delete_student(db: Session, student_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student:
        db.delete(student)
        db.commit()

    return student

# FILTER
def filter_students(
    db: Session,
    course: str = None,
    min_age: int = None
):

    query = db.query(Student)

    if course:
        query = query.filter(Student.course == course)

    if min_age:
        query = query.filter(Student.age >= min_age)

    return query.all()