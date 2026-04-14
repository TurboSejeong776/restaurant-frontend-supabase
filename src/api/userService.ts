import { api } from './api';
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  User,
} from '@/types/UserTypes';

export const login = async (payload: LoginInput): Promise<LoginResponse> => {
  const res = await api.post('/functions/v1/auth-login', payload);
  console.log('login response', res?.data);

  const token =
    res?.data?.token ??
    res?.data?.data?.token ??
    res?.data?.data?.session?.access_token ??
    res?.data?.access_token;

  if (!token) throw new Error('No token returned from login');

  localStorage.setItem('token', token);

  const profile = await getProfile();
  localStorage.setItem('user', JSON.stringify(profile));

  return res?.data?.data ?? profile;
};

export const register = async (
  payload: RegisterInput
): Promise<LoginResponse> => {
  const res = await api.post('/functions/v1/auth-register', payload);
  localStorage.setItem('token', res.data.data.token);
  console.log(res.data);
  return res.data.data;
};

export const getProfile = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Missing auth token');

  const res = await api.get('/functions/v1/auth-profile-debug2', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data as User;
};
