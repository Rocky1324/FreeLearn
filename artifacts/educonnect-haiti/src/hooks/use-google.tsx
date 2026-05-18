import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function useGoogleDrive() {
  const [uploading, setUploading] = useState(false);

  const uploadFileFromUrl = useCallback(async (fileUrl: string, fileName: string, mimeType = "application/pdf") => {
    setUploading(true);
    try {
      const result = await api.post<{ ok: boolean; file: { name: string; webViewLink: string } }>(
        "/api/google/drive/upload-url",
        { fileUrl, fileName, mimeType }
      );
      toast.success(`"${result.file.name}" enregistré dans Google Drive !`, {
        action: {
          label: "Ouvrir",
          onClick: () => window.open(result.file.webViewLink, "_blank"),
        },
      });
      return result.file;
    } catch (err: any) {
      if (err?.message === "google_not_connected") {
        toast.error("Connectez-vous avec Google pour utiliser Google Drive.", {
          action: {
            label: "Connexion Google",
            onClick: () => { window.location.href = "/api/auth/google"; },
          },
        });
      } else {
        toast.error("Erreur lors de l'envoi vers Google Drive.");
      }
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadBlob = useCallback(async (blob: Blob, fileName: string) => {
    setUploading(true);
    try {
      const response = await fetch("/api/google/drive/upload-blob", {
        method: "POST",
        headers: {
          "Content-Type": blob.type || "application/octet-stream",
          "x-file-name": fileName,
        },
        body: blob,
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.error === "google_not_connected") {
          toast.error("Connectez-vous avec Google pour utiliser Google Drive.", {
            action: {
              label: "Connexion Google",
              onClick: () => { window.location.href = "/api/auth/google"; },
            },
          });
          return null;
        }
        throw new Error(data.error || "Erreur Drive");
      }
      const result = await response.json();
      toast.success(`"${result.file.name}" enregistré dans Google Drive !`, {
        action: {
          label: "Ouvrir",
          onClick: () => window.open(result.file.webViewLink, "_blank"),
        },
      });
      return result.file;
    } catch (err) {
      toast.error("Erreur lors de l'envoi vers Google Drive.");
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploadFileFromUrl, uploadBlob, uploading };
}

export function useGoogleCalendar() {
  const [syncing, setSyncing] = useState(false);

  const syncAcademicEvents = useCallback(async (events: { date: string; title: string; type: string }[]) => {
    setSyncing(true);
    try {
      const result = await api.post<{ synced: number; ok: boolean }>(
        "/api/google/calendar/sync-academic",
        { events }
      );
      toast.success(`${result.synced} événements synchronisés avec Google Calendar !`);
      return result;
    } catch (err: any) {
      if (err?.message === "google_not_connected") {
        toast.error("Connectez-vous avec Google pour synchroniser le calendrier.", {
          action: {
            label: "Connexion Google",
            onClick: () => { window.location.href = "/api/auth/google"; },
          },
        });
      } else {
        toast.error("Erreur lors de la synchronisation du calendrier.");
      }
      throw err;
    } finally {
      setSyncing(false);
    }
  }, []);

  const addStudySession = useCallback(async (summary: string, description: string, startDate: string, endDate: string) => {
    setSyncing(true);
    try {
      const result = await api.post<{ event: any }>(
        "/api/google/calendar/events",
        { summary, description, startDate, endDate, allDay: true }
      );
      toast.success("Session de révision ajoutée à Google Calendar !");
      return result.event;
    } catch (err: any) {
      if (err?.message === "google_not_connected") {
        toast.error("Connectez-vous avec Google pour utiliser Google Calendar.", {
          action: {
            label: "Connexion Google",
            onClick: () => { window.location.href = "/api/auth/google"; },
          },
        });
      } else {
        toast.error("Erreur lors de l'ajout à Google Calendar.");
      }
      throw err;
    } finally {
      setSyncing(false);
    }
  }, []);

  return { syncAcademicEvents, addStudySession, syncing };
}
