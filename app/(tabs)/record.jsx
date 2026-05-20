import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '../../components/evgo/Header';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';

const TABS = ['Deposit', 'Withdraw'];
const STATUS_COLOR = { pending: '#F59E0B', approved: '#10B981', rejected: '#EF4444' };

export default function RecordScreen() {
  const [activeTab, setActiveTab] = useState('Deposit');
  const [deposits, setDeposits]   = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    Promise.all([
      api.get('/user/deposit/history'),
      api.get('/user/withdraw/history'),
    ]).then(([d, w]) => {
      setDeposits(d.data?.data || []);
      setWithdraws(w.data?.data || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      api.get('/user/deposit/history'),
      api.get('/user/withdraw/history'),
    ]).then(([d, w]) => {
      setDeposits(d.data?.data || []);
      setWithdraws(w.data?.data || []);
    });
    setRefreshing(false);
  };

  const data = activeTab === 'Deposit' ? deposits : withdraws;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.cardType}>
          {activeTab === 'Deposit' ? (item.plan?.name || 'Recharge') : 'Withdrawal'}
        </Text>
        <Text style={styles.cardDate}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
        {activeTab === 'Deposit' && item.utrNumber ? (
          <Text style={styles.cardSub}>UTR: {item.utrNumber}</Text>
        ) : null}
        {activeTab === 'Withdraw' && item.bankSnapshot?.accountNumber ? (
          <Text style={styles.cardSub}>A/C: ****{item.bankSnapshot.accountNumber.slice(-4)}</Text>
        ) : null}
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.cardAmount}>₹{Number(item.amount || 0).toFixed(2)}</Text>
        <Text style={[styles.cardStatus, { color: STATUS_COLOR[item.status] || '#888' }]}>
          {item.status}
        </Text>
        {activeTab === 'Withdraw' && item.netAmount ? (
          <Text style={styles.cardNet}>Net: ₹{Number(item.netAmount).toFixed(2)}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="Record" />

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No {activeTab.toLowerCase()} records found.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary },
  tabs: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#FFFFFF' },
  tabText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '700' },
  tabTextActive: { color: '#FFFFFF' },
  list: { padding: 12, paddingBottom: 24 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14,
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between',
  },
  cardLeft: { flex: 1 },
  cardType: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  cardDate: { color: '#888', fontSize: 11, marginTop: 4 },
  cardSub: { color: '#AAA', fontSize: 11, marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  cardAmount: { color: '#1A1A1A', fontSize: 17, fontWeight: '900' },
  cardStatus: { fontSize: 12, fontWeight: '700', marginTop: 4, textTransform: 'capitalize' },
  cardNet: { color: '#888', fontSize: 11, marginTop: 2 },
  empty: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 40, fontSize: 14 },
});
