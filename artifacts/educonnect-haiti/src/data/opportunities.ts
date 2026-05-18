export interface Opportunity {
  id: string;
  type: "Bourse" | "Concours" | "Formation" | "Stage";
  title: string;
  organization: string;
  deadline: string;
  location: string;
  niveau: string;
  description: string;
  tags: string[];
  applyUrl?: string;
  contact?: string;
}

export const opportunities: Opportunity[] = [
  {
    id: "bourse-excellence-2026",
    type: "Bourse",
    title: "Bourse d'Excellence Nationale",
    organization: "Ministère de l'Éducation Nationale",
    deadline: "2026-06-30",
    location: "Haïti (Toutes universités)",
    niveau: "Universitaire",
    description: "Bourse couvrant l'intégralité des frais de scolarité pour les étudiants haïtiens ayant obtenu une moyenne supérieure à 8/10 aux examens d'État. Dossier à déposer au bureau départemental de l'éducation.",
    tags: ["Excellence", "Frais couverts", "Nationale"],
    contact: "menfp.gouv.ht"
  },
  {
    id: "concours-math-2026",
    type: "Concours",
    title: "Olympiades de Mathématiques",
    organization: "Fondation Haïti Demain",
    deadline: "2026-05-15",
    location: "Port-au-Prince",
    niveau: "Secondaire (NS1-NS4)",
    description: "Concours national visant à récompenser les meilleurs talents en mathématiques. Ordinateurs portables et bourses d'études à gagner pour les trois premiers. Inscription gratuite, ouverte à tous les lycéens.",
    tags: ["Mathématiques", "Prix", "Lycée"],
    applyUrl: "https://www.facebook.com/FondationHaitiDemain",
    contact: "fondationhaitidemain@gmail.com"
  },
  {
    id: "formation-code-dev",
    type: "Formation",
    title: "Bootcamp: Initiation au Développement Web",
    organization: "Tech Pour Tous Haïti",
    deadline: "2026-04-20",
    location: "En ligne / Centre Relais",
    niveau: "Débutant",
    description: "Formation intensive gratuite de 3 mois pour apprendre les bases de la création de sites web (HTML, CSS, JavaScript). Certificat délivré à la fin. Matériel fourni aux participants des centres relais.",
    tags: ["Numérique", "Gratuit", "En ligne"],
    applyUrl: "https://www.techpourtoushaiti.org",
    contact: "inscription@techpourtoushaiti.org"
  },
  {
    id: "stage-agri-plateau",
    type: "Stage",
    title: "Stage: Techniques Agricoles Durables",
    organization: "AgriInnovation Haïti",
    deadline: "2026-07-01",
    location: "Plateau Central",
    niveau: "Professionnel / Universitaire",
    description: "Stage pratique de 2 mois axé sur les méthodes de culture adaptées au climat haïtien. Logement et repas pris en charge. Formation sur l'irrigation, la permaculture et la gestion des sols.",
    tags: ["Agriculture", "Pratique", "Logement inclus"],
    contact: "agriinnovation.ht@gmail.com"
  },
  {
    id: "bourse-auf-master",
    type: "Bourse",
    title: "Bourse de l'AUF — Master à l'Étranger",
    organization: "Agence Universitaire de la Francophonie",
    deadline: "2026-08-15",
    location: "Canada / France / Belgique",
    niveau: "Master",
    description: "Bourse pour étudier dans une université francophone partenaire. Couvre les frais d'inscription, le voyage aller-retour et une allocation mensuelle de 800€. Ouvert aux titulaires d'une licence haïtienne avec mention.",
    tags: ["Étranger", "Francophonie", "Master"],
    applyUrl: "https://www.auf.org/bourses",
    contact: "bureau.caraibes@auf.org"
  },
  {
    id: "bourse-oas-2026",
    type: "Bourse",
    title: "Bourse OEA — Programme d'Études",
    organization: "Organisation des États Américains",
    deadline: "2026-03-31",
    location: "Amériques",
    niveau: "Licence / Master / Doctorat",
    description: "Le programme de bourses de l'OEA finance des études universitaires dans un pays membre. Inclut les frais de scolarité, l'hébergement, les frais de subsistance et les billets d'avion. Ouverts aux citoyens haïtiens de moins de 35 ans.",
    tags: ["OEA", "Étranger", "Tous niveaux"],
    applyUrl: "https://www.oas.org/es/sedi/dhdec/Becas/",
    contact: "scholarships@oas.org"
  },
  {
    id: "concours-sciences-2026",
    type: "Concours",
    title: "Prix National des Sciences",
    organization: "Académie des Sciences d'Haïti",
    deadline: "2026-09-01",
    location: "Port-au-Prince",
    niveau: "Terminale / Universitaire",
    description: "Concours de projets scientifiques présentés par des lycéens et étudiants haïtiens. Prix en espèces et possibilité de représenter Haïti à des foires scientifiques internationales. Catégories : biologie, chimie, physique, environnement.",
    tags: ["Sciences", "Innovation", "Recherche"],
    contact: "academiesciences.ht@gmail.com"
  },
  {
    id: "formation-anglais-2026",
    type: "Formation",
    title: "Formation Intensif en Anglais (TOEFL Prep)",
    organization: "Alliance Française d'Haïti / US Embassy",
    deadline: "2026-05-30",
    location: "Port-au-Prince / Pétion-Ville",
    niveau: "Secondaire et Universitaire",
    description: "Programme de 6 semaines pour préparer au TOEFL et améliorer le niveau d'anglais. Cours en présentiel et en ligne. Prise en charge partielle des frais d'inscription pour les candidats issus de zones défavorisées.",
    tags: ["Anglais", "TOEFL", "Bourses partielles"],
    applyUrl: "https://ht.usembassy.gov",
    contact: "educationht@state.gov"
  },
  {
    id: "stage-hopital-ueh",
    type: "Stage",
    title: "Stage Clinique — Hôpital de l'Université d'État",
    organization: "Université d'État d'Haïti (UEH)",
    deadline: "2026-10-15",
    location: "Port-au-Prince",
    niveau: "Universitaire (Médecine / Nursing)",
    description: "Stage clinique supervisé de 3 mois pour les étudiants en médecine et en soins infirmiers. Encadrement par des médecins spécialistes, rotation dans plusieurs départements (urgences, pédiatrie, chirurgie).",
    tags: ["Santé", "Médecine", "Supervisé"],
    contact: "ueh.medecine@ueh.edu.ht"
  },
  {
    id: "formation-femmes-tech",
    type: "Formation",
    title: "Femmes en Technologie — Coding for Change",
    organization: "Women in Tech Haiti",
    deadline: "2026-06-01",
    location: "Port-au-Prince / En ligne",
    niveau: "Tous niveaux",
    description: "Programme de formation gratuit réservé aux femmes et jeunes filles haïtiennes souhaitant se lancer dans les métiers du numérique. Python, design UX, entrepreneuriat digital. Mentorat individuel inclus.",
    tags: ["Femmes", "Numérique", "Gratuit"],
    applyUrl: "https://www.womenintechhaiti.org",
    contact: "apply@womenintechhaiti.org"
  },
  {
    id: "bourse-digicel-2026",
    type: "Bourse",
    title: "Bourse Digicel Foundation",
    organization: "Digicel Foundation Haiti",
    deadline: "2026-07-31",
    location: "Haïti",
    niveau: "Secondaire et Universitaire",
    description: "La Digicel Foundation accorde des bourses annuelles à des étudiants méritants pour couvrir leurs frais d'études. Priorité aux étudiants en informatique, ingénierie et sciences. Dossier à soumettre en ligne ou dans les bureaux régionaux.",
    tags: ["STEM", "Mérite", "Annuelle"],
    applyUrl: "https://www.digicelfoundation.org",
    contact: "foundation.ht@digicel.com"
  },
  {
    id: "concours-essai-litteraire",
    type: "Concours",
    title: "Concours National d'Essai Littéraire",
    organization: "Bibliothèque Nationale d'Haïti",
    deadline: "2026-11-20",
    location: "Haïti (tous départements)",
    niveau: "Lycée / Universitaire",
    description: "Concours d'écriture ouvert aux 15-25 ans. Thème 2026 : 'L'Éducation comme acte de résistance'. Prix d'un ordinateur portable, publication dans la revue nationale et invitation aux journées littéraires de Port-au-Prince.",
    tags: ["Littérature", "Écriture", "Publication"],
    contact: "bnh.haiti@gmail.com"
  },
  {
    id: "formation-gestion-projet",
    type: "Formation",
    title: "Gestion de Projet — Certification PMI",
    organization: "Institut Haïtien de Gestion",
    deadline: "2026-08-30",
    location: "Pétion-Ville / En ligne",
    niveau: "Universitaire / Professionnel",
    description: "Formation de 8 semaines menant à la certification PMP internationale. Cours en soirée pour les professionnels. Financement partiel disponible pour les moins de 30 ans via un partenariat avec l'USAID.",
    tags: ["Gestion", "Certification", "Professionnel"],
    applyUrl: "https://www.ihg.edu.ht",
    contact: "formation@ihg.edu.ht"
  }
];
