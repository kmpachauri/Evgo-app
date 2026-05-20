import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../constants/colors';

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

export function Header({ title, right, back = true, onRightPress }) {
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={styles.back} />
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightWrap} disabled={!onRightPress} onPress={onRightPress}>
        <Text style={styles.right}>{right}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: colors.primary,
    borderBottomColor: 'rgba(255,255,255,0.35)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  back: {
    width: 54,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightWrap: {
    width: 54,
  },
  right: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
});
