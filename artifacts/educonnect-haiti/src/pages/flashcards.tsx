import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight, RotateCcw, BookOpen, ChevronRight, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

type Flashcard = { front: string; back: string; explanation?: string };

function buildDeck(courseId: string): { chapterTitle: string; cards: Flashcard[] }[] {
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

function FlipCard({ card, idx, total }: { card: Flashcard; idx: number; total: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-muted-foreground font-medium">
        {idx + 1} / {total}
      </p>
      <div
        className="w-full max-w-xl cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: 240,
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border bg-card shadow-lg p-8 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Question</span>
            <p className="text-xl font-semibold leading-tight">{card.front}</p>
            <span className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Cliquer pour voir la réponse
            </span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border bg-primary text-primary-foreground shadow-lg p-8 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-xs uppercase tracking-widest text-primary-foreground/70 font-semibold">Réponse</span>
            <p className="text-xl font-semibold leading-tight">{card.back}</p>
            {card.explanation && (
              <p className="text-sm text-primary-foreground/80 border-t border-primary-foreground/20 pt-3 mt-2">
                {card.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Cliquer sur la carte pour la retourner</p>
    </div>
  );
}

export default function Flashcards() {
  const [, params] = useRoute("/fiches/:courseId");
  const courseId = params?.courseId;
  const course = courses.find((c) => c.id === courseId);
  const decks = courseId ? buildDeck(courseId) : [];

  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);

  if (!courseId) {
    // Course picker
    return (
      <Layout>
        <div className="bg-muted/30 py-10 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold font-serif">Fiches de révision</h1>
            </div>
            <p className="text-muted-foreground">Choisissez un cours pour commencer à réviser avec des flashcards.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <Link key={c.id} href={`/fiches/${c.id}`}>
                <div className="group bg-card border rounded-2xl p-6 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {c.subject}
                    </span>
                    <span className="text-sm text-muted-foreground">{c.level}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.chapters.length} chapitres · {c.chapters.reduce((a, ch) => a + ch.exercises.length + 1, 0)} cartes</p>
                  <div className="flex items-center text-primary text-sm font-semibold mt-auto">
                    Commencer <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!course || decks.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Cours introuvable.</p>
          <Link href="/fiches"><Button className="mt-4">Retour aux fiches</Button></Link>
        </div>
      </Layout>
    );
  }

  const deck = decks[activeDeckIdx];
  const card = deck.cards[cardIdx];

  const goNext = () => {
    if (cardIdx < deck.cards.length - 1) setCardIdx((i) => i + 1);
    else if (activeDeckIdx < decks.length - 1) {
      setActiveDeckIdx((i) => i + 1);
      setCardIdx(0);
    }
  };
  const goPrev = () => {
    if (cardIdx > 0) setCardIdx((i) => i - 1);
    else if (activeDeckIdx > 0) {
      setActiveDeckIdx((i) => i - 1);
      setCardIdx(decks[activeDeckIdx - 1].cards.length - 1);
    }
  };

  const isFirst = activeDeckIdx === 0 && cardIdx === 0;
  const isLast = activeDeckIdx === decks.length - 1 && cardIdx === deck.cards.length - 1;

  const handlePrint = () => window.print();

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 print:hidden">
        <div className="container mx-auto px-4">
          <Link href="/fiches" className="inline-flex items-center text-primary-foreground/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Tous les cours
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white">{course.subject}</span>
                <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white">{course.level}</span>
              </div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
            </div>
            <Button variant="outline" onClick={handlePrint} className="border-white/40 text-white hover:bg-white/10 shrink-0 print:hidden">
              Télécharger / Imprimer
            </Button>
          </div>
        </div>
      </div>

      {/* Deck tabs */}
      <div className="border-b bg-card print:hidden">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {decks.map((d, i) => (
              <button
                key={i}
                onClick={() => { setActiveDeckIdx(i); setCardIdx(0); }}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeDeckIdx === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Ch. {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flashcard area */}
      <div className="container mx-auto px-4 py-10 print:py-4">
        <div className="mb-6 print:hidden">
          <h2 className="text-lg font-semibold">{deck.chapterTitle}</h2>
          <p className="text-sm text-muted-foreground">{deck.cards.length} cartes dans ce chapitre</p>
        </div>

        {/* Print view */}
        <div className="hidden print:block space-y-6">
          {decks.map((d, di) => (
            <div key={di}>
              <h2 className="font-bold text-lg mb-3 border-b pb-2">{d.chapterTitle}</h2>
              <div className="grid grid-cols-2 gap-4">
                {d.cards.map((c, ci) => (
                  <div key={ci} className="border rounded-xl p-4">
                    <p className="text-xs uppercase text-gray-500 mb-1">Question</p>
                    <p className="font-semibold mb-2">{c.front}</p>
                    <p className="text-xs uppercase text-gray-500 mb-1">Réponse</p>
                    <p className="text-gray-800">{c.back}</p>
                    {c.explanation && <p className="text-xs text-gray-500 mt-2 italic">{c.explanation}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive flashcard */}
        <div className="print:hidden">
          <FlipCard card={card} idx={cardIdx} total={deck.cards.length} />
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" onClick={goPrev} disabled={isFirst}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
            </Button>
            <Button onClick={goNext} disabled={isLast}>
              Suivant <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          {isLast && (
            <div className="mt-8 text-center p-6 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl max-w-md mx-auto">
              <p className="font-bold text-green-800 dark:text-green-300 text-lg">Bravo ! Tu as terminé toutes les fiches 🎉</p>
              <Button className="mt-4" onClick={() => { setActiveDeckIdx(0); setCardIdx(0); }}>
                <RotateCcw className="w-4 h-4 mr-2" /> Recommencer
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
