import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { ChargerCarArt, EvgoLogo } from "../components/evgo/BrandArt";
import { EvgoButton } from "../components/evgo/Button";
import { colors } from "../constants/colors";
import { useApp } from "../context/AppContext";

export default function RegisterScreen() {
  const { signUp, loading, error } = useApp();
  const { ref } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    inviteCode: ref || "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Password and confirm password must match.",
      });
      return;
    }

    try {
      await signUp({
        inviteCode: form.inviteCode,
        phone: form.phone,
        password: form.password,
      });
      router.replace(
        `/congratulations?phone=${form.phone}&password=${form.password}`,
      );
    } catch (registrationError) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: registrationError?.message || "Unable to register right now.",
      });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backdrop}>
        <ChargerCarArt />
      </View>
      <View style={styles.overlay} />
      <View style={[styles.panel, { marginTop: insets.top + 40 }]}>
        <EvgoLogo compact showTagline={false} />
        <View style={styles.switchRow}>
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.switchText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtn, styles.switchBtnActive]}>
            <Text style={[styles.switchText, styles.switchTextActive]}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="user" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.inviteCode}
              onChangeText={(value) => updateField("inviteCode", value)}
              placeholder="Enter referral code"
              placeholderTextColor="#777C85"
            />
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="mobile-alt" size={14} color="#A8AAB0" />
            <Text style={styles.country}>+91</Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={(value) =>
                updateField("phone", value.replace(/[^0-9]/g, "").slice(0, 10))
              }
              placeholder="Enter mobile number"
              placeholderTextColor="#777C85"
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="lock" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.password}
              onChangeText={(value) => updateField("password", value)}
              placeholder="Enter your password"
              placeholderTextColor="#777C85"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5
                name={showPassword ? "eye-slash" : "eye"}
                size={14}
                color="#A8AAB0"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="lock" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.confirmPassword}
              onChangeText={(value) => updateField("confirmPassword", value)}
              placeholder="Confirm your password"
              placeholderTextColor="#777C85"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesome5
                name={showConfirmPassword ? "eye-slash" : "eye"}
                size={14}
                color="#A8AAB0"
              />
            </TouchableOpacity>
          </View>
          <EvgoButton
            style={styles.register}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : "Register"}
          </EvgoButton>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 225,
    width: "100%",
    opacity: 0.35,
  },
  panel: {
    width: "88%",
    paddingTop: 24,
    alignItems: "center",
  },
  switchRow: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 15,
    padding: 4,
    marginTop: 84,
  },
  switchBtn: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  switchBtnActive: {
    backgroundColor: "#FFFFFF",
  },
  switchText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
  switchTextActive: {
    color: colors.primary,
  },

  form: {
    width: "100%",
    gap: 16,
    marginTop: 32,
  },
  inputWrap: {
    height: 52,
    borderRadius: 8,
    backgroundColor: "#F2F3F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  country: {
    color: "#6E7278",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4E5258",
  },
  register: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#D9ECD0",
    height: 54,
  },
  error: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
});
