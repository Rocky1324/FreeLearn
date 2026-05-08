import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem("pwa-banner-dismissed") === "1"; } catch { return false; }
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [swUpdate, setSwUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setSwUpdate(true);
            }
          });
        });
      });
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem("pwa-banner-dismissed", "1"); } catch {}
  };

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  };

  if (swUpdate) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-primary text-primary-foreground rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <Download className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">Mise à jour disponible</p>
          <p className="text-xs text-primary-foreground/80 mt-0.5">Une nouvelle version de FreeLearn est prête.</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="secondary" className="text-xs h-8" onClick={handleUpdate}>
              Mettre à jour
            </Button>
          </div>
        </div>
        <button onClick={() => setSwUpdate(false)} className="text-primary-foreground/60 hover:text-primary-foreground shrink-0 mt-0.5">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (!deferredPrompt || dismissed || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-primary text-primary-foreground rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
        <Download className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">Installer FreeLearn</p>
        <p className="text-xs text-primary-foreground/80 mt-0.5">
          Accède à tes cours même sans internet, comme une vraie application.
        </p>
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="secondary" className="text-xs h-8" onClick={handleInstall}>
            Installer
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
            onClick={handleDismiss}
          >
            Plus tard
          </Button>
        </div>
      </div>
      <button onClick={handleDismiss} className="text-primary-foreground/60 hover:text-primary-foreground shrink-0 mt-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
