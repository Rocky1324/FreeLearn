import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  DownloadCloud, 
  Trash2, 
  FileText, 
  ExternalLink, 
  HardDrive,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { offlineDB, type OfflineResource } from "@/lib/offline-db";
import { API_BASE_URL } from "@/lib/api";
import { Link } from "wouter";

export default function OfflineSpace() {
  const [resources, setResources] = useState<OfflineResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const data = await offlineDB.getAllResources();
    // On vérifie quand même si les fichiers sont toujours dans le cache
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      // Pour chaque ressource, on pourrait vérifier, mais on fait confiance à la DB pour l'instant
    }
    setResources(data.sort((a, b) => b.savedAt - a.savedAt));
    setLoading(false);
  }

  async function handleDelete(proxyUrl: string) {
    if (confirm("Voulez-vous supprimer ce fichier de votre espace hors-ligne ?")) {
      await offlineDB.removeResource(proxyUrl);
      
      // On prévient aussi le Service Worker pour libérer de l'espace cache
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "REMOVE_MEDIA",
          urls: [proxyUrl]
        });
      }
      
      setResources(prev => prev.filter(r => r.proxyUrl !== proxyUrl));
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <DownloadCloud className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold font-serif">Mon Espace Hors-Ligne</h1>
          </div>
          <p className="text-muted-foreground">
            Gérez vos documents sauvegardés pour réviser sans connexion internet.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : resources.length === 0 ? (
          <div className="bg-card border-2 border-dashed rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <HardDrive className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Aucun document sauvegardé</h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore de fichiers disponibles hors-ligne. 
              Allez dans la section Annales pour en ajouter.
            </p>
            <Link href="/annales">
              <Button className="rounded-full">
                Explorer les Annales <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {resources.length} document{resources.length > 1 ? "s" : ""} enregistré{resources.length > 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <AlertCircle className="w-3.5 h-3.5" />
                Le cache est limité par votre téléphone.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div 
                  key={res.proxyUrl}
                  className="bg-card border rounded-2xl p-5 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <button 
                      onClick={() => handleDelete(res.proxyUrl)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded uppercase tracking-wider">
                        {res.level}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded uppercase tracking-wider">
                        {res.subject}
                      </span>
                    </div>
                    <h3 className="font-bold leading-tight line-clamp-2">
                      {res.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground italic">
                      Enregistré le {new Date(res.savedAt).toLocaleDateString()}
                    </span>
                    <a 
                      href={`${API_BASE_URL}/api/proxy-pdf?url=${encodeURIComponent(res.url)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ouvrir
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-muted/50 rounded-3xl border border-dashed text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Astuce :</strong> Vous pouvez accéder à cette page même sans connexion internet 
            pour retrouver tous vos documents importants.
          </p>
        </div>
      </div>
    </Layout>
  );
}
