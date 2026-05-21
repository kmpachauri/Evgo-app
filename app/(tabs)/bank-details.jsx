import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  useEffect(() => {
    const bank = user?.bankDetails || {};
    setHolderName(bank.holderName || '');
    setAccountNumber(bank.accountNumber || '');
    setConfirmAccountNumber(bank.accountNumber || '');
    setIfsc(bank.ifsc || '');
    setBankName(bank.bankName || '');
    setUpiId(bank.upiId || '');
  }, [user]);

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
      Alert.alert('Saved', 'Bank details saved successfully.');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed', text2: error?.message || 'Unable to save bank details.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.headerBar, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>BANK DETAILS</Text>

        <Field label="Account Holder Name" value={holderName} onChangeText={setHolderName} />
        <Field label="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" />
        <Field label="Confirm Account Number" value={confirmAccountNumber} onChangeText={setConfirmAccountNumber} keyboardType="numeric" />
        <Field label="IFSC Code" value={ifsc} onChangeText={setIfsc} autoCapitalize="characters" />
        <Field label="Bank Name" value={bankName} onChangeText={setBankName} />
        <Field label="UPI ID (optional)" value={upiId} onChangeText={setUpiId} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
          <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Bank Details'}</Text>
        </TouchableOpacity>
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
});
