# Fullstack Student Management Application

## Overview
This application is a complete fullstack CRUD (Create, Read, Update, Delete) system for managing student records. It features a **React** frontend (built with Vite), a **FastAPI** backend, and a **MySQL** database. The entire application is containerized using **Docker** and **Docker Compose**, providing a seamless development and deployment experience.

## Project Structure
```
.
├── backend/                  # FastAPI Application
│   ├── database/
│   │   ├── connection.py
│   │   ├── model.py
│   │   └── __init__.py
│   ├── routers/
│   │   └── student_router.py
│   ├── schemas/
│   │   └── student_schema.py
│   ├── services/
│   │   └── student_service.py
│   ├── main.py
│   ├── Dockerfile            # Python 3.11 image
│   └── requirements.txt
├── frontend/                 # React (Vite) Application
│   ├── src/
│   │   ├── api.js            # API integration layer
│   │   ├── components/       # UI Components (Cards, Modals, etc.)
│   │   ├── hooks/            # Custom React hooks (useStudents, useToast)
│   │   ├── App.jsx           # Main Application Component
│   │   ├── index.css         # Styling
│   │   └── main.jsx
│   ├── index.html
│   ├── nginx.conf            # Nginx config for serving the SPA
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile            # Multi-stage build (Node + Nginx)
│   └── .dockerignore
├── .env                      # Environment variables
├── docker-compose.yml        # Multi-container orchestration
└── README.md
```

## System Architecture

The application is deployed across 3 Docker containers:

1. **`react_frontend` (Port 3000)**: Serves the built React SPA using an Nginx web server. Includes routing fallback for single-page applications.
2. **`fastapi_app` (Port 8000)**: Provides the REST API endpoints. Configured with CORS to accept requests from the frontend.
3. **`mysql_db` (Port 3307)**: Persists student data. Uses MySQL 8.0.

## API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create a new student |
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| PUT | `/students/{id}` | Update a student |
| DELETE | `/students/{id}` | Delete a student |
| GET | `/filter` | Filter students by course/min_age |

## How to Run the Application

The entire stack is managed via Docker Compose. Ensure you have Docker Desktop (or Docker Engine + Docker Compose) installed.

### 1. Start Everything
To build the images and start all three containers in the background:
```bash
docker-compose up -d --build
```
*Note: The first run might take a minute or two to pull the base images and build the frontend.*

### 2. Access the Application
Once the containers are running, open your browser and navigate to:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Check Logs (Optional)
If you want to see what's happening behind the scenes:
```bash
docker-compose logs -f           # All logs
docker-compose logs -f frontend  # Only frontend logs
docker-compose logs -f app       # Only backend logs
docker-compose logs -f db        # Only database logs
```

### 4. Stop the Application
To stop the containers without losing your database data:
```bash
docker-compose down
```

To stop the containers **and** wipe the database volume (fresh start):
```bash
docker-compose down -v
```

## Local Development (Without Docker for Frontend)
If you are actively making changes to the React code and want hot-reloading:

1. Start only the backend and database via Docker:
   ```bash
   docker-compose up -d app db
   ```
2. Navigate to the frontend directory and start the Vite dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Access the live-reloading dev environment at [http://localhost:5173](http://localhost:5173).

## Features
- **Modern UI**: Dark glassmorphism theme, fully responsive, with skeleton loading screens.
- **Client-side Validation**: Forms ensure data integrity before sending requests.
- **Dynamic Filtering**: Instantly search by name/course and filter by age/course.
- **Optimistic Updates**: Immediate UI updates when adding, editing, or deleting.
- **Toast Notifications**: Built-in, non-intrusive feedback on all operations.
- **Resilient Backend**: Automatic database connection retry on startup.