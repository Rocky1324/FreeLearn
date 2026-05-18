import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Search, Calendar, MapPin, Building2, Bookmark, BookmarkCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/data/opportunities";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";

export default function Opportunities() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Tous");
  const [savedOpps, setSavedOpps] = useLocalStorage<Record<string, boolean>>("saved-opportunities", {});

  const types = [
    { key: "Tous", label: t.opportunities.types.all },
    { key: "Bourse", label: t.opportunities.types.bourse },
    { key: "Concours", label: t.opportunities.types.concours },
    { key: "Formation", label: t.opportunities.types.formation },
    { key: "Stage", label: t.opportunities.types.stage },
  ];

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          opp.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "Tous" || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = { ...savedOpps };
    if (newSaved[id]) {
      delete newSaved[id];
      toast(t.opportunities.removedToast);
    } else {
      newSaved[id] = true;
      toast.success(t.opportunities.savedToast);
    }
    setSavedOpps(newSaved);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: t.opportunities.expired, color: "text-red-500", bg: "bg-red-50" };
    if (diffDays <= 7) return { text: `J-${diffDays}`, color: "text-orange-600", bg: "bg-orange-50" };
    return { text: new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date), color: "text-muted-foreground", bg: "bg-muted/50" };
  };

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-serif">{t.opportunities.title}</h1>
          <p className="text-xl opacity-90">{t.opportunities.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.opportunities.searchPlaceholder}
              className="pl-10 h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary focus:bg-background transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
            {types.map(type => (
              <Button
                key={type.key}
                variant={selectedType === type.key ? "default" : "outline"}
                className={`rounded-full shrink-0 ${selectedType === type.key ? 'font-bold' : ''}`}
                onClick={() => setSelectedType(type.key)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOpps.map(opp => {
            const isSaved = savedOpps[opp.id];
            const deadlineInfo = formatDate(opp.deadline);

            return (
              <Dialog key={opp.id}>
                <DialogTrigger asChild>
                  <div className="bg-card border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full relative">
                    <button
                      onClick={(e) => toggleSave(opp.id, e)}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5 text-muted-foreground" />}
                    </button>

                    <div className="mb-4 pr-10">
                      <span className="inline-block px-2.5 py-1 bg-muted text-foreground text-xs font-bold rounded-md mb-3">
                        {opp.type}
                      </span>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{opp.title}</h3>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-start text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{opp.organization}</span>
                      </div>
                      <div className="flex items-start text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{opp.location}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium pt-2">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
                        <span className={`${deadlineInfo.color} px-2 py-0.5 rounded ${deadlineInfo.bg}`}>
                          {deadlineInfo.text}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {opp.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium bg-primary/5 text-primary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg rounded-2xl">
                  <DialogHeader>
                    <div className="flex justify-between items-start mb-2 pr-6">
                      <span className="inline-block px-2.5 py-1 bg-muted text-foreground text-xs font-bold rounded-md">
                        {opp.type}
                      </span>
                      <button onClick={(e) => toggleSave(opp.id, e)}>
                        {isSaved ? <BookmarkCheck className="w-6 h-6 text-primary" /> : <Bookmark className="w-6 h-6 text-muted-foreground" />}
                      </button>
                    </div>
                    <DialogTitle className="text-2xl font-serif leading-tight">{opp.title}</DialogTitle>
                    <DialogDescription className="text-base pt-2">
                      {t.opportunities.offeredBy} <span className="font-bold text-foreground">{opp.organization}</span>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    <div className="bg-muted/50 rounded-xl p-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">{t.opportunities.deadline}</p>
                        <p className={`text-sm font-bold ${deadlineInfo.color}`}>{deadlineInfo.text}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">{t.opportunities.location}</p>
                        <p className="text-sm font-medium">{opp.location}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">{t.opportunities.level}</p>
                        <p className="text-sm font-medium">{opp.niveau}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">{t.opportunities.description}</h4>
                      <p className="text-muted-foreground leading-relaxed">{opp.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex flex-col gap-3">
                    {opp.applyUrl ? (
                      <Button className="w-full font-bold" asChild>
                        <a href={opp.applyUrl} target="_blank" rel="noopener noreferrer">
                          {t.opportunities.apply} <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    ) : (
                      <Button className="w-full font-bold" variant="secondary" disabled>
                        {t.opportunities.apply}
                      </Button>
                    )}
                    {opp.contact && (
                      <p className="text-center text-sm text-muted-foreground">
                        Contact : <span className="font-medium text-foreground">{opp.contact}</span>
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}

          {filteredOpps.length === 0 && (
            <div className="col-span-full py-16 text-center bg-muted/20 border border-dashed rounded-2xl">
              <p className="text-muted-foreground text-lg">{t.opportunities.noResults}</p>
              <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedType("Tous"); }} className="mt-2">
                {t.opportunities.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
