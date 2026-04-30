export type Exercise = {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

export type Chapter = {
  id: string;
  title: string;
  youtubeId?: string;
  youtubeSearch?: string;
  summary: string;
  exercises: Exercise[];
};

export type Course = {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  duration: string;
  chapters: Chapter[];
};

export const courses: Course[] = [
  {
    id: "lecture-1af",
    title: "Lecture et Écriture — Les Premières Lettres",
    subject: "Français",
    level: "1ère AF",
    description: "Apprendre à reconnaître les lettres, former des syllabes et lire ses premiers mots en français.",
    duration: "4 heures",
    chapters: [
      {
        id: "lec1-c1",
        title: "Les voyelles : A, E, I, O, U",
        youtubeSearch: "apprendre les voyelles maternelle CP",
        summary: "Les voyelles sont les sons de base du français : A, E, I, O, U. Chaque mot contient au moins une voyelle. Savoir les reconnaître permet de commencer à lire et à écrire.",
        exercises: [
          { question: "Quelle lettre est une voyelle ?", options: ["B", "A", "D"], answer: 1, explanation: "A est une voyelle. B et D sont des consonnes." },
          { question: "Combien de voyelles y a-t-il en français ?", options: ["3", "5", "7"], answer: 1, explanation: "Il y a 5 voyelles de base : A, E, I, O, U." },
        ],
      },
      {
        id: "lec1-c2",
        title: "Les consonnes et les syllabes",
        youtubeSearch: "apprendre les syllabes maternelle lecture",
        summary: "Une syllabe est un groupe de sons formé par une consonne et une voyelle (ex: MA, BI, LU). Combiner des syllabes permet de lire des mots entiers.",
        exercises: [
          { question: "Combien de syllabes dans 'école' ?", options: ["1", "2", "3"], answer: 2, explanation: "É-CO-LE → 3 syllabes." },
          { question: "Laquelle est une consonne ?", options: ["A", "O", "B"], answer: 2, explanation: "B est une consonne. A et O sont des voyelles." },
        ],
      },
    ],
  },
  {
    id: "maths-4af",
    title: "Calcul Mental et Opérations de Base",
    subject: "Mathématiques",
    level: "4ème AF",
    description: "Maîtriser les quatre opérations, les fractions et les proportions pour aborder le secondaire avec confiance.",
    duration: "6 heures",
    chapters: [
      {
        id: "m4-c1",
        title: "Addition et Soustraction",
        youtubeSearch: "addition soustraction CM1 CM2 exercices",
        summary: "L'addition combine des quantités. La soustraction en retire. La retenue et l'emprunt sont les techniques essentielles pour les grands nombres.",
        exercises: [
          { question: "256 + 147 = ?", options: ["393", "403", "413"], answer: 1, explanation: "256 + 147 = 403. Attention aux retenues." },
          { question: "500 − 283 = ?", options: ["217", "227", "317"], answer: 0, explanation: "500 − 283 = 217. On utilise la technique de l'emprunt." },
        ],
      },
      {
        id: "m4-c2",
        title: "Multiplication et Division",
        youtubeSearch: "multiplication division primaire CM2 technique",
        summary: "La multiplication est une addition répétée. La division partage une quantité en parts égales. Maîtriser les tables de multiplication accélère les calculs.",
        exercises: [
          { question: "7 × 8 = ?", options: ["54", "56", "63"], answer: 1, explanation: "7 × 8 = 56. C'est dans la table de 7 et de 8." },
          { question: "72 ÷ 9 = ?", options: ["7", "8", "9"], answer: 1, explanation: "72 ÷ 9 = 8 car 9 × 8 = 72." },
        ],
      },
    ],
  },
  {
    id: "maths-9af",
    title: "Algèbre et Géométrie — Fondamentaux",
    subject: "Mathématiques",
    level: "9ème AF",
    description: "Équations du premier degré, théorème de Pythagore, et introduction aux fonctions pour préparer le secondaire.",
    duration: "8 heures",
    chapters: [
      {
        id: "m9-c1",
        title: "Équations du 1er degré",
        youtubeId: "MqymUbmWc2o",
        summary: "Une équation du 1er degré est de la forme ax + b = c. Pour la résoudre, on isole x en effectuant les mêmes opérations des deux côtés de l'égalité.",
        exercises: [
          { question: "Résoudre : 2x + 3 = 11, x = ?", options: ["3", "4", "5"], answer: 1, explanation: "2x = 11 − 3 = 8, donc x = 4." },
          { question: "Si 3x − 6 = 9, alors x = ?", options: ["3", "4", "5"], answer: 2, explanation: "3x = 15, x = 5." },
        ],
      },
      {
        id: "m9-c2",
        title: "Théorème de Pythagore",
        youtubeSearch: "théorème de Pythagore 3ème explication",
        summary: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : a² + b² = c².",
        exercises: [
          { question: "Dans un triangle rectangle avec a=3 et b=4, c=?", options: ["5", "6", "7"], answer: 0, explanation: "3² + 4² = 9 + 16 = 25 = 5²." },
          { question: "Pythagore s'applique à quel triangle ?", options: ["Isocèle", "Rectangle", "Équilatéral"], answer: 1, explanation: "Le théorème de Pythagore s'applique uniquement aux triangles rectangles." },
        ],
      },
    ],
  },
  {
    id: "sciences-7af",
    title: "Le Vivant et la Cellule",
    subject: "Sciences Naturelles",
    level: "7ème AF",
    description: "Comprendre la cellule comme unité du vivant, la respiration cellulaire et les grandes fonctions biologiques.",
    duration: "5 heures",
    chapters: [
      {
        id: "sci7-c1",
        title: "La cellule : unité du vivant",
        youtubeSearch: "la cellule vivante biologie collège cours",
        summary: "La cellule est la plus petite unité de la vie. Elle possède une membrane, un cytoplasme et un noyau (pour les cellules eucaryotes). Tous les êtres vivants sont composés de cellules.",
        exercises: [
          { question: "Quel organite contient l'ADN ?", options: ["Cytoplasme", "Membrane", "Noyau"], answer: 2, explanation: "Le noyau contient le matériel génétique (ADN) de la cellule." },
          { question: "La cellule végétale possède en plus :", options: ["Un flagelle", "Une paroi et des chloroplastes", "Des ribosomes"], answer: 1, explanation: "La cellule végétale a une paroi cellulosique et des chloroplastes pour la photosynthèse." },
        ],
      },
      {
        id: "sci7-c2",
        title: "La photosynthèse",
        youtubeSearch: "photosynthèse cours SVT collège simple",
        summary: "La photosynthèse est le processus par lequel les plantes produisent leur nourriture grâce à la lumière, l'eau et le CO₂, en libérant de l'O₂. Elle se déroule dans les chloroplastes.",
        exercises: [
          { question: "Quel gaz est produit lors de la photosynthèse ?", options: ["CO₂", "N₂", "O₂"], answer: 2, explanation: "La photosynthèse produit de l'oxygène (O₂) et du glucose." },
          { question: "La photosynthèse se fait dans :", options: ["Le noyau", "Les chloroplastes", "Les mitochondries"], answer: 1, explanation: "Les chloroplastes contiennent la chlorophylle, pigment nécessaire à la photosynthèse." },
        ],
      },
    ],
  },
  {
    id: "histoire-rheto",
    title: "Histoire — Révolutions et Indépendances",
    subject: "Histoire",
    level: "Rhéto",
    description: "La Révolution haïtienne, les mouvements d'indépendance en Amérique latine et leurs impacts sur le monde moderne.",
    duration: "7 heures",
    chapters: [
      {
        id: "his-r1",
        title: "La Révolution haïtienne (1791-1804)",
        youtubeSearch: "révolution haïtienne indépendance 1804 histoire",
        summary: "La Révolution haïtienne est la première et unique révolte d'esclaves couronnée de succès dans l'histoire. Elle a abouti à l'indépendance d'Haïti le 1er janvier 1804, faisant d'Haïti la première République noire du monde.",
        exercises: [
          { question: "En quelle année Haïti a-t-il proclamé son indépendance ?", options: ["1791", "1798", "1804"], answer: 2, explanation: "L'indépendance d'Haïti fut proclamée le 1er janvier 1804 par Jean-Jacques Dessalines." },
          { question: "Qui était le leader de la révolte de Saint-Domingue ?", options: ["Toussaint Louverture", "Napoléon Bonaparte", "Henri Christophe"], answer: 0, explanation: "Toussaint Louverture a dirigé la révolution avant d'être capturé. Dessalines a ensuite proclamé l'indépendance." },
        ],
      },
      {
        id: "his-r2",
        title: "Indépendances latino-américaines",
        youtubeSearch: "indépendances Amérique latine 19ème siècle Bolivar",
        summary: "Inspirées par la Révolution française et la Révolution haïtienne, de nombreuses colonies espagnoles d'Amérique du Sud ont acquis leur indépendance au XIXe siècle, menées par des figures comme Simón Bolívar.",
        exercises: [
          { question: "Simón Bolívar a libéré quels pays ?", options: ["Mexique et Cuba", "Venezuela, Colombie, Bolivie", "Argentine et Brésil"], answer: 1, explanation: "Bolívar a libéré le Venezuela, la Colombie, l'Équateur, le Pérou et la Bolivie." },
          { question: "La Révolution haïtienne a-t-elle influencé les révolutions latino-américaines ?", options: ["Non, aucun lien", "Oui, comme source d'inspiration", "Non, elle est arrivée après"], answer: 1, explanation: "La révolution haïtienne (1804) a précédé la plupart des indépendances et servi de modèle." },
        ],
      },
    ],
  },
  {
    id: "francais-philo",
    title: "Dissertation Littéraire — Maîtrise de l'Argumentation",
    subject: "Dissertation",
    level: "Philo",
    description: "Construire un plan solide, rédiger une introduction et une conclusion percutantes, maîtriser les procédés rhétoriques.",
    duration: "10 heures",
    chapters: [
      {
        id: "dis-c1",
        title: "La structure de la dissertation",
        youtubeSearch: "dissertation littéraire structure plan méthode terminale",
        summary: "Une dissertation bien construite suit un plan dialectique (thèse / antithèse / synthèse) ou analytique. Chaque partie contient des arguments illustrés par des exemples précis tirés des œuvres au programme.",
        exercises: [
          { question: "Quel est l'ordre d'une dissertation dialectique ?", options: ["Synthèse, Thèse, Antithèse", "Thèse, Antithèse, Synthèse", "Antithèse, Synthèse, Thèse"], answer: 1, explanation: "Une dissertation dialectique suit : Thèse → Antithèse → Synthèse." },
          { question: "La conclusion doit :", options: ["Répéter l'introduction", "Ouvrir sur une nouvelle réflexion", "Résumer uniquement"], answer: 1, explanation: "La conclusion répond à la problématique et ouvre vers une perspective plus large." },
        ],
      },
      {
        id: "dis-c2",
        title: "Les procédés rhétoriques",
        youtubeSearch: "figures de style rhétorique dissertation terminale",
        summary: "Les procédés rhétoriques (métaphore, antithèse, chiasme, anaphore…) enrichissent l'argumentation et montrent la maîtrise de la langue. Les identifier dans les textes renforce l'analyse littéraire.",
        exercises: [
          { question: "Qu'est-ce qu'une anaphore ?", options: ["Une répétition en fin de phrase", "Une répétition en début de phrase", "Une comparaison explicite"], answer: 1, explanation: "L'anaphore est la répétition d'un mot ou groupe de mots en début de plusieurs phrases." },
          { question: "La métaphore est :", options: ["Une comparaison sans outil comparatif", "Une comparaison avec 'comme'", "Une exagération"], answer: 0, explanation: "La métaphore compare sans utiliser de terme comparatif (comme, tel que…)." },
        ],
      },
    ],
  },
];

export const subjects = [...new Set(courses.map((c) => c.subject))];
export const levels = [...new Set(courses.map((c) => c.level))];
