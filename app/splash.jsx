import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EvgoLogo } from '../components/evgo/BrandArt';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const { initialized, isLoggedIn } = useApp();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace(isLoggedIn ? '/(tabs)' : '/login');
    }, 1800);

    return () => clearTimeout(timer);
  }, [initialized, isLoggedIn]);

  return (
    <View style={styles.screen}>
      <View style={[styles.centerWrap, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.flashBadge}>
          <Ionicons name="flash" size={26} color="#FFFFFF" />
        </View>
        <EvgoLogo compact={false} showTagline={false} />
        <Text style={styles.brandText}>EVgo</Text>
        <ActivityIndicator color="#FFFFFF" size="small" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  flashBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  loader: {
    marginTop: 8,
  },
});
