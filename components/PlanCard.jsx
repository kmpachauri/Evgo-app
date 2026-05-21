import { router } from 'expo-router';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../constants/colors';

const planImages = {
  1: require('../assets/images/Plan 1.jpeg'),
  2: require('../assets/images/Plan 2.jpeg'),
  3: require('../assets/images/Plan 3.jpeg'),
  4: require('../assets/images/Plan 4.jpeg'),
  5: require('../assets/images/Plan 5.jpeg'),
};

export default function PlanCard({ plan }) {
  const cycle = plan?.totalDays ?? plan?.days ?? 0;
  const totalBuys = Number(plan?.totalBuys ?? plan?.totalBuy ?? plan?.purchaseCount ?? 0);
  const purchaseLimit = Number(plan?.purchaseLimit ?? 0);
  const lastBuyDate = plan?.lastBuyDate ?? plan?.lastPurchaseDate;
  const expiryDate = plan?.expiryDate ?? plan?.expireDate;
  const hasPurchaseMeta = totalBuys || lastBuyDate || expiryDate;
  const planImage = getPlanImage(plan);
  const isLimitReached = purchaseLimit > 0 && totalBuys >= purchaseLimit;

  const handleJoinNow = () => {
    if (isLimitReached) {
      Alert.alert('Plan Limit Reached', 'Plan limit reached or exceeded for this plan.');
      return;
    }

    router.push(`/(tabs)/recharge?planId=${plan?.id || plan?._id}&amount=${plan?.price || 0}&planName=${encodeURIComponent(plan?.name || 'Plan')}`);
  };

  return (
    <View style={styles.card}>
      {planImage ? <Image source={planImage} style={styles.heroImage} resizeMode="cover" /> : null}

      <View style={styles.topContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{plan?.name || 'Plan'}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Limit {formatCount(plan?.purchaseLimit)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatItem label="Investment" value={formatRs(plan?.price)} />
        <StatItem label="Daily Income" value={formatRs(plan?.dailyIncome)} />
        <StatItem label="Cycle" value={formatCount(cycle, 'Days')} />
        <StatItem label="Total Revenue" value={formatRs(plan?.totalRevenue)} />
      </View>

      {/* {hasPurchaseMeta ? (
        <View style={styles.metaSection}>
          {totalBuys ? <MetaItem label="Total buys" value={String(totalBuys)} /> : null}
          {lastBuyDate ? <MetaItem label="Last buy" value={String(lastBuyDate)} /> : null}
          {expiryDate ? <MetaItem label="Expiry" value={String(expiryDate)} /> : null}
        </View>
      ) : null} */}
      <TouchableOpacity
        style={styles.joinBtn}
        onPress={handleJoinNow}
      >
        <Text style={styles.joinBtnText}>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
}

function StatItem({ label, value }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MetaItem({ label, value }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function formatRs(value) {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount) ? `₹${amount.toFixed(2)}` : '₹0.00';
}

function formatCount(value, suffix = '') {
  if (value === undefined || value === null || value === '') {
    return suffix ? `0 ${suffix}` : '0';
  }

  return suffix ? `${value} ${suffix}` : String(value);
}

function getPlanImage(plan) {
  const planText = String(plan?.name ?? plan?.code ?? plan?.id ?? '');
  const match = planText.match(/(\d+)/);

  if (!match) {
    return null;
  }

  return planImages[Number(match[1])] ?? null;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    marginBottom: 10,
  },
  topContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: colors.deepGreen,
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: -5,
  },
  statItem: {
    width: '48.5%',
    alignItems: 'center',
    marginHorizontal: '0.75%',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryDark,
    textAlign: 'center',
  },
  statLabel: {
    marginTop: 5,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
  metaSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F2',
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  metaValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  joinBtn: {
    marginTop: 6,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
