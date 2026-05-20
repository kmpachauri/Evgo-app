import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { Header } from '../../components/evgo/Header';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';

const TYPE_LABEL = {
  plan_daily: 'Daily Income',
  referral_level_1: 'Referral L1',
  referral_level_2: 'Referral L2',
  referral_level_3: 'Referral L3',
  invitation_bonus: 'Invitation Bonus',
  welcome_bonus: 'Welcome Bonus',
  sign_in_bonus: 'Sign-in Bonus',
  manual_credit: 'Manual Credit',
  lottery_reward: 'Lottery Reward',
  coupon_reward: 'Coupon Reward',
};

export default function IncomeScreen() {
  const [logs, setLogs]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    api.get('/user/income/history')
      .then((res) => setLogs(res.data?.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLogs(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await api.get('/user/income/history').then((res) => setLogs(res.data?.data || []));
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.type}>{TYPE_LABEL[item.type] || item.type}</Text>
        <Text style={styles.date}>{item.creditedAt ? new Date(item.creditedAt).toLocaleString() : ''}</Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>
      <Text style={styles.amount}>+₹{Number(item.amount || 0).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="Income History" />
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No income history found.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary },
  list: { padding: 12, paddingBottom: 24 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14,
    marginBottom: 10, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  type: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  date: { color: '#888', fontSize: 11, marginTop: 4 },
  note: { color: '#AAA', fontSize: 11, marginTop: 2 },
  amount: { color: '#10B981', fontSize: 17, fontWeight: '900' },
  empty: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 40, fontSize: 14 },
});
