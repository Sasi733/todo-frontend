import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
