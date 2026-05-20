import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../constants/colors';

export function ListItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={21} color={colors.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#CACACA" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 47,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
