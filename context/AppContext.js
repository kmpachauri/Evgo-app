import * as storage from '../utils/storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import Toast from 'react-native-toast-message';

import { setAuthToken, setAutoLogoutHandler } from '../services/api';
import * as authService from '../services/authService';
import { claimDailySignIn as claimDailySignInRequest, getTransactions } from '../services/transactionService';
import { getDevices, getIncome, getNotifications, getTeam, getUserProfile } from '../services/userService';

const TOKEN_KEY = 'auth_token';
const SEEN_COUPON_NOTIFICATION_KEY = 'seen_coupon_notification_id';
const APP_REFRESH_INTERVAL_MS = 3 * 60 * 1000;
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(null);
  const [team, setTeam] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signTotalDays, setSignTotalDays] = useState(0);
  const [signTotalBonus, setSignTotalBonus] = useState(0);

  const balance = user?.currentBalance ?? 0;
  const isLoggedIn = Boolean(token);
  const signClaimed = Boolean(user?.signInClaimedToday);
  const signReward = Number(user?.signInReward ?? 2);

  const tokenRef = useRef(token);
  const refreshInFlightRef = useRef(false);
  tokenRef.current = token;

  const refreshAppData = useCallback(async () => {
    if (!tokenRef.current) return;
    if (refreshInFlightRef.current) return;

    refreshInFlightRef.current = true;
    setLoading(true);
    setError('');
    try {
      const [profileData, deviceData, transactionData, incomeData, teamData, notificationData] = await Promise.all([
        getUserProfile(),
        getDevices(),
        getTransactions(),
        getIncome(),
        getTeam(),
        getNotifications(),
      ]);

      setUser(profileData);
      setSignTotalDays(Number(profileData?.signInTotalDays ?? 0));
      setSignTotalBonus(Number(profileData?.signInTotalBonus ?? 0));
      setDevices(deviceData);
      setTransactions(transactionData);
      setIncome(incomeData);
      setTeam(teamData);
      setNotifications(notificationData);
    } catch (err) {
      setError(err?.message || 'Unable to load data');
    } finally {
      refreshInFlightRef.current = false;
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
    setNotifications([]);
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
  }, [refreshAppData]);

  useEffect(() => {
    if (!token || !notifications.length) {
      return;
    }

    const latestCouponNotification = notifications.find((item) => {
      const title = String(item?.title || '').toLowerCase();
      const message = String(item?.message || '').toLowerCase();
      return title.includes('coupon') || message.includes('coupon');
    });

    if (!latestCouponNotification?._id) {
      return;
    }

    let isMounted = true;

    storage.getItem(SEEN_COUPON_NOTIFICATION_KEY).then((seenId) => {
      if (!isMounted || seenId === latestCouponNotification._id) {
        return;
      }

      storage.setItem(SEEN_COUPON_NOTIFICATION_KEY, latestCouponNotification._id);
      Alert.alert(
        latestCouponNotification.title || 'New coupon available!',
        latestCouponNotification.message || 'Use this coupon code and win rewards.',
      );
    });

    return () => {
      isMounted = false;
    };
  }, [notifications, token]);

  useEffect(() => {
    if (!initialized || !token) {
      return undefined;
    }

    let intervalId = null;

    const clearRefreshInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startRefreshInterval = () => {
      if (intervalId) {
        return;
      }

      intervalId = setInterval(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
          return;
        }
        refreshAppData();
      }, APP_REFRESH_INTERVAL_MS);
    };

    const handleAppRefresh = () => {
      if (!tokenRef.current) {
        return;
      }
      refreshAppData();
      startRefreshInterval();
    };

    startRefreshInterval();

    const appStateSubscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        handleAppRefresh();
      } else {
        clearRefreshInterval();
      }
    });

    let visibilityHandler = null;
    if (typeof document !== 'undefined' && document.addEventListener) {
      visibilityHandler = () => {
        if (document.visibilityState === 'visible') {
          handleAppRefresh();
        } else {
          clearRefreshInterval();
        }
      };
      document.addEventListener('visibilitychange', visibilityHandler);
    }

    return () => {
      clearRefreshInterval();
      appStateSubscription.remove();
      if (visibilityHandler && typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', visibilityHandler);
      }
    };
  }, [initialized, refreshAppData, token]);

  const value = useMemo(
    () => ({
      user,
      token,
      balance,
      devices,
      transactions,
      income,
      team,
      notifications,
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
      user, token, balance, devices, transactions, income, team, notifications,
      loading, error, isLoggedIn, initialized, signIn, signUp, signOut,
      claimDailySign, refreshAppData, signClaimed, signTotalDays, signTotalBonus,
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
