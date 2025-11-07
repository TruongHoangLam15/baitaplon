import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "../lib/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage(""); // reset lỗi cũ

    if (!email || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      const user = await login(email, password);
      console.log("✅ Logged in user:", user);
      router.push("/home");
    } catch (err) {
      console.log("❌ Login error:", err.message);

      if (err.message.includes("401") || err.message.includes("Invalid")) {
        setErrorMessage("Email hoặc mật khẩu không đúng!");
      } else {
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại sau!");
      }

      Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* 🆕 Nút điều hướng sang trang đăng ký */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#1DB954",
    borderRadius: 10,
    paddingVertical: 12,
    width: "80%",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "#E74C3C",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  linkText: {
    color: "#1DB954",
    marginTop: 15,
    fontSize: 15,
    fontWeight: "500",
  },
});
