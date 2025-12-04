// api.js - API client with authentication
import { getAuthHeader } from './auth';

const API_BASE_URL = '/api';

// Request interceptors
const requestInterceptors = [];

// Add default request interceptor for authentication
requestInterceptors.push((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      ...getAuthHeader(),
      'Content-Type': 'application/json',
      'X-Client-Version': '1.0.0',
    }
  };
});

// Apply all request interceptors
const applyRequestInterceptors = (config) => {
  return requestInterceptors.reduce((acc, interceptor) => interceptor(acc), config);
};

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Apply request interceptors
  const interceptedOptions = applyRequestInterceptors({
    ...options,
    headers: options.headers || {},
  });

  try {
    const response = await fetch(url, {
      ...interceptedOptions,
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

// Function to add a custom request interceptor
export const addRequestInterceptor = (interceptor) => {
  requestInterceptors.push(interceptor);
};

// Example usage:
// addRequestInterceptor((config) => {
//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       'Custom-Header': 'CustomValue',
//     }
//   };
// });
