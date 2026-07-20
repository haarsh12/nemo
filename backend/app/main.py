from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks

app = FastAPI(title="Task API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Task API is running"}
