import { api } from './api';

export async function getTransactions() {
  const response = await api.get('/user/transactions');
  return response.data;
}

export async function createRecharge(payload) {
  const response = await api.post('/recharge', payload);
  return response.data;
}

export async function createWithdraw(payload) {
  const response = await api.post('/withdraw', payload);
  return response.data;
}

export async function claimDailySignIn() {
  const response = await api.post('/user/sign-in');
  return response.data;
}
