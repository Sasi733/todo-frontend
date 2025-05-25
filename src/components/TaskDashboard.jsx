import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import { fetchTasksByUser } from '../services/api';
import CreateTaskForm from './CreateTaskForm';
import EditTaskForm from './EditTaskForm';
import { toast } from 'react-toastify';
import api from '../services/api';

const TaskDashboard = () => {
  const navigate = useNavigate(); // For redirecting to login
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id || '';

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validate user on mount
  useEffect(() => {
    if (!userId) {
      toast.error('User not logged in! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after showing toast
    }
  }, [userId, navigate]);

  const getTasks = async () => {
    if (!userId) return; // Prevent API call if userId is invalid
    setIsLoading(true);
    try {
      console.log('Fetching tasks for userId:', userId); // Debug log
      const data = await fetchTasksByUser(userId);
      console.log('Tasks fetched:', data); // Debug log
      setTasks(data || []);
    } catch (err) {
      toast.error('Failed to fetch tasks');
      console.error('Fetch tasks error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsCompleted = async (taskId) => {
    try {
     await api.patch(`/api/tasks/update-status/${taskId}`, { status: 'completed' });

      toast.success('Task marked as completed!');
      getTasks();
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    try {
await api.delete(`/api/tasks/delete/${taskId}`);
      toast.success('Task deleted successfully!');
      getTasks();
    } catch (err) {
      toast.error('Failed to delete task');
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    if (userId) getTasks(); // Only fetch tasks if userId is valid
  }, [userId]);

  if (!userId) {
    return null; // Prevent rendering until redirect
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center">
        <span className="mr-2">📋</span> Your Tasks
      </h2>

      <CreateTaskForm onCreate={getTasks} />

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={getTasks}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <svg
            className="animate-spin h-8 w-8 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
            ></path>
          </svg>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No tasks found. Add a task to get started!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-lg p-5 rounded-lg border border-gray-200 transform transition-all hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-3">{task.description || 'No description'}</p>
              <p className="text-sm text-gray-500 mb-2">
                Due: {new Date(task.dueDate).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
              <p
                className={`text-sm font-semibold mb-3 ${
                  task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </p>

              <div className="flex gap-2 flex-wrap">
                {task.status !== 'completed' && (
                  <button
                    onClick={() => markAsCompleted(task._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center"
                  >
                    <span className="mr-1">✔️</span> Complete
                  </button>
                )}
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
                >
                  <span className="mr-1">✏️</span> Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center"
                >
                  <span className="mr-1">🗑️</span> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;