import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5223/api', // Update with backend URL 
});

// Interceptor to add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export const getTasks = () => api.get('/task');
export const getTask = (id) => api.get(`/task/${id}`);
export const createTask = (taskData) => api.post('/task', taskData);
export const updateTask = (id, taskData) => api.put(`/task/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/task/${id}`);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
