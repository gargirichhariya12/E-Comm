import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach session ID to every request
API.interceptors.request.use((config) => {
  let sessionId = localStorage.getItem('shopco_session');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('shopco_session', sessionId);
  }
  config.headers['x-session-id'] = sessionId;

  const token = localStorage.getItem('shopco_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default API;
