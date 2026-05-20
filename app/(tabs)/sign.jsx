import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export default function SignScreen() {
  const { claimDailySign, signClaimed, signTotalDays, signTotalBonus } = useApp();

  const handleClaim = () => {
    claimDailySign()
      .then((claimed) => {
        if (claimed) {
          Alert.alert('🎉 Bonus Received', 'You received ₹2 daily bonus!');
        } else {
          Alert.alert('Already Claimed', 'You have already signed in today. Come back tomorrow!');
        }
      })
      .catch((error) => {
        Alert.alert('Unable to claim', error?.message || 'Please try again.');
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/index')}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.clickCircle, signClaimed && styles.clickCircleClaimed]}
          onPress={handleClaim}
          activeOpacity={0.8}
        >
          <Text style={styles.clickText}>{signClaimed ? 'Claimed' : 'Click'}</Text>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Total Sign</Text>
            <Text style={styles.statValue}>{signTotalDays} Day</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Total Bonus</Text>
            <Text style={styles.statValue}>{Number(signTotalBonus).toFixed(2)} Rs</Text>
          </View>
        </View>

        <Text style={styles.hint}>
          Please click the click button, you will get a bonus of 2 rupees!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingTop: TOP, paddingBottom: 12, backgroundColor: colors.primary,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
  },
  headerTitle: { flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  body: { flex: 1, alignItems: 'center', paddingTop: 60 },
  clickCircle: {
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: colors.primary,
    borderWidth: 6, borderColor: colors.primaryDark,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  clickCircleClaimed: { backgroundColor: colors.primaryDark, borderColor: '#AAAAAA' },
  clickText: { color: '#FFFFFF', fontSize: 28, fontWeight: '900' },
  statsRow: { flexDirection: 'row', gap: 16, marginTop: 48 },
  statBox: {
    flex: 1, backgroundColor: colors.primary, borderRadius: 10,
    paddingVertical: 18, paddingHorizontal: 24, alignItems: 'center',
    minWidth: 140,
  },
  statTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginTop: 6 },
  hint: {
    marginTop: 28, marginHorizontal: 24,
    color: colors.danger, fontSize: 15, fontWeight: '700',
    textAlign: 'center', lineHeight: 22,
  },
});
