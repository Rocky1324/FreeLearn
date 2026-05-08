export type CareerSector =
  | "Numérique"
  | "Santé"
  | "Agriculture"
  | "Tourisme"
  | "Éducation"
  | "Construction"
  | "Commerce"
  | "Droit"
  | "Arts"
  | "Sciences";

export type CareerDemand = "Très élevée" | "Élevée" | "En croissance" | "Stable";

export interface Career {
  id: string;
  title: string;
  sector: CareerSector;
  emoji: string;
  tagline: string;
  description: string;
  demand: CareerDemand;
  salaryRange: string;
  studies: string;
  duration: string;
  skills: string[];
  employers: string[];
  outlook: string;
}

export const careers: Career[] = [
  {
    id: "dev-web",
    title: "Développeur(euse) Web & Mobile",
    sector: "Numérique",
    emoji: "💻",
    tagline: "Construire le futur numérique d'Haïti",
    description:
      "Crée des sites web et des applications mobiles pour des entreprises locales ou des clients internationaux. Un des rares métiers permettant de travailler à distance pour le monde entier depuis Haïti.",
    demand: "Très élevée",
    salaryRange: "25 000 – 80 000 HTG / mois",
    studies: "ESIH (Port-au-Prince), Bootcamps en ligne (freeCodeCamp, The Odem School), Auto-formation",
    duration: "6 mois – 3 ans selon le chemin choisi",
    skills: ["HTML/CSS/JavaScript", "React ou Vue.js", "Python ou Node.js", "Git", "Communication en anglais"],
    employers: ["Startups haïtiennes", "Digicel", "ONGs internationales", "Clients freelance (Upwork, Fiverr)", "Gouvernement (OMRH)"],
    outlook:
      "Le secteur numérique haïtien est en pleine expansion. La diaspora investit massivement dans les Fintechs et EdTechs. Les développeurs bilingues (français/anglais) sont très demandés.",
  },
  {
    id: "infirmier",
    title: "Infirmier(ère) Diplômé(e)",
    sector: "Santé",
    emoji: "🏥",
    tagline: "Soigner les communautés partout en Haïti",
    description:
      "Assure les soins aux patients dans les hôpitaux, cliniques et communautés. Métier essentiel dans tout le pays, avec de grandes opportunités dans les zones rurales mal desservies.",
    demand: "Très élevée",
    salaryRange: "15 000 – 45 000 HTG / mois",
    studies: "ENAM (École Nationale des Infirmières), Faculté des Sciences Infirmières (UNDH), Écoles privées agréées",
    duration: "3 ans",
    skills: ["Soins aux patients", "Pharmacologie de base", "Urgences médicales", "Communication empathique", "Travail d'équipe"],
    employers: ["MSPP (Ministère de la Santé)", "Hôpital Général", "Médecins Sans Frontières", "Zanmi Lasante (PIH)", "Cliniques privées"],
    outlook:
      "Haïti manque cruellement de personnel de santé qualifié. Les infirmiers peuvent progresser vers des rôles de supervision ou de sage-femme. Les ONGs paient généralement mieux que le secteur public.",
  },
  {
    id: "agronome",
    title: "Agronome / Technicien Agricole",
    sector: "Agriculture",
    emoji: "🌱",
    tagline: "Nourrir Haïti et construire la sécurité alimentaire",
    description:
      "Conseille les agriculteurs sur les techniques modernes de culture, gestion des sols et des cultures. Joue un rôle clé dans la sécurité alimentaire nationale.",
    demand: "Élevée",
    salaryRange: "18 000 – 55 000 HTG / mois",
    studies: "Faculté d'Agronomie et Médecine Vétérinaire (FAMV – UEH), INAGHEI, Centre de formation agricole (MARNDR)",
    duration: "4–5 ans",
    skills: ["Agronomie générale", "Gestion des sols", "Irrigation", "Agroécologie", "Gestion de projets"],
    employers: ["MARNDR (Ministère de l'Agriculture)", "FAO", "USAID", "Haïti Coffee Academy", "Coopératives locales"],
    outlook:
      "Le secteur agricole représente 25% du PIB haïtien. L'agroécologie et l'agro-transformation créent de nouveaux débouchés. Forte demande d'experts pour les projets de reforestation.",
  },
  {
    id: "guide-touristique",
    title: "Guide Touristique & Agent de Voyage",
    sector: "Tourisme",
    emoji: "🌴",
    tagline: "Faire briller les trésors d'Haïti au monde entier",
    description:
      "Accompagne et informe les visiteurs dans la découverte des sites historiques, naturels et culturels d'Haïti. Secteur en reconstruction avec de fortes perspectives.",
    demand: "En croissance",
    salaryRange: "12 000 – 40 000 HTG / mois + pourboires",
    studies: "INAGHEI (option tourisme-hôtellerie), Formations professionnelles (OTH), Certifications en ligne",
    duration: "2–3 ans",
    skills: ["Langues (français, anglais, espagnol)", "Histoire et culture haïtienne", "Service client", "Premiers secours", "GPS et cartographie"],
    employers: ["Office du Tourisme d'Haïti (OTH)", "Hôtels (Marriott, Karibe)", "Agences de voyage locales", "Paquebots de croisière"],
    outlook:
      "La Côte des Arcadins, Jacmel et le Citadelle Henri Christophe attirent de plus en plus de visiteurs. Le tourisme de diaspora est en forte hausse.",
  },
  {
    id: "enseignant",
    title: "Enseignant(e) du Fondamental",
    sector: "Éducation",
    emoji: "📚",
    tagline: "Former la prochaine génération haïtienne",
    description:
      "Enseigne les matières du programme national aux élèves du primaire ou du secondaire. Pilier de la société, présent dans toutes les communes du pays.",
    demand: "Très élevée",
    salaryRange: "10 000 – 35 000 HTG / mois",
    studies: "École Normale d'Instituteurs (ENI), Faculté des Sciences de l'Éducation (UEH), Universités privées",
    duration: "2–4 ans",
    skills: ["Pédagogie différenciée", "Gestion de classe", "Patience et empathie", "Créole et français", "Évaluation des élèves"],
    employers: ["MENFP (Ministère de l'Éducation)", "Écoles privées", "Écoles religieuses", "ONGs éducatives (PLAN, Save the Children)"],
    outlook:
      "La réforme du système éducatif haïtien crée de nouvelles postes. Les enseignants maîtrisant les outils numériques sont très recherchés. Forte demande dans les zones rurales.",
  },
  {
    id: "ingenieur-civil",
    title: "Ingénieur(e) Civil(e)",
    sector: "Construction",
    emoji: "🏗️",
    tagline: "Reconstruire Haïti, bâtiment par bâtiment",
    description:
      "Conçoit, planifie et supervise la construction d'infrastructures : routes, ponts, bâtiments, systèmes d'eau potable. Essentiel dans l'effort de reconstruction nationale.",
    demand: "Très élevée",
    salaryRange: "40 000 – 120 000 HTG / mois",
    studies: "Faculté des Sciences (UEH), INAGHEI, Université Quisqueya, UNATEK",
    duration: "5 ans + stage",
    skills: ["AutoCAD / Revit", "Calcul de structures", "Gestion de projet", "Topographie", "Normes parasismiques"],
    employers: ["MTPTC (Ministère des Travaux Publics)", "Bureau de Mines (BME)", "ONGs (Build Change)", "Entreprises de construction privées"],
    outlook:
      "La reconstruction post-séisme et les projets d'infrastructures financés par la communauté internationale créent une demande énorme d'ingénieurs locaux qualifiés.",
  },
  {
    id: "comptable",
    title: "Comptable / Gestionnaire Financier",
    sector: "Commerce",
    emoji: "📊",
    tagline: "Gérer les finances des entreprises haïtiennes",
    description:
      "Tient les comptes, prépare les déclarations fiscales et conseille les entreprises sur leur santé financière. Présent dans toutes les industries.",
    demand: "Élevée",
    salaryRange: "20 000 – 70 000 HTG / mois",
    studies: "INAGHEI (option comptabilité), Université Quisqueya, Écoles de commerce privées, Certification CPA",
    duration: "3–4 ans",
    skills: ["Comptabilité générale", "Logiciels QuickBooks / Sage", "Fiscalité haïtienne", "Excel avancé", "Audit financier"],
    employers: ["Entreprises privées (Dinasa, Ciment Lalin)", "Banques (BNC, Sogebank, BRH)", "Cabinet comptables", "ONGs et ambassades"],
    outlook:
      "Avec la digitalisation du secteur bancaire haïtien et la croissance des PME locales, les comptables qualifiés sont en forte demande, notamment ceux maîtrisant les logiciels modernes.",
  },
  {
    id: "avocat",
    title: "Avocat(e) / Juriste",
    sector: "Droit",
    emoji: "⚖️",
    tagline: "Défendre les droits et la justice en Haïti",
    description:
      "Conseille et représente des clients dans des affaires civiles, commerciales ou pénales. Joue un rôle crucial dans la défense des droits humains et l'État de droit.",
    demand: "Stable",
    salaryRange: "25 000 – 100 000 HTG / mois",
    studies: "Faculté de Droit et des Sciences Économiques (FDSE – UEH), Universités privées, Bar exam haïtien",
    duration: "4 ans + stage + barreau",
    skills: ["Droit civil haïtien", "Procédure civile et pénale", "Rédaction juridique", "Argumentation", "Négociation"],
    employers: ["Cabinet d'avocats", "Entreprises privées", "ONGs droits humains (RNDDH)", "Tribunal de première instance", "État haïtien"],
    outlook:
      "Les réformes judiciaires en cours et le développement du secteur des affaires créent de nouveaux besoins en juristes spécialisés (droit commercial, propriété intellectuelle).",
  },
  {
    id: "journaliste",
    title: "Journaliste / Communicant",
    sector: "Arts",
    emoji: "📰",
    tagline: "Informer, enquêter et donner une voix à tous",
    description:
      "Recherche, rédige et diffuse des informations dans les médias (radio, presse, web, TV). Rôle fondamental pour la démocratie et la société civile haïtienne.",
    demand: "Stable",
    salaryRange: "12 000 – 40 000 HTG / mois",
    studies: "FASCH (Faculté des Sciences Humaines – UEH), UNATEK, Écoles de communication privées",
    duration: "3–4 ans",
    skills: ["Rédaction et storytelling", "Radio et podcast", "Réseaux sociaux", "Photographie", "Fact-checking"],
    employers: ["Radio Télévision Haïti (RTH)", "Le Nouvelliste", "AlterPresse", "Médias internationaux", "Institutions publiques (communication)"],
    outlook:
      "Le journalisme numérique et les médias en ligne sont en forte croissance. Les journalistes multimédia (texte + audio + vidéo) sont très demandés.",
  },
  {
    id: "technicien-solaire",
    title: "Technicien(ne) en Énergie Solaire",
    sector: "Sciences",
    emoji: "☀️",
    tagline: "Apporter l'énergie propre partout en Haïti",
    description:
      "Installe, entretient et répare les panneaux solaires et systèmes d'énergie renouvelable. Métier d'avenir dans un pays où l'accès à l'électricité reste un défi majeur.",
    demand: "En croissance",
    salaryRange: "20 000 – 60 000 HTG / mois",
    studies: "INFP (Institut National de Formation Professionnelle), Centres de formation technique, Certifications en ligne (SolarTech)",
    duration: "6 mois – 2 ans",
    skills: ["Électricité de base", "Installation de panneaux solaires", "Batteries et stockage", "Sécurité électrique", "Diagnostic de pannes"],
    employers: ["EDF Haïti", "Haiti Solar", "ONGs (Solar Aid, GIZ)", "Entreprises d'électrification rurale", "Auto-emploi / Freelance"],
    outlook:
      "Avec moins de 30% d'accès à l'électricité en Haïti, la demande en techniciens solaires est appelée à exploser. Les zones rurales représentent un marché énorme à développer.",
  },
];

export const sectorColors: Record<CareerSector, string> = {
  Numérique: "bg-blue-100 text-blue-800 border-blue-200",
  Santé: "bg-red-100 text-red-800 border-red-200",
  Agriculture: "bg-green-100 text-green-800 border-green-200",
  Tourisme: "bg-amber-100 text-amber-800 border-amber-200",
  Éducation: "bg-purple-100 text-purple-800 border-purple-200",
  Construction: "bg-orange-100 text-orange-800 border-orange-200",
  Commerce: "bg-teal-100 text-teal-800 border-teal-200",
  Droit: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Arts: "bg-pink-100 text-pink-800 border-pink-200",
  Sciences: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export const demandColors: Record<CareerDemand, string> = {
  "Très élevée": "text-green-700 bg-green-50 border-green-200",
  Élevée: "text-blue-700 bg-blue-50 border-blue-200",
  "En croissance": "text-amber-700 bg-amber-50 border-amber-200",
  Stable: "text-slate-700 bg-slate-50 border-slate-200",
};
