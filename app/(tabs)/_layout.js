import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00C4FF", 
        tabBarInactiveTintColor: "#777",   
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#141414",
          borderTopColor: "transparent",
          height: 70,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              return <Ionicons name={iconName} size={24} color={color} />;
            case "search":
              iconName = focused ? "search" : "search-outline";
              return <Ionicons name={iconName} size={24} color={color} />;
            case "recent":
              iconName = focused ? "albums" : "albums-outline";
              return <Ionicons name={iconName} size={24} color={color} />;
            case "favorites":
              iconName = focused ? "library" : "library-outline";
              return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="recent" options={{ title: "Feed" }} />
      <Tabs.Screen name="favorites" options={{ title: "Library" }} />
    </Tabs>
  );
}
