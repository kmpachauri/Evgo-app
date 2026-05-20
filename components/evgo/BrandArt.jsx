import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/colors';

export function EvgoLogo({ dark = false, compact = false }) {
  return (
    <View style={styles.logoWrap}>
      <Text style={[styles.logo, compact && styles.logoCompact, dark && styles.logoDark]}>EVgo</Text>
      <Text style={[styles.tagline, compact && styles.taglineCompact, dark && styles.logoDark]}>
        FAST CHARGING
      </Text>
    </View>
  );
}

export function ChargerCarArt({ small = false }) {
  return (
    <View style={[styles.art, small && styles.artSmall]}>
      <View style={styles.treeOne} />
      <View style={styles.treeTwo} />
      <View style={styles.charger}>
        <Ionicons name="flash" size={small ? 16 : 22} color={colors.primary} />
      </View>
      <View style={styles.car}>
        <View style={styles.window} />
        <View style={styles.windowTwo} />
        <Text style={styles.carLogo}>EVgo</Text>
        <View style={styles.wheelLeft} />
        <View style={styles.wheelRight} />
      </View>
      <MaterialCommunityIcons
        name="cellphone"
        size={small ? 68 : 92}
        color="#1F2B1F"
        style={styles.phone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 66,
    lineHeight: 72,
    fontWeight: '900',
  },
  logoCompact: {
    fontSize: 27,
    lineHeight: 31,
  },
  logoDark: {
    color: '#293B3D',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 21,
    letterSpacing: 0,
    fontWeight: '500',
  },
  taglineCompact: {
    fontSize: 9,
    fontWeight: '700',
  },
  art: {
    height: 220,
    justifyContent: 'flex-end',
  },
  artSmall: {
    height: 142,
  },
  treeOne: {
    position: 'absolute',
    left: 150,
    bottom: 82,
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#8FCC60',
  },
  treeTwo: {
    position: 'absolute',
    left: 214,
    bottom: 100,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8FCC60',
  },
  charger: {
    position: 'absolute',
    right: 28,
    bottom: 68,
    width: 46,
    height: 88,
    borderRadius: 4,
    borderWidth: 5,
    borderColor: '#59605D',
    backgroundColor: '#DDE7D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    alignSelf: 'center',
    width: 214,
    height: 96,
    borderRadius: 22,
    backgroundColor: '#8BCB4C',
    borderWidth: 5,
    borderColor: '#4F5A4D',
    marginBottom: 18,
  },
  window: {
    position: 'absolute',
    left: 54,
    top: 18,
    width: 48,
    height: 30,
    backgroundColor: '#83BFE8',
    transform: [{ skewX: '-10deg' }],
  },
  windowTwo: {
    position: 'absolute',
    left: 112,
    top: 18,
    width: 42,
    height: 30,
    backgroundColor: '#83BFE8',
    transform: [{ skewX: '10deg' }],
  },
  carLogo: {
    position: 'absolute',
    right: 26,
    top: 51,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  wheelLeft: {
    position: 'absolute',
    left: 38,
    bottom: -13,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#333333',
  },
  wheelRight: {
    position: 'absolute',
    right: 38,
    bottom: -13,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#333333',
  },
  phone: {
    position: 'absolute',
    left: 28,
    bottom: 42,
  },
});
