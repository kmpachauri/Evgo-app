import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChargerCarArt, EvgoLogo } from '../components/evgo/BrandArt';
import { colors } from '../constants/colors';

export default function SplashScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* Top brand section */}
      <View style={[styles.top, { paddingTop: insets.top + 32 }]}>
        <EvgoLogo />
        <Text style={styles.tagline}>ELECTRIC · SMART · EARN</Text>
      </View>

      {/* Scooter illustration */}
      <View style={styles.artWrap}>
        <ChargerCarArt />
      </View>

      {/* Bottom card */}
      <View style={[styles.card, { paddingBottom: insets.bottom + 28 }]}>
        <Text style={styles.headline}>Charge Your EV{'\n'}& Earn Daily</Text>
        <Text style={styles.sub}>
          EVgo is your best opportunity to earn up to 100% monthly returns while powering the EV revolution.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="flash" size={20} color="#FFFFFF" />
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>© 2024 EVgo Services LLC. All Rights Reserved.</Text>
      </View>

      {/* Decorative road strip */}
      <View style={styles.road} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  top: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: 4,
  },
  artWrap: {
    alignItems: 'center',
    marginTop: 24,
  },
  card: {
    marginTop: 'auto',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
  },
  headline: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: 12,
  },
  sub: {
    color: '#555',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 28,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 20,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  copyright: {
    color: '#AAAAAA',
    fontSize: 10,
    textAlign: 'center',
  },
  road: {
    position: 'absolute',
    left: -80,
    top: '52%',
    width: 520,
    height: 18,
    backgroundColor: 'rgba(0,0,0,0.12)',
    transform: [{ rotate: '-4deg' }],
  },
});
