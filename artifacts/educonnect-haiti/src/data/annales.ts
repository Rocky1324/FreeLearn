export type ExamLevel = "9ème AF" | "NS4";
export type ExamSubject =
  | "Mathématiques"
  | "Sciences Naturelles"
  | "Sciences Sociales"
  | "Sciences Expérimentales"
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
  source: "MENFP" | "Entraînement";
  sourceUrl?: string;
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
  datesConfirmed: boolean;
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
      "Examen de fin du cycle fondamental. Toutes les matières du programme officiel du MENFP. Dates indicatives — à confirmer sur le site du MENFP.",
    datesConfirmed: false,
  },
  {
    id: "ns4-2026",
    name: "Baccalauréat – NS4 (Philo)",
    nameHt: "Bakaloreya – NS4 (Filozi)",
    level: "NS4",
    date: new Date("2026-07-06"),
    registrationDeadline: new Date("2026-05-15"),
    description:
      "Examen officiel de fin du secondaire. Reconnu par toutes les universités haïtiennes et internationales. Dates indicatives — à confirmer sur le site du MENFP.",
    datesConfirmed: false,
  },
];

export const examPapers: ExamPaper[] = [
  {
    id: "9af-2025-maths",
    year: 2025,
    level: "9ème AF",
    subject: "Mathématiques",
    source: "MENFP",
    sourceUrl: "https://www.examhaiti.com/math-9e-af/math-9e-af-2025/",
    description:
      "Épreuve officielle MENFP — Juillet 2025. Arithmétique, algèbre et géométrie.",
    questions: [
      {
        id: "q1",
        question: "Lequel des nombres suivants n'est pas un diviseur de 14 ?",
        options: ["2", "4", "7", "14"],
        answer: 1,
        explanation:
          "14 ÷ 4 = 3,5 — ce n'est pas un entier. Donc 4 n'est pas diviseur de 14. Les diviseurs de 14 sont : 1, 2, 7 et 14.",
      },
      {
        id: "q2",
        question: "Quel est le résultat de (−2)⁻³ ?",
        options: ["8", "−1/8", "1/8", "−8"],
        answer: 1,
        explanation:
          "(−2)⁻³ = 1/(−2)³ = 1/(−8) = −1/8. On applique la règle a⁻ⁿ = 1/aⁿ.",
      },
      {
        id: "q3",
        question: "Que vaut l'aire d'un carré dont le côté est C = 1/4 ?",
        options: ["16", "1", "1/8", "1/16"],
        answer: 3,
        explanation:
          "Aire = C² = (1/4)² = 1/16. On élève le côté au carré pour obtenir l'aire d'un carré.",
      },
      {
        id: "q4",
        question: "Quel est, en pourcentage, la valeur de la fraction 3/5 ?",
        options: ["35 %", "30 %", "60 %", "20 %"],
        answer: 2,
        explanation:
          "3/5 = 3 ÷ 5 = 0,60. Pour convertir en pourcentage : 0,60 × 100 = 60 %.",
      },
      {
        id: "q5",
        question: "Quel est le résultat de l'expression A = 4 − 2/3 ?",
        options: ["2/3", "8/3", "5/3", "10/3"],
        answer: 3,
        explanation:
          "A = 4 − 2/3 = 12/3 − 2/3 = 10/3. On convertit 4 en fraction de même dénominateur.",
      },
      {
        id: "q6",
        question:
          "Laquelle des figures géométriques suivantes a des diagonales perpendiculaires et de même longueur ?",
        options: ["Le losange", "Le trapèze", "Le rectangle", "Le carré"],
        answer: 3,
        explanation:
          "Le carré est la seule figure dont les diagonales sont à la fois perpendiculaires ET de même longueur. Le losange a des diagonales perpendiculaires mais inégales ; le rectangle a des diagonales égales mais non perpendiculaires.",
      },
      {
        id: "q7",
        question:
          "Dans quel triangle les hauteurs, médianes, médiatrices et bissectrices sont-elles confondues ?",
        options: [
          "Triangle rectangle",
          "Triangle isocèle",
          "Triangle équilatéral",
          "Triangle rectangle-isocèle",
        ],
        answer: 2,
        explanation:
          "Dans le triangle équilatéral (tous les côtés égaux, tous les angles égaux à 60°), les quatre droites remarquables sont identiques et se rejoignent en un seul point.",
      },
      {
        id: "q8",
        question:
          "Quel est le volume d'un récipient qu'un robinet débitant 20 ℓ/min remplit en 2 heures ?",
        options: ["2,4 m³", "10 m³", "1,2 m³", "4 m³"],
        answer: 0,
        explanation:
          "Durée = 2 h = 120 min. Volume = 20 ℓ/min × 120 min = 2 400 ℓ = 2,4 m³ (car 1 m³ = 1 000 ℓ).",
      },
      {
        id: "q9",
        question:
          "Laquelle des formules suivantes est celle de l'aire latérale d'un cylindre ?",
        options: ["πr²h", "πr × h", "2πrh", "1/3 πr²h"],
        answer: 2,
        explanation:
          "L'aire latérale d'un cylindre est la surface de sa paroi sans les bases circulaires. Elle vaut 2πrh, où r est le rayon et h la hauteur.",
      },
    ],
  },
  {
    id: "9af-2023-maths",
    year: 2023,
    level: "9ème AF",
    subject: "Mathématiques",
    source: "MENFP",
    sourceUrl: "https://www.examhaiti.com/math-9e-af/math-2010-2023-9e-af/",
    description:
      "Épreuve officielle MENFP — Juillet 2023. Première partie : questions à choix multiple.",
    questions: [
      {
        id: "q1",
        question: "L'inverse de (2³)² est le nombre :",
        options: ["2⁵", "2⁶", "1/2⁵", "1/2⁶"],
        answer: 3,
        explanation:
          "(2³)² = 2⁶ (on multiplie les exposants). L'inverse de 2⁶ est 1/2⁶.",
      },
      {
        id: "q2",
        question:
          "La réduction de B = 1 + 40 ÷ 5 + 5 × 5 − 5 donne :",
        options: ["9", "29", "4,1", "28,2"],
        answer: 1,
        explanation:
          "Priorité aux × et ÷ : 40÷5 = 8 et 5×5 = 25. Puis 1 + 8 + 25 − 5 = 29.",
      },
      {
        id: "q3",
        question:
          "L'orthocentre d'un triangle est le point de rencontre des :",
        options: ["Bissectrices", "Médianes", "Hauteurs", "Médiatrices"],
        answer: 2,
        explanation:
          "L'orthocentre est le point où se croisent les trois hauteurs du triangle. Le barycentre = médianes ; le centre du cercle inscrit = bissectrices ; le centre du cercle circonscrit = médiatrices.",
      },
      {
        id: "q4",
        question:
          "La médiane de la série : 13 ; 21 ; 19 ; 18 ; 27 ; 15 est :",
        options: ["19", "18", "18,5", "19,6"],
        answer: 2,
        explanation:
          "On ordonne : 13, 15, 18, 19, 21, 27. La série a 6 valeurs (pair), donc la médiane = moyenne des 3e et 4e valeurs = (18 + 19) / 2 = 18,5.",
      },
      {
        id: "q5",
        question:
          "Si un angle Â vaut 80°, la mesure de son complément sera de :",
        options: ["280°", "20°", "100°", "10°"],
        answer: 3,
        explanation:
          "Deux angles sont complémentaires si leur somme vaut 90°. Complément de 80° = 90° − 80° = 10°.",
      },
      {
        id: "q6",
        question:
          "L'écriture simplifiée de A = (10 × 10³) / 10⁶ est :",
        options: ["10²", "10⁻²", "10⁻³", "10³"],
        answer: 1,
        explanation:
          "Numérateur : 10 × 10³ = 10¹ × 10³ = 10⁴. Résultat : 10⁴ / 10⁶ = 10⁴⁻⁶ = 10⁻².",
      },
    ],
  },
  {
    id: "9af-2023-francais",
    year: 2023,
    level: "9ème AF",
    subject: "Français",
    source: "MENFP",
    sourceUrl:
      "https://www.examhaiti.com/francais-9e-af/francais-2010-2023-9e-af/",
    description:
      "Épreuve officielle MENFP — Juillet 2023. Compréhension de texte : L'énergie éolienne.",
    questions: [
      {
        id: "q1",
        question:
          "Texte : « Le vent est une source d'énergie renouvelable ; on utilise les éoliennes pour produire de l'électricité. » — De quel type d'énergie l'article parle-t-il ?",
        options: [
          "De l'énergie thermique",
          "De l'énergie nucléaire",
          "De l'énergie éolienne",
          "De l'énergie solaire",
        ],
        answer: 2,
        explanation:
          "L'article porte sur l'énergie éolienne, produite par le vent à travers les éoliennes (version modernisée des moulins à vent).",
      },
      {
        id: "q2",
        question:
          "Selon le texte, les sources d'énergie comme le charbon, le gaz naturel et le pétrole sont :",
        options: [
          "Épuisables et bonnes pour l'environnement",
          "Inépuisables",
          "Nocives pour l'environnement",
          "Protectrices de l'environnement",
        ],
        answer: 2,
        explanation:
          "Le texte précise : « Ces sources d'énergie ne sont pas éternelles et cette combustion n'est pas trop bonne pour l'environnement. » Elles sont donc nocives.",
      },
      {
        id: "q3",
        question:
          "Parmi les sources d'énergie suivantes, laquelle est renouvelable selon le texte ?",
        options: ["Le pétrole", "Le vent", "Le charbon", "Le gaz naturel"],
        answer: 1,
        explanation:
          "Le vent est « inépuisable et gratuit » selon le texte. C'est pourquoi on l'utilise pour produire de l'électricité via les éoliennes.",
      },
      {
        id: "q4",
        question:
          "Grammaire — Quel est le contraire du mot « courageux » ?",
        options: ["Vaillant", "Peureux", "Valeureux", "Brave"],
        answer: 1,
        explanation:
          "Le contraire (antonyme) de courageux est peureux (ou lâche). Vaillant, valeureux et brave sont tous des synonymes de courageux.",
      },
      {
        id: "q5",
        question:
          "Grammaire — Quel synonyme peut remplacer « habiter » dans : « Il habitait dans une petite maison » ?",
        options: ["S'installer", "Vivre", "Partir", "Construire"],
        answer: 1,
        explanation:
          "Parmi « vivait » et « s'installait », le synonyme correct d'habiter est « vivre ». On dit : « Il vivait dans une petite maison. »",
      },
    ],
  },
  {
    id: "9af-2023-sciencessociales",
    year: 2023,
    level: "9ème AF",
    subject: "Sciences Sociales",
    source: "MENFP",
    sourceUrl:
      "https://www.examhaiti.com/sciences-sociales-9e-af/science-sociales-2010-2023-9e-af/",
    description:
      "Épreuve officielle MENFP — Juillet 2023. Histoire mondiale, histoire d'Haïti et géographie.",
    questions: [
      {
        id: "q1",
        question:
          "Dans laquelle de ces villes a eu lieu le krach boursier qui a donné naissance à la crise de 1929 ?",
        options: ["Berlin", "Londres", "New York", "Paris"],
        answer: 2,
        explanation:
          "Le krach boursier d'octobre 1929 a eu lieu à Wall Street, à New York. Il a déclenché la Grande Dépression mondiale des années 1930.",
      },
      {
        id: "q2",
        question:
          "À quel président haïtien Tirésias Simon Sam a-t-il succédé ?",
        options: [
          "Florvil Hyppolite",
          "François Denys Légitime",
          "Nord Alexis",
          "Boisrond Tonnerre",
        ],
        answer: 0,
        explanation:
          "Tirésias Simon Sam (1896–1902) a succédé au général Florvil Hyppolite, décédé en exercice le 24 mars 1896.",
      },
      {
        id: "q3",
        question:
          "Lequel des musiciens suivants est le chanteur principal du groupe Tabou Combo ?",
        options: [
          "Gesner Henry dit Coupé Cloué",
          "Jean Elie Telfort dit Cubano",
          "Roger M. Eugène dit Shoubou",
          "André Vernet",
        ],
        answer: 2,
        explanation:
          "Roger M. Eugène, surnommé « Shoubou », est le chanteur emblématique de Tabou Combo, groupe de compas haïtien fondé en 1968.",
      },
      {
        id: "q4",
        question:
          "Laquelle de ces religions a pour prophète Mahomet et pour livre sacré le Coran ?",
        options: [
          "Le Catholicisme",
          "L'Islam",
          "Le Judaïsme",
          "Le Bouddhisme",
        ],
        answer: 1,
        explanation:
          "L'Islam est la religion monothéiste fondée par le prophète Mahomet au 7e siècle. Son livre sacré est le Coran.",
      },
      {
        id: "q5",
        question:
          "Lequel de ces indicateurs est caractéristique d'un pays sous-développé ?",
        options: [
          "Revenu élevé par habitant",
          "Consommation de moins de 2 500 cal/jour par habitant",
          "Faible taux de mortalité",
          "Taux de scolarisation élevé",
        ],
        answer: 1,
        explanation:
          "Une consommation alimentaire inférieure à 2 500 calories/jour est un signe de pauvreté et de sous-développement. Les trois autres options décrivent des pays développés.",
      },
      {
        id: "q6",
        question: "Le rara haïtien est associé à laquelle de ces fêtes ?",
        options: ["La Noël", "L'Épiphanie", "Les Pâques", "L'Assomption"],
        answer: 2,
        explanation:
          "Le rara est une manifestation culturelle haïtienne qui se déroule pendant le Carême, culminant lors de la Semaine Sainte et à Pâques.",
      },
      {
        id: "q7",
        question:
          "Lequel de ces pays est membre permanent du Conseil de Sécurité des Nations Unies ?",
        options: ["Corée du Nord", "Iran", "Israël", "Chine"],
        answer: 3,
        explanation:
          "Les cinq membres permanents du Conseil de Sécurité de l'ONU sont : États-Unis, Royaume-Uni, France, Russie et Chine. Ils ont chacun un droit de veto.",
      },
    ],
  },
  {
    id: "9af-2022-sciencessociales",
    year: 2022,
    level: "9ème AF",
    subject: "Sciences Sociales",
    source: "MENFP",
    sourceUrl:
      "https://www.examhaiti.com/sciences-sociales-9e-af/science-sociales-2010-2023-9e-af/",
    description:
      "Épreuve officielle MENFP — Juillet 2022. Histoire de la Caraïbe, Haïti et géographie.",
    questions: [
      {
        id: "q1",
        question:
          "Lequel de ces personnages a joué un rôle fondamental dans la lutte pour l'indépendance de Cuba au 19e siècle ?",
        options: [
          "Fidel Castro",
          "Jose Marti",
          "Simon Bolivar",
          "Hugo Chavez",
        ],
        answer: 1,
        explanation:
          "José Martí (1853–1895) est le héros national cubain, poète et révolutionnaire qui a dirigé la lutte pour l'indépendance de Cuba face à l'Espagne.",
      },
      {
        id: "q2",
        question:
          "Opposé à l'occupation américaine, chef des cacos, il fut assassiné le 19 mai 1920. De qui s'agit-il ?",
        options: [
          "Pierre Sully",
          "Rosalvo Bobo",
          "Benoît Batraville",
          "Charlemagne Péralte",
        ],
        answer: 3,
        explanation:
          "Charlemagne Péralte était le leader de la résistance haïtienne (les cacos) contre l'occupation américaine. Il fut tué le 19 mai 1920 par des agents de la marine américaine.",
      },
      {
        id: "q3",
        question:
          "Lequel de ces rythmes musicaux représente un moyen d'expression original et populaire de la culture haïtienne ?",
        options: ["Salsa", "Reggae", "Compas", "Jazz"],
        answer: 2,
        explanation:
          "Le Compas (konpa direk) est le rythme musical national d'Haïti, créé par Nemours Jean-Baptiste en 1955. Il est l'expression musicale populaire par excellence.",
      },
      {
        id: "q4",
        question:
          "Le secteur tertiaire en Haïti correspond à quel groupe d'activités ?",
        options: [
          "Banques – Usines – Églises",
          "Banques – Écoles – Cabinets d'avocat",
          "Banques – Écoles – Culture de la canne à sucre",
          "Écoles – Mines – Magasins",
        ],
        answer: 1,
        explanation:
          "Le secteur tertiaire regroupe les services : banques, éducation, santé, commerce, droit, etc. Les usines appartiennent au secondaire ; l'agriculture au primaire.",
      },
      {
        id: "q5",
        question:
          "Quel fait a servi de prétexte aux Américains pour débarquer sur le sol haïtien en 1915 ?",
        options: [
          "Les luttes paysannes cacos et piquets",
          "L'assassinat du président Vilbrun Guillaume Sam",
          "La mort du président Cincinatus Leconte",
          "La crise sociopolitique du 19e siècle",
        ],
        answer: 1,
        explanation:
          "L'assassinat du président Vilbrun Guillaume Sam par des insurgés le 28 juillet 1915 a servi de prétexte à l'intervention et l'occupation militaire américaine qui durera jusqu'en 1934.",
      },
    ],
  },
  {
    id: "9af-2023-sciencesexp",
    year: 2023,
    level: "9ème AF",
    subject: "Sciences Expérimentales",
    source: "MENFP",
    sourceUrl:
      "https://www.examhaiti.com/sciences-experimentales-9e-af/sciences-experimentales-2010-2023-9e-af/",
    description:
      "Épreuve officielle MENFP — Juillet 2023. Biologie, anatomie et physique.",
    questions: [
      {
        id: "q1",
        question:
          "Au cours d'un accident, le fémur gauche d'un enfant est légèrement fissuré. Il s'agit d'une :",
        options: ["Entorse", "Fêlure", "Fracture", "Luxation"],
        answer: 1,
        explanation:
          "Une fêlure est une cassure incomplète de l'os (fissure sans déplacement). La fracture est une cassure complète ; l'entorse concerne les ligaments ; la luxation est un déboîtement d'articulation.",
      },
      {
        id: "q2",
        question:
          "Une roche dans laquelle on extrait une substance métallique à grande valeur économique est :",
        options: ["Un minéral", "Une pierre précieuse", "Un minerai", "Une mine"],
        answer: 2,
        explanation:
          "Un minerai est une roche contenant des minéraux métalliques en concentration suffisante pour être exploitée économiquement (ex : bauxite pour l'aluminium, fer pour l'acier).",
      },
      {
        id: "q3",
        question:
          "Le maïs est une plante à fleurs classée parmi les :",
        options: [
          "Ptéridophytes",
          "Thallophytes",
          "Spermatophytes",
          "Bryophytes",
        ],
        answer: 2,
        explanation:
          "Les Spermatophytes (plantes à graines) regroupent toutes les plantes à fleurs et à graines, dont le maïs. Les fougères sont des Ptéridophytes ; les mousses des Bryophytes.",
      },
      {
        id: "q4",
        question:
          "L'inflammation de la membrane qui enveloppe les poumons est connue sous le nom de :",
        options: ["Tendinite", "Cystite", "Pleurésie", "Pneumonie"],
        answer: 2,
        explanation:
          "La plèvre est la membrane qui entoure les poumons. Son inflammation s'appelle la pleurésie. La pneumonie est une infection du tissu pulmonaire lui-même.",
      },
      {
        id: "q5",
        question:
          "Laquelle de ces actions se produit lors de l'inspiration ?",
        options: [
          "La cage thoracique augmente de volume",
          "Les côtes s'abaissent",
          "Le diaphragme se relâche",
          "L'air sort des poumons",
        ],
        answer: 0,
        explanation:
          "À l'inspiration, le diaphragme se contracte et descend, les côtes s'élèvent et s'écartent : la cage thoracique augmente de volume, créant une dépression qui aspire l'air.",
      },
      {
        id: "q6",
        question:
          "Les cellules sanguines qui obstruent les extrémités des vaisseaux après une légère blessure portent le nom :",
        options: [
          "D'érythrocytes",
          "De plaquettes",
          "D'hématies",
          "De leucocytes",
        ],
        answer: 1,
        explanation:
          "Les plaquettes (thrombocytes) assurent la coagulation du sang en formant un bouchon au niveau des plaies. Les leucocytes = globules blancs (défense) ; les hématies/érythrocytes = globules rouges (transport O₂).",
      },
      {
        id: "q7",
        question:
          "Physique — Quelle est l'unité de la poussée d'Archimède ?",
        options: ["Watt", "Joule", "Newton", "Pascal"],
        answer: 2,
        explanation:
          "La poussée d'Archimède est une force, donc elle s'exprime en Newton (N). Le Watt est une puissance, le Joule une énergie, le Pascal une pression.",
      },
      {
        id: "q8",
        question:
          "Physique — Quelle force est nécessaire pour soulever un objet pesant 600 N à l'aide d'un système de 6 poulies (3 fixes et 3 mobiles) ?",
        options: ["600 N", "300 N", "150 N", "100 N"],
        answer: 3,
        explanation:
          "Avec 3 poulies mobiles, l'avantage mécanique est 2³ = 8... mais ici le système de 6 brins porteurs donne F = 600/6 = 100 N. Le système de poulies divise la force à exercer.",
      },
      {
        id: "q9",
        question:
          "Physique — Lequel de ces appareils transforme l'énergie chimique en énergie électrique ?",
        options: [
          "Rasoir électrique",
          "Four micro-onde",
          "Ventilateur",
          "Batterie",
        ],
        answer: 3,
        explanation:
          "La batterie convertit l'énergie chimique (réactions d'oxydoréduction) en énergie électrique. Le rasoir, le four et le ventilateur font le chemin inverse : électrique → mécanique/thermique.",
      },
    ],
  },
  {
    id: "ns4-maths-entrainement",
    year: 2024,
    level: "NS4",
    subject: "Mathématiques",
    source: "Entraînement",
    description:
      "Questions d'entraînement au niveau NS4. Algèbre avancée, trigonométrie et analyse.",
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
          "La dérivée de x^n est n·x^(n−1). Donc (3x²)' = 6x, (2x)' = 2, (−1)' = 0. Total : f'(x) = 6x + 2.",
      },
      {
        id: "q3",
        question: "sin(30°) est égal à :",
        options: ["√3/2", "1/2", "√2/2", "1"],
        answer: 1,
        explanation:
          "sin(30°) = 1/2. Valeurs remarquables : sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2.",
      },
      {
        id: "q4",
        question: "Si log₁₀(x) = 2, quelle est la valeur de x ?",
        options: ["2", "20", "100", "1 000"],
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
    id: "ns4-philo-entrainement",
    year: 2024,
    level: "NS4",
    subject: "Philosophie",
    source: "Entraînement",
    description:
      "Questions d'entraînement au niveau NS4. Grandes questions philosophiques et auteurs classiques.",
    questions: [
      {
        id: "q1",
        question:
          "Selon Descartes, quelle est la première certitude philosophique ?",
        options: [
          "L'existence de Dieu",
          "Le cogito : « Je pense, donc je suis »",
          "La réalité du monde extérieur",
          "La perfection de la raison",
        ],
        answer: 1,
        explanation:
          "Dans le « Discours de la Méthode », Descartes établit le cogito (cogito ergo sum) comme la première vérité indubitable, résistant au doute méthodique.",
      },
      {
        id: "q2",
        question:
          "Quel philosophe a dit : « L'homme est un animal politique » ?",
        options: ["Platon", "Socrate", "Aristote", "Rousseau"],
        answer: 2,
        explanation:
          "Aristote, dans « La Politique », affirme que l'homme est par nature un « animal politique » (zôon politikon) fait pour vivre en société organisée.",
      },
      {
        id: "q3",
        question:
          "La dialectique hégélienne comprend trois moments. Lesquels ?",
        options: [
          "Vérité, Mensonge, Synthèse",
          "Thèse, Antithèse, Synthèse",
          "Sujet, Objet, Prédicat",
          "Être, Néant, Devenir",
        ],
        answer: 1,
        explanation:
          "Hegel développe la dialectique en trois temps : la thèse (affirmation), l'antithèse (négation), et la synthèse (dépassement et reconciliation).",
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
          "Rousseau croit en la bonté naturelle de l'homme : c'est la société qui le corrompt. Il s'oppose ainsi à Hobbes qui voyait l'état de nature comme une guerre de tous contre tous.",
      },
      {
        id: "q5",
        question:
          "Le syllogisme : « Tous les hommes sont mortels. Socrate est un homme. Donc… »",
        options: [
          "Socrate est divin",
          "Socrate est mortel",
          "Tous les mortels sont des hommes",
          "Socrate n'est pas mortel",
        ],
        answer: 1,
        explanation:
          "C'est la forme classique du syllogisme aristotélicien : deux prémisses mènent à une conclusion logique nécessaire. Socrate est mortel.",
      },
    ],
  },
];
