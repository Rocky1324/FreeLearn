import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  X,
  Check,
  ChevronRight,
  Trophy,
  RotateCcw,
  Filter,
  Calendar,
  ExternalLink,
  FileText,
  Layers,
  DownloadCloud,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  examPapers,
  examResources,
  upcomingExams,
  type ExamPaper,
  type ExamLevel,
  type ExamSubject,
  type ExamResource,
} from "@/data/annales";

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
        passed: false,
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center bg-white/15 rounded-xl px-4 py-3 min-w-[72px]">
      <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-primary-foreground/70 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ExamQuiz({ paper, onClose }: { paper: ExamPaper; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const q = paper.questions[current];
  const isLast = current === paper.questions.length - 1;
  const totalCorrect = submitted
    ? paper.questions.filter((q, i) => answers[i] === q.answer).length
    : 0;

  const handleAnswer = (idx: number) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [current]: idx }));
  };

  const handleNext = () => {
    if (!isLast) setCurrent((c) => c + 1);
    else setSubmitted(true);
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted) {
    const pct = Math.round((totalCorrect / paper.questions.length) * 100);
    return (
      <div className="text-center space-y-6 py-8">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl ${pct >= 60 ? "bg-green-100" : "bg-amber-100"}`}>
          {pct >= 60 ? "🎉" : "📚"}
        </div>
        <div>
          <p className="text-3xl font-bold font-serif">{totalCorrect}/{paper.questions.length}</p>
          <p className="text-muted-foreground mt-1">
            {pct >= 80 ? "Excellent ! Tu maîtrises ce sujet." : pct >= 60 ? "Bon travail. Quelques révisions s'imposent." : "Continue les révisions, tu vas y arriver !"}
          </p>
        </div>
        <div className="space-y-3 text-left">
          {paper.questions.map((qq, i) => {
            const correct = answers[i] === qq.answer;
            return (
              <div key={i} className={`rounded-xl p-4 border text-sm ${correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <p className="font-medium mb-1">{i + 1}. {qq.question}</p>
                <div className="flex items-start gap-2">
                  {correct ? <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
                  <div>
                    <p className={correct ? "text-green-800" : "text-red-800"}>
                      {correct ? "Bonne réponse" : `Ta réponse : ${answers[i] !== undefined ? qq.options[answers[i]] : "Non répondu"}`}
                    </p>
                    {!correct && <p className="text-green-800 mt-0.5">Réponse correcte : {qq.options[qq.answer]}</p>}
                    <p className="text-muted-foreground mt-1 italic">{qq.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 justify-center pt-4">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Recommencer
          </Button>
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {current + 1} / {paper.questions.length}</span>
        <span>{Math.round((current / paper.questions.length) * 100)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(current / paper.questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-muted/40 rounded-2xl p-6 md:p-8">
        <p className="text-xl font-semibold leading-relaxed text-center">{q.question}</p>
      </div>

      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const selected = answers[current] === idx;
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${
                selected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 bg-background">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
          Quitter
        </Button>
        <Button
          onClick={handleNext}
          disabled={answers[current] === undefined}
        >
          {isLast ? (
            <><Trophy className="w-4 h-4 mr-2" /> Voir les résultats</>
          ) : (
            <>Suivant <ChevronRight className="w-4 h-4 ml-1" /></>
          )}
        </Button>
      </div>
    </div>
  );
}

const resourceTypeConfig: Record<ExamResource["type"], { label: string; className: string }> = {
  "Épreuve officielle": {
    label: "✓ Épreuve officielle MENFP",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  "Modèle": {
    label: "◈ Sujet Modèle",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "Collection": {
    label: "⊞ Collection d'années",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

const subjectIcon: Record<string, string> = {
  "Mathématiques": "📐",
  "Français": "📖",
  "Sciences Sociales": "🌍",
  "Sciences Expérimentales": "🔬",
  "Anglais": "🇬🇧",
  "Créole": "🇭🇹",
  "Espagnol": "🌎",
  "Physique": "⚡",
  "Chimie": "🧪",
  "Philosophie": "🏛️",
  "SVT / Biologie": "🌿",
  "Histoire-Géographie": "🗺️",
  "Informatique": "💻",
  "Économie": "📊",
};

function OfflineDownload({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "cached">("idle");
  const proxyUrl = `/api/proxy-pdf?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      const handler = (event: MessageEvent) => {
        if (event.data.type === "CACHED_STATUS" && event.data.url === proxyUrl) {
          setStatus(event.data.cached ? "cached" : "idle");
        }
      };
      navigator.serviceWorker.addEventListener("message", handler);
      navigator.serviceWorker.controller.postMessage({ type: "CHECK_CACHED", url: proxyUrl });
      return () => navigator.serviceWorker.removeEventListener("message", handler);
    }
  }, [proxyUrl]);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "cached") return;

    setStatus("loading");
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CACHE_MEDIA",
        urls: [proxyUrl]
      });
      // On simule une fin de chargement (le SW confirmera via message)
      setTimeout(() => setStatus("cached"), 2000);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
        status === "cached"
          ? "bg-green-100 text-green-700"
          : "bg-primary/10 text-primary hover:bg-primary/20"
      }`}
    >
      {status === "loading" ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : status === "cached" ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <DownloadCloud className="w-3 h-3" />
      )}
      {status === "loading" ? "Calcul..." : status === "cached" ? "Dispo Hors-ligne" : "Sauvegarder"}
    </button>
  );
}

function ResourcesTab() {
  const [activeLevel, setActiveLevel] = useState<ExamLevel>("9ème AF");
  const [activeSubject, setActiveSubject] = useState<string>("Tous");

  const filtered = examResources.filter((r) => r.level === activeLevel);
  const subjects = Array.from(new Set(filtered.map((r) => r.subject)));
  const displayed =
    activeSubject === "Tous"
      ? filtered
      : filtered.filter((r) => r.subject === activeSubject);

  const grouped = subjects.reduce<Record<string, ExamResource[]>>((acc, sub) => {
    acc[sub] = displayed.filter((r) => r.subject === sub);
    return acc;
  }, {});

  return (
    <div>
      {/* Source credit */}
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8 text-sm">
        <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-blue-800">
          Ressources issues de{" "}
          <a
            href="https://www.examhaiti.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-blue-900"
          >
            examhaiti.com
          </a>
          . Chaque sujet s'ouvre dans un nouvel onglet sur le site source.
        </p>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["9ème AF", "NS4"] as ExamLevel[]).map((lv) => (
          <button
            key={lv}
            onClick={() => { setActiveLevel(lv); setActiveSubject("Tous"); }}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeLevel === lv
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {lv === "9ème AF" ? "9ème Année Fondamentale" : "Baccalauréat (NS4)"}
          </button>
        ))}
      </div>

      {/* Subject filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveSubject("Tous")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            activeSubject === "Tous"
              ? "bg-secondary text-secondary-foreground border-secondary"
              : "bg-card border-border text-muted-foreground hover:border-secondary/50"
          }`}
        >
          Toutes les matières
        </button>
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubject(sub)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeSubject === sub
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-card border-border text-muted-foreground hover:border-secondary/50"
            }`}
          >
            {subjectIcon[sub] ?? "📄"} {sub}
          </button>
        ))}
      </div>

      {/* Resources grouped by subject */}
      <div className="space-y-8">
        {subjects
          .filter((sub) => activeSubject === "Tous" || sub === activeSubject)
          .map((sub) => {
            const items = grouped[sub] ?? [];
            if (items.length === 0) return null;
            return (
              <div key={sub}>
                <h3 className="flex items-center gap-2 text-lg font-bold font-serif mb-4">
                  <span className="text-2xl">{subjectIcon[sub] ?? "📄"}</span>
                  {sub}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    ({items.length} sujet{items.length > 1 ? "s" : ""})
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((res) => {
                    const cfg = resourceTypeConfig[res.type];
                    return (
                      <div
                        key={res.id}
                        className="group bg-card border rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold border px-2.5 py-1 rounded-full ${cfg.className}`}>
                            {cfg.label}
                          </span>
                          {res.years && (
                            <span className="text-xs font-bold text-muted-foreground/60 font-mono shrink-0">
                              {res.years}
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-sm leading-snug">
                          {res.title}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto pt-2">
                          <a 
                            href={`/api/proxy-pdf?url=${encodeURIComponent(res.url)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Lire le PDF
                          </a>
                          <OfflineDownload url={res.url} title={res.title} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Count summary */}
      <p className="text-center text-sm text-muted-foreground mt-10">
        {displayed.length} sujet{displayed.length > 1 ? "s" : ""} disponible{displayed.length > 1 ? "s" : ""} pour {activeLevel === "9ème AF" ? "la 9ème AF" : "le Bac NS4"}
      </p>
    </div>
  );
}

export default function Annales() {
  const [selectedLevel, setSelectedLevel] = useState<ExamLevel | "Tous">("Tous");
  const [selectedSubject, setSelectedSubject] = useState<ExamSubject | "Tous">("Tous");
  const [activePaper, setActivePaper] = useState<ExamPaper | null>(null);
  const [activeExamIdx, setActiveExamIdx] = useState(0);
  const [mainTab, setMainTab] = useState<"quiz" | "epreuves">("quiz");

  const activeExam = upcomingExams[activeExamIdx];
  const countdown = useCountdown(activeExam.date);

  const subjects = Array.from(new Set(examPapers.map((p) => p.subject))) as ExamSubject[];
  const levels: ExamLevel[] = ["9ème AF", "NS4"];

  const filtered = examPapers.filter((p) => {
    if (selectedLevel !== "Tous" && p.level !== selectedLevel) return false;
    if (selectedSubject !== "Tous" && p.subject !== selectedSubject) return false;
    return true;
  });

  const subjectColors: Record<string, string> = {
    "Mathématiques": "bg-blue-100 text-blue-800",
    "Sciences Naturelles": "bg-green-100 text-green-800",
    "Sciences Sociales": "bg-amber-100 text-amber-800",
    "Sciences Expérimentales": "bg-emerald-100 text-emerald-800",
    "Français": "bg-purple-100 text-purple-800",
    "Histoire-Géographie": "bg-yellow-100 text-yellow-800",
    "Physique-Chimie": "bg-red-100 text-red-800",
    "Philosophie": "bg-indigo-100 text-indigo-800",
    "Anglais": "bg-teal-100 text-teal-800",
    "Créole": "bg-orange-100 text-orange-800",
  };

  return (
    <Layout>
      {/* Hero with countdown */}
      <div className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Examens Nationaux Haïti
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Annales & Préparation</h1>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Entraîne-toi sur les sujets des années précédentes et prépare-toi pour les examens d'État.
          </p>

          {/* Exam selector */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {upcomingExams.map((exam, i) => (
              <button
                key={exam.id}
                onClick={() => setActiveExamIdx(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeExamIdx === i
                    ? "bg-white text-primary"
                    : "bg-white/20 text-primary-foreground hover:bg-white/30"
                }`}
              >
                {exam.name}
              </button>
            ))}
          </div>

          {countdown.passed ? (
            <p className="text-primary-foreground/70 text-lg">Cet examen est terminé.</p>
          ) : (
            <div className="space-y-3">
              <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-widest">
                Compte à rebours — {activeExam.name}
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <CountdownBlock label="Jours" value={countdown.days} />
                <CountdownBlock label="Heures" value={countdown.hours} />
                <CountdownBlock label="Minutes" value={countdown.minutes} />
                <CountdownBlock label="Secondes" value={countdown.seconds} />
              </div>
              {activeExam.registrationDeadline && (
                <p className="text-primary-foreground/60 text-sm mt-4">
                  📋 Date limite d'inscription :{" "}
                  <strong className="text-primary-foreground/90">
                    {activeExam.registrationDeadline.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </p>
              )}
              {!activeExam.datesConfirmed && (
                <p className="text-amber-200 text-xs mt-3">
                  ⚠️ Dates indicatives — à confirmer sur le site officiel du MENFP
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Modal overlay */}
        {activePaper && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card border-b px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {activePaper.level} — {activePaper.year}
                  </p>
                  <h2 className="font-bold text-lg">{activePaper.subject}</h2>
                </div>
                <button
                  onClick={() => setActivePaper(null)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <ExamQuiz paper={activePaper} onClose={() => setActivePaper(null)} />
              </div>
            </div>
          </div>
        )}

        {/* Exam date info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="bg-card border rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold">{exam.name}</h3>
                  {!exam.datesConfirmed && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium border border-amber-200">
                      Date indicative
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{exam.description}</p>
                <p className="text-sm font-semibold text-primary mt-2">
                  📅{" "}
                  {exam.date.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-2xl mb-10 w-full max-w-md">
          <button
            onClick={() => setMainTab("quiz")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mainTab === "quiz"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Quiz & Entraînement
          </button>
          <button
            onClick={() => setMainTab("epreuves")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mainTab === "epreuves"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-4 h-4" />
            Épreuves Complètes
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 leading-none">
              {examResources.length}
            </span>
          </button>
        </div>

        {mainTab === "epreuves" ? (
          <ResourcesTab />
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground shrink-0">
                <Filter className="w-4 h-4" /> Filtrer :
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLevel("Tous")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selectedLevel === "Tous"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  Tous les niveaux
                </button>
                {levels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => setSelectedLevel(lv)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedLevel === lv
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject("Tous")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selectedSubject === "Tous"
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card border-border text-muted-foreground hover:border-secondary/50"
                  }`}
                >
                  Toutes les matières
                </button>
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedSubject === sub
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-card border-border text-muted-foreground hover:border-secondary/50"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Papers grid */}
            <h2 className="text-2xl font-bold font-serif mb-6">
              {filtered.length} sujet{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
            </h2>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Aucun sujet ne correspond à ces filtres.</p>
                <Button variant="ghost" onClick={() => { setSelectedLevel("Tous"); setSelectedSubject("Tous"); }} className="mt-4">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-card border rounded-2xl p-5 hover:shadow-md transition-all group cursor-pointer"
                    onClick={() => setActivePaper(paper)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                          {paper.level}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${subjectColors[paper.subject] || "bg-muted text-muted-foreground"}`}>
                          {paper.subject}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-muted-foreground/40 font-serif">{paper.year}</span>
                    </div>
                    <div className="mb-3">
                      {paper.source === "MENFP" ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                          ✓ Épreuve officielle MENFP
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground border border-border px-2 py-0.5 rounded-full font-medium">
                          Questions d'entraînement
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{paper.subject}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{paper.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4" />
                        {paper.questions.length} questions
                      </div>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        S'entraîner
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Tips section */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold font-serif mb-6 text-primary">Conseils de préparation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📅",
                title: "Planifie ton calendrier",
                text: "Commence la révision 3 mois à l'avance. Utilise le calendrier FreeLearn pour planifier 1–2h de révision par jour.",
              },
              {
                icon: "📝",
                title: "Fais les annales d'abord",
                text: "Les sujets se répètent souvent. En faisant les 3 dernières années, tu couvres 70% des questions probables.",
              },
              {
                icon: "💪",
                title: "Entraîne-toi sans filet",
                text: "Simule les conditions d'examen : chronomètre, sans aide. Identifie tes points faibles pour les travailler.",
              },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-4">
                <span className="text-3xl shrink-0">{tip.icon}</span>
                <div>
                  <h3 className="font-bold mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
