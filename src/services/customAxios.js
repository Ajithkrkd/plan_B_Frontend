

import axios from 'axios';
import { refreshToken } from './tokenUtils';
const customAxios = axios.create({
  baseURL: 'https://planb-ajithkrkd.online',   
  // baseURL: 'http://localhost:8080',   
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle response errors
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.data, 'from custom axios' )
    if (error.response.data.status == 406 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call a function to refresh the tokens
        await refreshToken();
        // Retry the original request with the new access token
        return customAxios(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., log out the user)
        console.error('Error refreshing tokens:', refreshError);
        // You may want to redirect to the login page or dispatch a logout action
        // depending on how you manage authentication in your application
        // logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
