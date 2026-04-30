import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";
import { useEffect, useCallback } from "react";

type Session = { courseId: string; duration: number };
type CalendarData = { [dateKey: string]: Session[] };

const DAYS_SHORT = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DURATIONS = [15, 30, 45, 60, 90];

function dk(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const SUBJECT_COLORS: Record<string, string> = {
  Français: "#DBEAFE",
  Mathématiques: "#EDE9FE",
  "Sciences Naturelles": "#DCFCE7",
  Histoire: "#FEF3C7",
  Dissertation: "#FFE4E6",
};

export default function PlanningScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<CalendarData>({});
  const [addCourseIdx, setAddCourseIdx] = useState(0);
  const [addDuration, setAddDuration] = useState(30);

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;

  useEffect(() => {
    AsyncStorage.getItem("study-calendar").then((v) => v && setData(JSON.parse(v))).catch(() => {});
  }, []);

  const persist = useCallback((next: CalendarData) => {
    setData(next);
    AsyncStorage.setItem("study-calendar", JSON.stringify(next)).catch(() => {});
  }, []);

  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
    setSelected(null);
  };

  const addSession = () => {
    if (!selected) return;
    const course = courses[addCourseIdx];
    if (!course) return;
    const next = { ...data, [selected]: [...(data[selected] ?? []), { courseId: course.id, duration: addDuration }] };
    persist(next);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const removeSession = (key: string, idx: number) => {
    const sessions = [...(data[key] ?? [])];
    sessions.splice(idx, 1);
    const next = { ...data, [key]: sessions };
    persist(next);
  };

  const selectedSessions = selected ? (data[selected] ?? []) : [];
  const monthTotal = Object.entries(data)
    .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .reduce((acc, [, sessions]) => acc + sessions.reduce((a, s) => a + s.duration, 0), 0);

  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth} style={styles.navArrow}>
            <Ionicons name="chevron-back" size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.primaryForeground }]}>
            {MONTHS[month]} {year}
          </Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navArrow}>
            <Ionicons name="chevron-forward" size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerSub, { color: colors.primaryForeground + "AA" }]}>
          {monthTotal > 0 ? `${monthTotal} min planifiées ce mois` : "Planifie tes sessions d'étude"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPad }}>
        {/* Day labels */}
        <View style={styles.dayLabels}>
          {DAYS_SHORT.map((d, i) => (
            <View key={i} style={styles.dayLabelCell}>
              <Text style={[styles.dayLabelText, { color: colors.mutedForeground }]}>{d}</Text>
            </View>
          ))}
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {cells.map((day, i) => {
            if (!day) return <View key={i} style={styles.emptyCell} />;
            const key = dk(year, month, day);
            const sessions = data[key] ?? [];
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = selected === key;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dayCell,
                  { backgroundColor: isSelected ? colors.primary + "18" : colors.card, borderColor: isSelected ? colors.primary : colors.border },
                ]}
                onPress={() => {
                  setSelected(isSelected ? null : key);
                  Haptics.selectionAsync();
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.dayNumber, isToday && { backgroundColor: colors.primary }]}>
                  <Text style={[styles.dayNumberText, { color: isToday ? colors.primaryForeground : colors.foreground }]}>
                    {day}
                  </Text>
                </View>
                {sessions.slice(0, 2).map((s, si) => {
                  const c = courses.find((c) => c.id === s.courseId);
                  const bg = SUBJECT_COLORS[c?.subject ?? ""] ?? colors.primary + "20";
                  return (
                    <View key={si} style={[styles.sessionDot, { backgroundColor: bg }]}>
                      <Text style={styles.sessionDotText} numberOfLines={1}>{c?.subject?.[0] ?? "?"}</Text>
                    </View>
                  );
                })}
                {sessions.length > 2 && (
                  <Text style={[styles.moreText, { color: colors.mutedForeground }]}>+{sessions.length - 2}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected day panel */}
        {selected && (
          <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.panelTitle, { color: colors.foreground }]}>
              {new Date(selected + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </Text>

            {/* Sessions */}
            {selectedSessions.length > 0 && (
              <View style={{ gap: 8, marginBottom: 12 }}>
                {selectedSessions.map((s, idx) => {
                  const c = courses.find((c) => c.id === s.courseId);
                  const bg = SUBJECT_COLORS[c?.subject ?? ""] ?? colors.muted;
                  return (
                    <View key={idx} style={[styles.sessionRow, { backgroundColor: bg }]}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.sessionCourse} numberOfLines={1}>{c?.title ?? "Cours"}</Text>
                        <Text style={styles.sessionDuration}>{s.duration} min</Text>
                      </View>
                      <TouchableOpacity onPress={() => removeSession(selected, idx)}>
                        <Ionicons name="close-circle" size={20} color="#555" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Add form */}
            <Text style={[styles.formLabel, { color: colors.mutedForeground }]}>Cours</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {courses.map((c, i) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setAddCourseIdx(i)}
                    style={[styles.courseChip, {
                      backgroundColor: addCourseIdx === i ? colors.primary : colors.muted,
                      borderColor: addCourseIdx === i ? colors.primary : colors.border,
                    }]}
                  >
                    <Text style={[styles.courseChipText, { color: addCourseIdx === i ? colors.primaryForeground : colors.foreground }]}>
                      {c.subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={[styles.formLabel, { color: colors.mutedForeground }]}>Durée</Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              {DURATIONS.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => setAddDuration(d)}
                  style={[styles.durationChip, {
                    backgroundColor: addDuration === d ? colors.primary : colors.muted,
                    borderColor: addDuration === d ? colors.primary : colors.border,
                  }]}
                >
                  <Text style={[styles.durationChipText, { color: addDuration === d ? colors.primaryForeground : colors.foreground }]}>
                    {d}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={addSession}>
              <Ionicons name="add" size={18} color={colors.primaryForeground} />
              <Text style={[styles.addBtnText, { color: colors.primaryForeground }]}>Ajouter une session</Text>
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
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, gap: 6 },
    monthNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    navArrow: { padding: 4 },
    monthTitle: { fontSize: 20, fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, fontFamily: "Inter_400Regular" },
    dayLabels: { flexDirection: "row", paddingHorizontal: 8, paddingVertical: 6 },
    dayLabelCell: { flex: 1, alignItems: "center" },
    dayLabelText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
    grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 8, gap: 4 },
    emptyCell: { width: "13%", aspectRatio: 0.85 },
    dayCell: {
      width: "13%",
      aspectRatio: 0.85,
      borderRadius: 10,
      borderWidth: 1,
      padding: 4,
      alignItems: "center",
      gap: 2,
    },
    dayNumber: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    dayNumberText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
    sessionDot: { width: "90%", borderRadius: 3, paddingHorizontal: 2, height: 12, alignItems: "center", justifyContent: "center" },
    sessionDotText: { fontSize: 9, fontFamily: "Inter_700Bold", color: "#333" },
    moreText: { fontSize: 9, fontFamily: "Inter_400Regular" },
    panel: { margin: 12, borderRadius: 16, borderWidth: 1, padding: 16, gap: 6 },
    panelTitle: { fontSize: 16, fontFamily: "Inter_600SemiBold", marginBottom: 8 },
    sessionRow: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 10, gap: 8 },
    sessionCourse: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "#333" },
    sessionDuration: { fontSize: 11, fontFamily: "Inter_400Regular", color: "#555" },
    formLabel: { fontSize: 11, fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4, marginBottom: 6 },
    courseChip: { paddingHorizontal: 12, height: 32, borderRadius: 16, borderWidth: 1, alignItems: "center", justifyContent: "center" },
    courseChipText: { fontSize: 12, fontFamily: "Inter_500Medium" },
    durationChip: { paddingHorizontal: 12, height: 32, borderRadius: 16, borderWidth: 1, alignItems: "center", justifyContent: "center" },
    durationChipText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
    addBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 12, borderRadius: 12, gap: 6 },
    addBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  });
