import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import { ChargerCarArt, EvgoLogo } from './BrandArt';
import { colors } from '../../constants/colors';

const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export function HomeHero() {
  return (
    <View style={[styles.hero, { paddingTop: TOP + 8 }]}>
      <View style={styles.appNameRow}>
        <Text style={styles.appName}>JIO FastCharge</Text>
      </View>
      <EvgoLogo compact />
      <Text style={styles.save}>CHARGE YOUR{'\n'}EV AND SAVE!</Text>
      <ChargerCarArt small />
      <View style={styles.corner}>
        <MaterialCommunityIcons name="ev-station" size={32} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 206,
    overflow: 'hidden',
    backgroundColor: '#EFF7E8',
    alignItems: 'center',
    paddingTop: 11,
  },
  appNameRow: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    alignItems: 'center',
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  save: {
    position: 'absolute',
    top: 43,
    left: 86,
    color: colors.primary,
    fontSize: 10,
    lineHeight: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  corner: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 64,
    height: 64,
    backgroundColor: '#D0E9BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
