import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import {
  getSongs,
  getSuggestions,
  getCharts,
  getTrendingAlbums,
  getPopularArtists,
} from "../../lib/api";

export default function Home() {
  const router = useRouter();

  const [suggestions, setSuggestions] = useState([]);
  const [charts, setCharts] = useState([]);
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [
          suggestionsData,
          chartsData,
          trendingAlbumsData,
          popularArtistsData,
          songsData,
        ] = await Promise.all([
          getSuggestions(),
          getCharts(),
          getTrendingAlbums(),
          getPopularArtists(),
          getSongs(),
        ]);
        setSuggestions(suggestionsData);
        setCharts(chartsData);
        setTrendingAlbums(trendingAlbumsData);
        setPopularArtists(popularArtistsData);
        setSongs(songsData);
      } catch (error) {
        console.log("Fetch data error:", error);
      }
    }
    fetchAll();
  }, []);

  // 🔎 Lọc kết quả tìm kiếm khi text thay đổi
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredSongs([]);
    } else {
      const results = songs.filter((s) =>
        (s.title + s.artist)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredSongs(results);
    }
  }, [searchText, songs]);

  const handlePressSong = (song) => {
    const query = new URLSearchParams({
      audio: song.audio,
      image: song.image,
      title: song.title,
      artist: song.artist,
    }).toString();
    router.push(`/player?${query}`);
  };

  const handlePressProfile = () => {
    router.push("/profile");
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songCard}
      onPress={() => handlePressSong(item)}
    >
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => handlePressSong(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title || item.name}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {item.artist || item.artistName || item.chartName}
      </Text>
    </TouchableOpacity>
  );

  const renderArtistItem = ({ item }) => {
  const handlePressArtist = () => {
    // Truyền dữ liệu qua query hoặc param
    const query = new URLSearchParams({
      id: item._id,
      name: item.name,
      avatar: item.avatar,
      followers: item.followers?.toString() || "0",
    }).toString();

    router.push(`/artist?${query}`);
  };

  return (
    <TouchableOpacity style={styles.artistItem} onPress={handlePressArtist}>
      <Image
        source={{ uri: item.avatar || item.image }}
        style={styles.artistImage}
      />
      <Text style={styles.artistName} numberOfLines={1}>
        {item.name || item.artistName}
      </Text>
    </TouchableOpacity>
  );
};


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
        </View>

        {/* Avatar góc phải */}
        <TouchableOpacity onPress={handlePressProfile}>
          <Image
            source={{ uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="What you want to listen to"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Nếu đang nhập -> hiển thị kết quả tìm kiếm */}
      {searchText.trim() !== "" ? (
        <>
          <Text style={styles.sectionTitle}>
            Kết quả tìm kiếm ({filteredSongs.length})
          </Text>
          {filteredSongs.length > 0 ? (
            <FlatList
              data={filteredSongs}
              keyExtractor={(item) => item._id}
              renderItem={renderSongItem}
              scrollEnabled={false}
            />
          ) : (
            <Text style={{ color: "#aaa" }}>Không tìm thấy kết quả nào.</Text>
          )}
        </>
      ) : (
        <>
          {/* Khi chưa tìm kiếm: hiển thị giao diện gợi ý */}
          <Text style={styles.sectionTitle}>Suggestions for you</Text>
          <FlatList
            horizontal
            data={suggestions}
            keyExtractor={(item) => item._id}
            renderItem={renderCardItem}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Charts</Text>
          <FlatList
            horizontal
            data={charts}
            keyExtractor={(item) => item._id}
            renderItem={renderCardItem}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Trending albums</Text>
          <FlatList
            horizontal
            data={trendingAlbums}
            keyExtractor={(item) => item._id}
            renderItem={renderCardItem}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Popular artists</Text>
          <FlatList
            horizontal
            data={popularArtists}
            keyExtractor={(item) => item._id}
            renderItem={renderArtistItem}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Bài hát nổi bật</Text>
          <FlatList
            data={songs}
            keyExtractor={(item) => item._id}
            renderItem={renderSongItem}
            scrollEnabled={false}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1.5,
    borderColor: "#333",
  },
  greeting: { color: "white", fontSize: 16, opacity: 0.7 },
  userName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  searchBox: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 25,
  },
  searchInput: {
    color: "white",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  horizontalList: { marginBottom: 30 },
  cardItem: { marginRight: 20, width: 140 },
  cardImage: {
    width: 140,
    height: 180,
    borderRadius: 14,
    marginBottom: 8,
  },
  cardTitle: { color: "white", fontWeight: "600", fontSize: 16 },
  cardSubtitle: { color: "#aaa", fontSize: 14 },
  artistItem: {
    marginRight: 20,
    width: 110,
    alignItems: "center",
  },
  artistImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 8,
  },
  artistName: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  songImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  songTitle: { color: "white", fontSize: 16, fontWeight: "600" },
  songArtist: { color: "#aaa" },
});
