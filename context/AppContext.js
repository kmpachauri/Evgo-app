import * as storage from '../utils/storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

import { setAuthToken, setAutoLogoutHandler } from '../services/api';
import * as authService from '../services/authService';
import { claimDailySignIn as claimDailySignInRequest, getTransactions } from '../services/transactionService';
import { getDevices, getIncome, getTeam, getUserProfile } from '../services/userService';

const TOKEN_KEY = 'auth_token';
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signTotalDays, setSignTotalDays] = useState(0);
  const [signTotalBonus, setSignTotalBonus] = useState(0);

  const balance = user?.currentBalance ?? 0;
  const isLoggedIn = Boolean(token);
  const signClaimed = Boolean(user?.signInClaimedToday);
  const signReward = Number(user?.signInReward ?? 2);

  const tokenRef = useRef(token);
  tokenRef.current = token;

  const refreshAppData = useCallback(async () => {
    if (!tokenRef.current) return;

    setLoading(true);
    setError('');
    try {
      const [profileData, deviceData, transactionData, incomeData, teamData] = await Promise.all([
        getUserProfile(),
        getDevices(),
        getTransactions(),
        getIncome(),
        getTeam(),
      ]);

      setUser(profileData);
      setSignTotalDays(Number(profileData?.signInTotalDays ?? 0));
      setSignTotalBonus(Number(profileData?.signInTotalBonus ?? 0));
      setDevices(deviceData);
      setTransactions(transactionData);
      setIncome(incomeData);
      setTeam(teamData);
    } catch (err) {
      setError(err?.message || 'Unable to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  const claimDailySign = useCallback(async () => {
    if (user?.signInClaimedToday) return false;

    const response = await claimDailySignInRequest();
    const rewardAmount = Number(response?.rewardAmount ?? signReward);

    setUser((prev) => prev ? {
      ...prev,
      currentBalance: Number(prev.currentBalance ?? 0) + rewardAmount,
      walletBalance: Number(prev.walletBalance ?? 0) + rewardAmount,
      signInStreak: Number(response?.signInStreak ?? prev.signInStreak ?? 0),
      signInTotalDays: Number(response?.signInTotalDays ?? prev.signInTotalDays ?? 0),
      signInTotalBonus: Number(response?.signInTotalBonus ?? prev.signInTotalBonus ?? 0),
      signInClaimedToday: true,
    } : prev);
    setSignTotalDays(Number(response?.signInTotalDays ?? signTotalDays + 1));
    setSignTotalBonus(Number(response?.signInTotalBonus ?? signTotalBonus + rewardAmount));
    await refreshAppData();
    return true;
  }, [refreshAppData, signReward, signTotalBonus, signTotalDays, user]);

  const signIn = useCallback(async (payload) => {
    setLoading(true);
    setError('');
    try {
      const data = await authService.login(payload);
      await storage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      tokenRef.current = data.token;
      setAuthToken(data.token);
      setUser(data.user);
      await refreshAppData();
      return data;
    } catch (err) {
      setError(err?.message || 'Unable to login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshAppData]);

  // signUp does NOT set token — user must login manually after registration
  const signUp = useCallback(async (payload) => {
    setLoading(true);
    setError('');
    try {
      const data = await authService.register(payload);
      return data; // token NOT set here — congratulations screen stays visible
    } catch (err) {
      setError(err?.message || 'Unable to register');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await storage.removeItem(TOKEN_KEY);
    setToken(null);
    tokenRef.current = null;
    setAuthToken(null);
    setUser(null);
    setDevices([]);
    setTransactions([]);
    setIncome(null);
    setTeam(null);
    setSignTotalDays(0);
    setSignTotalBonus(0);
  }, []);

  // auto logout on 401
  useEffect(() => {
    setAutoLogoutHandler(() => {
      Toast.show({ type: 'error', text1: 'Session Expired', text2: 'Please login again.' });
      signOut();
    });
  }, [signOut]);

  // restore token from storage on app start
  useEffect(() => {
    storage.getItem(TOKEN_KEY).then((saved) => {
      if (saved) {
        setToken(saved);
        tokenRef.current = saved;
        setAuthToken(saved);
        refreshAppData();
      }
      setInitialized(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      balance,
      devices,
      transactions,
      income,
      team,
      loading,
      error,
      isLoggedIn,
      initialized,
      refreshAppData,
      signIn,
      signUp,
      signOut,
      setTransactions,
      claimDailySign,
      signClaimed,
      signTotalDays,
      signTotalBonus,
    }),
    [
      user, token, balance, devices, transactions, income, team,
      loading, error, isLoggedIn, initialized, signIn, signUp, signOut,
      claimDailySign, signClaimed, signTotalDays, signTotalBonus,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
