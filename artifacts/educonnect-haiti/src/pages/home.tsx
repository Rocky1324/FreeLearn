import { useMemo, useState } from "react";
import { Link } from "wouter";
import { BookOpen, GraduationCap, MapPin, HeartHandshake, ArrowRight, PlayCircle, Award, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/images/hero.png";
import { courses } from "@/data/courses";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  const subjects = useMemo(
    () => ["Tous", ...Array.from(new Set(courses.map(c => c.subject)))],
    [],
  );
  const [activeSubject, setActiveSubject] = useState<string>("Tous");
  const [query, setQuery] = useState<string>("");

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(c => {
      const matchesSubject = activeSubject === "Tous" || c.subject === activeSubject;
      if (!matchesSubject) return false;
      if (!q) return true;
      const haystack = [
        c.title,
        c.subject,
        c.level,
        c.description,
        ...c.chapters.map(ch => ch.title),
        ...c.chapters.map(ch => ch.summary),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeSubject, query]);

  const visibleCourses = filteredCourses.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={heroImg} alt="Students learning" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
              L'éducation pour tous, partout en Haïti
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight">
              Donner à chaque jeune haïtien les mêmes chances de réussir
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
              De Cité Soleil au Plateau Central, accédez gratuitement à des cours de qualité, des bourses d'études et une orientation personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/cours">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                  Explorer les cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/orientation">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Faire le test d'orientation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center [&>div]:border-l [&>div:nth-child(odd)]:border-l-0 md:[&>div]:border-l md:[&>div:first-child]:border-l-0">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-serif text-primary">12+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Cours Complets</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-serif text-primary">15+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Bourses & Stages</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-serif text-primary">4</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Zones Prioritaires</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-serif text-primary">100%</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Gratuit & Hors-ligne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-serif text-foreground">Commencez à apprendre</h2>
              <p className="text-muted-foreground max-w-xl">Des cours adaptés au programme du Ministère de l'Éducation Nationale, conçus pour être clairs et accessibles même sur téléphone.</p>
            </div>
            <Link href="/cours" className="hidden md:flex items-center text-primary font-medium hover:underline shrink-0">
              Voir tout le catalogue <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card border rounded-2xl p-4 md:p-5 mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un sujet (ex : Pythagore, indigénisme, mitose)"
                className="pl-10 h-11"
                data-testid="input-home-search"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground mr-1">Matière :</span>
              {subjects.map((subject) => {
                const active = activeSubject === subject;
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => setActiveSubject(subject)}
                    data-testid={`chip-subject-${subject.toLowerCase()}`}
                    className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </div>

          {visibleCourses.length === 0 ? (
            <div className="bg-card border rounded-2xl p-10 text-center space-y-3">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-lg">Aucun cours ne correspond</h3>
              <p className="text-muted-foreground text-sm">
                Essaie un autre mot-clé ou réinitialise les filtres pour voir tout le catalogue.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setActiveSubject("Tous");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleCourses.map((course) => (
                <Link key={course.id} href={`/cours/${course.id}`}>
                  <div className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                          {course.subject}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">{course.level}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{course.description}</p>
                    </div>
                    <div className="px-6 py-4 border-t bg-muted/10 flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center text-muted-foreground">
                        <PlayCircle className="h-4 w-4 mr-1" /> {course.duration}
                      </span>
                      <span className="text-sm font-bold text-primary flex items-center">
                        Commencer <ArrowRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/cours">
              <Button variant="outline" className="w-full">Voir tout le catalogue</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Priority Zones */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Nos Zones d'Action Prioritaires</h2>
            <p className="text-lg text-muted-foreground">
              Nous concentrons nos efforts là où les besoins sont les plus grands, en travaillant avec des centres communautaires locaux pour offrir un accès physique à notre plateforme.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cité Soleil", desc: "Soutien aux jeunes talents de la plus grande commune.", icon: MapPin },
              { name: "Bel-Air", desc: "Renforcement des capacités via les bibliothèques locales.", icon: MapPin },
              { name: "Martissant", desc: "Espaces sécurisés pour l'apprentissage continu.", icon: MapPin },
              { name: "Plateau Central", desc: "Accès numérique pour les zones rurales reculées.", icon: MapPin },
            ].map((zone, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/50 border text-center space-y-4 hover:bg-muted transition-colors">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <zone.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">{zone.name}</h3>
                <p className="text-sm text-muted-foreground">{zone.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/centres">
              <Button variant="secondary" className="font-medium">
                <HeartHandshake className="mr-2 h-4 w-4" />
                Trouver un centre relais près de chez vous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pathways / Opportunities */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                L'éducation n'est qu'une première étape.
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Nous vous aidons à trouver votre voie et à saisir les opportunités qui transformeront vos connaissances en une carrière concrète.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-secondary rounded-full p-1"><Briefcase className="h-4 w-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold">Test d'Orientation</h4>
                    <p className="text-primary-foreground/70 text-sm">Découvrez les métiers qui correspondent à vos passions et talents.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-secondary rounded-full p-1"><Award className="h-4 w-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold">Bourses et Concours</h4>
                    <p className="text-primary-foreground/70 text-sm">Accédez à une liste mise à jour d'opportunités de financement et de formations.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/orientation">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                    Faire le test
                  </Button>
                </Link>
                <Link href="/opportunites">
                  <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Voir les opportunités
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-primary-foreground/10 absolute -inset-4 blur-3xl"></div>
              <div className="bg-card text-card-foreground rounded-2xl p-6 relative shadow-2xl border transform rotate-2">
                <div className="flex items-center gap-3 border-b pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">JD</div>
                  <div>
                    <p className="font-bold text-sm">Jean-Denis (Port-au-Prince)</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Grâce au test d'orientation, j'ai découvert le développement web. J'ai postulé à une formation gratuite trouvée sur la plateforme et je commence lundi prochain !"
                </p>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Bootcamp Tech</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">Accepté</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}