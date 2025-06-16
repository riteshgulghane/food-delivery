// auth.js - Authentication utility functions

// Store user data and token in sessionStorage
export const setAuthData = data => {
  if (data && data.token) {
    sessionStorage.setItem('token', data.token);
    if (data.user) {
      sessionStorage.setItem('user', JSON.stringify(data.user));
    }
  }
};

// Get the stored token
export const getToken = () => {
  return sessionStorage.getItem('token');
};

// Get the stored user data
export const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove auth data (logout)
export const removeAuthData = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Create headers with auth token
export const getAuthHeader = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
