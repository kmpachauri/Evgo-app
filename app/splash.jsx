import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ChargerCarArt, EvgoLogo } from '../components/evgo/BrandArt';
import { colors } from '../constants/colors';

export default function SplashScreen() {
  return (
    <View style={styles.screen}>
      <EvgoLogo />
      <View style={styles.copy}>
        <Text style={styles.headline}>CHARGE YOUR{'\n'}EV AND SAVE!</Text>
        <Text style={styles.sub}>Evgo is best career opportunity to daily earn up-to 100% monthly.</Text>
      </View>
      <ChargerCarArt />
      <Text style={styles.online}>NOW USE YOUR{'\n'}PHONE FOR ONLINE{'\n'}EARNIG.</Text>
      <TouchableOpacity style={styles.download} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.downloadText}>DOWNLOAD</Text>
        <View style={styles.arrow}>
          <Ionicons name="arrow-down" size={34} color={colors.primary} />
        </View>
      </TouchableOpacity>
      <View style={styles.road} />
      <Text style={styles.copyRight}>copyright © 2024 EVgo Services LLC All Rights Reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 82,
    alignItems: 'center',
    overflow: 'hidden',
  },
  copy: {
    alignSelf: 'flex-start',
    marginLeft: 28,
    marginTop: 110,
    width: 230,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
  },
  sub: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 11,
    fontWeight: '600',
  },
  online: {
    position: 'absolute',
    right: 26,
    bottom: 221,
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 52,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  download: {
    position: 'absolute',
    right: 34,
    bottom: 142,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  arrow: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  road: {
    position: 'absolute',
    left: -120,
    bottom: -120,
    width: 520,
    height: 260,
    backgroundColor: colors.darkGrey,
    transform: [{ rotate: '32deg' }],
    borderTopWidth: 4,
    borderTopColor: '#FFFFFF',
  },
  copyRight: {
    position: 'absolute',
    bottom: 20,
    right: 12,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
