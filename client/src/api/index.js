import axios from 'axios';

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }

  return req;
});

export const getUsersCarsForSale = () => API.get('/cars/users');
export const getUsersSoldCars = () => API.get('/cars/users/sold');
export const getUsersBoughtCars = () => API.get('/cars/users/bought');

