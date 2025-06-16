// api.js - API client with authentication
import { getAuthHeader } from '../Auth/auth';

const API_BASE_URL = '/api';

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies if needed
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      // You might want to handle token refresh or redirect to login here
      console.error('Unauthorized access');
      // Optionally clear auth data and redirect
      // removeAuthData();
      // window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    // Parse JSON response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
