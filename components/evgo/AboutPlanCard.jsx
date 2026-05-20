import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

export function AboutPlanCard({ plan }) {
  const rows = [
    { label: 'Product', value: `₹${plan.price}` },
    { label: 'Daily Income', value: `₹${plan.daily}` },
    { label: 'Duration', value: `${plan.days} Days` },
    { label: 'Total Revenue', value: `₹${plan.totalRevenue}` },
    { label: 'Invitation Commission', value: `₹${plan.referralCommission}` },
    { label: 'Welcome Bonus', value: `₹${plan.welcomeBonus}` },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      {rows.map((row, i) => (
        <View key={i} style={[styles.row, i < rows.length - 1 && styles.rowBorder]}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
      {/* <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/recharge')}>
        <Text style={styles.btnText}>Join Now</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 14,
    color: '#6F6F6F',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2933',
  },
  btn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 9,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
