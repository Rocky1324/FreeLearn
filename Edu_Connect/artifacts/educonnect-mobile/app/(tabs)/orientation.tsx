import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

type Question = {
  question: string;
  options: { label: string; domains: string[] }[];
};

const QUESTIONS: Question[] = [
  {
    question: "Quelle matière préfères-tu à l'école ?",
    options: [
      { label: "Mathématiques / Physique", domains: ["Sciences", "Ingénierie", "Informatique"] },
      { label: "Français / Littérature", domains: ["Lettres", "Journalisme", "Droit"] },
      { label: "Sciences Naturelles / Biologie", domains: ["Médecine", "Agriculture", "Environnement"] },
      { label: "Histoire / Géographie", domains: ["Droit", "Diplomatie", "Enseignement"] },
    ],
  },
  {
    question: "Quel type d'activité t'attire le plus ?",
    options: [
      { label: "Résoudre des problèmes logiques", domains: ["Ingénierie", "Informatique", "Sciences"] },
      { label: "Créer et écrire", domains: ["Lettres", "Communication", "Journalisme"] },
      { label: "Aider et soigner les autres", domains: ["Médecine", "Infirmier", "Psychologie"] },
      { label: "Organiser et gérer", domains: ["Droit", "Gestion", "Commerce"] },
    ],
  },
  {
    question: "Dans quelle ambiance aimes-tu travailler ?",
    options: [
      { label: "Seul(e), en silence", domains: ["Informatique", "Recherche", "Lettres"] },
      { label: "Avec une équipe soudée", domains: ["Médecine", "Agriculture", "Ingénierie"] },
      { label: "En contact avec des gens", domains: ["Commerce", "Journalisme", "Enseignement"] },
      { label: "En plein air / sur le terrain", domains: ["Agriculture", "Environnement", "Géographie"] },
    ],
  },
  {
    question: "Comment vois-tu ton futur professionnel ?",
    options: [
      { label: "Entreprendre / créer ma propre activité", domains: ["Commerce", "Gestion", "Informatique"] },
      { label: "Exercer une profession reconnue", domains: ["Médecine", "Droit", "Ingénierie"] },
      { label: "Servir l'État ou la communauté", domains: ["Diplomatie", "Enseignement", "Droit"] },
      { label: "Travailler à l'international", domains: ["Diplomatie", "Commerce", "Informatique"] },
    ],
  },
];

const DOMAIN_INFO: Record<string, { desc: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Sciences: { desc: "Physique, chimie, mathématiques appliquées.", icon: "flask" },
  Ingénierie: { desc: "Construction, génie civil, mécanique.", icon: "construct" },
  Informatique: { desc: "Développement, cybersécurité, systèmes.", icon: "laptop" },
  Lettres: { desc: "Littérature, linguistique, traduction.", icon: "library" },
  Journalisme: { desc: "Presse, médias, communication.", icon: "newspaper" },
  Droit: { desc: "Avocat, notaire, magistrat, diplomate.", icon: "briefcase" },
  Médecine: { desc: "Médecin, chirurgien, pharmacien.", icon: "medical" },
  Agriculture: { desc: "Agronomie, élevage, développement rural.", icon: "leaf" },
  Environnement: { desc: "Écologie, ressources naturelles, climat.", icon: "earth" },
  Diplomatie: { desc: "Relations internationales, ONG.", icon: "globe" },
  Enseignement: { desc: "Professeur, formateur, éducateur.", icon: "school" },
  Commerce: { desc: "Marketing, vente, entrepreneuriat.", icon: "cart" },
  Gestion: { desc: "Management, comptabilité, RH.", icon: "stats-chart" },
  Communication: { desc: "Pub, relations publiques, digital.", icon: "chatbubbles" },
  Psychologie: { desc: "Santé mentale, thérapie, conseil.", icon: "heart" },
  Infirmier: { desc: "Soins infirmiers, santé communautaire.", icon: "bandage" },
  Recherche: { desc: "Laboratoire, académie, publication.", icon: "search" },
  Géographie: { desc: "Cartographie, urbanisme, aménagement.", icon: "map" },
};

