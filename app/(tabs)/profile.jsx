import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EvgoButton } from "../../components/evgo/Button";
import { Card } from "../../components/evgo/Card";
import { ListItem } from "../../components/evgo/ListItem";
import { colors } from "../../constants/colors";
import { useApp } from "../../context/AppContext";

function normalizeBrandCode(value = "", replacement = "EVGO") {
  return String(value).trim().replace(/^jio/i, replacement);
}

export default function ProfileScreen() {
  const { user, refreshAppData, signOut } = useApp();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAppData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  useEffect(() => {
    refreshAppData();
  }, [refreshAppData]);

  const displayMobile = user?.phone || user?.bank?.mobile || "N/A";
  const displayId = normalizeBrandCode(user?.id || user?._id || "", "EVGO");
  const mobileText = displayMobile === "N/A" ? "N/A" : `+91 ${displayMobile}`;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
          <View style={styles.brandBlock}>
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <Ionicons name="flash" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.brandTitle}>EVgo</Text>
            </View>
            <Text style={styles.id}>ID: {displayId}</Text>
            <Text style={styles.mobile}>{mobileText}</Text>
          </View>
          <View style={styles.statRow}>
            <Card style={styles.stat}>
              <Text style={styles.value}>
                {formatNumber(user?.totalAssets)}
                {"\n"}Rs
              </Text>
              <Text style={styles.label}>Total Assets</Text>
            </Card>
            <Card style={styles.stat}>
              <Text style={styles.value}>
                {formatNumber(user?.teamIncome)}
                {"\n"}Rs
              </Text>
              <Text style={styles.label}>Team Income</Text>
            </Card>
            <Card style={styles.stat}>
              <Text style={styles.value}>
                {formatNumber(user?.todayIncome)}
                {"\n"}Rs
              </Text>
              <Text style={styles.label}>Today Income</Text>
            </Card>
          </View>
          <View style={styles.balanceRow}>
            <Card style={styles.balance}>
              <Text style={styles.balanceValue}>
                {formatNumber(user?.totalIncome)} Rs
              </Text>
              <Text style={styles.label}>Total Income</Text>
              <View style={styles.line} />
              <Text style={styles.balanceValue}>
                {formatNumber(user?.currentBalance)} Rs
              </Text>
              <Text style={styles.label}>Current Balance</Text>
            </Card>
            <View style={styles.buttons}>
              <View style={styles.btnCard}>
                <EvgoButton
                  style={styles.button}
                  onPress={() => router.push("/(tabs)/product")}
                >
                  Recharge
                </EvgoButton>
              </View>
              <View style={styles.btnCard}>
                <EvgoButton
                  style={styles.button}
                  onPress={() => router.push("/(tabs)/withdraw")}
                >
                  Withdraw
                </EvgoButton>
              </View>
            </View>
          </View>
        </View>

        <ListItem
          icon="download"
          label="Download App"
          onPress={() => {
            if (typeof window !== "undefined") {
              window.location.href = "https://evgo.site/download/latest.apk";
            }
          }}
        />

        <ListItem
          icon="gift-outline"
          label="Lottery"
          onPress={() => router.push("/(tabs)/lottery")}
        />
        <ListItem
          icon="ticket-outline"
          label="Coupon"
          onPress={() => router.push("/(tabs)/coupon")}
        />
        <ListItem
          icon="card-outline"
          label="Account"
          onPress={() => router.push("/(tabs)/bank-details")}
        />

        <ListItem
          icon="calendar-outline"
          label="Records"
          onPress={() => router.push("/(tabs)/record")}
        />
        {/* <ListItem
          icon="cube-outline"
          label="Treasure"
          onPress={() => router.push("/(tabs)/equipment")}
        /> */}
        <ListItem
          icon="grid"
          label="Income"
          onPress={() => router.push("/(tabs)/income")}
        />
        <ListItem
          icon="mail"
          label="Message"
          onPress={() => router.push("/(tabs)/support")}
        />
        <ListItem
          icon="information-circle-outline"
          label="About"
          onPress={() => router.push("/(tabs)/about")}
        />
        <ListItem
          icon="person-circle-outline"
          label="My Profile"
          onPress={() => router.push("/(tabs)/myprofile")}
        />
        <ListItem
          icon="log-out-outline"
          label="Logout"
          onPress={() => handleLogout()}
        />
      </ScrollView>
      
    </View>
  );
}

function formatNumber(value = 0) {
  return Number(value).toFixed(2);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingBottom: 20,
  },
  top: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 12,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
  },
  brandSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  id: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  mobile: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
  },
  statRow: {
    flexDirection: "row",
    gap: 6,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  value: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "900",
    lineHeight: 18,
    fontSize: 14,
  },
  label: {
    color: "#6F6F6F",
    fontSize: 11,
    marginTop: 4,
  },
  balanceRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  balance: {
    flex: 1,
    padding: 10,
  },
  balanceValue: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  line: {
    height: 1,
    backgroundColor: colors.primary,
    marginVertical: 9,
  },
  buttons: {
    flex: 1,
    gap: 10,
  },
  btnCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
 
});
