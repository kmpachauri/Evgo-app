import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChargerCarArt, EvgoLogo } from "../../components/evgo/BrandArt";
import { EvgoButton } from "../../components/evgo/Button";
import { colors } from "../../constants/colors";
import { changePassword } from "../../services/authService";

export default function ChangePasswordScreen() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!form.current || !form.newPass || !form.confirm) {
      setError("All fields are required.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (form.newPass.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    try {
      await changePassword({ currentPassword: form.current, newPassword: form.newPass });
      setSuccess("Password changed successfully! Please login again.");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (err) {
      setError(err?.message || "Unable to change password.");
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
        <Text style={styles.version}>CHANGE PASSWORD</Text>
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="lock" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.current}
              onChangeText={(v) => update("current", v)}
              placeholder="Current Password"
              placeholderTextColor="#777C85"
          
               secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={14} color="#A8AAB0" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="key" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.newPass}
              onChangeText={(v) => update("newPass", v)}
              placeholder="New Password"
              placeholderTextColor="#777C85"
               secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={14} color="#A8AAB0" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="check-circle" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={form.confirm}
              onChangeText={(v) => update("confirm", v)}
              placeholder="Confirm New Password"
              placeholderTextColor="#777C85"
               secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={14} color="#A8AAB0" />
            </TouchableOpacity>
          </View>
          <EvgoButton style={styles.submit} onPress={handleSubmit}>
            Submit
          </EvgoButton>
          <EvgoButton style={styles.back} onPress={() => router.push("/(tabs)/myprofile")}>
            Go Back
          </EvgoButton>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}
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
    letterSpacing: 1,
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
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4E5258",
  },
  submit: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#D9ECD0",
    height: 54,
  },
  back: {
    height: 42,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  error: {
    color: "#FFD0D0",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  successText: {
    color: "#D0FFD6",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
});
