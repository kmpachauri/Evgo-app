import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';

export default function MyProfileScreen() {
  const { user, signOut } = useApp();

  const handleLogout = () => {
    signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={54} color="#FFFFFF" />
        </View>
        <Text style={styles.userId}>ID: {user?.id}</Text>
      </View>

      <View style={styles.infoCard}>
      <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color={colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Email Id</Text>
            <Text style={styles.infoValue}>{user?.email ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Mobile Number</Text>
            <Text style={styles.infoValue}>{user?.phone ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={20} color={colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Invite Code</Text>
            <Text style={styles.infoValue}>{user?.inviteCode ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="wallet-outline" size={20} color={colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Current Balance</Text>
            <Text style={styles.infoValue}>{Number(user?.currentBalance ?? 0).toFixed(2)} Rs</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.changeBtn} onPress={() => router.push('/(tabs)/changepassword')}>
        <Ionicons name="lock-closed-outline" size={20} color="#FFFFFF" />
        <Text style={styles.changeBtnText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 54,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  avatarWrap: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingBottom: 28,
    paddingTop: 18,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userId: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: '#9A9A9A',
    fontSize: 12,
  },
  infoValue: {
    color: '#1F2933',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 48,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  changeBtnText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E45F6C',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 14,
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
