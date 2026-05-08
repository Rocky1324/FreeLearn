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
    annales: string;
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
    badge: string; heroTitle: string; heroTitle2: string; heroSubtitle: string;
    getStarted: string; login: string; register: string; connexion: string;
    statsLevels: string; statsCourses: string; statsFree: string;
    featuresTitle: string;
    f1Title: string; f1Desc: string;
    f2Title: string; f2Desc: string;
    f3Title: string; f3Desc: string;
    f4Title: string; f4Desc: string;
    howTitle: string;
    s1Title: string; s1Desc: string;
    s2Title: string; s2Desc: string;
    s3Title: string; s3Desc: string;
    ctaTitle: string; ctaSubtitle: string; ctaBtn: string;
    footerTagline: string;
  };
  login: {
    title: string; subtitle: string; email: string; password: string;
    submit: string; noAccount: string; register: string; error: string;
  };
  register: {
    title: string; subtitle: string; name: string; namePlaceholder: string;
    email: string; password: string; passwordPlaceholder: string;
    confirmPassword: string; teacherToggle: string; teacherCode: string;
    submit: string; hasAccount: string; login: string;
    passwordMismatch: string; error: string;
  };
  home: {
    badge: string; heroTitle: string; heroSubtitle: string;
    exploreCourses: string; orientationTest: string;
    stat1: string; stat2: string; stat3: string; stat4: string;
    coursesTitle: string; coursesSubtitle: string; seeAll: string;
    searchPlaceholder: string; subject: string; allSubjects: string;
    startCourse: string; noResults: string; noResultsHint: string; resetFilters: string;
    zonesTitle: string; zonesSubtitle: string; findCenter: string;
    zone1Desc: string; zone2Desc: string; zone3Desc: string; zone4Desc: string;
    pathwayTitle: string; pathwaySubtitle: string;
    pathwayItem1Title: string; pathwayItem1Desc: string;
    pathwayItem2Title: string; pathwayItem2Desc: string;
    takeTest: string; seeOpportunities: string;
    testimonialDaysAgo: string; testimonialAccepted: string;
  };
  courses: {
    title: string; subtitle: string;
    levelFilter: string; subjectFilter: string; allLevels: string;
    searchPlaceholder: string; found: string; foundPlural: string;
    chapters: string; offlineAvailable: string; seeCourse: string;
    noResults: string; resetFilters: string;
  };
  dashboard: {
    subtitle: string; greeting: string;
    streakLabel: string; streakSub: string;
    chaptersLabel: string; chaptersSub: string;
    hoursLabel: string; hoursSub: string;
    coursesLabel: string; coursesSub: string;
    progressTitle: string; allCourses: string;
    noCoursesTitle: string; noCoursesHint: string; browseCourses: string;
    recentTitle: string;
  };
  orientation: {
    profileTitle: string; profileSubtitle: string; retakeTest: string;
    studyIn: string; prepCourses: string;
    heroTitle: string; heroSubtitle: string; howTitle: string; howDesc: string;
    startTest: string;
    questionOf: string; analyzing: string; analyzingSubtitle: string;
    correct: string; explanation: string;
  };
  opportunities: {
    title: string; subtitle: string;
    searchPlaceholder: string;
    types: { all: string; bourse: string; concours: string; formation: string; stage: string };
    offeredBy: string; deadline: string; location: string; level: string;
    description: string; apply: string;
    expired: string; noResults: string; clearFilters: string;
    savedToast: string; removedToast: string; close: string;
  };
  flashcards: {
    title: string; subtitle: string;
    chapters: string; cards: string; start: string;
    question: string; answer: string; clickToFlip: string; flipHint: string;
    allCourses: string; prev: string; next: string;
    doneTitle: string; restart: string;
    download: string; courseNotFound: string; backToFlashcards: string;
    summaryPrefix: string;
  };
  calendar: {
    title: string; subtitle: string;
    days: string[]; months: string[];
    totalPlanned: string; noSession: string;
    clickDay: string; addSession: string; course: string; duration: string;
    add: string; remove: string;
  };
  courseDetail: {
    backToCatalog: string; chaptersCompleted: string;
    offline: string; offlineAvailable: string; download: string;
    flashcards: string; courseContent: string; lessonSummary: string;
    solvedExamples: string; exercises: string; verify: string;
    markDone: string; markedDone: string;
    excellent: string; nextChapterHint: string; nextCourseHint: string; allDoneHint: string;
    nextChapter: string; nextCourse: string;
    notFound: string; backToCatalog2: string;
    searchYoutube: string; moreVideos: string;
    readingOffline: string; onlineOnly: string;
    downloadSuccess: string; downloadSuccessVideo: string; removeSuccess: string;
    exercisesCorrect: string; chapterDoneToast: string;
    correctAnswer: string; wrongAnswer: string;
  };
  centers: {
    title: string; subtitle: string;
    findTitle: string; findSubtitle: string;
    equipment: string;
  };
  schools: {
    title: string; subtitle: string;
    searchPlaceholder: string; search: string; myLocation: string;
    filterLabel: string; allFilter: string;
    disclaimer: string; closestSchools: string; allSchools: string;
    noSchools: string; youAreHere: string;
  };
  about: {
    title: string; subtitle: string;
    problemTitle: string; problemDesc: string;
    solutionTitle: string; solutionDesc: string;
    teamTitle: string; teamSubtitle: string;
    cofounder: string;
    role1: string; role2: string; role3: string;
    contributeTitle: string; contributeSubtitle: string;
    name: string; email: string; subject: string; message: string;
    namePlaceholder: string; subjectPlaceholder: string; messagePlaceholder: string;
    send: string; sentToast: string;
  };
  notFound: { title: string; hint: string };
  common: { loading: string; error: string; save: string; close: string; confirm: string; yes: string; no: string };
};

