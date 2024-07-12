import axios from 'axios';
import { getCookie } from 'cookies-next';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api/v1/',
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    if (
      config.headers['Content-Type'] &&
      config.headers['Content-Type'] == 'multipart/form-data'
    ) {
      config.headers['accept'] = 'application/json';
      config.headers['content-type'] = 'multipart/form-data';
      config.headers['Authorization'] =
        `Bearer ${getCookie('ecommerce_token')}`;

      // config.headers['Acess-Control-Allow-Origin'] = '*';
      // config.headers = {
      //   Accept: 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   'Content-Type': 'multipart/form-data',
      // };
    } else {
      config.headers['accept'] = 'application/json';
      config.headers['Authorization'] =
        `Bearer ${getCookie('ecommerce_token')}`;
      // config.headers['Acess-Control-Allow-Origin'] = '*';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// API.interceptors.request.use(
//   (config) => {
//     config.headers['Accept'] = 'application/json';
//     config.headers['Content-Type'] = 'application/json'; // Ensure content type is JSON
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default API;
