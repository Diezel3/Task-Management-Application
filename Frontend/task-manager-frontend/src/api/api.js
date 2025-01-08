import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5223/ap', // Update with backend URL 
});

export default api;
