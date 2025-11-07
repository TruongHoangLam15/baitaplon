import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../lib/api";

export default function Artist() {
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        // Lấy danh sách artist từ server
        const res = await fetch(`${BASE_URL}/popular-artists`);
        if (!res.ok) throw new Error("Failed to fetch artist");
        const data = await res.json();

        // Nếu bạn chỉ có 1 artist trong DB
        setArtist(data[0]);
      } catch (err) {
        console.log("Fetch artist error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={{ color: "#aaa", marginTop: 10 }}>Đang tải nghệ sĩ...</Text>
      </View>
    );

  if (!artist)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#aaa" }}>Không có dữ liệu nghệ sĩ.</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profile}>
        <Image
          source={{ uri: artist.avatar?.startsWith("http") ? artist.avatar : `${BASE_URL}/${artist.avatar}` }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.followers}>
          {artist.followers?.toLocaleString() || 0} Followers
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="shuffle" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Songs */}
      {artist.songs && artist.songs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Songs</Text>
          {artist.songs.map((song, index) => (
            <TouchableOpacity
              key={song._id || index}
              style={styles.songCard}
              onPress={() =>
                router.push(`/player?id=${song._id || index}`)
              }
            >
              <Image
                source={{
                  uri: song.image?.startsWith("http")
                    ? song.image
                    : `${BASE_URL}/${song.image}`,
                }}
                style={styles.songImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songMeta}>
                  {artist.name} ● {song.views || 0} ● {song.duration || ""}
                </Text>
              </View>
              <Ionicons name="ellipsis-vertical" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: { padding: 16 },
  profile: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  followers: { color: "#bbb" },
  actions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
    alignItems: "center",
  },
  followButton: {
    borderColor: "#555",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followText: { color: "#fff", fontWeight: "600" },
  iconButton: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 50,
  },
  playButton: {
    backgroundColor: "#1DB954",
    padding: 14,
    borderRadius: 50,
  },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  songImage: { width: 60, height: 60, borderRadius: 8 },
  songTitle: { fontWeight: "600", fontSize: 15, color: "#fff" },
  songMeta: { color: "#bbb", fontSize: 12 },
});
