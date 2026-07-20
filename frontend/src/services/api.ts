import { Task, TaskCreate, TaskUpdate, TaskPartialUpdate } from '../types/task';

const API_BASE_URL = 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  error: string | null;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const status = response.status;
  
  try {
    const data = await response.json();
    
    if (!response.ok) {
      return {
        data: null,
        status,
        error: data.detail || 'Request failed'
      };
    }
    
    return {
      data,
      status,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      status,
      error: 'Failed to parse response'
    };
  }
}

export async function getAllTasks(): Promise<ApiResponse<Task[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    return handleResponse<Task[]>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

export async function getTaskById(id: number): Promise<ApiResponse<Task>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);
    return handleResponse<Task>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

export async function createTask(task: TaskCreate): Promise<ApiResponse<Task>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return handleResponse<Task>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

export async function updateTask(id: number, task: TaskUpdate): Promise<ApiResponse<Task>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return handleResponse<Task>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

export async function partialUpdateTask(id: number, task: TaskPartialUpdate): Promise<ApiResponse<Task>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return handleResponse<Task>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

export async function deleteTask(id: number): Promise<ApiResponse<{ message: string; id: number }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE'
    });
    return handleResponse<{ message: string; id: number }>(response);
  } catch (error) {
    return {
      data: null,
      status: 0,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}
