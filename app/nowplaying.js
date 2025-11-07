import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { PlayerContext } from "../context/PlayerContext";

export default function NowPlaying() {
  const router = useRouter();
  const params = useLocalSearchParams(); // <-- dùng useLocalSearchParams
  const { currentSong } = useContext(PlayerContext);
  const [song, setSong] = useState(null);

  useEffect(() => {
    if (params.title) {
      setSong({
        title: params.title,
        artist: params.artist,
        image: params.image,
        audio: params.audio,
      });
    } else if (currentSong) {
      setSong(currentSong);
    }
  }, [params, currentSong]);

  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>No song selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {song.image ? (
        <Image source={{ uri: song.image }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, { backgroundColor: "#333", justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ color: "#aaa" }}>No Image</Text>
        </View>
      )}

      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", alignItems: "center", justifyContent: "center", padding: 20 },
  cover: { width: 280, height: 280, borderRadius: 25, marginBottom: 30 },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  artist: { color: "#aaa", marginBottom: 30 },
  backButton: { padding: 12, backgroundColor: "#333", borderRadius: 10 },
  backText: { color: "white", fontWeight: "bold" },
});
