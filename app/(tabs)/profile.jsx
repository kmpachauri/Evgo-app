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

export default function ProfileScreen() {
  const { user, refreshAppData, signOut } = useApp();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAppData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    signOut();
    router.replace("/login");
  };

  useEffect(() => {
    refreshAppData();
  }, [refreshAppData]);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={38} color="#FFFFFF" />
            </View>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.id}>ID: {user?.id || user?._id}</Text>
          </View>
          <View style={styles.statRow}>
            <Card style={styles.stat}>
              <Text style={styles.value}>
                {formatNumber(user?.currentBalance)}
                {"\n"}Rs
              </Text>
              <Text style={styles.label}>Current Balance</Text>
            </Card>
            <Card style={styles.stat}>
              <Text style={styles.value}>
                {formatNumber(user?.totalIncome)}
                {"\n"}Rs
              </Text>
              <Text style={styles.label}>Total Income</Text>
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
              <Text style={styles.balanceValue}>{user?.name || "User"}</Text>
              <Text style={styles.label}>Account Holder</Text>
              <View style={styles.line} />
              <Text style={styles.balanceValue}>{user?.phone || "N/A"}</Text>
              <Text style={styles.label}>Mobile Number</Text>
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
          icon="person-circle-outline"
          label="Account"
          onPress={() => router.push("/(tabs)/myprofile")}
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
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
    padding: 12,
  },
  avatarRow: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 2,
  },
  id: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 9,
  },
  statRow: {
    flexDirection: "row",
    gap: 4,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 9,
  },
  value: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "900",
    lineHeight: 17,
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
    fontSize: 16,
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
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E45F6C",
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 14,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
