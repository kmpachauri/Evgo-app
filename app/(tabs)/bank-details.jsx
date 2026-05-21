import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';
import { saveUserBankDetails } from '../../services/userService';

export default function BankDetailsScreen() {
  const { user, refreshAppData } = useApp();
  const insets = useSafeAreaInsets();
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const bank = user?.bankDetails || {};
    setHolderName(bank.holderName || '');
    setAccountNumber(bank.accountNumber || '');
    setConfirmAccountNumber(bank.accountNumber || '');
    setIfsc(bank.ifsc || '');
    setBankName(bank.bankName || '');
    setUpiId(bank.upiId || '');
    setIsEditing(!hasSavedBankDetails(bank));
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshAppData();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSave = async () => {
    if (!holderName.trim() || !accountNumber.trim() || !ifsc.trim() || !bankName.trim()) {
      Toast.show({ type: 'error', text1: 'Incomplete', text2: 'Please fill all required bank details.' });
      return;
    }

    if (accountNumber.trim() !== confirmAccountNumber.trim()) {
      Toast.show({ type: 'error', text1: 'Mismatch', text2: 'Account number and confirm account number must match.' });
      return;
    }

    setSaving(true);
    try {
      await saveUserBankDetails({
        holderName: holderName.trim(),
        accountNumber: accountNumber.trim(),
        ifsc: ifsc.trim().toUpperCase(),
        bankName: bankName.trim(),
        upiId: upiId.trim(),
      });
      await refreshAppData();
      setIsEditing(false);
      Alert.alert('Saved', 'Bank details saved successfully.');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed', text2: error?.message || 'Unable to save bank details.' });
    } finally {
      setSaving(false);
    }
  };

  const savedBank = user?.bankDetails || {};
  const showSavedCard = hasSavedBankDetails(savedBank) && !isEditing;

  return (
    <View style={styles.screen}>
      <View style={[styles.headerBar, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <Text style={styles.sectionTitle}>BANK DETAILS</Text>

        {showSavedCard ? (
          <View style={styles.savedCard}>
            <View style={styles.savedCardHeader}>
              <View>
                <Text style={styles.savedCardTitle}>Saved Bank Account</Text>
                <Text style={styles.savedCardSubtitle}>Your withdrawal details are ready to use.</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Saved</Text>
              </View>
            </View>

            <InfoRow label="Account Holder" value={savedBank.holderName} />
            <InfoRow label="Bank Name" value={savedBank.bankName} />
            <InfoRow label="Account Number" value={maskAccountNumber(savedBank.accountNumber)} />
            <InfoRow label="IFSC Code" value={savedBank.ifsc} />
            {savedBank.upiId ? <InfoRow label="UPI ID" value={savedBank.upiId} /> : null}

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={handleRefresh} disabled={refreshing}>
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.secondaryBtnText}>{refreshing ? 'Refreshing...' : 'Refresh'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => setIsEditing(true)}>
                <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>Edit Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Field label="Account Holder Name" value={holderName} onChangeText={setHolderName} />
            <Field label="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" />
            <Field label="Confirm Account Number" value={confirmAccountNumber} onChangeText={setConfirmAccountNumber} keyboardType="numeric" />
            <Field label="IFSC Code" value={ifsc} onChangeText={setIfsc} autoCapitalize="characters" />
            <Field label="Bank Name" value={bankName} onChangeText={setBankName} />
            <Field label="UPI ID (optional)" value={upiId} onChangeText={setUpiId} />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
              <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Bank Details'}</Text>
            </TouchableOpacity>

            {hasSavedBankDetails(savedBank) ? (
              <TouchableOpacity style={styles.cancelEditBtn} onPress={() => setIsEditing(false)}>
                <Text style={styles.cancelEditText}>Cancel Editing</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </ScrollView>
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

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

function hasSavedBankDetails(bank = {}) {
  return Boolean(bank?.holderName || bank?.accountNumber || bank?.ifsc || bank?.bankName || bank?.upiId);
}

function maskAccountNumber(value = '') {
  const digits = String(value);
  if (digits.length <= 4) return digits;
  return `${'*'.repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  headerBar: {
    paddingBottom: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: { paddingBottom: 32 },
  sectionTitle: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    marginTop: 16,
  },
  savedCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  savedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  savedCardTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '800',
  },
  savedCardSubtitle: {
    color: '#6E6E6E',
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#E8F7ED',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#228B4E',
    fontSize: 12,
    fontWeight: '800',
  },
  infoRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoLabel: {
    color: '#6E6E6E',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoValue: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  fieldRow: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  fieldLabel: {
    color: '#6E6E6E',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  fieldInput: {
    height: 42,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    color: '#1A1A1A',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  saveBtn: {
    margin: 16,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  cancelEditBtn: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: -4,
    paddingVertical: 10,
  },
  cancelEditText: {
    color: '#777777',
    fontSize: 14,
    fontWeight: '700',
  },
});
