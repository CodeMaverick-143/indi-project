// API Configuration using environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://indi-project-arix.onrender.com';

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

// App configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Threaded Comments',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'A modern discussion platform',
  DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
};
