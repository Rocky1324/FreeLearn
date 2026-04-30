import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  schools,
  STATUS_LABELS,
  STATUS_COLORS,
  haversineKm,
  type School,
  type SchoolStatus,
} from "@/data/schools";
import { MapPin, Locate, Search, AlertTriangle, CheckCircle2, XCircle, Loader2, Info } from "lucide-react";
import { toast } from "sonner";

const HAITI_CENTER: [number, number] = [18.9712, -72.2852];

function buildMarkerIcon(color: string) {
  return L.divIcon({
    className: "custom-school-marker",
    html: `<div style="
      background:${color};
      width:22px;height:22px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });
}

const ICONS: Record<SchoolStatus, L.DivIcon> = {
  operational: buildMarkerIcon(STATUS_COLORS.operational),
  damaged: buildMarkerIcon(STATUS_COLORS.damaged),
  closed: buildMarkerIcon(STATUS_COLORS.closed),
};

function FlyTo({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13, { duration: 1.2 });
  }, [position, map]);
  return null;
}

export default function Schools() {
  const [address, setAddress] = useState("");
  const [searching, setSearching] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | SchoolStatus>("all");

  const visibleSchools = useMemo(
    () => (statusFilter === "all" ? schools : schools.filter((s) => s.status === statusFilter)),
    [statusFilter],
  );

  const sortedSchools = useMemo(() => {
    if (!userLocation) return visibleSchools;
    return [...visibleSchools]
      .map((s) => ({ school: s, distance: haversineKm(userLocation, s) }))
      .sort((a, b) => a.distance - b.distance)
      .map((entry) => ({ ...entry.school, _distance: entry.distance } as School & { _distance: number }));
  }, [visibleSchools, userLocation]);

  const geocode = async (q: string) => {
    setSearching(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ht&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setUserLocation({ lat, lng, label: data[0].display_name || q });
        toast.success("Adresse trouvée");
      } else {
        toast.error("Adresse introuvable. Essayez une ville ou un quartier (ex: Pétion-Ville).");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la recherche d'adresse.");
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    geocode(address.trim());
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      toast.error("Géolocalisation non disponible sur ce navigateur.");
      return;
    }
    setSearching(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Ma position actuelle",
        });
        setSearching(false);
        toast.success("Position détectée");
      },
      (err) => {
        console.error(err);
        toast.error("Impossible d'obtenir votre position. Vérifiez l'autorisation.");
        setSearching(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const StatusIcon = ({ status }: { status: SchoolStatus }) => {
    if (status === "operational") return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === "damaged") return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const flyTarget: [number, number] | null = userLocation ? [userLocation.lat, userLocation.lng] : null;

  return (
    <Layout>
      <div className="bg-muted/30 py-10 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">Trouver une école près de chez moi</h1>
          <p className="text-muted-foreground max-w-2xl">
            Entrez votre adresse ou utilisez votre position pour voir les écoles les plus proches et leur statut actuel.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Votre adresse (ex: Delmas 33, Port-au-Prince, Pétion-Ville…)"
              className="pl-10 h-12"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-12" disabled={searching}>
            {searching ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Rechercher
          </Button>
          <Button type="button" variant="outline" className="h-12" onClick={handleGeolocate} disabled={searching}>
            <Locate className="w-4 h-4 mr-2" />
            Ma position
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
          <span className="text-muted-foreground mr-2">Filtrer :</span>
          {([
            { v: "all", label: "Toutes", color: "#1e293b" },
            { v: "operational", label: STATUS_LABELS.operational, color: STATUS_COLORS.operational },
            { v: "damaged", label: STATUS_LABELS.damaged, color: STATUS_COLORS.damaged },
            { v: "closed", label: STATUS_LABELS.closed, color: STATUS_COLORS.closed },
          ] as const).map((f) => (
            <button
              key={f.v}
              onClick={() => setStatusFilter(f.v)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                statusFilter === f.v
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-muted border-border"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-3 mb-4 text-sm flex gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Les statuts ci-dessous (en activité, endommagée, non fonctionnelle) sont fournis à titre indicatif. Vérifiez auprès de l'école avant de vous déplacer.
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden border shadow-sm">
            <MapContainer
              center={HAITI_CENTER}
              zoom={8}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyTo position={flyTarget} />

              {userLocation && (
                <CircleMarker
                  center={[userLocation.lat, userLocation.lng]}
                  radius={10}
                  pathOptions={{ color: "#1e40af", fillColor: "#3b82f6", fillOpacity: 0.8, weight: 3 }}
                >
                  <Popup>
                    <strong>Vous êtes ici</strong>
                    <br />
                    <span className="text-xs">{userLocation.label}</span>
                  </Popup>
                </CircleMarker>
              )}

              {visibleSchools.map((s) => (
                <Marker key={s.id} position={[s.lat, s.lng]} icon={ICONS[s.status]}>
                  <Popup>
                    <div className="space-y-1 min-w-[180px]">
                      <strong>{s.name}</strong>
                      <div className="text-xs text-muted-foreground">
                        {s.city} · {s.department}
                      </div>
                      <div className="text-xs">
                        {s.level} · {s.type}
                      </div>
                      <div
                        className="inline-flex items-center gap-1 text-xs font-bold mt-1 px-2 py-0.5 rounded"
                        style={{ background: STATUS_COLORS[s.status] + "22", color: STATUS_COLORS[s.status] }}
                      >
                        {STATUS_LABELS[s.status]}
                      </div>
                      {s.statusNote && (
                        <div className="text-xs italic text-muted-foreground mt-1">{s.statusNote}</div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <h2 className="font-bold text-lg sticky top-0 bg-background py-2">
              {userLocation ? "Écoles les plus proches" : "Toutes les écoles"}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({sortedSchools.length})</span>
            </h2>
            {sortedSchools.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune école pour ce filtre.</p>
            )}
            {sortedSchools.map((s) => {
              const distance = (s as School & { _distance?: number })._distance;
              return (
                <div key={s.id} className="border rounded-xl p-3 bg-card hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm leading-tight">{s.name}</h3>
                    <StatusIcon status={s.status} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {s.address}, {s.city}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                      style={{
                        background: STATUS_COLORS[s.status] + "22",
                        color: STATUS_COLORS[s.status],
                      }}
                    >
                      {STATUS_LABELS[s.status]}
                    </span>
                    {typeof distance === "number" && (
                      <span className="text-xs font-medium text-primary">
                        {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}
                      </span>
                    )}
                  </div>
                  {s.statusNote && (
                    <p className="text-xs italic text-amber-700 mt-2 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                      {s.statusNote}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
