import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../constants/colors';

export default function WebRefreshNotice({ onPress, refreshing, label = 'Tap here to refresh latest data on web' }) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={refreshing}>
      <Ionicons name="refresh" size={18} color={colors.primary} />
      <Text style={styles.text}>
        {refreshing ? 'Refreshing...' : label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  text: {
    flex: 1,
    color: '#444444',
    fontSize: 13,
    fontWeight: '600',
  },
});
