import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AboutPlanCard } from '../../components/evgo/AboutPlanCard';
import { colors } from '../../constants/colors';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

const PLANS = [
  { name: 'Jio-1', price: 685,   daily: 37,   days: 35, totalRevenue: 1295,  referralCommission: 160,  welcomeBonus: 138 },
  { name: 'Jio-2', price: 2350,  daily: 131,  days: 36, totalRevenue: 4716,  referralCommission: 220,  welcomeBonus: 138 },
  { name: 'Jio-3', price: 6650,  daily: 386,  days: 37, totalRevenue: 14282, referralCommission: 480,  welcomeBonus: 138 },
  { name: 'Jio-4', price: 13200, daily: 754,  days: 38, totalRevenue: 28652, referralCommission: 860,  welcomeBonus: 138 },
  { name: 'Jio-5', price: 26500, daily: 1563, days: 40, totalRevenue: 62520, referralCommission: 1200, welcomeBonus: 138 },
];

export default function AboutScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Plans</Text>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Available Plans</Text>
        {PLANS.map((plan) => (
          <AboutPlanCard key={plan.name} plan={plan} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: TOP, paddingBottom: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
});
