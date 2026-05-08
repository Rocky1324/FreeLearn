export type ExamLevel = "9ème AF" | "NS4";
export type ExamSubject =
  | "Mathématiques"
  | "Sciences Naturelles"
  | "Français"
  | "Histoire-Géographie"
  | "Créole"
  | "Physique-Chimie"
  | "Philosophie"
  | "Anglais";

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ExamPaper {
  id: string;
  year: number;
  level: ExamLevel;
  subject: ExamSubject;
  description: string;
  questions: ExamQuestion[];
}

export interface ExamDate {
  id: string;
  name: string;
  nameHt: string;
  level: ExamLevel;
  date: Date;
  registrationDeadline?: Date;
  description: string;
}

export const upcomingExams: ExamDate[] = [
  {
    id: "9af-2026",
    name: "Examen d'État – 9ème AF",
    nameHt: "Egzamen Eta – 9yèm AF",
    level: "9ème AF",
    date: new Date("2026-06-15"),
    registrationDeadline: new Date("2026-04-30"),
    description:
      "Examen de fin du cycle fondamental. Toutes les matières du programme officiel du MENFP.",
  },
  {
    id: "ns4-2026",
    name: "Baccalauréat – NS4 (Philo)",
    nameHt: "Bakaloreya – NS4 (Filozi)",
    level: "NS4",
    date: new Date("2026-07-06"),
    registrationDeadline: new Date("2026-05-15"),
    description:
      "Examen officiel de fin du secondaire. Reconnu par toutes les universités haïtiennes et internationales.",
  },
];

