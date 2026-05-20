import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { setLoadingHandler } from '../services/api';
import { colors } from '../constants/colors';

export default function GlobalLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoadingHandler(setVisible);
    return () => setLoadingHandler(null);
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
