// app/favorites.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../../lib/api";

export default function Favorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = "68fb8a7216c0eb4826cebea4"; 
        const res = await fetch(`${BASE_URL}/users/${userId}/favorites`);

        if (!res.ok) {
          const text = await res.text();
          console.log("⚠️ Server response:", text);
          throw new Error("Failed to fetch favorites");
        }

        const data = await res.json();
        console.log("✅ Favorites API data:", data);

        // Trường hợp API trả về khác nhau
        if (Array.isArray(data)) {
          setFavorites(data);
        } else if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          console.log("⚠️ Không có dữ liệu hợp lệ trong phản hồi");
          setFavorites([]);
        }
      } catch (err) {
        console.log("❌ Fetch error:", err.message);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handlePress = (item) => {
    router.push(
      `/player?audio=${encodeURIComponent(item.audio)}&image=${encodeURIComponent(
        item.image
      )}&title=${encodeURIComponent(item.title)}&artist=${encodeURIComponent(
        item.artist
      )}`
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Đang tải bài hát yêu thích...</Text>
      </View>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="musical-notes-outline" size={40} color="#bbb" />
        <Text style={{ color: "#fff", marginTop: 10 }}>
          Bạn chưa có bài hát yêu thích nào.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <Ionicons name="search-outline" size={22} color="#000" />
      </View>

      {/* Tags */}
      <View style={styles.tags}>
        {["Playlists", "New tag", "Songs", "Albums", "Artists"].map((tag, i) => (
          <View key={i} style={[styles.tag, i === 2 && styles.tagActive]}>
            <Text
              style={[
                styles.tagText,
                i === 2 && { color: "#fff", fontWeight: "600" },
              ]}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Profile */}
      <View style={styles.profile}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Mer Watson</Text>
          <Text style={styles.followers}>👥 1.234K Followers</Text>
        </View>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Favorite Songs */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id || item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songCard} onPress={() => handlePress(item)}>
            <Image
              source={{ uri: item.image || "https://placehold.co/60x60" }}
              style={styles.songImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>{item.title || "Không rõ tên bài hát"}</Text>
              <Text style={styles.songArtist}>{item.artist || "Unknown Artist"}</Text>
            </View>
            <Ionicons name="heart" size={20} color="#1DB954" />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff", 
  },
  tags: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#2a2a2a", 
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagActive: {
    backgroundColor: "#1DB954",
  },
  tagText: {
    color: "#fff", 
    fontSize: 14,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff", 
  },
  followers: {
    color: "#bbb", 
    fontSize: 13,
  },
  followBtn: {
    backgroundColor: "#1DB954",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  followText: {
    color: "#fff",
    fontWeight: "500",
  },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "#1e1e1e", 
    borderRadius: 8,
    padding: 8,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 14,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  songArtist: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 3,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});

