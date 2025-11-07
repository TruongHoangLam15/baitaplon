// app/player.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Audio } from "expo-av";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function Player() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [waveHeights, setWaveHeights] = useState(Array(25).fill(20));

  const audio = params.audio;
  const image = params.image;
  const title = params.title;
  const artist = params.artist;

  // Load audio
  useEffect(() => {
    if (!audio) return;
    let isMounted = true;
    let intervalId;

    const loadAudio = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audio },
          { shouldPlay: true }
        );
        if (isMounted) {
          setSound(newSound);
          setIsPlaying(true);
          setLoading(false);

          // cập nhật waveform động
          intervalId = setInterval(async () => {
            const status = await newSound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
              const volume = Math.random() * 0.5 + 0.5; // mô phỏng sóng (có thể thay bằng status.volume)
              setWaveHeights((prev) =>
                prev.map(() => Math.max(10, Math.random() * 60 * volume))
              );
            }
          }, 200);
        }
      } catch (err) {
        console.log("Audio load error:", err);
        setLoading(false);
      }
    };

    loadAudio();

    return () => {
      isMounted = false;
      if (sound) sound.unloadAsync();
      if (intervalId) clearInterval(intervalId);
    };
  }, [audio]);

  const togglePlay = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={image ? { uri: image } : require("../assets/Play an Audio/Image 58.png")}
        style={styles.background}
        blurRadius={6}
      >
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Thông tin nhạc */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title || "Untitled"}</Text>
          <Text style={styles.artist}>{artist || "Unknown Artist"}</Text>
        </View>

        {/* Waveform động */}
        <View style={styles.waveformContainer}>
          {waveHeights.map((h, i) => (
            <View key={i} style={[styles.bar, { height: h }]} />
          ))}
        </View>

        {/* Thời gian */}
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>0:06</Text>
          <Text style={styles.timeText}>3:08</Text>
        </View>

        {/* Nút play/pause */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
        ) : (
          <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color="#fff"
              style={{ marginLeft: isPlaying ? 0 : 5 }}
            />
          </TouchableOpacity>
        )}

        {/* Nút điều khiển phụ */}
        <View style={styles.controlsRow}>
          <Feather name="shuffle" size={22} color="#fff" />
          <Feather name="skip-back" size={26} color="#fff" />
          <Feather name="skip-forward" size={26} color="#fff" />
          <Feather name="repeat" size={22} color="#fff" />
        </View>

        {/* Nút tương tác */}
        <View style={styles.socialRow}>
          <View style={styles.iconWithText}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Text style={styles.socialText}>12K</Text>
          </View>
          <View style={styles.iconWithText}>
            <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            <Text style={styles.socialText}>450</Text>
          </View>
          <Feather name="download" size={22} color="#fff" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 50,
    padding: 6,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  artist: {
    color: "#ccc",
    fontSize: 15,
    marginTop: 4,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 10,
    height: 60,
  },
  bar: {
    width: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
    marginHorizontal: 2,
    opacity: 0.9,
  },
  timeRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: { color: "#ccc", fontSize: 12 },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignItems: "center",
    marginBottom: 40,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    alignItems: "center",
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  socialText: {
    color: "#fff",
    fontSize: 14,
  },
});
