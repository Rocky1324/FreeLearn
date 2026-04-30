import { useState } from "react";
import { Link } from "wouter";
import { Search, Filter, PlayCircle, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProgress } from "@/hooks/use-progress";

const LEVEL_GROUPS = [
  { label: "Tous les niveaux", value: "Tous" },
  { label: "1ère – 3ème AF", value: ["1ère AF", "2ème AF", "3ème AF"] },
  { label: "4ème – 6ème AF", value: ["4ème AF", "5ème AF", "6ème AF"] },
  { label: "7ème – 9ème AF", value: ["7ème AF", "8ème AF", "9ème AF"] },
  { label: "Secondaire", value: ["Seconde", "Rhétorique", "Philo", "NS1", "NS2"] },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("Tous");
  const [selectedLevelGroup, setSelectedLevelGroup] = useState<string>("Tous");
  const [downloadedCourses] = useLocalStorage<Record<string, boolean>>("downloaded-courses", {});
  const { courseStats } = useProgress();

  const allSubjects = ["Tous", ...Array.from(new Set(courses.map(c => c.subject))).sort()];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "Tous" || course.subject === selectedSubject;
    const group = LEVEL_GROUPS.find(g => g.label === selectedLevelGroup || (g.value === "Tous" && selectedLevelGroup === "Tous"));
    const levels = group && Array.isArray(group.value) ? group.value : null;
    const matchesLevel = selectedLevelGroup === "Tous" || (levels !== null && levels.includes(course.level));
    return matchesSearch && matchesSubject && matchesLevel;
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold font-serif">Catalogue de Cours</h1>
            <p className="text-lg text-muted-foreground">
              Des leçons claires, des résumés concis et des exercices interactifs pour toutes les classes — de la 1ère AF jusqu'à la Philo.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold flex items-center"><Filter className="w-4 h-4 mr-2"/> Niveau</h3>
              <div className="flex flex-col space-y-1">
                {LEVEL_GROUPS.map(group => (
                  <button
                    key={group.label}
                    onClick={() => setSelectedLevelGroup(group.label === "Tous les niveaux" ? "Tous" : group.label)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      (group.label === "Tous les niveaux" ? "Tous" : group.label) === selectedLevelGroup
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold flex items-center"><Filter className="w-4 h-4 mr-2"/> Matières</h3>
              <div className="flex flex-col space-y-1">
                {allSubjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedSubject === subject 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Rechercher un cours (ex: Algèbre, Grammaire...)" 
                className="pl-10 py-6 text-lg rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Results */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? 's' : ''}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map(course => (
                  <Link key={course.id} href={`/cours/${course.id}`}>
                    <div className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer relative">
                      {downloadedCourses[course.id] && (
                        <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur rounded-full p-1 shadow-sm text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4 pr-8">
                          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                            {course.subject}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">{course.level}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
                      </div>
                      <div className="px-6 pb-3 pt-1">
                        {(() => {
                          const stats = courseStats(course.chapters);
                          if (stats.done === 0) return null;
                          return (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{stats.done}/{stats.total} chapitres</span>
                                <span className="font-semibold text-primary">{stats.pct}%</span>
                              </div>
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${stats.pct}%` }} />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                      <div className="px-6 py-4 border-t bg-muted/10 flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center text-muted-foreground">
                          <PlayCircle className="h-4 w-4 mr-1" /> {course.duration}
                        </span>
                        {downloadedCourses[course.id] ? (
                          <span className="text-xs font-bold text-green-600 flex items-center bg-green-100 px-2 py-1 rounded">
                            Hors-ligne dispo
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-primary flex items-center group-hover:underline">
                            Voir le cours
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {filteredCourses.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-muted/30 rounded-2xl border border-dashed">
                    <p className="text-muted-foreground font-medium">Aucun cours ne correspond à votre recherche.</p>
                    <Button 
                      variant="link" 
                      onClick={() => { setSearchTerm(""); setSelectedSubject("Tous"); setSelectedLevelGroup("Tous"); }}
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}