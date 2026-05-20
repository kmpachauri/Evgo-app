import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../constants/colors';

export default function PlanCard({ plan }) {
  const cycle = plan?.totalDays ?? plan?.days ?? 0;
  const totalBuys = plan?.totalBuys ?? plan?.totalBuy ?? plan?.purchaseCount;
  const lastBuyDate = plan?.lastBuyDate ?? plan?.lastPurchaseDate;
  const expiryDate = plan?.expiryDate ?? plan?.expireDate;
  const hasPurchaseMeta = totalBuys || lastBuyDate || expiryDate;

  return (
    <View style={styles.card}>
      <View style={styles.topContent}>
        <Text style={styles.title}>{plan?.name || 'Plan'}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Daily income</Text>
        </View>
        <View style={styles.middleSection}>
          <View style={styles.middleItem}>
            <Text style={styles.label}>Investment</Text>
            <Text style={styles.value}>{formatRs(plan?.price)}</Text>
          </View>
          <View style={[styles.middleItem, styles.middleItemSpacing]}>
            <Text style={styles.label}>Purchase Limit</Text>
            <Text style={styles.value}>{formatCount(plan?.purchaseLimit)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatItem label="Cycle" value={formatCount(cycle, 'Days')} />
        <StatItem label="Daily Income" value={formatRs(plan?.dailyIncome)} />
        <StatItem label="Total Revenue" value={formatRs(plan?.totalRevenue)} />
      </View>

      {hasPurchaseMeta ? (
        <View style={styles.metaSection}>
          {totalBuys ? <MetaItem label="Total buys" value={String(totalBuys)} /> : null}
          {lastBuyDate ? <MetaItem label="Last buy" value={String(lastBuyDate)} /> : null}
          {expiryDate ? <MetaItem label="Expiry" value={String(expiryDate)} /> : null}
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.joinBtn}
        onPress={() => router.push(`/(tabs)/recharge?planId=${plan?.id || plan?._id}&amount=${plan?.price || 0}&planName=${encodeURIComponent(plan?.name || 'Plan')}`)}
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
  return Number.isFinite(amount) ? `${amount.toFixed(2)} Rs` : '0.00 Rs';
}

function formatCount(value, suffix = '') {
  if (value === undefined || value === null || value === '') {
    return suffix ? `0 ${suffix}` : '0';
  }

  return suffix ? `${value} ${suffix}` : String(value);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginVertical: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  topContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.deepGreen,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#EEF6E5',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  middleSection: {
    flexDirection: 'row',
    marginTop: 14,
  },
  middleItem: {
    flex: 1,
  },
  middleItemSpacing: {
    marginLeft: 16,
  },
  label: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F2',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  statLabel: {
    marginTop: 4,
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
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 9,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
