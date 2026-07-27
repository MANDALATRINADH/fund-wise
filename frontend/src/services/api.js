import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const submitStartup = (data) => API.post('/startups', data);
export const fetchMyStartups = (userId) => API.get('/startups/my?userId=' + userId);
export const fetchAllStartups = () => API.get('/startups');
export const fetchStartup = (id) => API.get('/startups/' + id);
