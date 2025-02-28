import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5223/api', // Update with backend URL 
});

export default api;

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
