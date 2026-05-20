import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../constants/colors';

export function Header({ title, right, back = true, onRightPress }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
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
