export type SchoolStatus = "operational" | "damaged" | "closed";

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  department: string;
  level: string;
  type: "Public" | "Privé" | "Congréganiste";
  lat: number;
  lng: number;
  status: SchoolStatus;
  statusNote?: string;
  phone?: string;
}

export const schools: School[] = [
  {
    id: "lpa",
    name: "Lycée Alexandre Pétion",
    address: "Rue Capois",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Secondaire",
    type: "Public",
    lat: 18.5446,
    lng: -72.3389,
    status: "operational",
  },
  {
    id: "lyc-toussaint",
    name: "Lycée Toussaint Louverture",
    address: "Avenue Christophe",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Secondaire",
    type: "Public",
    lat: 18.5408,
    lng: -72.3322,
    status: "operational",
  },
  {
    id: "stl-bourdon",
    name: "Collège Saint-Louis de Bourdon",
    address: "Bourdon",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Fondamental + Secondaire",
    type: "Congréganiste",
    lat: 18.5366,
    lng: -72.3091,
    status: "operational",
  },
  {
    id: "ccp",
    name: "Collège Catts Pressoir",
    address: "Rue Lambert",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Secondaire",
    type: "Privé",
    lat: 18.5478,
    lng: -72.3233,
    status: "operational",
  },
  {
    id: "marie-anne",
    name: "Institution Sainte-Marie",
    address: "Lalue",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Fondamental",
    type: "Congréganiste",
    lat: 18.5390,
    lng: -72.3300,
    status: "operational",
  },
  {
    id: "ec-cite-soleil",
    name: "École Nationale de Cité Soleil",
    address: "Boulevard Cité Soleil",
    city: "Cité Soleil",
    department: "Ouest",
    level: "Fondamental",
    type: "Public",
    lat: 18.5800,
    lng: -72.3375,
    status: "damaged",
    statusNote: "Bâtiments endommagés — cours partiellement assurés.",
  },
  {
    id: "ec-belair",
    name: "École Mixte de Bel-Air",
    address: "Rue du Centre",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Fondamental",
    type: "Public",
    lat: 18.5510,
    lng: -72.3360,
    status: "closed",
    statusNote: "Fermée temporairement pour raisons sécuritaires.",
  },
  {
    id: "ec-martissant",
    name: "École Communautaire de Martissant",
    address: "Route de Carrefour",
    city: "Port-au-Prince",
    department: "Ouest",
    level: "Fondamental",
    type: "Public",
    lat: 18.5247,
    lng: -72.3722,
    status: "closed",
    statusNote: "Non opérationnelle — déplacement vers une école voisine recommandé.",
  },
  {
    id: "ec-tabarre",
    name: "École Nationale de Tabarre",
    address: "Boulevard 15 Octobre",
    city: "Tabarre",
    department: "Ouest",
    level: "Fondamental + Secondaire",
    type: "Public",
    lat: 18.5739,
    lng: -72.2761,
    status: "operational",
  },
  {
    id: "ec-petionville",
    name: "Lycée de Pétion-Ville",
    address: "Rue Lamarre",
    city: "Pétion-Ville",
    department: "Ouest",
    level: "Secondaire",
    type: "Public",
    lat: 18.5125,
    lng: -72.2853,
    status: "operational",
  },
  {
    id: "ec-delmas",
    name: "École Nationale de Delmas 33",
    address: "Delmas 33",
    city: "Delmas",
    department: "Ouest",
    level: "Fondamental",
    type: "Public",
    lat: 18.5594,
    lng: -72.2992,
    status: "operational",
  },
  {
    id: "ec-carrefour",
    name: "École Mixte de Carrefour",
    address: "Route Nationale #2",
    city: "Carrefour",
    department: "Ouest",
    level: "Fondamental",
    type: "Public",
    lat: 18.5408,
    lng: -72.4019,
    status: "damaged",
    statusNote: "Toit partiellement effondré — capacité d'accueil réduite.",
  },
  {
    id: "lyc-cap",
    name: "Lycée Philippe Guerrier",
    address: "Rue 13",
    city: "Cap-Haïtien",
    department: "Nord",
    level: "Secondaire",
    type: "Public",
    lat: 19.7593,
    lng: -72.2049,
    status: "operational",
  },
  {
    id: "ec-jacmel",
    name: "Lycée Pinchinat",
    address: "Rue Sainte-Anne",
    city: "Jacmel",
    department: "Sud-Est",
    level: "Secondaire",
    type: "Public",
    lat: 18.2342,
    lng: -72.5346,
    status: "operational",
  },
  {
    id: "ec-gonaives",
    name: "Lycée des Gonaïves",
    address: "Rue Égalité",
    city: "Gonaïves",
    department: "Artibonite",
    level: "Secondaire",
    type: "Public",
    lat: 19.4500,
    lng: -72.6831,
    status: "operational",
  },
  {
    id: "ec-cayes",
    name: "Lycée Philippe Guerrier des Cayes",
    address: "Rue Geffrard",
    city: "Les Cayes",
    department: "Sud",
    level: "Secondaire",
    type: "Public",
    lat: 18.2000,
    lng: -73.7500,
    status: "operational",
  },
  {
    id: "ec-hinche",
    name: "Lycée Hinche",
    address: "Centre-ville Hinche",
    city: "Hinche",
    department: "Centre",
    level: "Secondaire",
    type: "Public",
    lat: 19.1500,
    lng: -72.0000,
    status: "operational",
  },
  {
    id: "ec-port-de-paix",
    name: "Lycée Tertulien Guilbaud",
    address: "Rue Stenio Vincent",
    city: "Port-de-Paix",
    department: "Nord-Ouest",
    level: "Secondaire",
    type: "Public",
    lat: 19.9347,
    lng: -72.8275,
    status: "operational",
  },
  {
    id: "ec-fort-liberte",
    name: "Lycée Capois-la-Mort",
    address: "Place d'Armes",
    city: "Fort-Liberté",
    department: "Nord-Est",
    level: "Secondaire",
    type: "Public",
    lat: 19.6650,
    lng: -71.8417,
    status: "operational",
  },
  {
    id: "ec-jeremie",
    name: "Lycée Nord Alexis",
    address: "Rue Stenio Vincent",
    city: "Jérémie",
    department: "Grand'Anse",
    level: "Secondaire",
    type: "Public",
    lat: 18.6500,
    lng: -74.1167,
    status: "damaged",
    statusNote: "Affectée par les ouragans récents — cours sous tentes.",
  },
];

export const STATUS_LABELS: Record<SchoolStatus, string> = {
  operational: "En activité",
  damaged: "Endommagée",
  closed: "Non fonctionnelle",
};

export const STATUS_COLORS: Record<SchoolStatus, string> = {
  operational: "#16a34a",
  damaged: "#f59e0b",
  closed: "#dc2626",
};

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}
