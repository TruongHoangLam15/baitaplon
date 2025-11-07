import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Home", route: "/home" },
    { name: "Recent", route: "/recent" },

    { name: "Playlist", route: "/playlist" },
    { name: "Search", route: "/search" },
  
   
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tab: {
    alignItems: "center",
  },
  activeTab: {},
  text: {
    color: "#aaa",
    fontSize: 12,
  },
  activeText: {
    color: "#1DB954",
    fontWeight: "bold",
  },
});
