import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Export fetchTasksByUser alongside the default api
export const fetchTasksByUser = async (userId) => {
  const res = await api.get(`/api/tasks/user/${userId}`);
  return res.data;
};

export default api;
