import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";

type Flashcard = { front: string; back: string; explanation?: string };

function buildAllDecks(courseId: string): { chapterTitle: string; cards: Flashcard[] }[] {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];
  return course.chapters.map((ch) => ({
    chapterTitle: ch.title,
    cards: [
      { front: `Résumé : ${ch.title}`, back: ch.summary },
      ...ch.exercises.map((ex) => ({
        front: ex.question,
        back: ex.options[ex.answer],
        explanation: ex.explanation,
      })),
    ],
  }));
}

function FlipCardView({ card, colors }: { card: Flashcard; colors: ReturnType<typeof useColors> }) {
  const [flipped, setFlipped] = useState(false);
  const anim = React.useRef(new Animated.Value(0)).current;

  const flip = () => {
    Haptics.selectionAsync();
    Animated.spring(anim, {
      toValue: flipped ? 0 : 1,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
    setFlipped(!flipped);
  };

  const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  const backRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });

  const styles = StyleSheet.create({
    container: { height: 240, width: "100%" },
    face: {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      backfaceVisibility: "hidden",
    },
    front: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
    back: { backgroundColor: colors.primary },
    label: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 },
    mainText: { fontSize: 18, fontFamily: "Inter_600SemiBold", textAlign: "center", lineHeight: 24 },
    subText: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 10, lineHeight: 18, opacity: 0.8 },
    hint: { position: "absolute", bottom: 14, fontSize: 11, fontFamily: "Inter_400Regular", opacity: 0.5 },
  });

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={flip} style={styles.container}>
      <Animated.View style={[styles.face, styles.front, { transform: [{ rotateY: frontRotate }] }]}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>Question</Text>
        <Text style={[styles.mainText, { color: colors.foreground }]}>{card.front}</Text>
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>Appuyer pour voir la réponse</Text>
      </Animated.View>
      <Animated.View style={[styles.face, styles.back, { transform: [{ rotateY: backRotate }] }]}>
        <Text style={[styles.label, { color: colors.primaryForeground + "AA" }]}>Réponse</Text>
        <Text style={[styles.mainText, { color: colors.primaryForeground }]}>{card.back}</Text>
        {card.explanation && (
          <Text style={[styles.subText, { color: colors.primaryForeground }]}>{card.explanation}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function FichesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [deckIdx, setDeckIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;
  const styles = makeStyles(colors);

  if (!selectedCourseId) {
    return (
      <View style={[styles.container, { paddingTop: topInset }]}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={[styles.headerTitle, { color: colors.primaryForeground }]}>Fiches de révision</Text>
          <Text style={[styles.headerSub, { color: colors.primaryForeground + "AA" }]}>Choisissez un cours</Text>
        </View>
        <ScrollView contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}>
          {courses.map((c) => {
            const totalCards = c.chapters.reduce((a, ch) => a + ch.exercises.length + 1, 0);
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => {
                  setSelectedCourseId(c.id);
                  setDeckIdx(0);
                  setCardIdx(0);
                  Haptics.selectionAsync();
                }}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                  <Ionicons name="layers" size={20} color={colors.primaryForeground} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.courseTitle, { color: colors.foreground }]} numberOfLines={2}>{c.title}</Text>
                  <Text style={[styles.courseMeta, { color: colors.mutedForeground }]}>
                    {c.subject} · {c.level} · {totalCards} cartes
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.border} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  const decks = buildAllDecks(selectedCourseId);
  const deck = decks[deckIdx];
  const card = deck?.cards[cardIdx];
  const isFirst = deckIdx === 0 && cardIdx === 0;
  const isLast = deckIdx === decks.length - 1 && cardIdx === (deck?.cards.length ?? 1) - 1;

  const goNext = () => {
    if (cardIdx < (deck?.cards.length ?? 1) - 1) setCardIdx((i) => i + 1);
    else if (deckIdx < decks.length - 1) { setDeckIdx((i) => i + 1); setCardIdx(0); }
  };
  const goPrev = () => {
    if (cardIdx > 0) setCardIdx((i) => i - 1);
    else if (deckIdx > 0) { setDeckIdx((i) => i - 1); setCardIdx(decks[deckIdx - 1].cards.length - 1); }
  };

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      {/* Back + chapter tabs */}
      <View style={[styles.topBar, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => setSelectedCourseId(null)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.primaryForeground} />
          <Text style={[styles.backText, { color: colors.primaryForeground }]}>Cours</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckTabs}>
          {decks.map((d, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => { setDeckIdx(i); setCardIdx(0); Haptics.selectionAsync(); }}
              style={[styles.deckTab, { backgroundColor: deckIdx === i ? "rgba(255,255,255,0.25)" : "transparent" }]}
            >
              <Text style={[styles.deckTabText, { color: colors.primaryForeground }]}>Ch. {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={[styles.cardArea, { paddingBottom: bottomPad }]}>
        <Text style={[styles.deckTitle, { color: colors.foreground }]}>{deck?.chapterTitle}</Text>
        <Text style={[styles.cardCount, { color: colors.mutedForeground }]}>
          {cardIdx + 1} / {deck?.cards.length}
        </Text>

        {card && <FlipCardView card={card} colors={colors} />}

        {/* Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: colors.muted, opacity: isFirst ? 0.4 : 1 }]}
            onPress={goPrev}
            disabled={isFirst}
          >
            <Ionicons name="arrow-back" size={18} color={colors.foreground} />
            <Text style={[styles.navBtnText, { color: colors.foreground }]}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: isLast ? colors.muted : colors.primary, opacity: isLast ? 0.4 : 1 }]}
            onPress={goNext}
            disabled={isLast}
          >
            <Text style={[styles.navBtnText, { color: isLast ? colors.foreground : colors.primaryForeground }]}>Suivant</Text>
            <Ionicons name="arrow-forward" size={18} color={isLast ? colors.foreground : colors.primaryForeground} />
          </TouchableOpacity>
        </View>

        {isLast && (
          <View style={[styles.doneBox, { backgroundColor: colors.muted, borderColor: colors.border }]}>
            <Ionicons name="checkmark-circle" size={28} color="#16A34A" />
            <Text style={[styles.doneText, { color: colors.foreground }]}>Toutes les fiches terminées !</Text>
            <TouchableOpacity
              style={[styles.restartBtn, { backgroundColor: colors.primary }]}
              onPress={() => { setDeckIdx(0); setCardIdx(0); }}
            >
              <Text style={[styles.restartText, { color: colors.primaryForeground }]}>Recommencer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, gap: 4 },
    headerTitle: { fontSize: 26, fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 13, fontFamily: "Inter_400Regular" },
    list: { padding: 16, gap: 10 },
    courseCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
    iconBox: { width: 42, height: 42, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    courseTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold", lineHeight: 20 },
    courseMeta: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
    topBar: { paddingVertical: 10, paddingHorizontal: 16, gap: 10 },
    backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
    backText: { fontSize: 14, fontFamily: "Inter_500Medium" },
    deckTabs: { flexDirection: "row", gap: 6, paddingBottom: 4 },
    deckTab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
    deckTabText: { fontSize: 13, fontFamily: "Inter_500Medium" },
    cardArea: { padding: 20, gap: 16 },
    deckTitle: { fontSize: 17, fontFamily: "Inter_600SemiBold", lineHeight: 22 },
    cardCount: { fontSize: 12, fontFamily: "Inter_400Regular" },
    navRow: { flexDirection: "row", gap: 12, marginTop: 8 },
    navBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 14, borderRadius: 12, gap: 6 },
    navBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
    doneBox: { alignItems: "center", padding: 24, borderRadius: 16, borderWidth: 1, gap: 10, marginTop: 8 },
    doneText: { fontSize: 16, fontFamily: "Inter_600SemiBold", textAlign: "center" },
    restartBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
    restartText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  });
