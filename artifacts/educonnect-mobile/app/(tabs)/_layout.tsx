import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 10,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="house.fill" tintColor={color} size={size} />
            ) : (
              <Ionicons name="home" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="cours"
        options={{
          title: "Cours",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="book.fill" tintColor={color} size={size} />
            ) : (
              <Ionicons name="book" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="fiches"
        options={{
          title: "Fiches",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="rectangle.on.rectangle" tintColor={color} size={size} />
            ) : (
              <Ionicons name="layers" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: "Planning",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="calendar" tintColor={color} size={size} />
            ) : (
              <Ionicons name="calendar" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="orientation"
        options={{
          title: "Orientation",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="location.fill" tintColor={color} size={size} />
            ) : (
              <Ionicons name="compass" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="infos"
        options={{
          title: "Infos",
          tabBarIcon: ({ color, size }) =>
            isIOS ? (
              <SymbolView name="info.circle.fill" tintColor={color} size={size} />
            ) : (
              <Ionicons name="information-circle" size={size} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
