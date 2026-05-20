import { api } from './api';

export async function login(payload) {
  const response = await api.post('/auth/login', payload);
  return response.data;
}

export async function register(payload) {
  const response = await api.post('/auth/register', payload);
  return response.data;
}

export async function requestOtp(email, purpose = 'register') {
  const response = await api.post('/auth/email-otp', { email, purpose });
  return response.data;
}

export async function requestWithdrawOtp(email) {
  const response = await api.post('/auth/email-otp', { email, purpose: 'withdrawal' });
  return response.data;
}

export async function changePassword(payload) {
  return api.post('/auth/change-password', payload).then((response) => response.data);
}
