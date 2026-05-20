import { api } from './api';

export async function validateCoupon(code) {
  const response = await api.get(`/user/coupon/validate?code=${encodeURIComponent(code)}`);
  return response.data;
}

export async function redeemCoupon(code) {
  const response = await api.post('/user/coupon/redeem', { code });
  return response.data;
}

export async function getCouponHistory() {
  const response = await api.get('/user/coupon/history');
  return response.data;
}
