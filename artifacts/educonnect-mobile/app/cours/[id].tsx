import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";
import { useLayoutEffect } from "react";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const course = courses.find((c) => c.id === id);
  const [activeChapterId, setActiveChapterId] = useState(course?.chapters[0]?.id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 16;

  useLayoutEffect(() => {
    if (course) {
      navigation.setOptions({ title: course.subject + " · " + course.level });
    }
  }, [course]);

  if (!course) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Cours introuvable</Text>
      </View>
    );
  }

  const activeChapter =
    course.chapters.find((c) => c.id === activeChapterId) || course.chapters[0];

  const handleAnswer = (eIdx: number, oIdx: number) => {
    if (submitted[activeChapter.id]) return;
    setAnswers({ ...answers, [`${activeChapter.id}-${eIdx}`]: oIdx });
  };

  const handleVerify = () => {
    setSubmitted({ ...submitted, [activeChapter.id]: true });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const openYouTube = () => {
    const q = activeChapter.youtubeSearch || course.title + " " + activeChapter.title;
    Linking.openURL(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);
  };

  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Course header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerTitle, { color: colors.primaryForeground }]} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={[styles.headerSub, { color: colors.primaryForeground + "CC" }]}>
          {course.chapters.length} chapitres · {course.duration}
        </Text>
      </View>

      {/* Chapter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.chapterTabs, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
        contentContainerStyle={styles.chapterTabsContent}
      >
        {course.chapters.map((ch, i) => {
          const active = activeChapterId === ch.id;
          return (
            <TouchableOpacity
              key={ch.id}
              onPress={() => {
                setActiveChapterId(ch.id);
                Haptics.selectionAsync();
              }}
              style={[
                styles.chapterTab,
                active && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
              ]}
            >
              <View style={[styles.chapterNum, { backgroundColor: active ? colors.primary : colors.muted }]}>
                <Text style={[styles.chapterNumText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>
                  {i + 1}
                </Text>
              </View>
              <Text style={[styles.chapterTabText, { color: active ? colors.primary : colors.mutedForeground }]} numberOfLines={1}>
                {ch.title.replace(/^Chapitre \d+ — /, "").replace(/^Chapitre \d+ : /, "")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Chapter title */}
        <Text style={[styles.chapterTitle, { color: colors.foreground }]}>
          {activeChapter.title}
        </Text>

        {/* Video CTA */}
        <TouchableOpacity
          style={[styles.videoCta, { backgroundColor: "#E03C31" }]}
          onPress={openYouTube}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-youtube" size={22} color="#fff" />
          <Text style={styles.videoCtaText}>Rechercher une vidéo sur YouTube</Text>
        </TouchableOpacity>

        {/* Summary */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text" size={18} color={colors.primary} />
            <Text style={[styles.cardHeaderText, { color: colors.primary }]}>Résumé de la leçon</Text>
          </View>
          <Text style={[styles.summaryText, { color: colors.foreground }]}>
            {activeChapter.summary}
          </Text>
        </View>

        {/* Exercises */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="create" size={18} color={colors.primary} />
            <Text style={[styles.cardHeaderText, { color: colors.primary }]}>Exercices</Text>
          </View>
          {activeChapter.exercises.map((ex, eIdx) => {
            const ansKey = `${activeChapter.id}-${eIdx}`;
            const selected = answers[ansKey];
            const isSubmitted = submitted[activeChapter.id];
            return (
              <View key={eIdx} style={[styles.exercise, eIdx > 0 && { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 }]}>
                <Text style={[styles.exQuestion, { color: colors.foreground }]}>
                  {eIdx + 1}. {ex.question}
                </Text>
                <View style={styles.options}>
                  {ex.options.map((opt, oIdx) => {
                    let bg = colors.muted;
                    let textColor = colors.foreground;
                    let border = colors.border;
                    let icon: keyof typeof Ionicons.glyphMap | null = null;

                    if (!isSubmitted && selected === oIdx) {
                      bg = colors.primary + "18";
                      border = colors.primary;
                      textColor = colors.primary;
                    } else if (isSubmitted) {
                      if (oIdx === ex.answer) {
                        bg = "#16A34A18";
                        border = "#16A34A";
                        textColor = "#166534";
                        icon = "checkmark-circle";
                      } else if (selected === oIdx) {
                        bg = "#DC262618";
                        border = "#DC2626";
                        textColor = "#991B1B";
                        icon = "close-circle";
                      } else {
                        bg = colors.muted;
                        textColor = colors.mutedForeground;
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={oIdx}
                        style={[styles.option, { backgroundColor: bg, borderColor: border }]}
                        onPress={() => handleAnswer(eIdx, oIdx)}
                        disabled={isSubmitted}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.optionLetter, { backgroundColor: colors.background }]}>
                          <Text style={[styles.optionLetterText, { color: colors.mutedForeground }]}>
                            {String.fromCharCode(65 + oIdx)}
                          </Text>
                        </View>
                        <Text style={[styles.optionText, { color: textColor, flex: 1 }]}>{opt}</Text>
                        {icon && <Ionicons name={icon} size={18} color={oIdx === ex.answer ? "#16A34A" : "#DC2626"} />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {isSubmitted && ex.explanation && (
                  <View style={[styles.explanation, { backgroundColor: selected === ex.answer ? "#DCFCE7" : "#FEE2E2", borderColor: selected === ex.answer ? "#86EFAC" : "#FCA5A5" }]}>
                    <Text style={{ fontSize: 13, fontFamily: "Inter_400Regular", color: selected === ex.answer ? "#166534" : "#991B1B", lineHeight: 18 }}>
                      {ex.explanation}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}

          {!submitted[activeChapter.id] &&
            Object.keys(answers).some((k) => k.startsWith(activeChapter.id)) && (
              <TouchableOpacity
                style={[styles.verifyBtn, { backgroundColor: colors.primary }]}
                onPress={handleVerify}
              >
                <Text style={[styles.verifyText, { color: colors.primaryForeground }]}>
                  Vérifier mes réponses
                </Text>
              </TouchableOpacity>
            )}

          {submitted[activeChapter.id] && (
            <View style={[styles.doneBox, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
              <Text style={[styles.doneText, { color: colors.foreground }]}>
                Chapitre terminé ! Passe au suivant.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, gap: 6 },
    headerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", lineHeight: 26 },
    headerSub: { fontSize: 13, fontFamily: "Inter_400Regular" },
    chapterTabs: { borderBottomWidth: 1, flexGrow: 0, maxHeight: 58 },
    chapterTabsContent: { paddingHorizontal: 12, gap: 4, alignItems: "center" },
    chapterTab: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 14,
      gap: 6,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    chapterNum: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
    chapterNumText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
    chapterTabText: { fontSize: 13, fontFamily: "Inter_500Medium", maxWidth: 120 },
    content: { padding: 16, gap: 14 },
    chapterTitle: { fontSize: 20, fontFamily: "Inter_700Bold", lineHeight: 26 },
    videoCta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      borderRadius: 12,
      gap: 8,
    },
    videoCtaText: { color: "#fff", fontSize: 15, fontFamily: "Inter_600SemiBold" },
    card: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
    cardHeaderText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
    summaryText: { fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 22 },
    exercise: { gap: 10 },
    exQuestion: { fontSize: 15, fontFamily: "Inter_500Medium", lineHeight: 20 },
    options: { gap: 8 },
    option: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, borderWidth: 1.5, gap: 10 },
    optionLetter: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    optionLetterText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
    optionText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 18 },
    explanation: { padding: 10, borderRadius: 8, borderWidth: 1 },
    verifyBtn: { padding: 14, borderRadius: 12, alignItems: "center", marginTop: 4 },
    verifyText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
    doneBox: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, borderWidth: 1, gap: 10 },
    doneText: { fontSize: 14, fontFamily: "Inter_500Medium", flex: 1 },
  });
