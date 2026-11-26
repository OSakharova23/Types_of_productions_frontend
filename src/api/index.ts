import { Api } from './Api';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const isMockMode =
  import.meta.env.VITE_USE_MOCK === 'true' ||
  (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io'));

export const api = new Api({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
});
api.instance.defaults.withCredentials = true;

export const loginManual = async (credentials: { username: string; password: string }) => {
  if (isMockMode) {
    return Promise.resolve({
      data: { ok: true, user: { username: credentials.username, mode: 'mock' } },
    });
  }
  return axios.post('/api/users/login', credentials);
};

export const logoutManual = async () => {
  if (isMockMode) {
    return Promise.resolve({ data: { ok: true } });
  }
  return axios.post('/api/users/logout');
};