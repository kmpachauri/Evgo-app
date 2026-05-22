import { api } from './api';

export async function getUserProfile() {
  const response = await api.get('/user/profile');
  return response.data;
}

export async function getSessionStatus() {
  const response = await api.get('/user/session');
  return response.data?.data || null;
}

export async function saveUserBankDetails(payload) {
  const response = await api.put('/user/bank-details', payload);
  return response.data;
}

export async function getNotifications() {
  const response = await api.get('/user/notifications');
  return response.data?.data || [];
}

export async function getDevices() {
  const response = await api.get('/plans');
  return response.data
    .filter((item) => {
      const planName = String(item?.name ?? item?.code ?? '').trim().toLowerCase();
      return !planName.startsWith('jio');
    })
    .map((item) => ({
      id: item._id || item.id,
      name: item.name,
      price: item.price,
      dailyIncome: item.daily || item.dailyIncome,
      days: item.days || item.durationDays,
      totalRevenue: item.totalRevenue,
      inviteCommission: item.referralCommission || item.inviteCommission || item.invitationBonus,
      purchaseLimit: item.purchaseLimit,
      totalBuys: item.totalBuys ?? item.totalBuy ?? item.purchaseCount ?? 0,
      purchaseCount: item.purchaseCount ?? item.totalBuys ?? item.totalBuy ?? 0,
      lastBuyDate: item.lastBuyDate,
      expiryDate: item.expiryDate,
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
