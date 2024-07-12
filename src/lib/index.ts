// utils/auth.js
import { deleteCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';

export const logout = () => {
  // Delete the token from local storage
  localStorage.removeItem('ecommerce_token');

  // Delete the token from cookies
  deleteCookie('ecommerce_token');

  // Redirect to the login page
  window.location.href = '/admin/login';
};

export const getToken = () => {
  return getCookie('ecommerce_token');
};

export const isAuthenticated = () => {
  return !!getToken();
};
