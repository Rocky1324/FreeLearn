import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Target, Lightbulb, HeartHandshake } from "lucide-react";

export default function About() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé ! Nous vous répondrons bientôt.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
            Notre Mission : Démocratiser l'excellence.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            EduConnect Haïti est né d'un constat simple : le talent est réparti équitablement, mais pas les opportunités. Nous construisons le pont entre la volonté d'apprendre de la jeunesse haïtienne et les ressources pour y parvenir.
          </p>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 p-8 rounded-3xl bg-red-50/50 border border-red-100">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif">La Problématique</h2>
            <p className="text-muted-foreground leading-relaxed">
              En Haïti, l'accès à une éducation de qualité et à l'information sur les bourses est souvent limité par la géographie, le coût ou les coupures d'internet. Les jeunes des quartiers populaires et des zones rurales sont systématiquement désavantagés.
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-3xl bg-primary/5 border border-primary/10">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif">Notre Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Une plateforme ultra-légère, accessible hors-ligne, qui centralise des cours aux standards nationaux, guide les choix de carrière, et liste les opportunités réelles. Couplée à des centres relais physiques pour l'accès au matériel.
            </p>
          </div>
        </div>
      </div>

      {/* Team Placeholders */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4">L'Équipe Fondatrice</h2>
            <p className="text-muted-foreground">Des jeunes passionnés engagés pour l'avenir du pays.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { role: "Développement & Tech", initials: "DT" },
              { role: "Pédagogie & Contenu", initials: "PC" },
              { role: "Partenariats & Terrain", initials: "PT" }
            ].map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-card border-2 border-border shadow-sm flex items-center justify-center text-2xl font-bold text-muted-foreground font-serif">
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold text-lg text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">Co-fondateur</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm text-center">
          <HeartHandshake className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-serif mb-4">Envie de contribuer ?</h2>
          <p className="text-muted-foreground mb-8">
            Vous êtes enseignant, représentant d'une ONG ou gérant d'un centre communautaire ? Contactez-nous pour devenir partenaire d'EduConnect Haïti.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom complet</label>
                <Input required placeholder="Jean Dupont" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input required type="email" placeholder="jean@exemple.ht" className="bg-muted/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sujet</label>
              <Input required placeholder="Proposition de partenariat..." className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea required placeholder="Décrivez comment vous souhaitez collaborer..." className="bg-muted/50 min-h-[120px]" />
            </div>
            <Button type="submit" size="lg" className="w-full font-bold">
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}