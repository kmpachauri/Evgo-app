import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator, Modal, Platform, ScrollView, StatusBar,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';
import { createWithdraw } from '../../services/transactionService';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 24;

export default function WithdrawScreen() {
  const { user, balance, refreshAppData } = useApp();

  const bank = user?.bankDetails || {};
  const [holder, setHolder]   = useState(bank.holderName || '');
  const [account, setAccount] = useState(bank.accountNumber || '');
  const [ifsc, setIfsc]       = useState(bank.ifsc || '');
  const [bankName, setBankName] = useState(bank.bankName || '');
  const [upiId, setUpiId]     = useState(bank.upiId || '');

  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawAmt, setWithdrawAmt]   = useState('');
  const [submitting, setSubmitting]     = useState(false);

  const handleSubmit = () => {
    if (!holder || !account || !ifsc) {
      Toast.show({ type: 'error', text1: 'Incomplete', text2: 'Please fill Holder Name, Account Number and IFSC.' });
      return;
    }
    setModalVisible(true);
  };

  const handleWithdraw = async () => {
    const amt = Number(withdrawAmt);
    if (!amt || amt < 210) {
      Toast.show({ type: 'error', text1: 'Invalid Amount', text2: 'Minimum withdrawal is ₹210.' });
      return;
    }
    if (amt > balance) {
      Toast.show({ type: 'error', text1: 'Insufficient Balance', text2: `Available: ₹${balance}` });
      return;
    }
    setSubmitting(true);
    try {
      await createWithdraw({
        amount: amt,
        holderName: holder,
        accountNumber: account,
        ifsc,
        bankName,
        upiId,
        phone: user?.phone || bank.mobile || '',
        email: user?.email || '',
      });
      setModalVisible(false);
      setWithdrawAmt('');
      await refreshAppData();
      Toast.show({ type: 'success', text1: 'Request Submitted', text2: `₹${amt} withdrawal request sent to admin.` });
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Failed', text2: err?.message || 'Unable to submit withdrawal.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>₹{Number(balance || 0).toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>BANK DETAILS</Text>

        <Field label="Account Holder Name" value={holder} onChangeText={setHolder} />
        <Field label="Bank Account Number" value={account} onChangeText={setAccount} keyboardType="numeric" />
        <Field label="IFSC Code" value={ifsc} onChangeText={setIfsc} autoCapitalize="characters" />
        <Field label="Bank Name" value={bankName} onChangeText={setBankName} />
        <Field label="UPI ID (optional)" value={upiId} onChangeText={setUpiId} />

        <Text style={styles.note}>
          ⚠️ Minimum withdrawal: ₹210. Tax of 5% will be deducted. Only one request per day allowed.
        </Text>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Proceed to Withdraw</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter Withdrawal Amount</Text>
            <Text style={styles.modalSub}>Available: ₹{Number(balance || 0).toFixed(2)}</Text>
            <TextInput
              style={styles.amtInput}
              value={withdrawAmt}
              onChangeText={setWithdrawAmt}
              placeholder="Enter amount"
              placeholderTextColor="#AAAAAA"
              keyboardType="numeric"
            />
            {withdrawAmt ? (
              <Text style={styles.taxNote}>
                Tax (5%): ₹{(Number(withdrawAmt) * 0.05).toFixed(2)} | You receive: ₹{(Number(withdrawAmt) * 0.95).toFixed(2)}
              </Text>
            ) : null}
            <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.withdrawBtnText}>Confirm Withdraw</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Field({ label, value, onChangeText, keyboardType, autoCapitalize }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#AAAAAA"
        keyboardType={keyboardType || 'default'}
        autoCapitalize={autoCapitalize || 'none'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    paddingTop: TOP, paddingBottom: 12, backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
  },
  headerTitle: { flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { paddingBottom: 32 },
  balanceCard: {
    backgroundColor: colors.primary, margin: 16, borderRadius: 12,
    padding: 20, alignItems: 'center',
  },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600' },
  balanceValue: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 4 },
  sectionTitle: {
    color: colors.primary, fontSize: 13, fontWeight: '900',
    paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#FFFFFF',
    borderBottomWidth: 2, borderBottomColor: colors.primary,
  },
  fieldRow: {
    backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  fieldLabel: { color: '#6E6E6E', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  fieldInput: {
    height: 42, borderWidth: 1.5, borderColor: '#DDDDDD',
    borderRadius: 6, color: '#1A1A1A', fontSize: 14, paddingHorizontal: 10,
  },
  note: { color: '#888', fontSize: 12, paddingHorizontal: 16, marginTop: 14, lineHeight: 18 },
  submitBtn: {
    margin: 16, marginTop: 20, backgroundColor: colors.primary,
    borderRadius: 8, paddingVertical: 14, alignItems: 'center',
  },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 24, paddingBottom: 36,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', textAlign: 'center' },
  modalSub: { fontSize: 13, color: colors.primary, fontWeight: '700', textAlign: 'center', marginTop: 6, marginBottom: 16 },
  amtInput: {
    borderWidth: 1.5, borderColor: '#DDDDDD', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 22, fontWeight: '700', color: '#1A1A1A', textAlign: 'center',
  },
  taxNote: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 8 },
  withdrawBtn: {
    marginTop: 16, backgroundColor: colors.primary,
    borderRadius: 8, paddingVertical: 14, alignItems: 'center',
  },
  withdrawBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  cancelBtn: { marginTop: 10, alignItems: 'center', paddingVertical: 10 },
  cancelText: { color: '#888888', fontSize: 14 },
});