export const examPapers: ExamPaper[] = [
  {
    id: "9af-2024-maths",
    year: 2024,
    level: "9ème AF",
    subject: "Mathématiques",
    description: "Arithmétique, algèbre, géométrie et probabilités.",
    questions: [
      {
        id: "q1",
        question: "Calcule : 2³ × 5 − 12 ÷ 4",
        options: ["34", "37", "40", "28"],
        answer: 1,
        explanation:
          "2³ = 8. Donc 8 × 5 = 40. Ensuite 12 ÷ 4 = 3. Finalement 40 − 3 = 37.",
      },
      {
        id: "q2",
        question: "Si x + 7 = 15, quelle est la valeur de x ?",
        options: ["6", "7", "8", "22"],
        answer: 2,
        explanation: "On soustrait 7 des deux côtés : x = 15 − 7 = 8.",
      },
      {
        id: "q3",
        question: "Quel est le périmètre d'un carré de côté 6 cm ?",
        options: ["12 cm", "18 cm", "24 cm", "36 cm"],
        answer: 2,
        explanation:
          "Le périmètre d'un carré = 4 × côté = 4 × 6 = 24 cm.",
      },
      {
        id: "q4",
        question: "Quel nombre est premier parmi les suivants ?",
        options: ["9", "15", "17", "21"],
        answer: 2,
        explanation:
          "17 est premier car il n'est divisible que par 1 et par lui-même. 9 = 3×3, 15 = 3×5, 21 = 3×7.",
      },
      {
        id: "q5",
        question: "Simplifie la fraction : 36/48",
        options: ["3/4", "2/3", "4/5", "5/6"],
        answer: 0,
        explanation:
          "Le PGCD de 36 et 48 est 12. 36÷12 = 3 et 48÷12 = 4. Donc 36/48 = 3/4.",
      },
    ],
  },
  {
    id: "9af-2024-sciences",
    year: 2024,
    level: "9ème AF",
    subject: "Sciences Naturelles",
    description: "Biologie, écologie et sciences de la vie.",
    questions: [
      {
        id: "q1",
        question: "Quel est le rôle principal des globules rouges dans le sang ?",
        options: [
          "Combattre les infections",
          "Transporter l'oxygène",
          "Coaguler le sang",
          "Produire des anticorps",
        ],
        answer: 1,
        explanation:
          "Les globules rouges (hématies) contiennent de l'hémoglobine qui transporte l'oxygène des poumons vers les cellules du corps.",
      },
      {
        id: "q2",
        question: "La photosynthèse a lieu principalement dans :",
        options: [
          "Les racines",
          "La tige",
          "Les feuilles (chloroplastes)",
          "Les fleurs",
        ],
        answer: 2,
        explanation:
          "Les feuilles contiennent les chloroplastes, organites qui captent la lumière pour transformer CO₂ et eau en glucose et oxygène.",
      },
      {
        id: "q3",
        question: "Quelle est la formule chimique du dioxyde de carbone ?",
        options: ["CO", "CO₂", "H₂O", "O₂"],
        answer: 1,
        explanation:
          "Le dioxyde de carbone est formé d'un atome de carbone (C) et deux atomes d'oxygène (O) : CO₂.",
      },
      {
        id: "q4",
        question:
          "L'unité de base du vivant, commune à tous les êtres vivants, est :",
        options: ["L'atome", "La molécule", "La cellule", "Le tissu"],
        answer: 2,
        explanation:
          "La cellule est l'unité structurale et fonctionnelle de tout être vivant, qu'il soit unicellulaire ou pluricellulaire.",
      },
      {
        id: "q5",
        question: "Lequel de ces écosystèmes est caractéristique d'Haïti ?",
        options: [
          "La toundra",
          "La savane tropicale",
          "La taïga",
          "Le désert polaire",
        ],
        answer: 1,
        explanation:
          "Haïti se situe dans la zone tropicale. Ses écosystèmes incluent les forêts tropicales humides, les savanes et les zones côtières.",
      },
    ],
  },
  {
    id: "9af-2024-francais",
    year: 2024,
    level: "9ème AF",
    subject: "Français",
    description: "Grammaire, vocabulaire, compréhension et expression écrite.",
    questions: [
      {
        id: "q1",
        question: "Quel est le pluriel du mot « cheval » ?",
        options: ["chevals", "chevaux", "chevales", "chevale"],
        answer: 1,
        explanation:
          "Le pluriel de « cheval » est « chevaux ». La plupart des mots en -al forment leur pluriel en -aux.",
      },
      {
        id: "q2",
        question:
          "Dans la phrase « Le soleil brille », quel est le sujet du verbe ?",
        options: ["brille", "Le", "soleil", "Le soleil"],
        answer: 3,
        explanation:
          "Le sujet est le groupe nominal « Le soleil ». On pose la question « Qui est-ce qui brille ? » → Le soleil.",
      },
      {
        id: "q3",
        question: "Quel est le synonyme du mot « courageux » ?",
        options: ["peureux", "vaillant", "timide", "faible"],
        answer: 1,
        explanation:
          "« Vaillant » est synonyme de courageux. Il signifie brave, fort, qui n'a pas peur face au danger.",
      },
      {
        id: "q4",
        question: "Le contraire de « modeste » est :",
        options: ["humble", "simple", "arrogant", "discret"],
        answer: 2,
        explanation:
          "L'antonyme de modeste est arrogant. Une personne arrogante affiche une fierté excessive, à l'opposé de la modestie.",
      },
      {
        id: "q5",
        question:
          "Quelle figure de style est utilisée dans « ses yeux sont des étoiles » ?",
        options: ["La comparaison", "La métaphore", "L'hyperbole", "L'ironie"],
        answer: 1,
        explanation:
          "C'est une métaphore : on dit directement que les yeux SONT des étoiles (sans utiliser « comme » ni « tel que »).",
      },
    ],
  },
  {
    id: "9af-2024-histoire",
    year: 2024,
    level: "9ème AF",
    subject: "Histoire-Géographie",
    description: "Histoire d'Haïti, histoire mondiale et géographie.",
    questions: [
      {
        id: "q1",
        question:
          "En quelle année Haïti a-t-elle proclamé son indépendance ?",
        options: ["1791", "1804", "1820", "1838"],
        answer: 1,
        explanation:
          "L'indépendance d'Haïti a été proclamée le 1er janvier 1804, faisant d'Haïti la première République noire libre du monde.",
      },
      {
        id: "q2",
        question:
          "Qui est considéré comme le « Père de la Nation » haïtienne ?",
        options: [
          "Alexandre Pétion",
          "Jean-Jacques Dessalines",
          "Henri Christophe",
          "Toussaint Louverture",
        ],
        answer: 1,
        explanation:
          "Jean-Jacques Dessalines a proclamé l'indépendance d'Haïti le 1er janvier 1804 et en est le fondateur officiel.",
      },
      {
        id: "q3",
        question:
          "Quelle est la capitale d'Haïti et dans quel département est-elle située ?",
        options: [
          "Cap-Haïtien, Nord",
          "Gonaïves, Artibonite",
          "Port-au-Prince, Ouest",
          "Les Cayes, Sud",
        ],
        answer: 2,
        explanation:
          "Port-au-Prince est la capitale d'Haïti, située dans le département de l'Ouest, en bordure du Golfe de la Gonâve.",
      },
      {
        id: "q4",
        question: "La bataille de Vertières (1803) a opposé :",
        options: [
          "Les Haïtiens aux Espagnols",
          "Les Haïtiens aux Britanniques",
          "Les Haïtiens aux Français",
          "Les Haïtiens aux Américains",
        ],
        answer: 2,
        explanation:
          "La bataille de Vertières, le 18 novembre 1803, vit les forces indigènes dirigées par Jean-Jacques Dessalines vaincre les troupes françaises.",
      },
      {
        id: "q5",
        question: "Haïti partage l'île d'Hispaniola avec quel pays ?",
        options: ["Cuba", "La Jamaïque", "Porto Rico", "La République Dominicaine"],
        answer: 3,
        explanation:
          "L'île d'Hispaniola est divisée entre Haïti (à l'ouest) et la République Dominicaine (à l'est).",
      },
    ],
  },
  {
    id: "ns4-2024-maths",
    year: 2024,
    level: "NS4",
    subject: "Mathématiques",
    description: "Algèbre avancée, trigonométrie, statistiques et analyse.",
    questions: [
      {
        id: "q1",
        question: "Résoudre : x² − 5x + 6 = 0. Les solutions sont :",
        options: ["x=1 et x=6", "x=2 et x=3", "x=−2 et x=−3", "x=1 et x=−6"],
        answer: 1,
        explanation:
          "On factorise : (x−2)(x−3) = 0, donc x=2 ou x=3. Vérification : 4−10+6=0 ✓ et 9−15+6=0 ✓.",
      },
      {
        id: "q2",
        question: "Quelle est la dérivée de f(x) = 3x² + 2x − 1 ?",
        options: [
          "f'(x) = 6x + 2",
          "f'(x) = 3x + 2",
          "f'(x) = 6x − 1",
          "f'(x) = 6x",
        ],
        answer: 0,
        explanation:
          "La dérivée de x^n est n·x^(n−1). Donc (3x²)' = 6x, (2x)' = 2, (−1)' = 0. Total : 6x + 2.",
      },
      {
        id: "q3",
        question:
          "Dans un triangle rectangle, sin(30°) est égal à :",
        options: ["√3/2", "1/2", "√2/2", "1"],
        answer: 1,
        explanation:
          "sin(30°) = 1/2. C'est une valeur remarquable à mémoriser : sin(30°)=1/2, cos(30°)=√3/2.",
      },
      {
        id: "q4",
        question:
          "Si log₁₀(x) = 2, quelle est la valeur de x ?",
        options: ["2", "20", "100", "1000"],
        answer: 2,
        explanation:
          "log₁₀(x) = 2 signifie 10² = x. Donc x = 100.",
      },
      {
        id: "q5",
        question: "Le vecteur AB = (4, −3) a comme norme :",
        options: ["1", "5", "7", "√7"],
        answer: 1,
        explanation:
          "||AB|| = √(4² + (−3)²) = √(16 + 9) = √25 = 5.",
      },
    ],
  },
  {
    id: "ns4-2024-philo",
    year: 2024,
    level: "NS4",
    subject: "Philosophie",
    description: "Grandes questions philosophiques, auteurs classiques et argumentation.",
    questions: [
      {
        id: "q1",
        question: "Selon Descartes, quelle est la première certitude philosophique ?",
        options: [
          "L'existence de Dieu",
          "Le cogito : « Je pense, donc je suis »",
          "La réalité du monde extérieur",
          "La perfection de la raison",
        ],
        answer: 1,
        explanation:
          "Dans le « Discours de la Méthode », Descartes établit le cogito (cogito ergo sum) comme la première vérité indubitable.",
      },
      {
        id: "q2",
        question: "Quel philosophe a dit : « L'homme est un animal politique » ?",
        options: ["Platon", "Socrate", "Aristote", "Rousseau"],
        answer: 2,
        explanation:
          "Aristote, dans « La Politique », affirme que l'homme est par nature un « animal politique » (zôon politikon) fait pour vivre en société.",
      },
      {
        id: "q3",
        question: "La dialectique hégélienne comprend trois moments. Lesquels ?",
        options: [
          "Vérité, Mensonge, Synthèse",
          "Thèse, Antithèse, Synthèse",
          "Sujet, Objet, Prédicat",
          "Être, Néant, Devenir",
        ],
        answer: 1,
        explanation:
          "Hegel développe la dialectique en trois temps : la thèse (affirmation), l'antithèse (négation), et la synthèse (dépassement).",
      },
      {
        id: "q4",
        question: "Selon Rousseau, à l'état de nature, l'homme est :",
        options: [
          "Fondamentalement mauvais",
          "Fondamentalement bon (le bon sauvage)",
          "Neutre et indifférent",
          "Esclave de ses passions",
        ],
        answer: 1,
        explanation:
          "Rousseau croit en la bonté naturelle de l'homme : c'est la société qui le corrompt. Il s'oppose ainsi à Hobbes.",
      },
      {
        id: "q5",
        question: "Le syllogisme de base est : Tous les hommes sont mortels. Socrate est un homme. Donc :",
        options: [
          "Socrate est divin",
          "Socrate est mortel",
          "Tous les mortels sont des hommes",
          "Socrate n'est pas mortel",
        ],
        answer: 1,
        explanation:
          "C'est la forme classique du syllogisme aristotélicien : deux prémisses mènent à une conclusion logique. Socrate est mortel.",
      },
    ],
  },
  {
    id: "9af-2023-maths",
    year: 2023,
    level: "9ème AF",
    subject: "Mathématiques",
    description: "Arithmétique, algèbre et géométrie.",
    questions: [
      {
        id: "q1",
        question: "Quelle est la valeur de √144 ?",
        options: ["10", "11", "12", "14"],
        answer: 2,
        explanation: "12 × 12 = 144. Donc √144 = 12.",
      },
      {
        id: "q2",
        question: "Un rectangle mesure 8 cm de long et 5 cm de large. Son aire est :",
        options: ["26 cm²", "40 cm²", "13 cm²", "80 cm²"],
        answer: 1,
        explanation: "Aire = longueur × largeur = 8 × 5 = 40 cm².",
      },
      {
        id: "q3",
        question: "Résoudre : 3x − 9 = 0",
        options: ["x = 3", "x = −3", "x = 9", "x = 0"],
        answer: 0,
        explanation: "3x = 9, donc x = 9/3 = 3.",
      },
    ],
  },
  {
    id: "ns4-2023-phys",
    year: 2023,
    level: "NS4",
    subject: "Physique-Chimie",
    description: "Mécanique, électricité et chimie générale.",
    questions: [
      {
        id: "q1",
        question: "La loi d'Ohm est exprimée par la relation :",
        options: ["U = R / I", "U = R × I", "I = U × R", "R = U × I"],
        answer: 1,
        explanation:
          "La loi d'Ohm est U = R × I, où U est la tension (Volts), R la résistance (Ohms) et I le courant (Ampères).",
      },
      {
        id: "q2",
        question: "Selon la 2ème loi de Newton, F = :",
        options: ["m / a", "m × a", "a / m", "m + a"],
        answer: 1,
        explanation:
          "La deuxième loi de Newton : Force = masse × accélération (F = m × a). Si m = 2 kg et a = 5 m/s², F = 10 N.",
      },
      {
        id: "q3",
        question: "Le pH d'une solution neutre est :",
        options: ["0", "7", "14", "1"],
        answer: 1,
        explanation:
          "Une solution neutre a un pH de 7. En dessous de 7, la solution est acide. Au-dessus de 7, elle est basique.",
      },
    ],
  },
];
