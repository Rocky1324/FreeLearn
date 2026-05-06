import { Link } from "wouter";
import { BookOpen, Map, Compass, Wifi, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Cours complets",
    desc: "Du 1ère AF au 9ème AF — mathématiques, sciences, langues, histoire et plus.",
  },
  {
    icon: Wifi,
    title: "Disponible hors-ligne",
    desc: "Télécharge tes cours et continue d'apprendre même sans connexion internet.",
  },
  {
    icon: Compass,
    title: "Orientation scolaire",
    desc: "Découvre ta voie avec des tests d'orientation et des conseils personnalisés.",
  },
  {
    icon: Map,
    title: "Carte des écoles",
    desc: "Trouve les écoles et centres de formation près de chez toi.",
  },
];

const stats = [
  { value: "9", label: "Niveaux scolaires" },
  { value: "50+", label: "Cours disponibles" },
  { value: "100%", label: "Gratuit" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/Logo.jpeg" alt="FreeLearn" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-bold text-xl">FreeLearn</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/connexion">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/inscription">
              <Button>S'inscrire</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6 border border-primary/20">
          <Star className="w-4 h-4" />
          100% gratuit pour les élèves haïtiens
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight max-w-3xl mb-6">
          Apprends à ton rythme,{" "}
          <span className="text-primary">partout en Haïti</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10">
          Des cours du curriculum national, des exercices interactifs et des
          outils d'orientation — entièrement gratuits, disponibles même sans
          internet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inscription">
            <Button size="lg" className="text-base px-8 gap-2">
              Commencer gratuitement
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/connexion">
            <Button size="lg" variant="outline" className="text-base px-8">
              Se connecter
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md w-full">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30 border-t">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            Tout ce dont tu as besoin pour réussir
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border rounded-2xl p-6 flex gap-4 items-start shadow-sm"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold font-serif mb-12">
            Commencer en 3 étapes simples
          </h2>
          <div className="grid gap-6 text-left">
            {[
              { n: "1", title: "Crée ton compte gratuitement", desc: "Inscris-toi en moins d'une minute avec ton email." },
              { n: "2", title: "Choisis ton niveau et tes matières", desc: "Explore les cours du 1ère AF au 9ème AF." },
              { n: "3", title: "Apprends et suis ta progression", desc: "Regarde tes vidéos, fais les exercices et valide chaque chapitre." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 items-start bg-card border rounded-xl p-5 shadow-sm">
                <div className="w-10 h-10 bg-primary text-primary-foreground font-bold text-lg rounded-full flex items-center justify-center shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl font-bold font-serif mb-4">
          Prêt à commencer ?
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
          Rejoins des milliers d'élèves qui apprennent avec FreeLearn chaque jour.
        </p>
        <Link href="/inscription">
          <Button size="lg" variant="secondary" className="text-base px-8 gap-2 font-bold">
            Créer mon compte gratuit
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/Logo.jpeg" alt="FreeLearn" className="h-5 w-5 rounded object-cover" />
          <span className="font-bold text-foreground">FreeLearn</span>
        </div>
        <p>Éducation gratuite et accessible pour tous les élèves haïtiens.</p>
      </footer>
    </div>
  );
}
