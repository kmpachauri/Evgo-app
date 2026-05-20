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
import { requestOtp } from "../services/authService";

export default function RegisterScreen() {
  const { signUp, loading, error } = useApp();
  const { ref } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [otpLoading, setOtpLoading] = useState(false);
  const [form, setForm] = useState({
    inviteCode: ref || "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleRegister = async () => {
    try {
      await signUp(form);
      router.replace(`/congratulations?email=${form.email}&password=${form.password}`);
    } catch (registrationError) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: registrationError?.message || "Unable to register right now.",
      });
    }
  };

  const handleOtp = async () => {
    if (!form.email.trim()) {
      Toast.show({ type: "error", text1: "Email required", text2: "Please enter your email address first." });
      return;
    }
    setOtpLoading(true);
    try {
      await requestOtp(form.email);
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: `Verification code sent to ${form.email}`,
      });
    } catch (otpError) {
      Toast.show({
        type: "error",
        text1: "OTP Failed",
        text2: otpError?.message || "Unable to send email OTP.",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backdrop}>
        <ChargerCarArt />
      </View>
      <View style={styles.overlay} />
      <View style={[styles.panel, { marginTop: insets.top + 40 }]}>
        <EvgoLogo compact />
        <Text style={styles.version}>FAST CHARGING 2.0</Text>
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
            <FontAwesome5 name="envelope" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(value) => updateField("email", value)}
              placeholder="Enter your email"
              placeholderTextColor="#777C85"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="mobile-alt" size={14} color="#A8AAB0" />
            <Text style={styles.country}>+91</Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={(value) => updateField("phone", value)}
              placeholder="Enter mobile number"
              placeholderTextColor="#777C85"
              keyboardType="phone-pad"
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
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={14} color="#A8AAB0" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="shield-alt" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.otp}
              onChangeText={(value) => updateField("otp", value)}
              placeholder="Enter email OTP"
              placeholderTextColor="#777C85"
              keyboardType="number-pad"
            />
            <TouchableOpacity onPress={handleOtp} disabled={otpLoading}>
              {otpLoading
                ? <ActivityIndicator size="small" color="#7DBCE0" />
                : <Text style={styles.send}>Email OTP</Text>
              }
            </TouchableOpacity>
          </View>
          <EvgoButton style={styles.register} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : "Register"}
          </EvgoButton>
          <EvgoButton
            style={styles.login}
            onPress={() => router.replace("/login")}
          >
            Goto Login
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
    top: 92,
    width: "100%",
    opacity: 0.35,
  },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: 430,
  //   backgroundColor: 'rgba(56,86,42,0.45)',
  // },
  panel: {
    width: "88%",
    paddingTop: 24,
    alignItems: "center",
  },
  version: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
    marginBottom: 50,
  },
  form: {
    width: "100%",
    gap: 16,
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
  send: {
    color: "#7DBCE0",
    fontSize: 12,
    fontWeight: "800",
  },
  register: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#D9ECD0",
    height: 54,
  },
  login: {
    height: 42,
    marginHorizontal: 10,
  },
  error: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
});
