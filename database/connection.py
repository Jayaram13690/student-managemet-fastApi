import os
from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker



# MySQL Database URL

DATABASE_URL = "mysql+pymysql://{user}:{password}@{host}/{database}".format(

    user=os.getenv("DB_USER", "root"),

    password=os.getenv("DB_PASSWORD", "password123"),

    host=os.getenv("DB_HOST", "db"),

    database=os.getenv("DB_NAME", "student_db")

)



# Create Engine

engine = create_engine(DATABASE_URL)



# Session Configuration

SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine

)



# Base Class

Base = declarative_base()



# Dependency

def get_db():

    db = SessionLocal()



    try:

        yield db

    finally:

        db.close()