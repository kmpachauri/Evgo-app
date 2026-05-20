import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert, Platform, ScrollView, StatusBar, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

const METHODS = [
  { id: 0, label: 'PhonePe',   icon: 'phone-portrait-outline' },
  { id: 1, label: 'Google Pay', icon: 'logo-google' },
  { id: 2, label: 'Paytm',     icon: 'wallet-outline' },
  { id: 3, label: 'BHIM UPI',  icon: 'card-outline' },
];

export default function RechargeScreen() {
  const { user } = useApp();
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState(String(params.amount || ''));
  const [selectedMethod, setSelectedMethod] = useState(0);

  const handleRecharge = () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    const query = `amount=${amount}&method=${METHODS[selectedMethod].label}&planId=${params.planId || ''}&planName=${params.planName || ''}`;
    router.push(`/(tabs)/payment-upi?${query}`);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recharge</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/record')}>
          <Text style={styles.headerRight}>Record</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.totalBand}>
          <Text style={styles.total}>{formatRs(user?.totalRecharge)}{'\n'}Total Recharge</Text>
          <Text style={styles.total}>{formatRs(user?.totalWithdraw)}{'\n'}Total Withdraw</Text>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>{params.planName ? `Continue To Deposit for ${params.planName}` : 'Continue To Deposit'}</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount (₹)"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.section}>Recharge Method</Text>
        {METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.method}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Ionicons name={method.icon} size={22} color={colors.primary} />
            <Text style={[styles.methodText, method.id !== selectedMethod && styles.methodMuted]}>
              {method.label}
            </Text>
            {method.id === selectedMethod && (
              <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.rechargeBtn} onPress={handleRecharge}>
          <Text style={styles.rechargeBtnText}>Recharge</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function formatRs(value = 0) {
  return `${Number(value).toFixed(0)} Rs`;
}

const styles = StyleSheet.create({
  headerBar: {
    paddingTop: TOP, paddingBottom: 12, backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
  },
  headerTitle: { flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  headerRight: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 32 },
  totalBand: {
    height: 86, backgroundColor: colors.primary,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 22, alignItems: 'center',
  },
  total: { color: '#FFFFFF', fontSize: 13, fontWeight: '900', lineHeight: 19 },
  inputBlock: { backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingVertical: 14, marginTop: 2 },
  label: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  amountInput: {
    color: colors.primary, fontSize: 26, marginTop: 8,
    borderBottomWidth: 2, borderBottomColor: colors.primary, paddingBottom: 4,
  },
  section: { color: colors.primary, fontWeight: '800', paddingHorizontal: 15, paddingTop: 16, paddingBottom: 6 },
  method: {
    height: 52, flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#E9E9E9',
  },
  methodText: { flex: 1, color: colors.primary, fontSize: 14, fontWeight: '700' },
  methodMuted: { color: '#B3B3B3' },
  rechargeBtn: {
    margin: 15, marginTop: 24, backgroundColor: colors.primary,
    borderRadius: 8, paddingVertical: 15, alignItems: 'center',
  },
  rechargeBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
