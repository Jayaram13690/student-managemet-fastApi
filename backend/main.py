from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import text
from sqlalchemy.exc import OperationalError
import time

from database.connection import engine
from database.model import Base

from routers.student_router import router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(router)


# Wait for MySQL
def wait_for_db():

    while True:

        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))

            print("✅ Database connected successfully")
            break

        except OperationalError:
            print("⏳ Waiting for MySQL...")
            time.sleep(5)


# Startup Event
@app.on_event("startup")
def startup():

    wait_for_db()

    print("🚀 Creating database tables...")

    Base.metadata.create_all(bind=engine)

    print("✅ Tables created successfully")


@app.get("/")
def home():
    return {"message": "FastAPI MySQL CRUD Running"}