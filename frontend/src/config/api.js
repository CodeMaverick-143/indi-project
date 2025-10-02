// API Configuration
export const API_BASE_URL = 'https://indi-project-arix.onrender.com';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
  },
  COMMENTS: {
    BASE: `${API_BASE_URL}/api/comments`,
    LIKE: (id) => `${API_BASE_URL}/api/comments/${id}/like`,
    REPLY: (id) => `${API_BASE_URL}/api/comments/${id}/reply`,
  },
};
