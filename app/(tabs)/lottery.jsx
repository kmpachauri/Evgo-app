import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { useApp } from "../../context/AppContext";
import {
  claimLotteryReward,
  getLotteryStatus,
} from "../../services/lotteryService";

const PRIZES = [
  { id: 0, label: "₹55" },
  { id: 1, label: "iPhone 16" },
  { id: 2, label: "₹155" },
  { id: 3, label: "₹465" },
  { id: 4, label: "CLICK", isCenter: true },
  { id: 5, label: "Fold 6" },
  { id: 6, label: "₹2445" },
  { id: 7, label: "Gold Coin" },
  { id: 8, label: "₹965" },
];

function normalizePlanName(value = "") {
  return String(value).trim().replace(/^jio/i, "EVgo");
}

export default function LotteryScreen() {
  const { refreshAppData } = useApp();
  const insets = useSafeAreaInsets();
  const [pending, setPending] = useState(null);
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadLottery = async () => {
    const response = await getLotteryStatus();
    setPending(response?.data?.pending || null);
    setHistory(response?.data?.history || []);
  };

  useEffect(() => {
    loadLottery();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLottery();
    setRefreshing(false);
  };

  const handleSpin = async () => {
    if (!pending?._id) {
      Alert.alert(
        "No chance",
        "You do not have any pending lottery chance right now.",
      );
      return;
    }

    setLoading(true);
    try {
      const response = await claimLotteryReward(pending._id);
      const amount = response?.data?.rewardAmount || 0;
      const prizes = PRIZES.filter((p) => !p.isCenter);
      const picked =
        prizes.find((item) => item.label === `₹${amount}`) ||
        prizes[Math.floor(Math.random() * prizes.length)];
      setWinner(picked.id);
      await refreshAppData();
      await loadLottery();
      Alert.alert("Lucky Draw!", `You won ₹${amount}`);
    } catch (error) {
      Alert.alert("Unable to claim", error?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")}>
          <Ionicons name="chevron-back-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lottery</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Grid */}
        <View style={styles.gridWrap}>
          <View style={styles.grid}>
            {PRIZES.map((prize) => (
              <TouchableOpacity
                key={prize.id}
                style={[
                  styles.cell,
                  prize.isCenter && styles.cellCenter,
                  winner === prize.id && styles.cellWinner,
                ]}
                onPress={prize.isCenter ? handleSpin : undefined}
                activeOpacity={prize.isCenter ? 0.8 : 1}
              >
                {!prize.isCenter && <Text style={styles.star}>★</Text>}
                <Text
                  style={[
                    styles.cellText,
                    prize.isCenter && styles.cellCenterText,
                  ]}
                >
                  {prize.isCenter
                    ? loading
                      ? "..."
                      : prize.label
                    : prize.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Terms */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Pending Chance</Text>
          <Text style={styles.summaryValue}>
            {pending
              ? `${normalizePlanName(pending.planName)} • ₹${pending.minAmount} to ₹${pending.maxAmount}`
              : "No pending lottery right now"}
          </Text>
          <Text style={styles.summaryHint}>
            {pending
              ? "Tap the center button to reveal your reward."
              : "Your next approved plan will create a new lottery chance."}
          </Text>
        </View>

        <View style={styles.terms}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            Lottery becomes available after your recharge is approved and the
            linked plan is activated.{"\n"}
            Each successful plan purchase gives exactly one claim opportunity.
            {"\n"}
            Claimed rewards are added directly to your wallet and income
            history.
          </Text>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Lottery History</Text>
          {history.length === 0 ? (
            <Text style={styles.historyEmpty}>No lottery records found.</Text>
          ) : (
            history.slice(0, 8).map((item) => (
              <View key={item._id} style={styles.historyRow}>
                <Text style={styles.historyPlan}>
                  {normalizePlanName(item.planName)}
                </Text>
                <Text style={styles.historyAmount}>
                  {item.status === "claimed"
                    ? `₹${item.rewardAmount}`
                    : "Pending"}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary },
  header: {
    paddingBottom: 12,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  content: { padding: 14, paddingBottom: 32 },
  gridWrap: {
    backgroundColor: colors.danger,
    borderRadius: 18,
    padding: 10,
    marginBottom: 16,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  cell: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cellCenter: { backgroundColor: "#F5C518" },
  cellWinner: {
    backgroundColor: "#D4EDDA",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  star: { fontSize: 22, color: "#F5C518" },
  cellText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
    marginTop: 2,
  },
  cellCenterText: { fontSize: 18, fontWeight: "900", color: "#1A1A1A" },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: { fontSize: 16, fontWeight: "900", color: "#1A1A1A" },
  summaryValue: {
    marginTop: 8,
    fontSize: 15,
    color: colors.primary,
    fontWeight: "800",
  },
  summaryHint: { marginTop: 8, fontSize: 12, color: "#526052", lineHeight: 18 },
  terms: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 10,
  },
  termsText: { fontSize: 13, color: "#333333", lineHeight: 20 },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  historyEmpty: { fontSize: 13, color: "#666666" },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  historyPlan: { fontSize: 13, color: "#1A1A1A", fontWeight: "700" },
  historyAmount: { fontSize: 13, color: colors.primary, fontWeight: "800" },
});
