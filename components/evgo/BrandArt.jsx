import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/colors';

export function EvgoLogo({ dark = false, compact = false }) {
  const size = compact ? 28 : 66;
  const badgeSize = compact ? 20 : 48;
  const textSize = compact ? 22 : 54;

  return (
    <View style={styles.logoRow}>
      {/* Lightning bolt badge */}
      <View style={[
        styles.badge,
        { width: badgeSize, height: badgeSize, borderRadius: badgeSize * 0.22 },
        dark && styles.badgeDark,
        compact && styles.badgeCompact,
      ]}>
        <Ionicons name="flash" size={badgeSize * 0.62} color={dark ? colors.primary : '#FFFFFF'} />
      </View>

      <View style={styles.wordWrap}>
        <Text style={[
          styles.wordmark,
          { fontSize: textSize, lineHeight: textSize + 4 },
          dark && styles.wordmarkDark,
          compact && styles.wordmarkCompact,
        ]}>
          EVgo
        </Text>
        {!compact && (
          <Text style={[styles.tagline, dark && styles.taglineDark]}>
            FAST CHARGING
          </Text>
        )}
        {compact && (
          <Text style={[styles.taglineCompact, dark && styles.taglineDark]}>
            FAST CHARGING
          </Text>
        )}
      </View>
    </View>
  );
}

export function ChargerCarArt({ small = false }) {
  const scale = small ? 0.65 : 1;

  return (
    <View style={[styles.art, small && styles.artSmall]}>
      {/* Ground */}
      <View style={styles.ground} />

      {/* EV Charging station pole */}
      <View style={[styles.pole, { right: small ? 18 : 28 }]} />
      <View style={[styles.stationBox, { right: small ? 10 : 18 }]}>
        <Ionicons name="flash" size={small ? 13 : 18} color={colors.primary} />
      </View>

      {/* Charging cable */}
      <View style={[styles.cable, { right: small ? 28 : 42 }]} />

      {/* Electric Scooter body */}
      <View style={[styles.scooterWrap, small && styles.scooterWrapSmall]}>
        {/* Deck / footboard */}
        <View style={styles.deck} />
        {/* Stem */}
        <View style={styles.stem} />
        {/* Handlebar */}
        <View style={styles.handlebar} />
        {/* Seat post */}
        <View style={styles.seatPost} />
        {/* Seat */}
        <View style={styles.seat} />
        {/* Body panel */}
        <View style={styles.bodyPanel} />
        {/* EVgo label on body */}
        <Text style={styles.scooterLabel}>EVgo</Text>
        {/* Front wheel */}
        <View style={styles.wheelFront} />
        {/* Rear wheel */}
        <View style={styles.wheelRear} />
        {/* Headlight */}
        <View style={styles.headlight} />
      </View>

      {/* Phone icon — rider holding phone */}
      <MaterialCommunityIcons
        name="cellphone"
        size={small ? 44 : 60}
        color="#1F2B1F"
        style={[styles.phone, small && styles.phoneSmall]}
      />

      {/* Lightning bolt above scooter */}
      <View style={[styles.chargeBadge, small && styles.chargeBadgeSmall]}>
        <Ionicons name="flash" size={small ? 10 : 14} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ── Logo ── */
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDark: {
    backgroundColor: colors.primary,
  },
  badgeCompact: {
    // size handled inline
  },
  wordWrap: {
    justifyContent: 'center',
  },
  wordmark: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: 2,
  },
  wordmarkDark: {
    color: colors.primary,
  },
  wordmarkCompact: {
    // size handled inline
  },
  tagline: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 3,
    marginTop: -4,
  },
  taglineCompact: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 2,
  },
  taglineDark: {
    color: colors.primaryDark,
  },

  /* ── Scooter Art ── */
  art: {
    height: 220,
    width: 300,
    justifyContent: 'flex-end',
  },
  artSmall: {
    height: 148,
    width: 200,
  },

  ground: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 2,
  },

  /* Charging station */
  pole: {
    position: 'absolute',
    bottom: 17,
    width: 6,
    height: 80,
    backgroundColor: '#59605D',
    borderRadius: 3,
  },
  stationBox: {
    position: 'absolute',
    bottom: 72,
    width: 28,
    height: 36,
    backgroundColor: '#DDE7D4',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#59605D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cable: {
    position: 'absolute',
    bottom: 52,
    width: 3,
    height: 28,
    backgroundColor: '#59605D',
    borderRadius: 2,
    transform: [{ rotate: '20deg' }],
  },

  /* Scooter */
  scooterWrap: {
    position: 'absolute',
    bottom: 17,
    left: 20,
    width: 180,
    height: 110,
  },
  scooterWrapSmall: {
    left: 10,
    width: 120,
    height: 74,
    transform: [{ scale: 0.67 }],
    transformOrigin: 'bottom left',
  },
  deck: {
    position: 'absolute',
    bottom: 22,
    left: 18,
    width: 130,
    height: 10,
    backgroundColor: '#4F5A4D',
    borderRadius: 5,
  },
  stem: {
    position: 'absolute',
    bottom: 32,
    left: 22,
    width: 8,
    height: 52,
    backgroundColor: '#59605D',
    borderRadius: 4,
    transform: [{ rotate: '-8deg' }],
  },
  handlebar: {
    position: 'absolute',
    bottom: 80,
    left: 8,
    width: 36,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  seatPost: {
    position: 'absolute',
    bottom: 32,
    left: 88,
    width: 8,
    height: 38,
    backgroundColor: '#59605D',
    borderRadius: 4,
  },
  seat: {
    position: 'absolute',
    bottom: 66,
    left: 72,
    width: 52,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  bodyPanel: {
    position: 'absolute',
    bottom: 28,
    left: 44,
    width: 88,
    height: 44,
    backgroundColor: '#8BCB4C',
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#4F5A4D',
  },
  scooterLabel: {
    position: 'absolute',
    bottom: 40,
    left: 62,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  wheelFront: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#333',
    borderWidth: 4,
    borderColor: '#666',
  },
  wheelRear: {
    position: 'absolute',
    bottom: 0,
    left: 118,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#333',
    borderWidth: 4,
    borderColor: '#666',
  },
  headlight: {
    position: 'absolute',
    bottom: 38,
    left: 14,
    width: 10,
    height: 7,
    backgroundColor: '#FFE066',
    borderRadius: 3,
  },

  phone: {
    position: 'absolute',
    left: 6,
    bottom: 38,
  },
  phoneSmall: {
    left: 2,
    bottom: 24,
  },

  chargeBadge: {
    position: 'absolute',
    bottom: 90,
    left: 96,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chargeBadgeSmall: {
    bottom: 60,
    left: 64,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
