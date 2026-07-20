export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TaskCreate {
  title: string;
  description?: string | null;
  completed?: boolean;
}

export interface TaskUpdate {
  title: string;
  description?: string | null;
  completed: boolean;
}

export interface TaskPartialUpdate {
  title?: string;
  description?: string | null;
  completed?: boolean;
}
