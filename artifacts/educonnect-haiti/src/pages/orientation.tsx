import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { quizQuestions, careerPaths } from "@/data/quiz";
import { careers, sectorColors, demandColors, type CareerSector } from "@/data/careers";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  CheckCircle2,
  Compass,
  ArrowRight,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

type Tab = "quiz" | "metiers";

function CareerCard({ career }: { career: typeof careers[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{career.emoji}</span>
            <div>
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${sectorColors[career.sector]}`}>
                {career.sector}
              </span>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${demandColors[career.demand]}`}>
            {career.demand}
          </span>
        </div>

        <h3 className="font-bold text-lg font-serif mb-1">{career.title}</h3>
        <p className="text-sm text-muted-foreground italic mb-3">{career.tagline}</p>
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{career.description}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Salaire estimé</p>
            <p className="text-sm font-bold text-primary">{career.salaryRange}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Moins" : "Plus d'infos"}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t bg-muted/30 p-5 space-y-4">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground mb-0.5">Où étudier en Haïti</p>
              <p className="text-sm">{career.studies}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Durée : {career.duration}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground mb-0.5">Perspectives</p>
              <p className="text-sm">{career.outlook}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Qui recrute en Haïti</p>
              <div className="flex flex-wrap gap-1.5">
                {career.employers.map((emp) => (
                  <span key={emp} className="text-xs bg-background border rounded-full px-2.5 py-1">{emp}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Compétences clés</p>
              <div className="flex flex-wrap gap-1.5">
                {career.skills.map((sk) => (
                  <span key={sk} className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-1">{sk}</span>
                ))}
              </div>
            </div>
          </div>

          <Link href="/cours">
            <Button variant="outline" size="sm" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Voir les cours préparatoires <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Orientation() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("quiz");
  const [savedResult, setSavedResult] = useLocalStorage<any>("orientation-result", null);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<CareerSector | "Tous">("Tous");

  const sectors = Array.from(new Set(careers.map((c) => c.sector))) as CareerSector[];

  const filteredCareers = careers.filter((c) => {
    const matchesSector = selectedSector === "Tous" || c.sector === selectedSector;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const startQuiz = () => {
    setStarted(true);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = { ...answers, [currentStep]: optionIdx };
    setAnswers(newAnswers);
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<number, number>) => {
    setIsCalculating(true);
    const scores: Record<string, number> = {};
    Object.entries(finalAnswers).forEach(([qIdxStr, oIdx]) => {
      const qIdx = parseInt(qIdxStr);
      const families = quizQuestions[qIdx].options[oIdx].families;
      families.forEach((f) => { scores[f] = (scores[f] || 0) + 1; });
    });
    const topFamilies = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((entry) => entry[0]);
    const resultPaths = careerPaths.filter((cp) => topFamilies.includes(cp.family));
    setTimeout(() => { setSavedResult(resultPaths); setIsCalculating(false); }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <Compass className="w-14 h-14 mx-auto mb-5 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">{t.orientation.heroTitle}</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8">{t.orientation.heroSubtitle}</p>

          {/* Tabs */}
          <div className="inline-flex bg-white/15 rounded-2xl p-1.5 gap-1">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "quiz"
                  ? "bg-white text-primary shadow"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              <Compass className="w-4 h-4 inline mr-2 -mt-0.5" />
              Test d'orientation
            </button>
            <button
              onClick={() => setActiveTab("metiers")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "metiers"
                  ? "bg-white text-primary shadow"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2 -mt-0.5" />
              Répertoire des métiers
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Répertoire des métiers */}
      {activeTab === "metiers" && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un métier (ex: santé, informatique...)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
              </div>
              <button
                onClick={() => setSelectedSector("Tous")}
                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedSector === "Tous"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                Tous
              </button>
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSector(s)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedSector === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {filteredCareers.length} métier{filteredCareers.length > 1 ? "s" : ""} en Haïti
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCareers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">Aucun métier ne correspond.</p>
              <Button variant="ghost" onClick={() => { setSearchQuery(""); setSelectedSector("Tous"); }} className="mt-4">
                Réinitialiser
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Quiz */}
      {activeTab === "quiz" && (
        <>
          {savedResult && !started ? (
            <div className="container mx-auto px-4 py-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-serif">{t.orientation.profileTitle}</h2>
                <Button onClick={startQuiz} variant="outline">
                  {t.orientation.retakeTest}
                </Button>
              </div>
              <p className="text-muted-foreground mb-8">{t.orientation.profileSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {savedResult.map((path: any, idx: number) => (
                  <div key={idx} className="bg-card border rounded-2xl p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <span className="text-8xl font-serif font-black">{idx + 1}</span>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                        {path.family}
                      </span>
                      <h3 className="text-2xl font-bold font-serif mb-4 text-foreground">{path.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-4">{path.description}</p>
                      <div className="space-y-4 pt-6 border-t">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">{t.orientation.studyIn}</h4>
                          <p className="text-sm font-medium">{path.studies}</p>
                        </div>
                        <Link href="/cours">
                          <Button variant="link" className="px-0 text-primary group">
                            {t.orientation.prepCourses}{" "}
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-muted/50 rounded-2xl border text-center">
                <p className="font-medium mb-2">Envie d'explorer tous les métiers ?</p>
                <Button onClick={() => setActiveTab("metiers")}>
                  <Briefcase className="w-4 h-4 mr-2" /> Voir le répertoire des métiers
                </Button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
              {!started ? (
                <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <p className="text-xl text-muted-foreground">{t.orientation.heroSubtitle}</p>
                  </div>
                  <div className="bg-muted/50 p-6 rounded-2xl text-left flex items-start gap-4 border">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{t.orientation.howTitle}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t.orientation.howDesc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="font-bold text-lg px-8" onClick={startQuiz}>
                      {t.orientation.startTest}
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setActiveTab("metiers")}>
                      <Briefcase className="w-4 h-4 mr-2" /> Explorer les métiers
                    </Button>
                  </div>
                </div>
              ) : isCalculating ? (
                <div className="text-center space-y-6 py-20">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <h2 className="text-2xl font-bold font-serif">{t.orientation.analyzing}</h2>
                  <p className="text-muted-foreground">{t.orientation.analyzingSubtitle}</p>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                      <span>
                        Question {currentStep + 1} {t.orientation.questionOf} {quizQuestions.length}
                      </span>
                      <span>{Math.round(((currentStep) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm text-center">
                    <h2 className="text-2xl md:text-3xl font-bold font-serif mb-10 leading-relaxed text-foreground">
                      {quizQuestions[currentStep].text}
                    </h2>
                    <div className="grid gap-4">
                      {quizQuestions[currentStep].options.map((opt, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="h-auto py-4 px-6 text-left justify-start text-base font-normal hover:border-primary hover:bg-primary/5 transition-all"
                          onClick={() => handleAnswer(idx)}
                        >
                          {opt.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
