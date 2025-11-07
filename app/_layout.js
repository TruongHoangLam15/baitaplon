import React from "react";
import { Stack } from "expo-router";
import { PlayerProvider } from "../context/PlayerContext";

export default function RootLayout() {
  return (
    <PlayerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Màn hình khởi động, đăng nhập, đăng ký */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />

        {/* Nhóm màn hình có TabBar */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Các màn hình toàn màn hình (ẩn tab bar) */}
        <Stack.Screen name="player" />
        <Stack.Screen name="artist" />
        <Stack.Screen name="playlist" />
        <Stack.Screen name="settings" />
      </Stack>
    </PlayerProvider>
  );
}
