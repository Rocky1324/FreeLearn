export const quizQuestions = [
  {
    id: "q1",
    text: "Qu'est-ce qui te passionne le plus pendant ton temps libre ?",
    options: [
      { text: "Résoudre des problèmes complexes ou réparer des choses", families: ["Sciences & Ingénierie", "Numérique"] },
      { text: "Aider les autres, écouter et conseiller", families: ["Santé", "Éducation"] },
      { text: "Créer, dessiner, écrire ou faire de la musique", families: ["Arts & Communication"] },
      { text: "Organiser des activités, diriger un groupe", families: ["Entrepreneuriat", "Droit & Société"] },
    ],
  },
  {
    id: "q2",
    text: "Quelle matière préfères-tu à l'école ?",
    options: [
      { text: "Mathématiques ou Physique", families: ["Sciences & Ingénierie", "Numérique"] },
      { text: "Biologie, Chimie ou Sciences Naturelles", families: ["Santé", "Agriculture"] },
      { text: "Français, Littérature ou Langues", families: ["Arts & Communication", "Droit & Société"] },
      { text: "Histoire, Géographie ou Sciences Sociales", families: ["Éducation", "Droit & Société"] },
    ],
  },
  {
    id: "q3",
    text: "Dans un travail d'équipe, quel rôle prends-tu généralement ?",
    options: [
      { text: "Celui qui organise et répartit les tâches", families: ["Entrepreneuriat", "Droit & Société"] },
      { text: "Celui qui trouve des idées nouvelles et créatives", families: ["Arts & Communication", "Numérique"] },
      { text: "Celui qui s'assure que tout le monde s'entend bien", families: ["Santé", "Éducation"] },
      { text: "Celui qui se concentre sur les détails techniques", families: ["Sciences & Ingénierie", "Agriculture"] },
    ],
  },
  {
    id: "q4",
    text: "Quel type d'environnement de travail tu préfères imaginer ?",
    options: [
      { text: "Dehors, en contact avec la nature et les communautés", families: ["Agriculture", "Éducation"] },
      { text: "Dans un bureau, sur ordinateur ou en laboratoire", families: ["Numérique", "Sciences & Ingénierie"] },
      { text: "En contact direct avec des personnes (patients, élèves, clients)", families: ["Santé", "Droit & Société"] },
      { text: "Sur le terrain, dans des projets variés et dynamiques", families: ["Entrepreneuriat", "Arts & Communication"] },
    ],
  },
  {
    id: "q5",
    text: "Si tu pouvais changer une chose en Haïti, ce serait :",
    options: [
      { text: "Construire de meilleures infrastructures (routes, hôpitaux, eau)", families: ["Sciences & Ingénierie", "Agriculture"] },
      { text: "Améliorer le système éducatif et la jeunesse", families: ["Éducation", "Arts & Communication"] },
      { text: "Développer l'économie et créer plus d'emplois", families: ["Entrepreneuriat", "Numérique"] },
      { text: "Renforcer la justice, les droits et la gouvernance", families: ["Droit & Société", "Éducation"] },
    ],
  },
  {
    id: "q6",
    text: "Lequel de ces défis t'enthousiasme le plus ?",
    options: [
      { text: "Créer une application mobile pour résoudre un problème haïtien", families: ["Numérique", "Entrepreneuriat"] },
      { text: "Soigner et améliorer la santé d'une communauté rurale", families: ["Santé", "Agriculture"] },
      { text: "Concevoir un bâtiment ou une route qui résistera aux séismes", families: ["Sciences & Ingénierie"] },
      { text: "Écrire un article ou un livre sur l'histoire d'Haïti", families: ["Arts & Communication", "Droit & Société"] },
    ],
  },
];

export const careerPaths = [
  {
    family: "Sciences & Ingénierie",
    title: "Ingénieur(e) Civil(e) ou Électrique",
    description:
      "Conçoit et supervise la construction d'infrastructures (routes, ponts, bâtiments, réseaux électriques). Essentiel pour la reconstruction et le développement d'Haïti. Fort débouché dans les ONG et les projets gouvernementaux.",
    studies: "Faculté des Sciences (FDS) de l'UEH, INAGHEI, Université Quisqueya.",
    courses: ["math-9af"],
  },
  {
    family: "Santé",
    title: "Infirmier(ère) / Médecin / Sage-femme",
    description:
      "Prend soin de la santé des communautés et sauve des vies. Une profession très demandée dans tous les départements, avec des opportunités dans les ONG internationales comme MSF, PIH et Zanmi Lasante.",
    studies: "Faculté de Médecine et de Pharmacie (FMP), ENAM, UNDH.",
    courses: ["svt-ns2"],
  },
  {
    family: "Numérique",
    title: "Développeur(euse) Web / Mobile",
    description:
      "Crée des sites et applications. Un domaine d'avenir permettant de travailler à distance pour le monde entier depuis Haïti. Forte demande locale avec la croissance des startups technologiques haïtiennes.",
    studies: "ESIH, Bootcamps en ligne (freeCodeCamp), Auto-apprentissage.",
    courses: ["math-9af"],
  },
  {
    family: "Arts & Communication",
    title: "Journaliste / Cinéaste / Designer",
    description:
      "Informe, enquête et crée. Un rôle clé pour la démocratie et la culture haïtienne. Le secteur des médias numériques et du design graphique est en forte croissance avec la diaspora.",
    studies: "FASCH, Universités privées, Formations en ligne.",
    courses: ["fr-philo"],
  },
  {
    family: "Éducation",
    title: "Enseignant(e) / Formateur(trice)",
    description:
      "Former la prochaine génération haïtienne. Présent dans toutes les communes du pays, avec une forte demande pour les enseignants maîtrisant les outils numériques et la pédagogie moderne.",
    studies: "École Normale d'Instituteurs (ENI), Faculté des Sciences de l'Éducation (UEH).",
    courses: ["fr-philo"],
  },
  {
    family: "Agriculture",
    title: "Agronome / Technicien Agricole",
    description:
      "Contribue à la sécurité alimentaire nationale. Conseille les agriculteurs sur les techniques modernes, l'agroécologie et la gestion des ressources naturelles. Fort soutien de la FAO et du MARNDR.",
    studies: "Faculté d'Agronomie et Médecine Vétérinaire (FAMV – UEH), Centres de formation agricole.",
    courses: ["svt-ns2"],
  },
  {
    family: "Entrepreneuriat",
    title: "Entrepreneur(e) / Gestionnaire d'entreprise",
    description:
      "Lance et gère des entreprises locales. Haïti a besoin d'entrepreneurs innovants dans tous les secteurs — du tourisme à la tech, en passant par l'agroalimentaire.",
    studies: "INAGHEI (option gestion), Université Quisqueya, Formations en entrepreneuriat.",
    courses: ["math-9af"],
  },
  {
    family: "Droit & Société",
    title: "Avocat(e) / Juriste / Sociologue",
    description:
      "Défend les droits et la justice. Travaille dans les cabinets d'avocats, les ONGs de droits humains, les institutions publiques ou les organisations internationales présentes en Haïti.",
    studies: "Faculté de Droit et des Sciences Économiques (FDSE – UEH), Universités privées.",
    courses: ["fr-philo"],
  },
];
