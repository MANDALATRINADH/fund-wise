import axios from 'axios';

// Use the FULL backend URL from Render
const API_URL = 'https://fund-wise-backend.onrender.com/api';

const API = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const submitStartup = (data) => API.post('/startups', data);
export const fetchMyStartups = (userId) => API.get('/startups/my?userId=' + userId);
export const fetchAllStartups = () => API.get('/startups');
export const fetchStartup = (id) => API.get('/startups/' + id);
