export const quizQuestions = [
  {
    id: "q1",
    text: "Qu'est-ce qui te passionne le plus pendant ton temps libre ?",
    options: [
      { text: "Résoudre des problèmes complexes ou réparer des choses", families: ["Sciences & Ingénierie", "Numérique"] },
      { text: "Aider les autres, écouter et conseiller", families: ["Santé", "Éducation"] },
      { text: "Créer, dessiner, ou écrire", families: ["Arts & Communication"] },
      { text: "Organiser des activités, diriger un groupe", families: ["Entrepreneuriat", "Droit & Société"] }
    ]
  },
  {
    id: "q2",
    text: "Quelle matière préfères-tu à l'école ?",
    options: [
      { text: "Mathématiques ou Physique", families: ["Sciences & Ingénierie", "Numérique"] },
      { text: "Biologie ou Chimie", families: ["Santé", "Agriculture"] },
      { text: "Français, Littérature ou Langues", families: ["Arts & Communication", "Droit & Société"] },
      { text: "Histoire ou Sciences Sociales", families: ["Éducation", "Droit & Société"] }
    ]
  },
  {
    id: "q3",
    text: "Dans un travail d'équipe, quel rôle prends-tu généralement ?",
    options: [
      { text: "Celui qui organise et répartit les tâches", families: ["Entrepreneuriat", "Droit & Société"] },
      { text: "Celui qui trouve des idées nouvelles", families: ["Arts & Communication", "Numérique"] },
      { text: "Celui qui s'assure que tout le monde s'entend bien", families: ["Santé", "Éducation"] },
      { text: "Celui qui se concentre sur les détails techniques", families: ["Sciences & Ingénierie", "Agriculture"] }
    ]
  }
];

export const careerPaths = [
  {
    family: "Sciences & Ingénierie",
    title: "Ingénieur(e) Civil(e)",
    description: "Conçoit et supervise la construction d'infrastructures (routes, ponts, bâtiments), essentiel pour le développement d'Haïti.",
    studies: "Faculté des Sciences (FDS) de l'UEH, INAGHEI.",
    courses: ["math-9af"]
  },
  {
    family: "Santé",
    title: "Infirmier(ère) / Médecin",
    description: "Prend soin de la santé des communautés et sauve des vies, une profession très demandée dans tous les départements.",
    studies: "Faculté de Médecine et de Pharmacie (FMP), UNDH.",
    courses: ["svt-ns2"]
  },
  {
    family: "Numérique",
    title: "Développeur(euse) Web / Mobile",
    description: "Crée des sites et applications. Un domaine d'avenir permettant de travailler à distance pour le monde entier depuis Haïti.",
    studies: "ESIH, Formations en ligne (Bootcamps), Auto-apprentissage.",
    courses: ["math-9af"]
  },
  {
    family: "Arts & Communication",
    title: "Journaliste / Rédacteur(trice)",
    description: "Informe, enquête et communique. Un rôle clé pour la société civile et la démocratie.",
    studies: "FASCH, Universités privées.",
    courses: ["fr-philo"]
  }
];