export default function OrientationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [domainScores, setDomainScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 50;

  const handleAnswer = (domains: string[]) => {
    Haptics.selectionAsync();
    const updated = { ...domainScores };
    domains.forEach((d) => {
      updated[d] = (updated[d] || 0) + 1;
    });
    setDomainScores(updated);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setDomainScores({});
    setDone(false);
  };

  const topDomains = Object.entries(domainScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([domain]) => domain);

  const styles = makeStyles(colors);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: topInset }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.secondary }]}>
        <Ionicons name="compass" size={28} color={colors.secondaryForeground} />
        <Text style={[styles.headerTitle, { color: colors.secondaryForeground }]}>
          Test d'Orientation
        </Text>
        <Text style={[styles.headerSub, { color: colors.secondaryForeground + "CC" }]}>
          4 questions pour découvrir ta voie
        </Text>
      </View>

      <View style={styles.content}>
        {!done ? (
          <>
            {/* Progress */}
            <View style={styles.progressRow}>
              <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
                Question {step + 1} / {QUESTIONS.length}
              </Text>
              <View style={[styles.progressBar, { backgroundColor: colors.muted }]}>
                <View
                  style={[
                    styles.progressFill,
                    { backgroundColor: colors.secondary, width: `${((step + 1) / QUESTIONS.length) * 100}%` as any },
                  ]}
                />
              </View>
            </View>

            {/* Question */}
            <Text style={[styles.question, { color: colors.foreground }]}>
              {QUESTIONS[step].question}
            </Text>

            {/* Options */}
            <View style={styles.options}>
              {QUESTIONS[step].options.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleAnswer(opt.domains)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionLetter, { backgroundColor: colors.muted }]}>
                    <Text style={[styles.optionLetterText, { color: colors.mutedForeground }]}>
                      {String.fromCharCode(65 + i)}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, { color: colors.foreground }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Results */}
            <View style={styles.resultHeader}>
              <Ionicons name="checkmark-circle" size={40} color={colors.secondary} />
              <Text style={[styles.resultTitle, { color: colors.foreground }]}>
                Tes domaines recommandés
              </Text>
              <Text style={[styles.resultSub, { color: colors.mutedForeground }]}>
                Basé sur tes réponses, voici les filières qui pourraient te correspondre.
              </Text>
            </View>

            <View style={styles.results}>
              {topDomains.map((domain, i) => {
                const info = DOMAIN_INFO[domain] || { desc: "Secteur prometteur.", icon: "star" as keyof typeof Ionicons.glyphMap };
                return (
                  <View
                    key={domain}
                    style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  >
                    <View style={[styles.resultIconBox, { backgroundColor: i === 0 ? colors.secondary : colors.primary }]}>
                      <Ionicons name={info.icon} size={20} color="#fff" />
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={[styles.resultDomain, { color: colors.foreground }]}>
                        {domain}
                        {i === 0 && (
                          <Text style={{ color: colors.secondary }}> ★</Text>
                        )}
                      </Text>
                      <Text style={[styles.resultDesc, { color: colors.mutedForeground }]}>
                        {info.desc}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.resetBtn, { backgroundColor: colors.primary }]}
              onPress={reset}
            >
              <Ionicons name="refresh" size={18} color={colors.primaryForeground} />
              <Text style={[styles.resetText, { color: colors.primaryForeground }]}>
                Recommencer le test
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const makeStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 28,
      gap: 8,
      alignItems: "center",
    },
    headerTitle: { fontSize: 24, fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center" },
    content: { padding: 20, gap: 20 },
    progressRow: { gap: 6 },
    progressText: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "right" },
    progressBar: { height: 4, borderRadius: 2, overflow: "hidden" },
    progressFill: { height: 4, borderRadius: 2 },
    question: { fontSize: 20, fontFamily: "Inter_600SemiBold", lineHeight: 28 },
    options: { gap: 10 },
    option: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
    },
    optionLetter: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
    },
    optionLetterText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
    optionText: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 20 },
    resultHeader: { alignItems: "center", gap: 10 },
    resultTitle: { fontSize: 22, fontFamily: "Inter_700Bold", textAlign: "center" },
    resultSub: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center" },
    results: { gap: 10 },
    resultCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
    },
    resultIconBox: {
      width: 42,
      height: 42,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    resultInfo: { flex: 1, gap: 3 },
    resultDomain: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
    resultDesc: { fontSize: 13, fontFamily: "Inter_400Regular" },
    resetBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      borderRadius: 12,
      gap: 8,
      marginTop: 8,
    },
    resetText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  });
