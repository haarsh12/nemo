from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.task import TaskCreate, TaskUpdate, TaskPartialUpdate, TaskResponse

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

tasks_db: List[dict] = []
task_id_counter = 1

@router.get("", response_model=List[TaskResponse], status_code=status.HTTP_200_OK)
def get_all_tasks():
    return tasks_db

@router.get("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def get_task(task_id: int):
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate):
    global task_id_counter
    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "description": task.description,
        "completed": task.completed
    }
    tasks_db.append(new_task)
    task_id_counter += 1
    return new_task

@router.put("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def update_task(task_id: int, task: TaskUpdate):
    existing_task = next((t for t in tasks_db if t["id"] == task_id), None)
    if not existing_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    existing_task["title"] = task.title
    existing_task["description"] = task.description
    existing_task["completed"] = task.completed
    return existing_task

@router.patch("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def partial_update_task(task_id: int, task: TaskPartialUpdate):
    existing_task = next((t for t in tasks_db if t["id"] == task_id), None)
    if not existing_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    if task.title is not None:
        existing_task["title"] = task.title
    if task.description is not None:
        existing_task["description"] = task.description
    if task.completed is not None:
        existing_task["completed"] = task.completed
    return existing_task

@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(task_id: int):
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    tasks_db.remove(task)
    return {"message": "Task deleted successfully", "id": task_id}
