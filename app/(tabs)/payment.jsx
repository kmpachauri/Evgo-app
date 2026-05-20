import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { EvgoButton } from '../../components/evgo/Button';
import { colors } from '../../constants/colors';

export default function PaymentScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Amount Payable ₹650</Text>
      <View style={styles.qr}>
        {Array.from({ length: 121 }).map((_, index) => (
          <View key={index} style={[styles.qrDot, (index * 7) % 5 < 2 && styles.qrDark]} />
        ))}
        <Text style={styles.logo}>EVgo</Text>
      </View>
      <Text style={styles.label}>Or Directly Transfer To UPI</Text>
      <View style={styles.upiRow}>
        <TextInput style={styles.upiInput} value="@upi" editable={false} />
        <TouchableOpacity style={styles.copy}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.refInput} placeholder="UTR (UPI Ref.ID) must be 12 digits" placeholderTextColor="#8B8B8B" />
      <EvgoButton muted style={styles.submit}>
        Submit
      </EvgoButton>
      <Text style={styles.help}>evgopayment@gmail.com | 24x7 Help & Support</Text>
      <Text style={styles.feedback}>Complaint feedback</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 82,
    alignItems: 'center',
  },
  title: {
    color: '#2B2B2B',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 18,
  },
  qr: {
    width: 148,
    height: 148,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
  },
  qrDot: {
    width: 13.45,
    height: 13.45,
  },
  qrDark: {
    backgroundColor: '#050505',
  },
  logo: {
    position: 'absolute',
    top: 62,
    left: 52,
    color: colors.primary,
    fontWeight: '900',
  },
  label: {
    marginTop: 20,
    color: '#303030',
    fontSize: 12,
  },
  upiRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginTop: 9,
  },
  upiInput: {
    flex: 1,
    height: 38,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 3,
    textAlign: 'center',
    color: '#555555',
  },
  copy: {
    width: 64,
    height: 38,
    backgroundColor: '#3FA7F5',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  refInput: {
    width: '100%',
    height: 38,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    marginTop: 12,
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  submit: {
    width: '100%',
    marginTop: 9,
    minHeight: 42,
  },
  help: {
    marginTop: 20,
    color: '#707070',
    fontSize: 11,
  },
  feedback: {
    marginTop: 9,
    color: '#8CA0FF',
    fontSize: 12,
  },
});
