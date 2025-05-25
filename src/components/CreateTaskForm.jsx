import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTaskForm = ({ onCreate }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id || '';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('User not logged in! Please log in again.');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Submitting task with userId:', userId); // Debug log
      const response = await axios.post(`http://localhost:5000/api/tasks/add`, {
        ...formData,
        userId,
      });
      console.log('Task creation response:', response.data); // Debug log
      setFormData({ title: '', description: '', dueDate: '' });
      toast.success('Task added successfully!');
      onCreate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task');
      console.error('Failed to add task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6 transform transition-all hover:shadow-xl"
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">➕</span> Create New Task
      </h3>

      <div className="mb-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Task Title"
          required
          disabled={!userId}
        />
      </div>

      <div className="mb-4">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Task Description"
          rows="4"
          disabled={!userId}
        />
      </div>

      <div className="mb-4">
        <input
          name="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
          disabled={!userId}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !userId}
        className={`w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center ${
          isSubmitting || !userId ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
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
        ) : (
          <span className="mr-2">➕</span>
        )}
        {isSubmitting ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default CreateTaskForm;