import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { courses } from "@/data/courses";

type InfoRow = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
};

export default function InfosScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;

  const stats = [
    { label: "Cours", value: courses.length.toString(), icon: "book" as keyof typeof Ionicons.glyphMap },
    { label: "Chapitres", value: courses.reduce((a, c) => a + c.chapters.length, 0).toString(), icon: "layers" as keyof typeof Ionicons.glyphMap },
    { label: "Niveaux", value: new Set(courses.map((c) => c.level)).size.toString(), icon: "school" as keyof typeof Ionicons.glyphMap },
    { label: "Prix", value: "Gratuit", icon: "heart" as keyof typeof Ionicons.glyphMap },
  ];

  const rows: InfoRow[] = [
    { icon: "globe-outline", label: "Site web", value: "educonnect-haiti.replit.app", onPress: () => Linking.openURL("https://d68fbd84-7d9a-48e1-a5bd-47ec8a437cae-00-1k6qki7ihlyir.kirk.replit.dev") },
    { icon: "mail-outline", label: "Contact", value: "contact@educonnect.ht" },
    { icon: "location-outline", label: "Zones desservies", value: "Cité Soleil · Bel-Air · Martissant · Plateau Central" },
    { icon: "shield-checkmark-outline", label: "Version", value: "1.0.0" },
  ];

  const styles = makeStyles(colors);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: topInset }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={[styles.logoBox, { backgroundColor: colors.primaryForeground + "20" }]}>
          <Ionicons name="book" size={36} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.heroName, { color: colors.primaryForeground }]}>
          EduConnect Haïti
        </Text>
        <Text style={[styles.heroTagline, { color: colors.primaryForeground + "BB" }]}>
          Donner à chaque jeune haïtien les mêmes chances de réussir
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name={s.icon} size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.foreground }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Notre mission</Text>
        <View style={[styles.missionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.missionText, { color: colors.mutedForeground }]}>
            EduConnect Haïti est une plateforme éducative gratuite, conçue pour les élèves de la 1ère AF jusqu'en Philo. Elle fonctionne hors-ligne pour être accessible même dans les zones sans connexion internet stable.
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.missionText, { color: colors.mutedForeground }]}>
            Les cours suivent le programme du Ministère de l'Éducation Nationale d'Haïti et sont enrichis de vidéos, résumés, exemples et exercices corrigés.
          </Text>
        </View>
      </View>

      {/* Zones */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Zones prioritaires</Text>
        {["Cité Soleil", "Bel-Air", "Martissant", "Plateau Central"].map((zone) => (
          <View key={zone} style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="location" size={18} color={colors.secondary} />
            <Text style={[styles.rowText, { color: colors.foreground }]}>{zone}</Text>
          </View>
        ))}
      </View>

      {/* Infos */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Informations</Text>
        {rows.map((r) => (
          <TouchableOpacity
            key={r.label}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={r.onPress}
            disabled={!r.onPress}
            activeOpacity={r.onPress ? 0.7 : 1}
          >
            <Ionicons name={r.icon} size={18} color={colors.primary} />
            <View style={styles.rowContent}>
              <Text style={[styles.rowLabel, { color: colors.mutedForeground }]}>{r.label}</Text>
              <Text style={[styles.rowText, { color: colors.foreground }]}>{r.value}</Text>
            </View>
            {r.onPress && <Ionicons name="open-outline" size={14} color={colors.mutedForeground} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Flag colors */}
      <View style={styles.flagRow}>
        <View style={[styles.flagBlue, { backgroundColor: colors.primary }]} />
        <View style={[styles.flagRed, { backgroundColor: colors.secondary }]} />
      </View>
      <Text style={[styles.copyright, { color: colors.mutedForeground }]}>
        © {new Date().getFullYear()} EduConnect Haïti · Fièrement pour la jeunesse
      </Text>
    </ScrollView>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    hero: {
      paddingTop: 24,
      paddingBottom: 32,
      paddingHorizontal: 20,
      alignItems: "center",
      gap: 10,
    },
    logoBox: {
      width: 72,
      height: 72,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    heroName: { fontSize: 26, fontFamily: "Inter_700Bold" },
    heroTagline: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 18 },
    statsRow: {
      flexDirection: "row",
      padding: 16,
      gap: 10,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      gap: 4,
    },
    statValue: { fontSize: 18, fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 10, fontFamily: "Inter_500Medium", textAlign: "center" },
    section: { paddingHorizontal: 16, marginBottom: 16, gap: 8 },
    sectionTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
    missionCard: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
    },
    missionText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20 },
    divider: { height: 1 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
    },
    rowContent: { flex: 1 },
    rowLabel: { fontSize: 11, fontFamily: "Inter_400Regular" },
    rowText: { fontSize: 14, fontFamily: "Inter_500Medium" },
    flagRow: { flexDirection: "row", marginHorizontal: 16, borderRadius: 6, overflow: "hidden", height: 6, marginBottom: 8 },
    flagBlue: { flex: 1 },
    flagRed: { flex: 1 },
    copyright: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", paddingBottom: 16 },
  });
