import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getSongs } from "../../lib/api";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  const handlePress = (item) => {
    router.push(
      `/player?audio=${encodeURIComponent(item.audio)}&image=${encodeURIComponent(
        item.image
      )}&title=${encodeURIComponent(item.title)}&artist=${encodeURIComponent(
        item.artist
      )}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["All", "Tracks", "Albums", "Artists"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabItem,
              activeTab === tab && styles.activeTabItem,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.plays}>▶ {item.plays} • </Text>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.more}>⋯</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
  clear: {
    fontSize: 18,
    color: "#bbb", 
    paddingLeft: 5,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333", 
  },
  tabItem: {
    marginRight: 25,
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#bbb",
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#1DB954",
  },
  activeTabText: {
    color: "#1DB954",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#1e1e1e", 
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff", 
  },
  artist: {
    color: "#bbb", 
    fontSize: 14,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  plays: {
    color: "#888", 
    fontSize: 13,
  },
  duration: {
    color: "#888",
    fontSize: 13,
  },
  more: {
    fontSize: 24,
    color: "#bbb", 
    paddingLeft: 10,
  },
});

