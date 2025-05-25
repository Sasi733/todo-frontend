import api from './api'; // ✅ Uses VITE_API_BASE_URL from .env

export const registerUser = async (userData) => {
  try {
    const res = await api.post('/api/users/register', userData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await api.post('/api/users/login', credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
