import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditTaskForm = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.slice(0, 16),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.patch(`http://localhost:5000/api/tasks/update/${task._id}`, formData);
      toast.success('Task updated successfully!');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
      console.error('Update failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6 transform transition-all hover:shadow-xl"
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">✏️</span> Edit Task
      </h3>

      <div className="mb-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Task Title"
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Task Description"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <input
          name="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24"
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
            <span className="mr-2">💾</span>
          )}
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition flex items-center justify-center"
        >
          <span className="mr-2">❌</span> Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;