import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { ChargerCarArt } from './BrandArt';
import { colors } from '../../constants/colors';

export function HomeHero() {
  const insets = useSafeAreaInsets();
  const barHeight = insets.top + 32;

  return (
    <View style={[styles.hero, { minHeight: barHeight + 170 }]}>
      {/* Green name bar */}
      <View style={[styles.appNameRow, { height: barHeight, paddingTop: insets.top }]}>
        <Text style={styles.appName}>EVgo</Text>
      </View>

      {/* Content below the bar */}
      <View style={[styles.content, { marginTop: barHeight }]}>
        {/* EVgo title — dark green, visible on light background */}
        <Text style={styles.evgoTitle}>EVgo</Text>
        <Text style={styles.save}>CHARGE YOUR EV AND SAVE!</Text>

        {/* Scooter art */}
        <ChargerCarArt small />
      </View>

      {/* Corner badge */}
      <View style={[styles.corner, { top: barHeight - 4 }]}>
        <MaterialCommunityIcons name="ev-station" size={28} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
    backgroundColor: '#EFF7E8',
  },
  appNameRow: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  content: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  evgoTitle: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
  },
  save: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 2,
    marginBottom: 10,
  },
  corner: {
    position: 'absolute',
    right: 0,
    width: 52,
    height: 52,
    backgroundColor: '#D0E9BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
