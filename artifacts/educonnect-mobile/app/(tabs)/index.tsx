import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";

const SUBJECTS = ["Tous", ...Array.from(new Set(courses.map((c) => c.subject)))];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("Tous");

  const filtered = courses.filter((c) => {
    const matchSubject = activeSubject === "Tous" || c.subject === activeSubject;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.level.toLowerCase().includes(q);
    return matchSubject && matchQuery;
  });

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;

  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      <StatusBar barStyle="light-content" />

      {/* Hero Header */}
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <View style={[styles.heroDot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.heroBadgeText, { color: colors.primaryForeground }]}>
            Éducation pour tous · Haïti
          </Text>
        </View>
        <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>
          EduConnect{"\n"}Haïti
        </Text>
        <Text style={[styles.heroSub, { color: colors.primaryForeground + "CC" }]}>
          {courses.length} cours · Gratuit · Hors-ligne
        </Text>
      </View>

      {/* Search + Filters */}
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.mutedForeground} />
        <TextInput
          style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          placeholder="Chercher un cours…"
          placeholderTextColor={colors.mutedForeground}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        )}
      </View>

      {/* Subject chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {SUBJECTS.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setActiveSubject(s)}
            style={[
              styles.chip,
              {
                backgroundColor: activeSubject === s ? colors.primary : colors.muted,
                borderColor: activeSubject === s ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: activeSubject === s ? colors.primaryForeground : colors.foreground },
              ]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Course list */}
      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="book-outline" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Aucun cours trouvé
            </Text>
          </View>
        ) : (
          filtered.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/cours/${course.id}`)}
              activeOpacity={0.75}
            >
              <View style={styles.cardTop}>
                <View style={[styles.subjectBadge, { backgroundColor: colors.primary + "18" }]}>
                  <Text style={[styles.subjectText, { color: colors.primary }]}>
                    {course.subject}
                  </Text>
                </View>
                <Text style={[styles.levelText, { color: colors.mutedForeground }]}>
                  {course.level}
                </Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.foreground }]} numberOfLines={2}>
                {course.title}
              </Text>
              <Text style={[styles.cardDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                {course.description}
              </Text>
              <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                <View style={styles.cardMeta}>
                  <Ionicons name="time-outline" size={13} color={colors.mutedForeground} />
                  <Text style={[styles.cardMetaText, { color: colors.mutedForeground }]}>
                    {course.duration}
                  </Text>
                </View>
                <View style={styles.cardMeta}>
                  <Ionicons name="book-outline" size={13} color={colors.mutedForeground} />
                  <Text style={[styles.cardMetaText, { color: colors.mutedForeground }]}>
                    {course.chapters.length} chapitres
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    hero: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 28,
      gap: 8,
    },
    heroBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
    heroDot: { width: 7, height: 7, borderRadius: 4 },
    heroBadgeText: { fontSize: 11, fontFamily: "Inter_500Medium", letterSpacing: 0.5 },
    heroTitle: { fontSize: 36, fontFamily: "Inter_700Bold", lineHeight: 40 },
    heroSub: { fontSize: 13, fontFamily: "Inter_400Regular" },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 4,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      gap: 8,
    },
    searchInput: { flex: 1, fontSize: 15, padding: 0 },
    chips: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
    chip: {
      paddingHorizontal: 14,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    chipText: { fontSize: 13, fontFamily: "Inter_500Medium", lineHeight: 16 },
    list: { paddingHorizontal: 16, paddingTop: 4, gap: 12 },
    empty: { alignItems: "center", paddingTop: 60, gap: 12 },
    emptyText: { fontSize: 15, fontFamily: "Inter_400Regular" },
    card: {
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
      padding: 16,
      gap: 8,
    },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    subjectBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    subjectText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
    levelText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    cardTitle: { fontSize: 17, fontFamily: "Inter_600SemiBold", lineHeight: 22 },
    cardDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 10,
      marginTop: 4,
      borderTopWidth: 1,
    },
    cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
    cardMetaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  });
