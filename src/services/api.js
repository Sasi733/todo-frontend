import axios from 'axios';

// ✅ Temporarily hardcoded baseURL until env fix works
const api = axios.create({
  baseURL: 'https://todo-backend1-rekm.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Fetch tasks by user
export const fetchTasksByUser = async (userId) => {
  const res = await api.get(`/api/tasks/user/${userId}`);
  return res.data;
};

export default api;
