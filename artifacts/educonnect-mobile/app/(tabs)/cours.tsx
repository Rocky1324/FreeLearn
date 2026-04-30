import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

const LEVELS = ["Tous", ...Array.from(new Set(courses.map((c) => c.level)))];

export default function CoursScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { courseStats } = useProgress();
  const [activeLevel, setActiveLevel] = useState("Tous");

  const filtered = courses.filter(
    (c) => activeLevel === "Tous" || c.level === activeLevel,
  );

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;

  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerTitle, { color: colors.primaryForeground }]}>
          Catalogue de cours
        </Text>
        <Text style={[styles.headerSub, { color: colors.primaryForeground + "AA" }]}>
          {filtered.length} cours disponibles
        </Text>
      </View>

      {/* Level filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.levelRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
        contentContainerStyle={styles.levelContent}
      >
        {LEVELS.map((l) => (
          <TouchableOpacity
            key={l}
            onPress={() => setActiveLevel(l)}
            style={[
              styles.levelChip,
              {
                backgroundColor: activeLevel === l ? colors.primary : "transparent",
                borderBottomWidth: activeLevel === l ? 2 : 0,
                borderBottomColor: colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.levelText,
                { color: activeLevel === l ? colors.primary : colors.mutedForeground },
              ]}
            >
              {l}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Course list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        renderItem={({ item: course }) => {
          const stats = courseStats(course.chapters);
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/cours/${course.id}`)}
              activeOpacity={0.75}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardLeft}>
                  <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                    <Ionicons name="book" size={18} color={colors.primaryForeground} />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardTitle, { color: colors.foreground }]} numberOfLines={2}>
                      {course.title}
                    </Text>
                    <View style={styles.cardMeta}>
                      <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                        {course.subject}
                      </Text>
                      <Text style={[styles.metaDot, { color: colors.border }]}>·</Text>
                      <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                        {course.level}
                      </Text>
                      <Text style={[styles.metaDot, { color: colors.border }]}>·</Text>
                      <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                        {course.chapters.length} ch.
                      </Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.border} />
              </View>
              {stats.done > 0 && (
                <View style={styles.progressBox}>
                  <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
                    <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${stats.pct}%` }]} />
                  </View>
                  <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
                    {stats.done}/{stats.total} chapitres · {stats.pct}%
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="book-outline" size={36} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Aucun cours pour ce niveau
            </Text>
          </View>
        }
      />
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 20,
    },
    headerTitle: { fontSize: 26, fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 4 },
    levelRow: { borderBottomWidth: 1, maxHeight: 50 },
    levelContent: { paddingHorizontal: 12, gap: 4, alignItems: "center" },
    levelChip: { paddingHorizontal: 14, paddingVertical: 12 },
    levelText: { fontSize: 13, fontFamily: "Inter_500Medium" },
    list: { padding: 16, gap: 10 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 14,
      borderWidth: 1,
      gap: 12,
    },
    cardLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
    iconBox: {
      width: 42,
      height: 42,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    cardInfo: { flex: 1, gap: 4 },
    cardTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold", lineHeight: 20 },
    cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
    metaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
    metaDot: { fontSize: 12 },
    empty: { alignItems: "center", paddingTop: 60, gap: 10 },
    emptyText: { fontSize: 15, fontFamily: "Inter_400Regular" },
  });
