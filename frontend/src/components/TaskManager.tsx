import { useState } from 'react';
import { Task } from '../types/task';
import * as api from '../services/api';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
  const [updateTaskTitle, setUpdateTaskTitle] = useState('');
  const [updateTaskDescription, setUpdateTaskDescription] = useState('');
  const [updateTaskCompleted, setUpdateTaskCompleted] = useState(false);
  const [patchTaskId, setPatchTaskId] = useState('');
  const [patchTaskTitle, setPatchTaskTitle] = useState('');
  const [deleteTaskId, setDeleteTaskId] = useState('');
  const [getTaskId, setGetTaskId] = useState('');

  const displayResult = (data: unknown, status: number, err: string | null) => {
    setResponse(JSON.stringify(data, null, 2));
    setStatusCode(status);
    setError(err);
  };

  const handleGetAllTasks = async () => {
    setLoading(true);
    const result = await api.getAllTasks();
    if (result.data) {
      setTasks(result.data);
    }
    displayResult(result.data, result.status, result.error);
    setLoading(false);
  };

  const handleGetTaskById = async () => {
    if (!getTaskId) return;
    setLoading(true);
    const result = await api.getTaskById(Number(getTaskId));
    displayResult(result.data, result.status, result.error);
    setLoading(false);
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle) return;
    setLoading(true);
    const result = await api.createTask({
      title: newTaskTitle,
      description: newTaskDescription || null,
      completed: false
    });
    displayResult(result.data, result.status, result.error);
    setLoading(false);
    if (result.data) {
      setNewTaskTitle('');
      setNewTaskDescription('');
      handleGetAllTasks();
    }
  };

  const handleUpdateTask = async () => {
    if (!updateTaskId || !updateTaskTitle) return;
    setLoading(true);
    const result = await api.updateTask(Number(updateTaskId), {
      title: updateTaskTitle,
      description: updateTaskDescription || null,
      completed: updateTaskCompleted
    });
    displayResult(result.data, result.status, result.error);
    setLoading(false);
    if (result.data) {
      handleGetAllTasks();
    }
  };

  const handlePartialUpdate = async () => {
    if (!patchTaskId || !patchTaskTitle) return;
    setLoading(true);
    const result = await api.partialUpdateTask(Number(patchTaskId), {
      title: patchTaskTitle
    });
    displayResult(result.data, result.status, result.error);
    setLoading(false);
    if (result.data) {
      handleGetAllTasks();
    }
  };

  const handleDeleteTask = async () => {
    if (!deleteTaskId) return;
    setLoading(true);
    const result = await api.deleteTask(Number(deleteTaskId));
    displayResult(result.data, result.status, result.error);
    setLoading(false);
    if (result.data) {
      setDeleteTaskId('');
      handleGetAllTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Task Manager - REST API Demo</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Operations */}
          <div className="space-y-6">
            {/* GET All Tasks */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-green-600">GET /api/tasks</h2>
              <button
                onClick={handleGetAllTasks}
                disabled={loading}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                Get All Tasks
              </button>
            </div>

            {/* GET Task by ID */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-green-600">GET /api/tasks/:id</h2>
              <input
                type="number"
                value={getTaskId}
                onChange={(e) => setGetTaskId(e.target.value)}
                placeholder="Task ID"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handleGetTaskById}
                disabled={loading || !getTaskId}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                Get Task
              </button>
            </div>

            {/* POST Create Task */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">POST /api/tasks</h2>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task Title"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Task Description"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handleCreateTask}
                disabled={loading || !newTaskTitle}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Create Task
              </button>
            </div>

            {/* PUT Update Task */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-yellow-600">PUT /api/tasks/:id</h2>
              <input
                type="number"
                value={updateTaskId}
                onChange={(e) => setUpdateTaskId(e.target.value)}
                placeholder="Task ID"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <input
                type="text"
                value={updateTaskTitle}
                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                placeholder="New Title"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <input
                type="text"
                value={updateTaskDescription}
                onChange={(e) => setUpdateTaskDescription(e.target.value)}
                placeholder="New Description"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={updateTaskCompleted}
                  onChange={(e) => setUpdateTaskCompleted(e.target.checked)}
                  className="mr-2"
                />
                <span>Completed</span>
              </label>
              <button
                onClick={handleUpdateTask}
                disabled={loading || !updateTaskId || !updateTaskTitle}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                Update Task (PUT)
              </button>
            </div>

            {/* PATCH Partial Update */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-purple-600">PATCH /api/tasks/:id</h2>
              <input
                type="number"
                value={patchTaskId}
                onChange={(e) => setPatchTaskId(e.target.value)}
                placeholder="Task ID"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <input
                type="text"
                value={patchTaskTitle}
                onChange={(e) => setPatchTaskTitle(e.target.value)}
                placeholder="New Title"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handlePartialUpdate}
                disabled={loading || !patchTaskId || !patchTaskTitle}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
              >
                Partial Update (PATCH)
              </button>
            </div>

            {/* DELETE Task */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-red-600">DELETE /api/tasks/:id</h2>
              <input
                type="number"
                value={deleteTaskId}
                onChange={(e) => setDeleteTaskId(e.target.value)}
                placeholder="Task ID"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handleDeleteTask}
                disabled={loading || !deleteTaskId}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
              >
                Delete Task
              </button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Response Status</h2>
              {loading && <p className="text-blue-600">Loading...</p>}
              {statusCode && (
                <p className={`text-lg font-semibold ${statusCode >= 200 && statusCode < 300 ? 'text-green-600' : 'text-red-600'}`}>
                  HTTP Status: {statusCode}
                </p>
              )}
              {error && <p className="text-red-600 mt-2">Error: {error}</p>}
            </div>

            {/* Response JSON */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Response JSON</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
                {response || 'No response yet'}
              </pre>
            </div>

            {/* Task List */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks available</p>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task.id} className="border border-gray-200 p-3 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">ID: {task.id}</p>
                          <p className="text-lg">{task.title}</p>
                          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
                        </div>
                        <span className={`px-2 py-1 rounded text-sm ${task.completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                          {task.completed ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
