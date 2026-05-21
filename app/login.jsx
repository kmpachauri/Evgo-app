import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
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

export default function LoginScreen() {
  const { signIn, loading, error } = useApp();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
    } catch (loginError) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: loginError?.message || "Invalid credentials.",
      });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backdrop}>
        <ChargerCarArt />
      </View>
      <View style={styles.overlay} />
      <View style={[styles.panel, { marginTop: insets.top + 80 }]}>
        <EvgoLogo compact showTagline={false} />
        
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="envelope" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#777C85"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrap}>
            <FontAwesome5 name="lock" size={14} color="#A8AAB0" />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#777C85"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={14} color="#A8AAB0" />
            </TouchableOpacity>
          </View>
          <EvgoButton style={styles.login} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : "Login"}
          </EvgoButton>
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => router.replace("/register")}
          >
            <Text style={styles.registerText}>Goto Register</Text>
          </TouchableOpacity>
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
    top: 130,
    width: "100%",
    opacity: 0.35,
  },
 
  panel: {
    width: "88%",
    paddingTop: 24,
    alignItems: "center",
  },
  
  form: {
    width: "100%",
    gap: 16,
    marginTop: 100,
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
  login: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#D9ECD0",
    height: 54,
  },
  registerLink: {
    height: 42,
    marginHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  error: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  hint: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
});
