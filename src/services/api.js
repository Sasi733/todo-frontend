import axios from 'axios';

export const fetchTasksByUser = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/tasks/user/${userId}`);
    return response.data; // Should return an array of tasks
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};