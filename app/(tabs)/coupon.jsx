import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';
import { getCouponHistory, redeemCoupon, validateCoupon } from '../../services/couponService';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export default function CouponScreen() {
  const { refreshAppData } = useApp();
  const [code, setCode] = useState('');
  const [history, setHistory] = useState([]);
  const [checking, setChecking] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    const response = await getCouponHistory();
    setHistory(response?.data || []);
  };

  useEffect(() => { loadHistory(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const handleGetBonus = async () => {
    if (!code.trim()) { Alert.alert('Invalid', 'Please enter a coupon code.'); return; }

    setChecking(true);
    try {
      const validation = await validateCoupon(code.trim());
      if (validation?.data?.alreadyRedeemed) {
        Alert.alert('Already used', 'You have already redeemed this coupon.');
        return;
      }

      const response = await redeemCoupon(code.trim());
      const amount = response?.data?.history?.amount || validation?.data?.coupon?.rewardAmount || 0;
      await refreshAppData();
      await loadHistory();
      Alert.alert('Coupon Applied', `₹${amount} has been added to your wallet.`);
      setCode('');
    } catch (error) {
      Alert.alert('Coupon Error', error?.message || 'Unable to redeem this coupon.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupon</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Ticket icon */}
        <View style={styles.iconWrap}>
          <Ionicons name="ticket" size={120} color={colors.primary} />
        </View>

        <Text style={styles.title}>Coupon</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Enter Code</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="please enter code"
            placeholderTextColor="#AAAAAA"
          />
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleGetBonus}>
          <Text style={styles.btnText}>{checking ? 'Checking...' : 'Get Bonus'}</Text>
        </TouchableOpacity>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Redeem History</Text>
          {history.length === 0 ? (
            <Text style={styles.historyEmpty}>No coupon redemption found yet.</Text>
          ) : (
            history.slice(0, 8).map((item) => (
              <View key={item._id || `${item.code}-${item.redeemedAt}`} style={styles.historyRow}>
                <Text style={styles.historyCode}>{item.code || item.coupon?.code}</Text>
                <Text style={styles.historyAmount}>₹{item.amount || item.coupon?.rewardAmount || 0}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingTop: TOP, paddingBottom: 12, backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
  },
  headerTitle: { flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  body: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  iconWrap: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: colors.primary, marginBottom: 32 },
  form: { width: '100%', marginBottom: 24 },
  label: { fontSize: 14, color: '#555555', fontWeight: '700', marginBottom: 8 },
  input: { fontSize: 15, color: '#1A1A1A', paddingVertical: 8 },
  divider: { height: 1, backgroundColor: '#DDDDDD', marginTop: 4 },
  btn: {
    width: '100%', backgroundColor: colors.primary,
    borderRadius: 10, paddingVertical: 16, alignItems: 'center',
  },
  btnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  historyCard: { width: '100%', marginTop: 26, borderRadius: 12, backgroundColor: '#F7F8FA', padding: 16 },
  historyTitle: { fontSize: 16, fontWeight: '900', color: '#1A1A1A', marginBottom: 10 },
  historyEmpty: { fontSize: 13, color: '#666666' },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
  historyCode: { fontSize: 13, color: '#1A1A1A', fontWeight: '700' },
  historyAmount: { fontSize: 13, color: colors.primary, fontWeight: '800' },
});
