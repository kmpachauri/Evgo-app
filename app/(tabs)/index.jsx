import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Card } from "../../components/evgo/Card";
import { HomeHero } from "../../components/evgo/HomeHero";
import { colors } from "../../constants/colors";
import { useApp } from "../../context/AppContext";




const WHATSAPP_URL = "https://wa.me/919999999999";

export default function HomeScreen() {
  const { user, loading, error, refreshAppData, claimDailySign, signClaimed } = useApp();


  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { refreshAppData(); }, [refreshAppData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAppData();
    setRefreshing(false);
  };



  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <HomeHero />

        {/* Action Row */}
        <View style={styles.actionRow}>
          <ActionBtn label="Recharge" icon="wallet"           onPress={() => router.push("/(tabs)/product")} />
          <ActionBtn label="Withdraw" icon="card"             onPress={() => router.push("/(tabs)/withdraw")} />
          <ActionBtn label="Service"  icon="chatbox-ellipses" onPress={() => router.push("/(tabs)/support")} />
          <ActionBtn label="Sign" icon="calendar" onPress={() => router.push('/(tabs)/sign')} claimed={signClaimed} />
        </View>

        {/* Stock Card */}
        <Card style={styles.stockCard}>
          <View style={styles.stockHeader}>
            <View style={styles.coin}><Text style={styles.coinText}>EVgo</Text></View>
            <View>
              <Text style={styles.stockName}>{user?.market?.symbol}</Text>
              <Text style={styles.stockSub}>{user?.market?.company}</Text>
            </View>
            <View style={styles.trading}><Text style={styles.tradingText}>T7</Text></View>
          </View>
          <Text style={styles.price}>
            {Number(user?.market?.price ?? 0).toFixed(2)}{" "}
            <Text style={styles.priceUnit}>{user?.market?.currency}</Text>{" "}
            <Text style={styles.loss}>{user?.market?.changeText}</Text>
          </Text>
          <Text style={styles.link}>Track all markets on TradingView</Text>
        </Card>

        {/* Telegram Banner — original green theme */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Enter Telegram Channel</Text>
            <Text style={styles.bannerSub}>Follow the latest news every day</Text>
            <TouchableOpacity style={styles.goBtn} onPress={() => router.push("/(tabs)/support")}>
              <Text style={styles.goBtnText}>GO</Text>
            </TouchableOpacity>
          </View>
          <MaterialCommunityIcons name="ev-station" size={52} color="#16471E" />
        </View>

        {/* WhatsApp Banner — same green theme, different icon */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Enter WhatsApp Group</Text>
            <Text style={styles.bannerSub}>Follow Active the latest news every day</Text>
            <TouchableOpacity style={styles.goBtn} onPress={() => router.push("/(tabs)/support")}>
              <Text style={styles.goBtnText}>GO</Text>
            </TouchableOpacity>
          </View>
          <FontAwesome5 name="whatsapp" size={52} color="#16471E" />
        </View>

        {/* Stats */}
        <View style={styles.marketGrid}>
          <MiniStat title="Current Balance" value={formatRs(user?.currentBalance)} />
          <MiniStat title="Total Income" value={formatRs(user?.totalIncome)} />
          <MiniStat title="Today Income" value={formatRs(user?.todayIncome)} />
        </View>
        {loading ? <Text style={styles.statusText}>Loading...</Text> : null}
        {error   ? <Text style={styles.statusText}>{error}</Text>   : null}

        {/* Shortcuts */}
        <View style={styles.shortcutGrid}>
          <Shortcut label="Product" icon="charging-station" onPress={() => router.push("/(tabs)/equipment")} />
          <Shortcut label="Team"    icon="users"            onPress={() => router.push("/(tabs)/team")} />
          <Shortcut label="Records" icon="history"          onPress={() => router.push("/(tabs)/record")} />
        </View>

   
      </ScrollView>

      {/* WhatsApp FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => Linking.openURL(WHATSAPP_URL)}>
        <FontAwesome5 name="whatsapp" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

function ActionBtn({ label, icon, onPress, claimed }) {
  return (
    <TouchableOpacity style={[styles.action, claimed && styles.actionClaimed]} activeOpacity={0.82} onPress={onPress}>
      <Ionicons name={icon} size={35} color={claimed ? "#AAAAAA" : colors.primary} />
      <Text style={[styles.actionText, claimed && styles.actionTextClaimed]}>{label}</Text>
      {claimed && <Text style={styles.claimedBadge}>✓</Text>}
    </TouchableOpacity>
  );
}

function formatRs(value = 0) { return `${Number(value).toFixed(2)} Rs`; }

function MiniStat({ title, value }) {
  return (
    <Card style={styles.miniStat}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniTitle}>{title}</Text>
    </Card>
  );
}

function Shortcut({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.shortcut} onPress={onPress}>
      <FontAwesome5 name={icon} size={23} color={colors.primary} />
      <Text style={styles.shortcutText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper:  { flex: 1, backgroundColor: "#FFFFFF" },
  screen:   { flex: 1 },
  content:  { paddingBottom: 90 },

  actionRow: { flexDirection: "row", gap: 7, paddingHorizontal: 10, paddingTop: 10 },
  action: {
    flex: 1, height: 75, borderWidth: 1.4, borderColor: colors.primary,
    borderRadius: 7, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF",
  },
  actionClaimed:     { borderColor: "#CCCCCC", backgroundColor: "#F9F9F9" },
  actionText:        { marginTop: 4, color: "#575757", fontSize: 13 },
  actionTextClaimed: { color: "#AAAAAA" },
  claimedBadge:      { position: "absolute", top: 4, right: 6, fontSize: 10, color: colors.primary, fontWeight: "900" },

  stockCard:   { margin: 10, padding: 12 },
  stockHeader: { flexDirection: "row", alignItems: "center" },
  coin: {
    width: 35, height: 35, borderRadius: 18, backgroundColor: "#F4F8FB",
    alignItems: "center", justifyContent: "center", marginRight: 8,
  },
  coinText:    { color: colors.primary, fontSize: 8, fontWeight: "800" },
  stockName:   { fontSize: 14, fontWeight: "800", color: "#1C2230" },
  stockSub:    { color: "#727272", fontSize: 12 },
  trading: {
    marginLeft: "auto", width: 34, height: 26, borderRadius: 12,
    backgroundColor: "#FAFAFA", alignItems: "center", justifyContent: "center",
  },
  tradingText: { fontWeight: "900", color: "#111111" },
  price:       { marginTop: 8, fontSize: 28, fontWeight: "800", color: "#1F2933" },
  priceUnit:   { fontSize: 11, color: "#F5AA00" },
  loss:        { color: colors.danger, fontSize: 16, fontWeight: "700" },
  link:        { textAlign: "center", color: "#426BFF", fontSize: 12, marginTop: 4 },

  // Banners — original green theme
  banner: {
    marginHorizontal: 10, marginTop: 10, minHeight: 90,
    borderRadius: 10, backgroundColor: colors.primary,
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 16,
  },
  bannerLeft:  { flex: 1, paddingVertical: 14 },
  bannerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  bannerSub:   { color: "#FFFFFF", fontSize: 11, fontWeight: "700", marginTop: 6 },
  goBtn: {
    marginTop: 10, backgroundColor: "#16471E",
    borderRadius: 8, paddingHorizontal: 22, paddingVertical: 8, alignSelf: "flex-start",
  },
  goBtnText: { color: "#FFFFFF", fontWeight: "900", fontSize: 14 },

  marketGrid: { flexDirection: "row", gap: 4, padding: 10 },
  miniStat:   { flex: 1, paddingVertical: 10, alignItems: "center" },
  miniValue:  { color: colors.primary, fontWeight: "900", fontSize: 13, textAlign: "center" },
  miniTitle:  { color: "#6E6E6E", fontSize: 11, marginTop: 5 },
  statusText: { color: colors.primary, fontSize: 12, fontWeight: "700", textAlign: "center", marginBottom: 8 },

  shortcutGrid: { flexDirection: "row", paddingHorizontal: 10, gap: 8 },
  shortcut: {
    flex: 1, backgroundColor: "#FFFFFF", borderRadius: 4,
    borderWidth: 1, borderColor: "#E2E2E2", alignItems: "center", paddingVertical: 12,
  },
  shortcutText: { marginTop: 5, color: colors.primary, fontSize: 12, fontWeight: "700" },


  fab: {
    position: "absolute", bottom: 90, right: 18,
    width: 56, height: 56, borderRadius: 28, backgroundColor: "#25D366",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25, shadowRadius: 6, elevation: 8,
  },
});
