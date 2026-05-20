import { api } from './api';

export async function getUserProfile() {
  const response = await api.get('/user/profile');
  return response.data;
}

export async function getDevices() {
  const response = await api.get('/plans');
  return response.data.map((item) => ({
      id: item._id || item.id,
      name: item.name,
      price: item.price,
      dailyIncome: item.daily || item.dailyIncome,
      days: item.days || item.durationDays,
      totalRevenue: item.totalRevenue,
      inviteCommission: item.referralCommission || item.inviteCommission || item.invitationBonus,
      purchaseLimit: item.purchaseLimit,
      sameDayBonus: item.sameDayBonus,
    }));
}

export async function getIncome() {
  const response = await api.get('/user/income');
  return response.data;
}

export async function getTeam() {
  const response = await api.get('/user/team');
  return response.data;
}

export async function getSocialLinks() {
  const response = await api.get('/user/social-links');
  return response.data;
}
