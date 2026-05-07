import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Target, Lightbulb, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function About() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.about.sentToast);
    (e.target as HTMLFormElement).reset();
  };

  const teamMembers = [
    { role: t.about.role1, initials: "DT" },
    { role: t.about.role2, initials: "PC" },
    { role: t.about.role3, initials: "PT" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
            {t.about.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t.about.subtitle}
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
            <h2 className="text-2xl font-bold font-serif">{t.about.problemTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.about.problemDesc}</p>
          </div>

          <div className="space-y-6 p-8 rounded-3xl bg-primary/5 border border-primary/10">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif">{t.about.solutionTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.about.solutionDesc}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4">{t.about.teamTitle}</h2>
            <p className="text-muted-foreground">{t.about.teamSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {teamMembers.map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-card border-2 border-border shadow-sm flex items-center justify-center text-2xl font-bold text-muted-foreground font-serif">
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold text-lg text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{t.about.cofounder}</p>
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
          <h2 className="text-3xl font-bold font-serif mb-4">{t.about.contributeTitle}</h2>
          <p className="text-muted-foreground mb-8">{t.about.contributeSubtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.about.name}</label>
                <Input required placeholder={t.about.namePlaceholder} className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.about.email}</label>
                <Input required type="email" placeholder="jean@exemple.ht" className="bg-muted/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.about.subject}</label>
              <Input required placeholder={t.about.subjectPlaceholder} className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.about.message}</label>
              <Textarea required placeholder={t.about.messagePlaceholder} className="bg-muted/50 min-h-[120px]" />
            </div>
            <Button type="submit" size="lg" className="w-full font-bold">
              {t.about.send}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
