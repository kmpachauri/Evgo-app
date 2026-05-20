import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../constants/colors';

export function EvgoButton({ children, onPress, style, muted }) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      style={[styles.button, muted && styles.muted, style]}
      onPress={onPress}>
      <Text style={[styles.text, muted && styles.mutedText]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muted: {
    backgroundColor: '#8A8A8A',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  mutedText: {
    color: '#FFFFFF',
  },
});
