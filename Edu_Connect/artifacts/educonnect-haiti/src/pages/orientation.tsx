import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { quizQuestions, careerPaths } from "@/data/quiz";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CheckCircle2, Compass, ArrowRight, BookOpen } from "lucide-react";

export default function Orientation() {
  const [savedResult, setSavedResult] = useLocalStorage<any>("orientation-result", null);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);

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
    
    // Tally up families
    const scores: Record<string, number> = {};
    Object.entries(finalAnswers).forEach(([qIdxStr, oIdx]) => {
      const qIdx = parseInt(qIdxStr);
      const families = quizQuestions[qIdx].options[oIdx].families;
      families.forEach(f => {
        scores[f] = (scores[f] || 0) + 1;
      });
    });

    // Sort families by score
    const topFamilies = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    // Get career paths for top families
    const resultPaths = careerPaths.filter(cp => topFamilies.includes(cp.family));
    
    setTimeout(() => {
      setSavedResult(resultPaths);
      setIsCalculating(false);
    }, 1500); // Fake calculating delay for effect
  };

  if (savedResult && !started) {
    return (
      <Layout>
        <div className="bg-primary text-primary-foreground py-16 text-center">
          <div className="container mx-auto px-4">
            <Compass className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Ton Profil d'Orientation</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Basé sur tes réponses, voici les domaines dans lesquels tu pourrais exceller en Haïti.
            </p>
            <div className="mt-8">
              <Button onClick={startQuiz} variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Refaire le test
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
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
                      <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">Où étudier en Haïti</h4>
                      <p className="text-sm font-medium">{path.studies}</p>
                    </div>
                    <Link href="/cours">
                      <Button variant="link" className="px-0 text-primary group">
                        Voir les cours préparatoires <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        {!started ? (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Compass className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-serif">Trouve ta voie</h1>
              <p className="text-xl text-muted-foreground">
                Un test rapide de 5 minutes pour découvrir les carrières qui correspondent à tes talents et les filières d'études disponibles au pays.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl text-left flex items-start gap-4 border">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Comment ça marche ?</h4>
                <p className="text-sm text-muted-foreground mt-1">Réponds honnêtement à quelques questions sur tes goûts. Il n'y a pas de mauvaise réponse. À la fin, nous te proposerons 3 domaines prometteurs et les cours pour t'y préparer.</p>
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto font-bold text-lg px-8" onClick={startQuiz}>
              Commencer le test
            </Button>
          </div>
        ) : isCalculating ? (
          <div className="text-center space-y-6 py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-2xl font-bold font-serif">Analyse de tes réponses...</h2>
            <p className="text-muted-foreground">Recherche des meilleures opportunités pour ton profil.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>Question {currentStep + 1} sur {quizQuestions.length}</span>
                <span>{Math.round(((currentStep) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
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
    </Layout>
  );
}