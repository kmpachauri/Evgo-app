import { api } from './api';

export async function getLotteryStatus() {
  const response = await api.get('/user/lottery');
  return response.data;
}

export async function claimLotteryReward(id) {
  const response = await api.post(`/user/lottery/${id}/claim`);
  return response.data;
}
