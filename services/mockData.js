export const mockUser = {
  id: '7066••••',
  phone: '9660000000',
  inviteCode: '7066•••9',
  inviteLink: 'https://evgo.example.com/invite/70664407',
  totalAssets: 1000,
  teamIncome: 1040.56,
  todayIncome: 63.6,
  totalIncome: 0,
  currentBalance: 2247.56,
  totalRecharge: 0,
  totalWithdraw: 0,
  market: {
    symbol: 'EVGO',
    company: 'EVGO INC.',
    price: 8.26,
    currency: 'D',
    changeText: '-0.96% (0.08)',
  },
  bank: {
    mobile: '99••••••',
    holderName: 'Demo Account',
    accountNumber: '12345678',
    ifsc: 'PYTM0123456',
  },
};

export const mockDevices = [
  { id: 'EVgo-1', name: 'EVgo-1', price: 685, dailyIncome: 37, days: 35, totalRevenue: 1295, inviteCommission: 160, purchaseLimit: 2, sameDayBonus: 55 },
  { id: 'EVgo-2', name: 'EVgo-2', price: 2350, dailyIncome: 131, days: 36, totalRevenue: 4716, inviteCommission: 220, purchaseLimit: 3, sameDayBonus: 155 },
  { id: 'EVgo-3', name: 'EVgo-3', price: 6650, dailyIncome: 386, days: 37, totalRevenue: 14282, inviteCommission: 480, purchaseLimit: 3, sameDayBonus: 465 },
  { id: 'EVgo-4', name: 'EVgo-4', price: 13200, dailyIncome: 754, days: 38, totalRevenue: 28652, inviteCommission: 860, purchaseLimit: 3, sameDayBonus: 965 },
  { id: 'EVgo-5', name: 'EVgo-5', price: 26500, dailyIncome: 1563, days: 40, totalRevenue: 62520, inviteCommission: 1200, purchaseLimit: 3, sameDayBonus: 2445 },
];

export const mockTransactions = [
  { id: 'txn-1', type: 'recharge', amount: 5000, status: 'Pending', createdAt: 'Oct 7 2024 11:09PM' },
  { id: 'txn-2', type: 'withdraw', amount: 650, status: 'Review', createdAt: 'Oct 7 2024 11:11PM' },
  { id: 'txn-3', type: 'recharge', amount: 1000, status: 'Success', createdAt: 'Sep 25 2024 12:08PM' },
];

export const mockIncome = {
  referralIncome: 1040.56,
  bonusIncome: 138,
  dailyIncome: 63.6,
  rows: [
    { id: 'income-1', label: 'Referral Income', value: 1040.56 },
    { id: 'income-2', label: 'Bonus Income', value: 138 },
    { id: 'income-3', label: 'Daily Income', value: 63.6 },
  ],
};

export const mockTeam = {
  inviteCount: 108,
  validCount: 21,
  levels: [
    { id: 'B', label: 'B', count: 11 },
    { id: 'C', label: 'C', count: 7 },
    { id: 'D', label: 'D', count: 31 },
  ],
  members: [
    { id: '70664407', mobile: '9090', joinedAt: 'Sep 24 2024\n12:11PM', status: 'Active', activeAt: 'Sep 25 2024\n12:08PM' },
    { id: '93914973', mobile: '9090', joinedAt: 'Oct 7 2024\n11:09PM', status: 'InActive', activeAt: '' },
    { id: '42947123', mobile: '90906', joinedAt: 'Oct 7 2024\n11:11PM', status: 'InActive', activeAt: '' },
    { id: '34491195', mobile: '', joinedAt: 'Oct 7 2024', status: 'InActive', activeAt: '' },
  ],
};
