import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài đặt</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Chế độ tối</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Thông báo</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <Text style={styles.footer}>Phiên bản ứng dụng 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: { color: "white", fontSize: 16 },
  footer: {
    color: "#aaa",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});
