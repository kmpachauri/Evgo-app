import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AboutPlanCard } from '../../components/evgo/AboutPlanCard';
import { colors } from '../../constants/colors';

const PLANS = [
  { name: 'EVgo-1', price: 685,   daily: 37,   days: 35, totalRevenue: 1295,  referralCommission: 160,  welcomeBonus: 138 },
  { name: 'EVgo-2', price: 2350,  daily: 131,  days: 36, totalRevenue: 4716,  referralCommission: 220,  welcomeBonus: 138 },
  { name: 'EVgo-3', price: 6650,  daily: 386,  days: 37, totalRevenue: 14282, referralCommission: 480,  welcomeBonus: 138 },
  { name: 'EVgo-4', price: 13200, daily: 754,  days: 38, totalRevenue: 28652, referralCommission: 860,  welcomeBonus: 138 },
  { name: 'EVgo-5', price: 26500, daily: 1563, days: 40, totalRevenue: 62520, referralCommission: 1200, welcomeBonus: 138 },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About EVgo</Text>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBlock}>
          <Text style={styles.paragraph}>
            EVgo operates a public DC fast-charging network for electric vehicles. You locate a station, plug the charger into your car, and pay through an app, a linked credit card, or an automatic plug-in feature.
          </Text>

          <Text style={styles.stepTitle}>1. Find a Station</Text>
          <Text style={styles.paragraph}>
            Use the EVgo Station Finder or the EVgo app (available on iOS and Android) to locate chargers. The map displays connector types, power speeds, and whether a charger is available, in use, or out of order.
          </Text>

          <Text style={styles.stepTitle}>2. Plug In</Text>
          <Text style={styles.paragraph}>
            Select the appropriate connector for your EV (e.g., CCS, CHAdeMO, or NACS). Remove the cable from the holster and plug it into your vehicle&apos;s charge port until you hear a click.
          </Text>

          <Text style={styles.stepTitle}>3. Start Charging</Text>
          <Text style={styles.paragraph}>
            You can initiate your session using one of these methods:
          </Text>
          <Text style={styles.paragraph}>The EVgo App: Select your charger on the app map and tap &quot;Start Charging&quot;.</Text>
          <Text style={styles.paragraph}>Credit Card: Tap or insert a physical credit card directly at the dispenser.</Text>
          <Text style={styles.paragraph}>
            AutoCharge+: If your EV qualifies, enroll your vehicle&apos;s VIN in the app. After a quick, one-time authentication, the station will begin charging automatically the moment you plug in.
          </Text>

          <Text style={styles.stepTitle}>4. End and Pay</Text>
          <Text style={styles.paragraph}>
            When you are finished (or your car hits your set limit), tap &quot;Stop&quot; on the charger&apos;s screen or your app. Unplug the connector, return it to the holster, and pay the session fees. EVgo bills by the kilowatt-hour (kWh) or by the minute, depending on the state and station.
          </Text>

          <Text style={styles.paragraph}>
            For a visual walkthrough of using an EVgo fast charger:
          </Text>
        </View>
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
    paddingBottom: 12,
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
  infoBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.deepGreen,
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 21,
    color: '#4E5965',
    marginBottom: 8,
  },
});
