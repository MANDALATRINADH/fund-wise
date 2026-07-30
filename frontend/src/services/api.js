import axios from 'axios';

// Hardcode the backend URL for testing
const API_URL = 'https://fund-wise-backend.onrender.com/api';

const API = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add logging for debugging
API.interceptors.request.use(request => {
  console.log('API Request:', request.method.toUpperCase(), request.url);
  return request;
});

API.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const submitStartup = (data) => API.post('/startups', data);
export const fetchMyStartups = (userId) => API.get('/startups/my?userId=' + userId);
export const fetchAllStartups = () => API.get('/startups');
export const fetchStartup = (id) => API.get('/startups/' + id);
