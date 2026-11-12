import { Api } from './Api';
import axios from 'axios';

// Настройка axios для передачи куки
axios.defaults.withCredentials = true;

// Сгенерированный API для 7 методов production_types
export const api = new Api({
  baseURL: 'http://localhost:5173',
});
api.instance.defaults.withCredentials = true;

// Ручные методы для пользователей
export const loginManual = async (credentials: any) => axios.post('/api/users/login', credentials);
export const logoutManual = async () => axios.post('/api/users/logout');