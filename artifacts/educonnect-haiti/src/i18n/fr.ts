export type ForumCategories = {
  mathematiques: string;
  sciences: string;
  francais: string;
  histoire: string;
  anglais: string;
  general: string;
};

export type Translations = {
  lang: string;
  langLabel: string;
  langToggle: string;
  nav: {
    home: string; courses: string; flashcards: string; calendar: string;
    orientation: string; opportunities: string; schools: string; centers: string;
    forum: string; teacher: string; dashboard: string; teacherSpace: string; logout: string;
  };
  footer: {
    tagline: string; zones: string; resources: string; courseCatalog: string;
    flashcards: string; studyCalendar: string; opportunities: string; copyright: string;
    lowConnexion: string; lowConnexionOn: string; lowConnexionOff: string;
  };
  forum: {
    title: string; subtitle: string; newPost: string; allCategories: string;
    categories: ForumCategories;
    postTitle: string; postTitlePlaceholder: string; postBody: string; postBodyPlaceholder: string;
    category: string; publish: string; cancel: string; replies: string; reply: string;
    noReplies: string; writeReply: string; sendReply: string; markSolved: string;
    solved: string; pinned: string; acceptAnswer: string; accepted: string;
    delete: string; confirmDelete: string; back: string; by: string; teacher: string;
    student: string; noPosts: string; loginToPost: string; postedOn: string;
    answeredBy: string; loading: string; error: string; titleMin: string; bodyMin: string; replyMin: string;
  };
  landing: {
    heroTitle: string; heroSubtitle: string; getStarted: string;
    login: string; register: string; connexion: string;
  };
  common: {
    loading: string; error: string; save: string; close: string;
    confirm: string; yes: string; no: string;
  };
};

export const fr: Translations = {
  lang: "fr",
  langLabel: "Français",
  langToggle: "Kreyòl",
  nav: {
    home: "Accueil", courses: "Cours", flashcards: "Fiches", calendar: "Calendrier",
    orientation: "Orientation", opportunities: "Opportunités", schools: "Écoles",
    centers: "Centres", forum: "Forum", teacher: "Enseignants",
    dashboard: "Tableau de bord", teacherSpace: "Espace enseignant", logout: "Déconnexion",
  },
  footer: {
    tagline: "Donner à chaque jeune haïtien les mêmes chances de réussir grâce à une éducation accessible, moderne et ancrée dans notre réalité.",
    zones: "Zones Desservies", resources: "Ressources", courseCatalog: "Catalogue de cours",
    flashcards: "Fiches de révision", studyCalendar: "Calendrier d'étude",
    opportunities: "Bourses et concours", copyright: "Fièrement construit pour la jeunesse.",
    lowConnexion: "Mode connexion faible", lowConnexionOn: "(Activé)", lowConnexionOff: "(Désactivé)",
  },
  forum: {
    title: "Forum d'entraide", subtitle: "Posez vos questions, aidez vos camarades",
    newPost: "Nouvelle question", allCategories: "Toutes les matières",
    categories: {
      mathematiques: "Mathématiques", sciences: "Sciences", francais: "Français",
      histoire: "Histoire & Géo", anglais: "Anglais", general: "Général",
    },
    postTitle: "Titre de votre question",
    postTitlePlaceholder: "Ex: Comment résoudre une équation du 2ème degré ?",
    postBody: "Décrivez votre question en détail",
    postBodyPlaceholder: "Expliquez votre problème, ce que vous avez essayé...",
    category: "Matière", publish: "Publier", cancel: "Annuler",
    replies: "réponses", reply: "réponse",
    noReplies: "Aucune réponse pour l'instant. Soyez le premier à aider !",
    writeReply: "Écrire une réponse...", sendReply: "Envoyer",
    markSolved: "Marquer comme résolu", solved: "Résolu", pinned: "Épinglé",
    acceptAnswer: "Meilleure réponse", accepted: "Meilleure réponse",
    delete: "Supprimer", confirmDelete: "Supprimer cette publication ?",
    back: "Retour au forum", by: "par", teacher: "Enseignant", student: "Élève",
    noPosts: "Aucune question pour l'instant. Soyez le premier à poser une question !",
    loginToPost: "Connectez-vous pour poser une question ou répondre.",
    postedOn: "Posté le", answeredBy: "Répondu par",
    loading: "Chargement...", error: "Impossible de charger le forum.",
    titleMin: "Le titre doit avoir au moins 5 caractères.",
    bodyMin: "Le message doit avoir au moins 10 caractères.",
    replyMin: "La réponse est trop courte.",
  },
  landing: {
    heroTitle: "L'éducation gratuite pour tous les élèves haïtiens",
    heroSubtitle: "Accède à des cours, des fiches de révision et des outils d'orientation — où que tu sois, même avec une connexion limitée.",
    getStarted: "Commencer gratuitement", login: "Se connecter",
    register: "S'inscrire", connexion: "Connexion",
  },
  common: {
    loading: "Chargement...", error: "Une erreur est survenue.", save: "Enregistrer",
    close: "Fermer", confirm: "Confirmer", yes: "Oui", no: "Non",
  },
};
