import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getSongs } from "../lib/api";

export default function Playlist() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getSongs();
      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  const handlePress = (item) => {
    router.push(
      `/player?audio=${encodeURIComponent(item.audio)}&image=${encodeURIComponent(item.image)}&title=${encodeURIComponent(item.title)}&artist=${encodeURIComponent(item.artist)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách phát</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 },
  card: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
  name: { color: "white", fontSize: 16, fontWeight: "600" },
});
