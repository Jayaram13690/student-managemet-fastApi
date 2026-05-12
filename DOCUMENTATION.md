# FastAPI MySQL CRUD Application Documentation

## Overview
This application is a FastAPI-based CRUD (Create, Read, Update, Delete) service for managing student records stored in a MySQL database. It uses Docker for containerization and provides RESTful endpoints for student management.

## Project Structure
```
.
├── database/
│   ├── connection.py
│   ├── model.py
│   └── __init__.py
├── routers/
│   └── student_router.py
├── schemas/
│   └── student_schema.py
├── services/
│   └── student_service.py
├── main.py
├── .env
├── .gitignore
├── Documentation.md
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

## Components

### 1. `main.py`
- FastAPI application entry point
- Configures CORS middleware
- Includes student router
- Handles database connection and table creation on startup

### 2. `database/connection.py`
- Database connection configuration
- Creates SQLAlchemy engine for MySQL
- Configures session factory
- Provides database session dependency

### 3. `database/model.py`
- Defines SQLAlchemy ORM model for Student
- Maps to "students" table with columns: id, name, age, course

### 4. `schemas/student_schema.py`
- Pydantic models for request/response validation
- `StudentCreate`: Input schema for creating/updating students
- `StudentResponse`: Output schema including ID

### 5. `services/student_service.py`
- Business logic layer
- Functions for CRUD operations:
  - `create_student()`: Add new student
  - `get_students()`: Retrieve all students
  - `get_student()`: Retrieve single student by ID
  - `update_student()`: Update existing student
  - `delete_student()`: Delete student by ID
  - `filter_students()`: Filter students by course and/or minimum age

### 6. `routers/student_router.py`
- FastAPI router defining API endpoints:
  - `POST /students`: Create new student
  - `GET /students`: Get all students
  - `GET /students/{student_id}`: Get specific student
  - `PUT /students/{student_id}`: Update student
  - `DELETE /students/{student_id}`: Delete student
  - `GET /filter`: Filter students by course/min_age

### 7. `Dockerfile`
- Container configuration
- Uses Python 3.11 base image
- Installs dependencies from requirements.txt
- Exposes port 8000
- Runs Uvicorn server

### 8. `docker-compose.yml`
- Orchestrates multi-container setup
- Defines two services:
  - `app`: FastAPI application
  - `db`: MySQL 8.0 database
- Configures network and dependencies

### 9. `requirements.txt`
- Python dependencies:
  - fastapi: Web framework
  - uvicorn: ASGI server
  - sqlalchemy: ORM
  - pymysql: MySQL driver
  - pydantic: Data validation
  - cryptography: Security

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /students | Create new student |
| GET | /students | Get all students |
| GET | /students/{id} | Get student by ID |
| PUT | /students/{id} | Update student |
| DELETE | /students/{id} | Delete student |
| GET | /filter | Filter students |

## Setup and Running

1. Build and start containers:
```bash
docker-compose up --build
```

Stop Containers
```bash
docker-compose down
```

Remove Containers + Volumes:
```bash
docker-compose down -v
```

2. Application will be available at: `http://localhost:8000`

3. API documentation (Swagger UI): `http://localhost:8000/docs`

## Database Configuration

- MySQL 8.0
- Database: student_db

## Run the application

```bash 
docker-compose up
```

## Error Handling

- Returns 404 for non-existent student records
- Automatic database connection retry on startup
- Proper session management with try/finally blocks