import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";
import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>Accueil</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cours">
        <Icon sf={{ default: "book", selected: "book.fill" }} />
        <Label>Cours</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orientation">
        <Icon sf={{ default: "location", selected: "location.fill" }} />
        <Label>Orientation</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="infos">
        <Icon sf={{ default: "info.circle", selected: "info.circle.fill" }} />
        <Label>Infos</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
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
          fontSize: 11,
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

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
