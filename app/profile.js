import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/68fb8a7216c0eb4826cebea4");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
        // fallback khi fetch lỗi
        setUser({
          name: "Reze",
          email: "nhoxlam05@gmail.com",
          avatar: "https://i.pravatar.cc/150?img=3",
        });
      }
    };
    fetchUser();
  }, []);

  // 🧩 Hàm xử lý đăng xuất
  const handleLogout = () => {
  if (Platform.OS === "web") {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (confirmLogout) {
      console.log("✅ Đăng xuất thành công, quay lại login");
      router.replace("/login");
    }
  } else {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất không?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          console.log("✅ Đăng xuất thành công, quay lại login");
          router.replace("/login");
        },
      },
    ]);
  }
};


  if (!user)
    return <Text style={{ color: "white", textAlign: "center" }}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar?.startsWith("http") ? user.avatar : `http://localhost:5000/${user.avatar}` }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.buttonText}>Cài đặt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#E74C3C" }]}
        onPress={handleLogout} // ⚠️ Thêm hành động tại đây
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    color: "#aaa",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
