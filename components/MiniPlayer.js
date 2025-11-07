// components/MiniPlayer.js
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { PlayerContext } from "../context/PlayerContext";
import { useRouter } from "expo-router";

export default function MiniPlayer() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay } = useContext(PlayerContext);

  if (!currentSong) return null;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.push({ pathname: "/player", params: { data: JSON.stringify(currentSong) } })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: currentSong.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
      </View>
      <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
        <Text style={styles.playText}>{isPlaying ? "⏸" : "▶"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#222" },
  artist: { fontSize: 14, color: "#666", marginTop: 2 },
  playBtn: { padding: 10, backgroundColor: "#1DB954", borderRadius: 25 },
  playText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
