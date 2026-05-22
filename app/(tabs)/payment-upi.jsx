import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Clipboard, Image, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { colors } from '../../constants/colors';
import { api } from '../../services/api';
import { createRecharge } from '../../services/transactionService';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export default function PaymentUpiScreen() {
  const { amount, method, planId } = useLocalSearchParams();
  const [upiRef, setUpiRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    console.log('[payment-upi] screen mounted', { amount, method, planId });
    return () => {
      console.log('[payment-upi] screen unmounted');
    };
  }, [amount, method, planId]);

  const fetchPaymentInfo = useCallback(async () => {
    console.log('[payment-upi] fetching payment info...');
    setPaymentInfo(null);
    try {
      const res = await api.get('/user/payment-info');
      console.log('[payment-upi] payment info success', res.data);
      setPaymentInfo(res.data?.data || {});
    } catch (error) {
      console.log('[payment-upi] payment info failed', error?.message || error);
      setPaymentInfo({});
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('[payment-upi] screen focused');
      fetchPaymentInfo();
      return () => {
        console.log('[payment-upi] screen unfocused');
      };
    }, [fetchPaymentInfo]),
  );

  const upiId = paymentInfo?.upiId || '';
  const qrImage = paymentInfo?.qrCodeImage || '';
  const refValid = upiRef.length >= 12;

  const copyUpi = () => {
    Clipboard.setString(upiId);
    Toast.show({ type: 'success', text1: 'Copied', text2: 'UPI ID copied to clipboard.' });
  };

  const handleSubmit = async () => {
    if (!refValid) return;
    setSubmitting(true);
    try {
      await createRecharge({
        amount: Number(amount),
        utrNumber: upiRef,
        paymentMethod: method || 'UPI',
        planId: planId || null,
      });
      Toast.show({
        type: 'success',
        text1: 'Submitted ✅',
        text2: `Recharge of ₹${amount} submitted. Admin will verify shortly.`,
      });
      setTimeout(() => router.replace('/(tabs)/profile'), 1800);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Failed', text2: err?.message || 'Unable to submit.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay via {method || 'UPI'}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.amountBand}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>₹{amount}</Text>
        </View>

        {/* QR Section */}
        <View style={styles.qrSection}>
          <Text style={styles.qrTitle}>Scan QR Code to Pay</Text>
          {paymentInfo === null ? (
            <ActivityIndicator color={colors.primary} size="large" style={{ marginVertical: 30 }} />
          ) : qrImage ? (
            <View style={styles.qrBox}>
              <Image source={{ uri: qrImage }} style={styles.qrImage} resizeMode="contain" />
              <Text style={styles.qrLabel}>EVgo Pay</Text>
            </View>
          ) : (
            <View style={styles.qrBox}>
              <Text style={{ color: '#888', fontSize: 13 }}>QR not configured by admin</Text>
            </View>
          )}
          <Text style={styles.qrHint}>Open any UPI app and scan this QR code</Text>
        </View>

        {/* UPI ID */}
        {upiId ? (
          <View style={styles.upiSection}>
            <Text style={styles.upiTitle}>Or pay using UPI ID</Text>
            <View style={styles.upiRow}>
              <Ionicons name="wallet-outline" size={20} color={colors.primary} />
              <Text style={styles.upiText}>{upiId}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={copyUpi}>
                <Ionicons name="copy-outline" size={16} color="#FFFFFF" />
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* UTR Input */}
        <View style={styles.utrSection}>
          <Text style={styles.utrTitle}>Enter UTR / Reference Number</Text>
          <Text style={styles.utrSub}>After payment, enter the 12-digit UTR from your UPI app</Text>
          <TextInput
            style={styles.utrInput}
            value={upiRef}
            onChangeText={(t) => setUpiRef(t.replace(/[^0-9]/g, '').slice(0, 12))}
            placeholder="Enter 12-digit UTR"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
            maxLength={12}
          />
          <Text style={styles.utrCount}>{upiRef.length} / 12 digits</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, refValid && !submitting && styles.submitBtnActive]}
          onPress={handleSubmit}
          disabled={!refValid || submitting}
        >
          {submitting
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.submitBtnText}>{refValid ? 'Submit Payment' : `Enter ${12 - upiRef.length} more digits`}</Text>
          }
        </TouchableOpacity>

        <Text style={styles.note}>
          ⚠️ Do not close this page until you have submitted the UTR number. Admin will verify and credit your account within 30 minutes.
        </Text>
      </ScrollView>
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
  content: { paddingBottom: 36 },
  amountBand: { backgroundColor: colors.primary, paddingVertical: 16, alignItems: 'center' },
  amountLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600' },
  amountValue: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 4 },
  qrSection: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#FFFFFF', marginTop: 10 },
  qrTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A1A', marginBottom: 16 },
  qrBox: {
    borderWidth: 2, borderColor: colors.primary, borderRadius: 12,
    padding: 12, backgroundColor: '#FFFFFF', alignItems: 'center',
  },
  qrImage: { width: 200, height: 200 },
  qrLabel: { marginTop: 8, color: colors.primary, fontWeight: '900', fontSize: 13 },
  qrHint: { marginTop: 12, color: '#888', fontSize: 12 },
  upiSection: { backgroundColor: '#FFFFFF', marginTop: 10, padding: 16 },
  upiTitle: { fontSize: 14, fontWeight: '800', color: '#555', marginBottom: 10 },
  upiRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F5F5F5', borderRadius: 8, padding: 12,
  },
  upiText: { flex: 1, color: '#1A1A1A', fontSize: 15, fontWeight: '700' },
  copyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.primary, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 7,
  },
  copyBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  utrSection: { backgroundColor: '#FFFFFF', marginTop: 10, padding: 16 },
  utrTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  utrSub: { fontSize: 12, color: '#888', marginTop: 4, marginBottom: 14 },
  utrInput: {
    borderWidth: 1.5, borderColor: '#DDDDDD', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 20, fontWeight: '700', color: '#1A1A1A',
    letterSpacing: 3, textAlign: 'center', backgroundColor: '#FAFAFA',
  },
  utrCount: { textAlign: 'right', color: '#AAAAAA', fontSize: 12, marginTop: 6 },
  submitBtn: {
    marginHorizontal: 16, marginTop: 20, borderRadius: 8,
    paddingVertical: 15, alignItems: 'center', backgroundColor: '#CCCCCC',
  },
  submitBtnActive: { backgroundColor: colors.primary },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  note: {
    marginHorizontal: 16, marginTop: 16,
    fontSize: 12, color: '#888', lineHeight: 18, textAlign: 'center',
  },
});