export const fr: Translations = {
  lang: "fr", langLabel: "Français", langToggle: "Kreyòl",
  nav: {
    home: "Accueil", courses: "Cours", flashcards: "Fiches", calendar: "Calendrier",
    orientation: "Orientation", opportunities: "Opportunités", schools: "Écoles",
    centers: "Centres", forum: "Forum", teacher: "Enseignants",
    dashboard: "Tableau de bord", teacherSpace: "Espace enseignant", logout: "Déconnexion",
    annales: "Annales",
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
    categories: { mathematiques: "Mathématiques", sciences: "Sciences", francais: "Français", histoire: "Histoire & Géo", anglais: "Anglais", general: "Général" },
    postTitle: "Titre de votre question", postTitlePlaceholder: "Ex: Comment résoudre une équation du 2ème degré ?",
    postBody: "Décrivez votre question en détail", postBodyPlaceholder: "Expliquez votre problème, ce que vous avez essayé...",
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
    badge: "100% gratuit pour les élèves haïtiens",
    heroTitle: "Apprends à ton rythme,", heroTitle2: "partout en Haïti",
    heroSubtitle: "Des cours du curriculum national, des exercices interactifs et des outils d'orientation — entièrement gratuits, disponibles même sans internet.",
    getStarted: "Commencer gratuitement", login: "Se connecter", register: "S'inscrire", connexion: "Connexion",
    statsLevels: "Niveaux scolaires", statsCourses: "Cours disponibles", statsFree: "Gratuit",
    featuresTitle: "Tout ce dont tu as besoin pour réussir",
    f1Title: "Cours complets", f1Desc: "Du 1ère AF au 9ème AF — mathématiques, sciences, langues, histoire et plus.",
    f2Title: "Disponible hors-ligne", f2Desc: "Télécharge tes cours et continue d'apprendre même sans connexion internet.",
    f3Title: "Orientation scolaire", f3Desc: "Découvre ta voie avec des tests d'orientation et des conseils personnalisés.",
    f4Title: "Carte des écoles", f4Desc: "Trouve les écoles et centres de formation près de chez toi.",
    howTitle: "Commencer en 3 étapes simples",
    s1Title: "Crée ton compte gratuitement", s1Desc: "Inscris-toi en moins d'une minute avec ton email.",
    s2Title: "Choisis ton niveau et tes matières", s2Desc: "Explore les cours du 1ère AF au 9ème AF.",
    s3Title: "Apprends et suis ta progression", s3Desc: "Regarde tes vidéos, fais les exercices et valide chaque chapitre.",
    ctaTitle: "Prêt à commencer ?", ctaSubtitle: "Rejoins des milliers d'élèves qui apprennent avec FreeLearn chaque jour.",
    ctaBtn: "Créer mon compte gratuit", footerTagline: "Éducation gratuite et accessible pour tous les élèves haïtiens.",
  },
  login: {
    title: "Connexion", subtitle: "Content de te revoir !",
    email: "Email", password: "Mot de passe",
    submit: "Se connecter", noAccount: "Pas encore de compte ?", register: "S'inscrire gratuitement", error: "Erreur de connexion.",
  },
  register: {
    title: "Créer un compte", subtitle: "Gratuit et sans engagement",
    name: "Prénom et nom", namePlaceholder: "Jean Baptiste",
    email: "Email", password: "Mot de passe", passwordPlaceholder: "8 caractères minimum",
    confirmPassword: "Confirmer le mot de passe",
    teacherToggle: "Vous êtes enseignant ? Entrez votre code d'accès", teacherCode: "Code enseignant",
    submit: "Créer mon compte", hasAccount: "Déjà un compte ?", login: "Se connecter",
    passwordMismatch: "Les mots de passe ne correspondent pas.", error: "Erreur lors de l'inscription.",
  },
  home: {
    badge: "L'éducation pour tous, partout en Haïti",
    heroTitle: "Donner à chaque jeune haïtien les mêmes chances de réussir",
    heroSubtitle: "De Cité Soleil au Plateau Central, accédez gratuitement à des cours de qualité, des bourses d'études et une orientation personnalisée.",
    exploreCourses: "Explorer les cours", orientationTest: "Faire le test d'orientation",
    stat1: "Cours Complets", stat2: "Bourses & Stages", stat3: "Zones Prioritaires", stat4: "Gratuit & Hors-ligne",
    coursesTitle: "Commencez à apprendre",
    coursesSubtitle: "Des cours adaptés au programme du Ministère de l'Éducation Nationale, conçus pour être clairs et accessibles même sur téléphone.",
    seeAll: "Voir tout le catalogue", searchPlaceholder: "Rechercher un sujet (ex : Pythagore, indigénisme, mitose)",
    subject: "Matière :", allSubjects: "Tous", startCourse: "Commencer",
    noResults: "Aucun cours ne correspond", noResultsHint: "Essaie un autre mot-clé ou réinitialise les filtres pour voir tout le catalogue.",
    resetFilters: "Réinitialiser les filtres",
    zonesTitle: "Nos Zones d'Action Prioritaires",
    zonesSubtitle: "Nous concentrons nos efforts là où les besoins sont les plus grands, en travaillant avec des centres communautaires locaux pour offrir un accès physique à notre plateforme.",
    findCenter: "Trouver un centre relais près de chez vous",
    zone1Desc: "Soutien aux jeunes talents de la plus grande commune.",
    zone2Desc: "Renforcement des capacités via les bibliothèques locales.",
    zone3Desc: "Espaces sécurisés pour l'apprentissage continu.",
    zone4Desc: "Accès numérique pour les zones rurales reculées.",
    pathwayTitle: "L'éducation n'est qu'une première étape.",
    pathwaySubtitle: "Nous vous aidons à trouver votre voie et à saisir les opportunités qui transformeront vos connaissances en une carrière concrète.",
    pathwayItem1Title: "Test d'Orientation", pathwayItem1Desc: "Découvrez les métiers qui correspondent à vos passions et talents.",
    pathwayItem2Title: "Bourses et Concours", pathwayItem2Desc: "Accédez à une liste mise à jour d'opportunités de financement et de formations.",
    takeTest: "Faire le test", seeOpportunities: "Voir les opportunités",
    testimonialDaysAgo: "Il y a 2 jours", testimonialAccepted: "Accepté",
  },
  courses: {
    title: "Catalogue de Cours",
    subtitle: "Des leçons claires, des résumés concis et des exercices interactifs pour toutes les classes — de la 1ère AF jusqu'à la Philo.",
    levelFilter: "Niveau", subjectFilter: "Matières", allLevels: "Tous les niveaux",
    searchPlaceholder: "Rechercher un cours (ex: Algèbre, Grammaire...)",
    found: "cours trouvé", foundPlural: "cours trouvés",
    chapters: "chapitres", offlineAvailable: "Hors-ligne dispo", seeCourse: "Voir le cours",
    noResults: "Aucun cours ne correspond à votre recherche.", resetFilters: "Réinitialiser les filtres",
  },
  dashboard: {
    subtitle: "Tableau de bord", greeting: "Bonjour",
    streakLabel: "Jours consécutifs", streakSub: "série d'apprentissage",
    chaptersLabel: "Chapitres terminés", chaptersSub: "au total",
    hoursLabel: "Heures estimées", hoursSub: "d'apprentissage",
    coursesLabel: "Cours en cours", coursesSub: "cours commencés",
    progressTitle: "Ma progression", allCourses: "Tous les cours",
    noCoursesTitle: "Aucun cours commencé", noCoursesHint: "Explore le catalogue et marque tes premiers chapitres comme terminés.",
    browseCourses: "Parcourir les cours", recentTitle: "Activité récente",
  },
  orientation: {
    profileTitle: "Ton Profil d'Orientation", profileSubtitle: "Basé sur tes réponses, voici les domaines dans lesquels tu pourrais exceller en Haïti.",
    retakeTest: "Refaire le test", studyIn: "Où étudier en Haïti", prepCourses: "Voir les cours préparatoires",
    heroTitle: "Trouve ta voie",
    heroSubtitle: "Un test rapide de 5 minutes pour découvrir les carrières qui correspondent à tes talents et les filières d'études disponibles au pays.",
    howTitle: "Comment ça marche ?",
    howDesc: "Réponds honnêtement à quelques questions sur tes goûts. Il n'y a pas de mauvaise réponse. À la fin, nous te proposerons 3 domaines prometteurs et les cours pour t'y préparer.",
    startTest: "Commencer le test", questionOf: "sur",
    analyzing: "Analyse de tes réponses...", analyzingSubtitle: "Recherche des meilleures opportunités pour ton profil.",
    correct: "Bonne réponse !", explanation: "Explication :",
  },
  opportunities: {
    title: "Bourses & Opportunités",
    subtitle: "Ne laissez pas les contraintes financières freiner vos ambitions. Découvrez des financements, concours et formations gratuites.",
    searchPlaceholder: "Rechercher (ex: Informatique, Bourse d'excellence...)",
    types: { all: "Tous", bourse: "Bourse", concours: "Concours", formation: "Formation", stage: "Stage" },
    offeredBy: "Offert par", deadline: "Date limite", location: "Lieu", level: "Niveau requis",
    description: "Description", apply: "Postuler sur le site officiel",
    expired: "Expiré", noResults: "Aucune opportunité ne correspond à vos filtres.", clearFilters: "Effacer les filtres",
    savedToast: "Enregistré dans vos favoris !", removedToast: "Retiré des favoris", close: "Fermer",
  },
  flashcards: {
    title: "Fiches de révision", subtitle: "Choisissez un cours pour commencer à réviser avec des flashcards.",
    chapters: "chapitres", cards: "cartes", start: "Commencer",
    question: "Question", answer: "Réponse", clickToFlip: "Cliquer pour voir la réponse", flipHint: "Cliquer sur la carte pour la retourner",
    allCourses: "Tous les cours", prev: "Précédent", next: "Suivant",
    doneTitle: "Bravo ! Tu as terminé toutes les fiches 🎉", restart: "Recommencer",
    download: "Télécharger / Imprimer", courseNotFound: "Cours introuvable.", backToFlashcards: "Retour aux fiches",
    summaryPrefix: "Résumé :",
  },
  calendar: {
    title: "Calendrier d'étude", subtitle: "Planifie tes sessions de révision et suis ton rythme de travail.",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    totalPlanned: "Total planifié :", noSession: "Aucune session planifiée.",
    clickDay: "Clique sur un jour pour planifier ou voir tes sessions d'étude.",
    addSession: "Ajouter une session", course: "Cours", duration: "Durée", add: "Ajouter", remove: "Supprimer",
  },
  courseDetail: {
    backToCatalog: "Retour au catalogue", chaptersCompleted: "chapitres terminés",
    offline: "Télécharger (Hors-ligne)", offlineAvailable: "Disponible hors-ligne", download: "Télécharger",
    flashcards: "Fiches de révision", courseContent: "Contenu du cours", lessonSummary: "Résumé de la leçon",
    solvedExamples: "Exemples résolus", exercises: "Exercices d'application", verify: "Vérifier mes réponses",
    markDone: "Marquer comme terminé", markedDone: "Chapitre terminé ✓",
    excellent: "Excellent travail !", nextChapterHint: "Tu as terminé ce chapitre. Prêt pour la suite ?",
    nextCourseHint: "Tu as terminé tout le cours ! Continue avec :", allDoneHint: "Tu as terminé tous les cours disponibles. Bravo !",
    nextChapter: "Chapitre suivant", nextCourse: "Cours suivant",
    notFound: "Cours introuvable", backToCatalog2: "Retour au catalogue",
    searchYoutube: "Rechercher sur YouTube", moreVideos: "Voir d'autres vidéos sur ce sujet sur YouTube →",
    readingOffline: "Lecture hors-ligne", onlineOnly: "Vidéo en ligne uniquement",
    downloadSuccess: "Cours téléchargé pour une lecture hors-ligne",
    downloadSuccessVideo: "Cours et vidéo téléchargés pour la lecture hors-ligne",
    removeSuccess: "Cours retiré du mode hors-ligne",
    exercisesCorrect: "Exercices corrigés !", chapterDoneToast: "Chapitre marqué comme terminé !",
    correctAnswer: "Bonne réponse !", wrongAnswer: "Explication :",
  },
  centers: {
    title: "Centres Relais FreeLearn",
    subtitle: "Pas d'internet à la maison ? Aucun problème. Nos centres communautaires partenaires vous offrent l'accès gratuit aux équipements nécessaires pour apprendre.",
    findTitle: "Trouvez un centre près de chez vous",
    findSubtitle: "Nous avons identifié des bibliothèques, écoles et centres communautaires dans nos zones prioritaires pour vous accueillir dans de bonnes conditions.",
    equipment: "Équipements disponibles",
  },
  schools: {
    title: "Trouver une école près de chez moi",
    subtitle: "Entrez votre adresse ou utilisez votre position pour voir les écoles les plus proches et leur statut actuel.",
    searchPlaceholder: "Votre adresse (ex: Delmas 33, Port-au-Prince, Pétion-Ville…)",
    search: "Rechercher", myLocation: "Ma position",
    filterLabel: "Filtrer :", allFilter: "Toutes",
    disclaimer: "Les statuts ci-dessous (en activité, endommagée, non fonctionnelle) sont fournis à titre indicatif. Vérifiez auprès de l'école avant de vous déplacer.",
    closestSchools: "Écoles les plus proches", allSchools: "Toutes les écoles",
    noSchools: "Aucune école pour ce filtre.", youAreHere: "Vous êtes ici",
  },
  about: {
    title: "Notre Mission : Démocratiser l'excellence.",
    subtitle: "FreeLearn est né d'un constat simple : le talent est réparti équitablement, mais pas les opportunités. Nous construisons le pont entre la volonté d'apprendre de la jeunesse haïtienne et les ressources pour y parvenir.",
    problemTitle: "La Problématique",
    problemDesc: "En Haïti, l'accès à une éducation de qualité et à l'information sur les bourses est souvent limité par la géographie, le coût ou les coupures d'internet. Les jeunes des quartiers populaires et des zones rurales sont systématiquement désavantagés.",
    solutionTitle: "Notre Solution",
    solutionDesc: "Une plateforme ultra-légère, accessible hors-ligne, qui centralise des cours aux standards nationaux, guide les choix de carrière, et liste les opportunités réelles. Couplée à des centres relais physiques pour l'accès au matériel.",
    teamTitle: "L'Équipe Fondatrice", teamSubtitle: "Des jeunes passionnés engagés pour l'avenir du pays.",
    cofounder: "Co-fondateur", role1: "Développement & Tech", role2: "Pédagogie & Contenu", role3: "Partenariats & Terrain",
    contributeTitle: "Envie de contribuer ?",
    contributeSubtitle: "Vous êtes enseignant, représentant d'une ONG ou gérant d'un centre communautaire ? Contactez-nous pour devenir partenaire de FreeLearn.",
    name: "Nom complet", email: "Email", subject: "Sujet", message: "Message",
    namePlaceholder: "Jean Dupont", subjectPlaceholder: "Proposition de partenariat...", messagePlaceholder: "Décrivez comment vous souhaitez collaborer...",
    send: "Envoyer le message", sentToast: "Message envoyé ! Nous vous répondrons bientôt.",
  },
  notFound: { title: "404 — Page introuvable", hint: "La page que vous cherchez n'existe pas ou a été déplacée." },
  common: { loading: "Chargement...", error: "Une erreur est survenue.", save: "Enregistrer", close: "Fermer", confirm: "Confirmer", yes: "Oui", no: "Non" },
};
