export type Exercise = {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

export type Example = {
  title: string;
  content: string;
};

export type Chapter = {
  id: string;
  title: string;
  youtubeId?: string;
  youtubeSearch?: string;
  mp4Url?: string;
  summary: string;
  examples?: Example[];
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
  // ─── 1ère ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "lecture-1af",
    title: "Lecture et Écriture — Les Premières Lettres",
    subject: "Français",
    level: "1ère AF",
    description: "Apprendre à reconnaître les lettres, former des syllabes et lire ses premiers mots en français.",
    duration: "4 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les voyelles : A, E, I, O, U",
        youtubeSearch: "apprendre les voyelles maternelle CP lecture",
        summary:
          "Les voyelles sont les sons de base du français : A, E, I, O, U (et parfois Y). Chaque mot contient au moins une voyelle. Savoir les reconnaître permet de commencer à lire et à écrire.",
        examples: [
          {
            title: "Les voyelles dans des mots simples",
            content:
              "A → âne, ami\nE → élève, école\nI → île, ici\nO → oiseau, orange\nU → urne, un",
          },
        ],
        exercises: [
          {
            question: "Quelle lettre est une voyelle ?",
            options: ["B", "A", "D"],
            answer: 1,
            explanation: "A est une voyelle. B et D sont des consonnes.",
          },
          {
            question: "Combien de voyelles y a-t-il en français ?",
            options: ["3", "5", "7"],
            answer: 1,
            explanation: "Il y a 5 voyelles de base : A, E, I, O, U.",
          },
          {
            question: "Dans le mot 'école', quelle est la première lettre ?",
            options: ["C", "E", "O"],
            answer: 1,
            explanation: "Le mot 'école' commence par la voyelle E.",
          },
          {
            question: "Laquelle de ces lettres est une voyelle ?",
            options: ["M", "L", "U"],
            answer: 2,
            explanation: "U est une voyelle.",
          },
          {
            question: "Quel mot commence par la voyelle 'I' ?",
            options: ["Lune", "Île", "Maison"],
            answer: 1,
            explanation: "'Île' commence par le son I.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Former des syllabes simples",
        youtubeSearch: "former syllabes lecture CP ba be bi bo bu",
        summary:
          "Une syllabe est un groupe de sons qu'on prononce ensemble. La syllabe la plus simple est une consonne + une voyelle : MA, PA, LI, TO… En combinant des syllabes, on forme des mots : 'ma-man', 'pa-pa', 'li-vre'.",
        examples: [
          {
            title: "Syllabes avec la consonne M",
            content:
              "M + A = MA (ma-man)\nM + E = ME (mé-tier)\nM + I = MI (mi-di)\nM + O = MO (mo-to)\nM + U = MU (mu-sique)",
          },
        ],
        exercises: [
          {
            question: "Quelle est la syllabe formée par P + A ?",
            options: ["AP", "PA", "PO"],
            answer: 1,
            explanation: "Consonne + voyelle = PA.",
          },
          {
            question: "Combien de syllabes a le mot 'ma-man' ?",
            options: ["1", "2", "3"],
            answer: 1,
            explanation: "'Ma-man' se divise en 2 syllabes : MA et MAN.",
          },
          {
            question: "Quel mot se lit 'BO-BI-NE' ?",
            options: ["bobine", "bateau", "ballon"],
            answer: 0,
            explanation: "BO-BI-NE donne le mot 'bobine'.",
          },
          {
            question: "La syllabe LI vient de :",
            options: ["L + U", "L + A", "L + I"],
            answer: 2,
            explanation: "L + I = LI.",
          },
          {
            question: "Combien de syllabes a le mot 'pa-pa' ?",
            options: ["1", "2", "3"],
            answer: 1,
            explanation: "'Pa-pa' a 2 syllabes : PA et PA.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Mes premiers mots",
        youtubeSearch: "lire premiers mots CP lecture apprendre",
        summary:
          "En assemblant des syllabes, on lit des mots entiers. Commence par les mots courts de 2 syllabes : MAMAN, PAPA, ÉCOLE, MAISON, LIVRE… Lis lentement puis de plus en plus vite jusqu'à reconnaître le mot d'un coup.",
        examples: [
          {
            title: "Mots à 2 syllabes",
            content:
              "MA-MAN → maman\nPA-PA → papa\nLI-VRE → livre\nÉ-CO-LE → école (3 syllabes)\nA-MI → ami",
          },
        ],
        exercises: [
          {
            question: "Quel mot forme les syllabes LI-VRE ?",
            options: ["vivre", "livre", "litre"],
            answer: 1,
            explanation: "LI-VRE = livre.",
          },
          {
            question: "Combien de syllabes a 'école' ?",
            options: ["2", "3", "4"],
            answer: 1,
            explanation: "É-CO-LE = 3 syllabes.",
          },
          {
            question: "Le mot 'ami' commence par :",
            options: ["Une consonne", "Une voyelle", "Un chiffre"],
            answer: 1,
            explanation: "'Ami' commence par la voyelle A.",
          },
          {
            question: "Quel est le mot formé par MA-I-SON ?",
            options: ["maison", "saison", "raison"],
            answer: 0,
            explanation: "MA-I-SON = maison.",
          },
        ],
      },
    ],
  },

  // ─── 2ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "math-2af",
    title: "Les Nombres et les Opérations",
    subject: "Mathématiques",
    level: "2ème AF",
    description: "Comprendre les nombres jusqu'à 100, apprendre à additionner et soustraire pour résoudre des petits problèmes du quotidien.",
    duration: "4 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Compter jusqu'à 100",
        youtubeSearch: "compter jusqu'à 100 CE1 mathématiques apprendre",
        summary:
          "Les nombres de 0 à 100 s'organisent en unités (1 à 9), dizaines (10, 20, 30…) et centaine (100). Comprendre la valeur des chiffres selon leur position est fondamental : dans 47, le 4 vaut 4 dizaines (40) et le 7 vaut 7 unités.",
        examples: [
          {
            title: "Les dizaines",
            content:
              "10 = dix\n20 = vingt\n30 = trente\n40 = quarante\n50 = cinquante\n60 = soixante\n70 = soixante-dix\n80 = quatre-vingts\n90 = quatre-vingt-dix\n100 = cent",
          },
        ],
        exercises: [
          {
            question: "Combien vaut le chiffre 3 dans 35 ?",
            options: ["3 unités", "3 dizaines", "3 centaines"],
            answer: 1,
            explanation: "Dans 35, le 3 est à la position des dizaines = 30.",
          },
          {
            question: "Quel nombre vient après 49 ?",
            options: ["48", "50", "59"],
            answer: 1,
            explanation: "49 + 1 = 50.",
          },
          {
            question: "Comment s'écrit 'soixante-cinq' en chiffres ?",
            options: ["56", "65", "75"],
            answer: 1,
            explanation: "Soixante-cinq = 65.",
          },
          {
            question: "Quel est le plus grand nombre : 72, 27, ou 70 ?",
            options: ["27", "70", "72"],
            answer: 2,
            explanation: "72 > 70 > 27.",
          },
          {
            question: "Combien y a-t-il de dizaines dans 80 ?",
            options: ["8", "80", "18"],
            answer: 0,
            explanation: "80 = 8 dizaines.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — L'addition",
        youtubeSearch: "addition CE1 cours apprendre calcul simple",
        summary:
          "Additionner c'est réunir deux quantités ensemble. Le signe de l'addition est '+'. Résultat = somme. Pour additionner de grands nombres, on aligne les unités sous les unités et les dizaines sous les dizaines, puis on additionne colonne par colonne en commençant par la droite.",
        examples: [
          {
            title: "Addition simple : 23 + 14",
            content:
              "Unités : 3 + 4 = 7\nDizaines : 2 + 1 = 3\nRésultat : 37",
          },
          {
            title: "Addition avec retenue : 27 + 15",
            content:
              "Unités : 7 + 5 = 12 → on écrit 2, on retient 1\nDizaines : 2 + 1 + 1 (retenue) = 4\nRésultat : 42",
          },
        ],
        exercises: [
          {
            question: "Combien fait 12 + 5 ?",
            options: ["17", "15", "125"],
            answer: 0,
            explanation: "12 + 5 = 17.",
          },
          {
            question: "Combien fait 34 + 21 ?",
            options: ["55", "53", "56"],
            answer: 0,
            explanation: "4+1=5 et 3+2=5, donc 55.",
          },
          {
            question: "Combien font 18 + 7 ?",
            options: ["24", "25", "27"],
            answer: 1,
            explanation: "8+7=15, on retient 1; 1+1=2 → 25.",
          },
          {
            question: "Quel est le résultat de 40 + 36 ?",
            options: ["76", "74", "66"],
            answer: 0,
            explanation: "0+6=6, 4+3=7 → 76.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La soustraction",
        youtubeSearch: "soustraction CE1 cours apprendre calcul simple",
        summary:
          "Soustraire c'est enlever une quantité d'une autre. Le signe est '−'. Résultat = différence. On soustrait de droite à gauche. Si le chiffre du bas est plus grand que celui du haut, on emprunte à la dizaine voisine.",
        examples: [
          {
            title: "Soustraction simple : 45 − 13",
            content:
              "Unités : 5 − 3 = 2\nDizaines : 4 − 1 = 3\nRésultat : 32",
          },
          {
            title: "Soustraction avec emprunt : 41 − 17",
            content:
              "Unités : 1 − 7 impossible → on emprunte : 11 − 7 = 4\nDizaines : (4−1) − 1 = 2\nRésultat : 24",
          },
        ],
        exercises: [
          {
            question: "Combien fait 15 − 7 ?",
            options: ["8", "7", "9"],
            answer: 0,
            explanation: "15 − 7 = 8.",
          },
          {
            question: "Combien fait 50 − 20 ?",
            options: ["70", "30", "20"],
            answer: 1,
            explanation: "50 − 20 = 30.",
          },
          {
            question: "Combien fait 43 − 18 ?",
            options: ["25", "26", "35"],
            answer: 0,
            explanation: "3−8 impossible, emprunt : 13−8=5; (4−1)−1=2 → 25.",
          },
          {
            question: "Jean avait 30 gourdes. Il en dépense 12. Combien reste-t-il ?",
            options: ["18", "42", "20"],
            answer: 0,
            explanation: "30 − 12 = 18 gourdes.",
          },
        ],
      },
    ],
  },

  // ─── 3ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "sciences-3af",
    title: "Découverte du Monde Vivant",
    subject: "Sciences Naturelles",
    level: "3ème AF",
    description: "Explorer les animaux, les plantes et les êtres vivants qui nous entourent en Haïti et dans le monde.",
    duration: "4 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les êtres vivants et les êtres non-vivants",
        youtubeSearch: "êtres vivants non vivants CE2 sciences cours",
        summary:
          "Un être vivant naît, se nourrit, grandit, se reproduit et meurt. Exemples : plante, animal, champignon, humain. Un objet non-vivant ne fait rien de tout cela. Exemples : pierre, voiture, eau, soleil.",
        examples: [
          {
            title: "Caractéristiques du vivant",
            content:
              "1. Naissance (ou germination pour les plantes)\n2. Nutrition (manger, boire)\n3. Croissance (grandir)\n4. Reproduction (avoir des petits ou des graines)\n5. Mort",
          },
        ],
        exercises: [
          {
            question: "Lequel est un être vivant ?",
            options: ["Une pierre", "Un manguier", "Une voiture"],
            answer: 1,
            explanation: "Le manguier naît, grandit, se nourrit et se reproduit.",
          },
          {
            question: "Quelle caractéristique NE définit PAS un être vivant ?",
            options: ["Se nourrir", "Briller", "Se reproduire"],
            answer: 1,
            explanation: "Briller n'est pas une caractéristique du vivant.",
          },
          {
            question: "Un oiseau est-il un être vivant ?",
            options: ["Non", "Oui", "Cela dépend"],
            answer: 1,
            explanation: "Oui, un oiseau naît, grandit, se reproduit et meurt.",
          },
          {
            question: "La mer est-elle un être vivant ?",
            options: ["Oui", "Non", "Parfois"],
            answer: 1,
            explanation: "La mer est de l'eau, elle n'a pas les caractéristiques du vivant.",
          },
          {
            question: "Combien de caractéristiques définissent les êtres vivants ?",
            options: ["2", "5", "10"],
            answer: 1,
            explanation: "Les 5 caractéristiques : naissance, nutrition, croissance, reproduction, mort.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les animaux : herbivores, carnivores, omnivores",
        youtubeSearch: "herbivore carnivore omnivore animaux cours primaire",
        summary:
          "On classe les animaux selon ce qu'ils mangent. Les herbivores mangent uniquement des plantes (vache, chèvre, lapin). Les carnivores mangent uniquement de la viande (lion, requin, aigle). Les omnivores mangent des plantes ET de la viande (cochon, ours, être humain).",
        examples: [
          {
            title: "Exemples haïtiens",
            content:
              "Herbivores : chèvre, vache, bœuf, lapin\nCarnivores : chat sauvage, requins (mer des Caraïbes), aigle\nOmnivores : cochon, poule, être humain",
          },
        ],
        exercises: [
          {
            question: "Un lion est :",
            options: ["Herbivore", "Carnivore", "Omnivore"],
            answer: 1,
            explanation: "Le lion mange uniquement de la viande.",
          },
          {
            question: "Une chèvre est :",
            options: ["Carnivore", "Herbivore", "Omnivore"],
            answer: 1,
            explanation: "La chèvre se nourrit d'herbe et de plantes.",
          },
          {
            question: "L'être humain est :",
            options: ["Herbivore", "Carnivore", "Omnivore"],
            answer: 2,
            explanation: "Nous mangeons des plantes ET de la viande.",
          },
          {
            question: "Un cochon mange :",
            options: ["Uniquement des plantes", "Uniquement de la viande", "Des plantes et de la viande"],
            answer: 2,
            explanation: "Le cochon est omnivore.",
          },
          {
            question: "Quel animal est herbivore ?",
            options: ["Requin", "Vache", "Chat"],
            answer: 1,
            explanation: "La vache mange de l'herbe.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Les plantes : racine, tige, feuilles, fleurs, fruit",
        youtubeSearch: "parties d'une plante racine tige feuille fleur fruit cours",
        summary:
          "Une plante possède plusieurs parties ayant chacune un rôle. La racine fixe la plante au sol et absorbe l'eau. La tige transporte la sève. Les feuilles fabriquent la nourriture grâce au soleil (photosynthèse). La fleur attire les insectes pour la reproduction. Le fruit protège les graines.",
        examples: [
          {
            title: "La plante de manguier",
            content:
              "Racines : s'enfoncent dans le sol haïtien pour puiser l'eau.\nTige/Tronc : transporte l'eau et les nutriments.\nFeuilles vertes : captent le soleil pour fabriquer la nourriture.\nFleurs blanches : attirent les abeilles.\nFruit : la mangue contient les graines.",
          },
        ],
        exercises: [
          {
            question: "Quelle partie de la plante absorbe l'eau du sol ?",
            options: ["La feuille", "La fleur", "La racine"],
            answer: 2,
            explanation: "La racine absorbe l'eau et les minéraux.",
          },
          {
            question: "Où a lieu la photosynthèse ?",
            options: ["Dans la racine", "Dans la feuille", "Dans la fleur"],
            answer: 1,
            explanation: "Les feuilles captent le soleil pour fabriquer la nourriture.",
          },
          {
            question: "Quel est le rôle de la fleur ?",
            options: ["Absorber l'eau", "Permettre la reproduction", "Stocker les nutriments"],
            answer: 1,
            explanation: "La fleur sert à la reproduction grâce aux insectes pollinisateurs.",
          },
          {
            question: "Le fruit protège :",
            options: ["Les racines", "Les feuilles", "Les graines"],
            answer: 2,
            explanation: "Le fruit renferme et protège les graines.",
          },
          {
            question: "La tige a pour rôle de :",
            options: ["Fabriquer la nourriture", "Transporter la sève", "Attirer les insectes"],
            answer: 1,
            explanation: "La tige transporte l'eau et les nutriments dans toute la plante.",
          },
        ],
      },
    ],
  },

  // ─── 4ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "geo-4af",
    title: "Géographie d'Haïti",
    subject: "Géographie",
    level: "4ème AF",
    description: "Découvrir la géographie physique et humaine d'Haïti : ses départements, ses rivières, ses montagnes et ses villes.",
    duration: "5 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Haïti dans les Caraïbes",
        youtubeSearch: "Haïti géographie Caraïbes situation île",
        summary:
          "Haïti est un pays insulaire situé dans la mer des Caraïbes. Il occupe la partie occidentale de l'île d'Hispaniola, dont la partie orientale est la République Dominicaine. Haïti est bordée au nord par l'océan Atlantique et au sud par la mer des Caraïbes.",
        examples: [
          {
            title: "Données essentielles",
            content:
              "Superficie : 27 750 km²\nPopulation : environ 11 millions d'habitants\nCapitale : Port-au-Prince\nVoisin : République Dominicaine (à l'est)\nLangues officielles : français et créole haïtien",
          },
        ],
        exercises: [
          {
            question: "Haïti se trouve dans :",
            options: ["L'océan Pacifique", "La mer des Caraïbes", "La Méditerranée"],
            answer: 1,
            explanation: "Haïti est une île de la mer des Caraïbes.",
          },
          {
            question: "Quel pays partage l'île d'Hispaniola avec Haïti ?",
            options: ["Cuba", "La Jamaïque", "La République Dominicaine"],
            answer: 2,
            explanation: "Haïti (ouest) et la RD (est) partagent l'île.",
          },
          {
            question: "Quelle est la capitale d'Haïti ?",
            options: ["Cap-Haïtien", "Port-au-Prince", "Les Cayes"],
            answer: 1,
            explanation: "Port-au-Prince est la capitale et la plus grande ville.",
          },
          {
            question: "Les langues officielles d'Haïti sont :",
            options: ["Espagnol et anglais", "Français et créole", "Créole seulement"],
            answer: 1,
            explanation: "La Constitution reconnaît le français et le créole haïtien.",
          },
          {
            question: "Quelle est la superficie d'Haïti ?",
            options: ["5 000 km²", "27 750 km²", "100 000 km²"],
            answer: 1,
            explanation: "Haïti mesure environ 27 750 km².",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les 10 départements d'Haïti",
        youtubeSearch: "départements d'Haïti géographie divisions administratives",
        summary:
          "Haïti est divisée en 10 départements, chacun avec un chef-lieu. Du nord au sud : Nord, Nord-Est, Nord-Ouest, Artibonite, Centre, Ouest, Nippes, Sud, Grand'Anse, Sud-Est. Le département de l'Ouest est le plus peuplé (Port-au-Prince).",
        examples: [
          {
            title: "Les 10 départements et leurs chefs-lieux",
            content:
              "Ouest → Port-au-Prince\nNord → Cap-Haïtien\nArtibonite → Gonaïves\nSud → Les Cayes\nGrand'Anse → Jérémie\nNord-Est → Fort-Liberté\nNord-Ouest → Port-de-Paix\nCentre → Hinche\nNippes → Miragoâne\nSud-Est → Jacmel",
          },
        ],
        exercises: [
          {
            question: "Combien de départements compte Haïti ?",
            options: ["8", "9", "10"],
            answer: 2,
            explanation: "Haïti compte 10 départements.",
          },
          {
            question: "Quel est le chef-lieu du département du Nord ?",
            options: ["Gonaïves", "Cap-Haïtien", "Port-de-Paix"],
            answer: 1,
            explanation: "Cap-Haïtien est le chef-lieu du Nord.",
          },
          {
            question: "Quel département a Gonaïves comme chef-lieu ?",
            options: ["Le Centre", "L'Artibonite", "Le Nord-Ouest"],
            answer: 1,
            explanation: "L'Artibonite a pour chef-lieu Gonaïves.",
          },
          {
            question: "Le département de l'Ouest a pour chef-lieu :",
            options: ["Jacmel", "Hinche", "Port-au-Prince"],
            answer: 2,
            explanation: "Port-au-Prince est la capitale et chef-lieu de l'Ouest.",
          },
          {
            question: "Jérémie est le chef-lieu de :",
            options: ["La Grand'Anse", "Du Sud", "Des Nippes"],
            answer: 0,
            explanation: "Jérémie est le chef-lieu du département de la Grand'Anse.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Les reliefs et les rivières d'Haïti",
        youtubeSearch: "relief montagne rivière Haïti géographie physique",
        summary:
          "Haïti est un pays très montagneux : plus de 60% du territoire est montagneux. Le Pic la Selle (2 680 m) est le point culminant. Les principales rivières sont l'Artibonite (la plus longue), la Rivière du Massacre et la Rivière Péligre. La plaine de l'Artibonite est le principal grenier du pays.",
        examples: [
          {
            title: "Points remarquables",
            content:
              "Plus haute montagne : Pic la Selle (2 680 m)\nPlus longue rivière : Artibonite (~320 km)\nPlus grande plaine : Plaine de l'Artibonite (grenier du pays, riziculture)\nPrincipaux lacs : lac Azuéï, lac Miragoâne",
          },
        ],
        exercises: [
          {
            question: "Quel est le point culminant d'Haïti ?",
            options: ["Pic Macaya", "Pic la Selle", "Morne la Hotte"],
            answer: 1,
            explanation: "Le Pic la Selle (2 680 m) est le plus haut sommet.",
          },
          {
            question: "Quelle est la plus longue rivière d'Haïti ?",
            options: ["La Rivière du Massacre", "L'Artibonite", "La Rivière des Trois Rivières"],
            answer: 1,
            explanation: "L'Artibonite, avec ~320 km, est la plus longue.",
          },
          {
            question: "La plaine de l'Artibonite est connue pour :",
            options: ["Le tourisme", "La riziculture et agriculture", "L'industrie"],
            answer: 1,
            explanation: "C'est le principal grenier d'Haïti grâce à la riziculture.",
          },
          {
            question: "Quel pourcentage du territoire haïtien est montagneux ?",
            options: ["20%", "40%", "60%"],
            answer: 2,
            explanation: "Plus de 60% du territoire est constitué de montagnes.",
          },
        ],
      },
    ],
  },

  // ─── 5ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "histoire-5af",
    title: "Histoire d'Haïti — Des origines à l'Indépendance",
    subject: "Histoire",
    level: "5ème AF",
    description: "Découvrir les Taïnos, la colonisation, l'esclavage et la Révolution haïtienne qui a conduit à l'indépendance en 1804.",
    duration: "5 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les Taïnos, premiers habitants",
        youtubeSearch: "Taïnos premiers habitants Haïti Hispaniola histoire",
        summary:
          "Avant l'arrivée des Européens, l'île d'Hispaniola (appelée Ayiti ou Quisqueya par les autochtones) était peuplée par les Taïnos, un peuple amérindien. Ils vivaient de l'agriculture (manioc, maïs), de la pêche et de la chasse. Christophe Colomb arrive en 1492 et marque le début de la colonisation.",
        examples: [
          {
            title: "La société taïno",
            content:
              "Chef (cacique), prêtres (bohiques), guerriers et paysans. Art des zemis (idoles), jeu de balle (batey), canoës. Langue : arawak. Ils ont donné de nombreux mots : hamac, ouragan, maïs, tabac, canoa.",
          },
        ],
        exercises: [
          {
            question: "Comment les Taïnos appelaient-ils leur île ?",
            options: ["Hispaniola", "Ayiti", "Caraïbe"],
            answer: 1,
            explanation: "Le nom 'Haïti' vient du mot taïno 'Ayiti' qui signifie 'terre des montagnes'.",
          },
          {
            question: "Qui est arrivé à Hispaniola en 1492 ?",
            options: ["Napoléon Bonaparte", "Christophe Colomb", "Toussaint Louverture"],
            answer: 1,
            explanation: "Christophe Colomb arrive le 5 décembre 1492.",
          },
          {
            question: "Quel était l'aliment de base des Taïnos ?",
            options: ["Le riz", "Le manioc", "Le blé"],
            answer: 1,
            explanation: "Le manioc était leur principal aliment, cultivé et transformé en cassave.",
          },
          {
            question: "Le chef d'un village taïno s'appelait :",
            options: ["Zemi", "Cacique", "Bohique"],
            answer: 1,
            explanation: "Le cacique était le chef politique et militaire.",
          },
          {
            question: "Lequel de ces mots vient de la langue taïno ?",
            options: ["École", "Hamac", "Livre"],
            answer: 1,
            explanation: "Le mot 'hamac' (hamaka en taïno) nous vient des Taïnos.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — L'esclavage et la traite négrière",
        youtubeSearch: "esclavage traite négrière Saint-Domingue Haïti histoire",
        summary:
          "Après l'extermination des Taïnos, les colonisateurs français ont importé des millions d'Africains réduits en esclavage pour travailler dans les plantations. Saint-Domingue (nom colonial d'Haïti) devint la colonie la plus riche du monde grâce au sucre, café et indigo produits par le travail forcé des esclaves.",
        examples: [
          {
            title: "La traite négrière",
            content:
              "Des navires négriers traversaient l'Atlantique (la 'traversée du milieu'). Les Africains étaient capturés, vendus et réduits en esclavage. Environ 800 000 esclaves africains vivaient à Saint-Domingue à la veille de la révolution (1789).",
          },
        ],
        exercises: [
          {
            question: "Quel était le nom colonial d'Haïti ?",
            options: ["La Martinique", "Saint-Domingue", "La Guadeloupe"],
            answer: 1,
            explanation: "La France nommait la colonie 'Saint-Domingue'.",
          },
          {
            question: "Pourquoi les colons amenaient-ils des Africains ?",
            options: ["Pour enseigner", "Pour travailler dans les plantations", "Pour commercer"],
            answer: 1,
            explanation: "Les esclaves africains travaillaient de force dans les plantations.",
          },
          {
            question: "Quelles cultures enrichissaient Saint-Domingue ?",
            options: ["Riz et blé", "Sucre, café et indigo", "Maïs et manioc"],
            answer: 1,
            explanation: "Le sucre, le café et l'indigo faisaient la richesse de la colonie.",
          },
          {
            question: "Comment appelle-t-on la traversée de l'Atlantique par les navires négriers ?",
            options: ["La traversée du milieu", "La route de l'or", "Le triangle atlantique"],
            answer: 0,
            explanation: "Cette traversée traumatisante est appelée 'la traversée du milieu'.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La Révolution haïtienne et l'indépendance (1791-1804)",
        youtubeSearch: "révolution haïtienne 1804 indépendance Toussaint Dessalines",
        summary:
          "La révolution éclate le 14 août 1791 avec la cérémonie du Bois-Caïman. Toussaint Louverture, Jean-Jacques Dessalines et Henri Christophe dirigent la lutte. Après avoir vaincu les armées françaises, anglaises et espagnoles, l'indépendance est proclamée le 1er janvier 1804 par Jean-Jacques Dessalines. Haïti devient la première République noire libre du monde.",
        examples: [
          {
            title: "Les grandes dates",
            content:
              "14 août 1791 : Cérémonie du Bois-Caïman\n1801 : Toussaint promulgue une Constitution\n1803 : Bataille de Vertières (victoire décisive)\n1er janvier 1804 : Proclamation de l'indépendance à Gonaïves\nJean-Jacques Dessalines : premier chef d'État d'Haïti",
          },
        ],
        exercises: [
          {
            question: "Quand Haïti a-t-elle proclamé son indépendance ?",
            options: ["1789", "1804", "1820"],
            answer: 1,
            explanation: "L'indépendance est proclamée le 1er janvier 1804.",
          },
          {
            question: "Qui a proclamé l'indépendance d'Haïti ?",
            options: ["Toussaint Louverture", "Jean-Jacques Dessalines", "Henri Christophe"],
            answer: 1,
            explanation: "Dessalines proclame l'indépendance à Gonaïves.",
          },
          {
            question: "La cérémonie du Bois-Caïman a eu lieu en :",
            options: ["1789", "1791", "1803"],
            answer: 1,
            explanation: "Le 14 août 1791, la révolution démarre par cette cérémonie.",
          },
          {
            question: "Haïti est le premier pays :",
            options: ["D'Amérique latine indépendant", "Où des esclaves ont fondé une République libre", "À abolir l'esclavage en Afrique"],
            answer: 1,
            explanation: "Haïti est la première République noire libre du monde.",
          },
          {
            question: "Quelle bataille décisive a eu lieu en 1803 ?",
            options: ["Crête-à-Pierrot", "Vertières", "Saint-Marc"],
            answer: 1,
            explanation: "La bataille de Vertières (18 novembre 1803) est la victoire finale contre Napoléon.",
          },
        ],
      },
    ],
  },

  // ─── 6ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "fr-grammaire-6af",
    title: "Grammaire Française — Le Groupe Nominal et Verbal",
    subject: "Français",
    level: "6ème AF",
    description: "Comprendre la structure de la phrase française : le groupe nominal, le groupe verbal, les classes grammaticales et la conjugaison.",
    duration: "5 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — La phrase et ses constituants",
        youtubeSearch: "groupe nominal verbal phrase français CM2 grammaire",
        summary:
          "Une phrase simple est composée d'un Groupe Nominal (GN) qui dit 'de quoi on parle' (le sujet) et d'un Groupe Verbal (GV) qui dit 'ce qu'il fait ou est' (le prédicat). Exemple : 'Le chat (GN) mange du poisson (GV)'.",
        examples: [
          {
            title: "Analyse de phrase",
            content:
              "Phrase : 'L'élève attentif lit son livre.'\nGN (sujet) : 'L'élève attentif' (article + nom + adjectif)\nGV (prédicat) : 'lit son livre' (verbe + complément)",
          },
        ],
        exercises: [
          {
            question: "Dans 'Marie chante une chanson', quel est le GN sujet ?",
            options: ["chante une chanson", "Marie", "une chanson"],
            answer: 1,
            explanation: "'Marie' est le groupe nominal sujet.",
          },
          {
            question: "Le groupe verbal contient toujours :",
            options: ["Un nom", "Un verbe", "Un adjectif"],
            answer: 1,
            explanation: "Le GV contient obligatoirement un verbe conjugué.",
          },
          {
            question: "Dans 'Les mangues mûres tombent', quel est le GN ?",
            options: ["tombent", "mûres tombent", "Les mangues mûres"],
            answer: 2,
            explanation: "'Les mangues mûres' est le groupe nominal sujet.",
          },
          {
            question: "Une phrase complète contient au minimum :",
            options: ["Un nom seul", "Un GN et un GV", "Trois mots"],
            answer: 1,
            explanation: "Une phrase minimale = GN sujet + GV prédicat.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les classes grammaticales",
        youtubeSearch: "classes grammaticales nom verbe adjectif adverbe cours grammaire",
        summary:
          "Chaque mot appartient à une classe grammaticale. Les principales : nom (désigne un être ou une chose), verbe (exprime une action ou un état), adjectif qualificatif (décrit le nom), adverbe (modifie le verbe), article (détermine le nom), pronom (remplace le nom).",
        examples: [
          {
            title: "Exemple d'analyse grammaticale",
            content:
              "Phrase : 'Le petit élève travaille très bien.'\nLe → article\npetit → adjectif qualificatif\nélève → nom commun\ntravaille → verbe\ntrès → adverbe\nbien → adverbe",
          },
        ],
        exercises: [
          {
            question: "Dans 'un grand bateau', quel est le nom ?",
            options: ["grand", "un", "bateau"],
            answer: 2,
            explanation: "'Bateau' est un nom commun.",
          },
          {
            question: "Quel mot est un adjectif dans 'une belle maison' ?",
            options: ["une", "belle", "maison"],
            answer: 1,
            explanation: "'Belle' est un adjectif qui qualifie 'maison'.",
          },
          {
            question: "L'adverbe modifie :",
            options: ["Le nom", "Le verbe ou l'adjectif", "L'article"],
            answer: 1,
            explanation: "L'adverbe modifie un verbe, un adjectif ou un autre adverbe.",
          },
          {
            question: "Quel est le verbe dans 'Les enfants jouent au football' ?",
            options: ["Les enfants", "jouent", "football"],
            answer: 1,
            explanation: "'Jouent' est le verbe conjugué.",
          },
          {
            question: "Un pronom sert à :",
            options: ["Décrire un nom", "Remplacer un nom", "Déterminer un nom"],
            answer: 1,
            explanation: "Le pronom remplace un nom pour éviter la répétition.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La conjugaison au présent de l'indicatif",
        youtubeSearch: "conjugaison présent indicatif verbes 1er 2e groupe cours",
        summary:
          "Au présent de l'indicatif, les verbes du 1er groupe (en -ER) se conjuguent avec les terminaisons : -e, -es, -e, -ons, -ez, -ent. Ex : 'je chante, tu chantes, il chante, nous chantons, vous chantez, ils chantent'. Les verbes du 2e groupe (en -IR) : -is, -is, -it, -issons, -issez, -issent.",
        examples: [
          {
            title: "PARLER (1er groupe)",
            content:
              "Je parle\nTu parles\nIl/Elle parle\nNous parlons\nVous parlez\nIls/Elles parlent",
          },
          {
            title: "FINIR (2e groupe)",
            content:
              "Je finis\nTu finis\nIl/Elle finit\nNous finissons\nVous finissez\nIls/Elles finissent",
          },
        ],
        exercises: [
          {
            question: "Conjuguez 'chanter' avec 'nous' au présent :",
            options: ["nous chantons", "nous chantez", "nous chantent"],
            answer: 0,
            explanation: "Nous + verbe en -ER → terminaison -ons : nous chantons.",
          },
          {
            question: "Conjuguez 'finir' avec 'ils' au présent :",
            options: ["ils finit", "ils finissent", "ils finiront"],
            answer: 1,
            explanation: "Ils + verbe en -IR → terminaison -issent : ils finissent.",
          },
          {
            question: "Quelle terminaison prend 'tu' avec un verbe en -ER ?",
            options: ["-e", "-es", "-ez"],
            answer: 1,
            explanation: "Tu chantes, tu manges, tu parles → terminaison -es.",
          },
          {
            question: "Quel est le groupe du verbe 'travailler' ?",
            options: ["1er groupe (-ER)", "2e groupe (-IR)", "3e groupe"],
            answer: 0,
            explanation: "'Travailler' se termine par -ER → 1er groupe.",
          },
        ],
      },
    ],
  },

  // ─── 7ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "math-7af",
    title: "Fractions et Proportionnalité",
    subject: "Mathématiques",
    level: "7ème AF",
    description: "Maîtriser les fractions, les pourcentages et la proportionnalité pour résoudre des problèmes pratiques de la vie quotidienne.",
    duration: "6 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les fractions",
        youtubeSearch: "fractions cours 5ème simplifier additionner soustraire",
        summary:
          "Une fraction a/b représente a parties sur b parties égales d'un tout. Le numérateur (a) est en haut, le dénominateur (b) est en bas. Pour additionner deux fractions, on les ramène au même dénominateur (PPCM). Pour multiplier, on multiplie numérateurs entre eux et dénominateurs entre eux.",
        examples: [
          {
            title: "Addition de fractions : 1/3 + 1/6",
            content:
              "PPCM(3,6) = 6\n1/3 = 2/6\n2/6 + 1/6 = 3/6 = 1/2",
          },
          {
            title: "Multiplication : 2/3 × 3/4",
            content:
              "(2×3)/(3×4) = 6/12 = 1/2",
          },
        ],
        exercises: [
          {
            question: "Quelle fraction est égale à 2/4 ?",
            options: ["1/2", "1/3", "3/4"],
            answer: 0,
            explanation: "2/4 = 1/2 (on divise numérateur et dénominateur par 2).",
          },
          {
            question: "Combien font 1/4 + 1/4 ?",
            options: ["2/8", "1/2", "2/4"],
            answer: 1,
            explanation: "1/4 + 1/4 = 2/4 = 1/2.",
          },
          {
            question: "Combien font 2/3 × 3/5 ?",
            options: ["6/15", "2/5", "Les deux réponses"],
            answer: 2,
            explanation: "2/3 × 3/5 = 6/15 = 2/5 (simplifiée). Les deux sont correctes.",
          },
          {
            question: "Quelle est la valeur de 3/4 en décimal ?",
            options: ["0,34", "0,75", "0,43"],
            answer: 1,
            explanation: "3 ÷ 4 = 0,75.",
          },
          {
            question: "Combien font 1/2 + 1/3 ?",
            options: ["2/5", "5/6", "3/6"],
            answer: 1,
            explanation: "PPCM(2,3)=6 : 3/6 + 2/6 = 5/6.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les pourcentages",
        youtubeSearch: "pourcentages cours 5ème calcul problèmes",
        summary:
          "Un pourcentage exprime une fraction de 100. x% = x/100. Pour calculer x% d'une valeur N : on fait N × x/100. Exemple : 20% de 500 = 500 × 20/100 = 100. Les pourcentages s'utilisent partout : réductions en magasin, notes scolaires, taux d'intérêt…",
        examples: [
          {
            title: "Réduction de 15% sur 800 gourdes",
            content:
              "Réduction = 800 × 15/100 = 800 × 0,15 = 120 gourdes\nPrix final = 800 − 120 = 680 gourdes",
          },
          {
            title: "Convertir une fraction en pourcentage",
            content:
              "3/5 = ? %\n3/5 × 100 = 300/5 = 60%",
          },
        ],
        exercises: [
          {
            question: "Combien font 10% de 200 ?",
            options: ["20", "10", "2"],
            answer: 0,
            explanation: "200 × 10/100 = 20.",
          },
          {
            question: "Un article coûte 1000 gourdes. Réduction de 25%. Prix final ?",
            options: ["750 gourdes", "800 gourdes", "250 gourdes"],
            answer: 0,
            explanation: "25% de 1000 = 250 gourdes. Prix = 1000 − 250 = 750.",
          },
          {
            question: "Combien font 50% de 80 ?",
            options: ["40", "50", "30"],
            answer: 0,
            explanation: "50% = 1/2. La moitié de 80 = 40.",
          },
          {
            question: "Convertir 3/4 en pourcentage :",
            options: ["34%", "75%", "43%"],
            answer: 1,
            explanation: "3/4 × 100 = 75%.",
          },
          {
            question: "Quel pourcentage représente 30 sur 120 ?",
            options: ["30%", "25%", "40%"],
            answer: 1,
            explanation: "30/120 × 100 = 25%.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La proportionnalité",
        youtubeSearch: "proportionnalité tableau cours 5ème règle de trois",
        summary:
          "Deux grandeurs sont proportionnelles si leur rapport est constant (coefficient de proportionnalité). On utilise la règle de trois (produit en croix) pour trouver un terme manquant. Exemples concrets : recette de cuisine, vitesse/distance, conversions de monnaie.",
        examples: [
          {
            title: "Règle de trois : recette",
            content:
              "Pour 4 personnes → 200 g de farine\nPour 6 personnes → x g ?\nProduit en croix : x = (200 × 6) / 4 = 1200/4 = 300 g",
          },
          {
            title: "Conversion de devises",
            content:
              "1 dollar = 130 gourdes\n45 dollars = ?\nx = 45 × 130 = 5850 gourdes",
          },
        ],
        exercises: [
          {
            question: "Si 5 cahiers coûtent 100 gourdes, combien coûtent 8 cahiers ?",
            options: ["150 gourdes", "160 gourdes", "180 gourdes"],
            answer: 1,
            explanation: "Produit en croix : x = (100 × 8) / 5 = 160 gourdes.",
          },
          {
            question: "Une voiture roule 240 km en 3h. Combien en 5h à la même vitesse ?",
            options: ["400 km", "350 km", "480 km"],
            answer: 0,
            explanation: "x = (240 × 5) / 3 = 400 km.",
          },
          {
            question: "Pour 2 kg de riz on paye 80 gourdes. Combien pour 5 kg ?",
            options: ["200 gourdes", "150 gourdes", "180 gourdes"],
            answer: 0,
            explanation: "x = (80 × 5) / 2 = 200 gourdes.",
          },
          {
            question: "Deux grandeurs sont proportionnelles si :",
            options: ["Leur somme est constante", "Leur rapport est constant", "Leur différence est constante"],
            answer: 1,
            explanation: "En proportionnalité, le coefficient (y/x) reste constant.",
          },
        ],
      },
    ],
  },

  // ─── 8ème ANNÉE FONDAMENTALE ─────────────────────────────────────────────
  {
    id: "physique-8af",
    title: "Physique — Forces, Mouvement et Énergie",
    subject: "Physique",
    level: "8ème AF",
    description: "Découvrir les notions fondamentales de physique : forces, mouvement, énergie et électricité, avec des applications du quotidien.",
    duration: "6 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les forces et leurs effets",
        youtubeSearch: "forces physique cours 4ème poids poussée frottement",
        summary:
          "Une force est une action exercée sur un objet qui peut le mettre en mouvement, l'arrêter ou déformer sa forme. Les forces courantes : le poids (attraction terrestre), la réaction du support (normale), le frottement, la poussée d'Archimède. Une force est caractérisée par son point d'application, sa direction, son sens et son intensité (en Newton).",
        examples: [
          {
            title: "Le poids",
            content:
              "P = m × g\nOù m = masse en kg et g = 9,8 N/kg (pesanteur terrestre).\nExemple : Un sac de 5 kg pèse 5 × 9,8 = 49 N sur Terre.",
          },
        ],
        exercises: [
          {
            question: "L'unité de mesure d'une force est :",
            options: ["Le kilogramme", "Le Newton", "Le Joule"],
            answer: 1,
            explanation: "Les forces se mesurent en Newtons (N).",
          },
          {
            question: "Quel est le poids d'un objet de 10 kg (g = 9,8 N/kg) ?",
            options: ["10 N", "98 N", "980 N"],
            answer: 1,
            explanation: "P = 10 × 9,8 = 98 N.",
          },
          {
            question: "Le frottement a tendance à :",
            options: ["Accélérer les objets", "Ralentir les objets", "N'avoir aucun effet"],
            answer: 1,
            explanation: "Le frottement s'oppose au mouvement et ralentit les objets.",
          },
          {
            question: "Quelle force explique qu'un bouchon flotte sur l'eau ?",
            options: ["La pesanteur", "La poussée d'Archimède", "Le frottement"],
            answer: 1,
            explanation: "La poussée d'Archimède est la force verticale ascendante exercée par l'eau.",
          },
          {
            question: "Une force est représentée par :",
            options: ["Un cercle", "Un vecteur (flèche)", "Un point"],
            answer: 1,
            explanation: "Une force est représentée par un vecteur avec direction, sens et intensité.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les états de la matière et les changements",
        youtubeSearch: "états matière solide liquide gaz changements physique cours",
        summary:
          "La matière existe en trois états : solide (forme fixe, volume fixe), liquide (forme variable, volume fixe) et gazeux (forme et volume variables). Les changements d'état : fusion (solide→liquide), solidification (liquide→solide), vaporisation (liquide→gaz), condensation (gaz→liquide), sublimation (solide→gaz).",
        examples: [
          {
            title: "L'eau et ses trois états",
            content:
              "Solide : glace (0°C et moins)\nLiquide : eau entre 0°C et 100°C\nGazeux : vapeur d'eau (au-dessus de 100°C)\nFusion de la glace : à exactement 0°C\nÉbullition de l'eau : à 100°C (pression normale)",
          },
        ],
        exercises: [
          {
            question: "À quelle température l'eau bout-elle à pression normale ?",
            options: ["50°C", "100°C", "0°C"],
            answer: 1,
            explanation: "L'eau bout à 100°C.",
          },
          {
            question: "Le passage de liquide à gaz s'appelle :",
            options: ["Fusion", "Vaporisation", "Condensation"],
            answer: 1,
            explanation: "Liquide → Gaz = vaporisation (ou ébullition).",
          },
          {
            question: "Un solide a :",
            options: ["Une forme et un volume variables", "Une forme fixe et un volume fixe", "Une forme variable et un volume fixe"],
            answer: 1,
            explanation: "Un solide conserve sa forme et son volume.",
          },
          {
            question: "La solidification est le passage de :",
            options: ["Solide à liquide", "Gaz à liquide", "Liquide à solide"],
            answer: 2,
            explanation: "Liquide → Solide = solidification.",
          },
          {
            question: "Quel état la vapeur d'eau représente-t-elle ?",
            options: ["Solide", "Liquide", "Gazeux"],
            answer: 2,
            explanation: "La vapeur d'eau est l'eau à l'état gazeux.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — L'électricité : circuit simple",
        youtubeSearch: "circuit électrique simple pile ampoule cours physique",
        summary:
          "Un circuit électrique simple comprend une source d'énergie (pile), des conducteurs (fils), un récepteur (ampoule) et souvent un interrupteur. Le courant électrique circule du pôle + de la pile vers le pôle −. Les composants en série partagent le même courant. En parallèle, ils partagent la même tension.",
        examples: [
          {
            title: "Loi d'Ohm",
            content:
              "U = R × I\nU = tension en Volts (V)\nR = résistance en Ohms (Ω)\nI = intensité en Ampères (A)\nExemple : Si R = 10 Ω et I = 0,5 A, alors U = 10 × 0,5 = 5 V",
          },
        ],
        exercises: [
          {
            question: "Pour qu'un circuit soit fermé (ampoule allumée), il faut :",
            options: ["Un circuit ouvert", "Un circuit continu sans interruption", "Une seule pile"],
            answer: 1,
            explanation: "Le courant doit pouvoir circuler en boucle sans interruption.",
          },
          {
            question: "L'unité de tension électrique est :",
            options: ["L'Ampère", "Le Volt", "L'Ohm"],
            answer: 1,
            explanation: "La tension se mesure en Volts (V).",
          },
          {
            question: "Si U = 12V et R = 6Ω, quelle est l'intensité I ?",
            options: ["2 A", "6 A", "72 A"],
            answer: 0,
            explanation: "I = U/R = 12/6 = 2 A (loi d'Ohm).",
          },
          {
            question: "Un interrupteur ouvert :",
            options: ["Laisse passer le courant", "Coupe le circuit", "Double le courant"],
            answer: 1,
            explanation: "Un interrupteur ouvert coupe le circuit, l'ampoule s'éteint.",
          },
        ],
      },
    ],
  },

  // ─── 9ème ANNÉE FONDAMENTALE (existant) ──────────────────────────────────
  {
    id: "math-9af",
    title: "Algèbre et Géométrie Fondamentales",
    subject: "Mathématiques",
    level: "9ème AF",
    description: "Maîtrisez les bases de l'algèbre et de la géométrie pour réussir les examens de 9e année fondamentale.",
    duration: "8 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Les équations du premier degré",
        youtubeId: "wradXIoN-MU",
        youtubeSearch: "équation premier degré collège explication simple",
        mp4Url: "lessons/equation-premier-degre.mp4",
        summary:
          "Une équation du premier degré est une égalité contenant une inconnue (souvent x) à la puissance 1. Pour la résoudre, on isole la variable des deux côtés du signe égal en utilisant les opérations inverses (addition/soustraction puis multiplication/division).",
        examples: [
          {
            title: "Exemple 1 : Résoudre 2x + 3 = 11",
            content:
              "Étape 1 : on enlève 3 des deux côtés → 2x = 11 - 3 → 2x = 8.\nÉtape 2 : on divise par 2 des deux côtés → x = 8 / 2 → x = 4.\nVérification : 2(4) + 3 = 8 + 3 = 11. ✓",
          },
          {
            title: "Exemple 2 : Résoudre 5x - 7 = 3x + 9",
            content:
              "Étape 1 : on regroupe les x à gauche → 5x - 3x = 9 + 7 → 2x = 16.\nÉtape 2 : on divise par 2 → x = 8.\nVérification : 5(8) - 7 = 33 et 3(8) + 9 = 33. ✓",
          },
        ],
        exercises: [
          {
            question: "Résoudre : 2x + 4 = 10",
            options: ["x = 2", "x = 3", "x = 4"],
            answer: 1,
            explanation: "2x = 10 - 4 = 6, donc x = 6 / 2 = 3.",
          },
          {
            question: "Résoudre : 5y = 25",
            options: ["y = 5", "y = 10", "y = 20"],
            answer: 0,
            explanation: "On divise les deux côtés par 5 : y = 25 / 5 = 5.",
          },
          {
            question: "Résoudre : x - 7 = 12",
            options: ["x = 5", "x = 19", "x = -5"],
            answer: 1,
            explanation: "On ajoute 7 des deux côtés : x = 12 + 7 = 19.",
          },
          {
            question: "Résoudre : 3x + 5 = 2x + 11",
            options: ["x = 6", "x = 16", "x = 3"],
            answer: 0,
            explanation: "3x - 2x = 11 - 5, donc x = 6.",
          },
          {
            question: "Résoudre : 4(x - 1) = 12",
            options: ["x = 2", "x = 3", "x = 4"],
            answer: 2,
            explanation: "On distribue : 4x - 4 = 12, puis 4x = 16, donc x = 4.",
          },
          {
            question: "Résoudre : 2x + 3 = 3x - 5",
            options: ["x = 8", "x = -8", "x = 2"],
            answer: 0,
            explanation: "3 + 5 = 3x - 2x → 8 = x.",
          },
          {
            question: "Combien vaut x si x/3 = 7 ?",
            options: ["x = 21", "x = 10", "x = 4"],
            answer: 0,
            explanation: "On multiplie les deux côtés par 3 : x = 7 × 3 = 21.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les inéquations du premier degré",
        youtubeSearch: "inéquation premier degré cours collège",
        summary:
          "Une inéquation est une inégalité (avec <, >, ≤, ≥) contenant une inconnue. Les règles sont presque les mêmes que pour les équations, sauf qu'il faut INVERSER le sens du signe quand on multiplie ou divise par un nombre négatif.",
        examples: [
          {
            title: "Exemple 1 : Résoudre 3x + 2 < 14",
            content:
              "3x < 14 - 2 → 3x < 12 → x < 4.\nLa solution est l'ensemble des nombres strictement inférieurs à 4.",
          },
          {
            title: "Exemple 2 : Résoudre -2x ≥ 6",
            content:
              "On divise par -2, donc on inverse le signe : x ≤ 6 / -2 → x ≤ -3.\nAttention au changement de sens de l'inégalité !",
          },
        ],
        exercises: [
          {
            question: "Résoudre : x + 5 > 9",
            options: ["x > 4", "x > 14", "x < 4"],
            answer: 0,
            explanation: "On enlève 5 : x > 9 - 5 → x > 4.",
          },
          {
            question: "Résoudre : 2x ≤ 10",
            options: ["x ≤ 5", "x ≥ 5", "x ≤ 20"],
            answer: 0,
            explanation: "On divise par 2 (positif, pas d'inversion) : x ≤ 5.",
          },
          {
            question: "Résoudre : -3x < 12",
            options: ["x < -4", "x > -4", "x > 4"],
            answer: 1,
            explanation: "On divise par -3 et on inverse le signe : x > -4.",
          },
          {
            question: "Résoudre : 4x - 7 ≥ 5",
            options: ["x ≥ 3", "x ≤ 3", "x ≥ -3"],
            answer: 0,
            explanation: "4x ≥ 12, donc x ≥ 3.",
          },
          {
            question: "Résoudre : 2x + 1 < x + 6",
            options: ["x < 5", "x > 5", "x < 7"],
            answer: 0,
            explanation: "2x - x < 6 - 1 → x < 5.",
          },
          {
            question: "Quelle valeur ne vérifie PAS x > 2 ?",
            options: ["3", "5", "1"],
            answer: 2,
            explanation: "1 n'est pas strictement supérieur à 2.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Le théorème de Pythagore",
        youtubeId: "QP3CHQCSUD4",
        youtubeSearch: "théorème de Pythagore explication simple",
        summary:
          "Dans un triangle rectangle, le carré de l'hypoténuse (le plus long côté, opposé à l'angle droit) est égal à la somme des carrés des deux autres côtés : a² + b² = c². Ce théorème permet de calculer une longueur manquante.",
        examples: [
          {
            title: "Exemple 1 : Triangle de côtés 3 et 4",
            content:
              "On cherche c (hypoténuse) : c² = 3² + 4² = 9 + 16 = 25, donc c = √25 = 5.",
          },
          {
            title: "Exemple 2 : Trouver un côté manquant",
            content:
              "Si l'hypoténuse mesure 13 et un côté mesure 5, alors : 5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.",
          },
        ],
        exercises: [
          {
            question: "Si a = 3 et b = 4, quelle est l'hypoténuse c ?",
            options: ["5", "6", "7"],
            answer: 0,
            explanation: "c² = 9 + 16 = 25, donc c = 5.",
          },
          {
            question: "Si a = 6 et b = 8, quelle est l'hypoténuse c ?",
            options: ["10", "12", "14"],
            answer: 0,
            explanation: "c² = 36 + 64 = 100, donc c = 10.",
          },
          {
            question: "Si l'hypoténuse vaut 13 et un côté vaut 5, l'autre côté vaut :",
            options: ["7", "12", "8"],
            answer: 1,
            explanation: "b² = 169 - 25 = 144, donc b = 12.",
          },
          {
            question: "Le théorème de Pythagore s'applique uniquement :",
            options: ["À tous les triangles", "Aux triangles rectangles", "Aux triangles équilatéraux"],
            answer: 1,
            explanation: "Il faut un angle droit (90°) dans le triangle.",
          },
          {
            question: "Si a = 5 et b = 12, quelle est l'hypoténuse ?",
            options: ["13", "17", "15"],
            answer: 0,
            explanation: "c² = 25 + 144 = 169, donc c = 13.",
          },
          {
            question: "L'hypoténuse est :",
            options: ["Le plus court côté", "Le côté opposé à l'angle droit", "N'importe quel côté"],
            answer: 1,
            explanation: "L'hypoténuse est toujours le côté face à l'angle droit, et c'est le plus long.",
          },
        ],
      },
      {
        id: "c4",
        title: "Chapitre 4 — Le théorème de Thalès",
        youtubeSearch: "théorème de Thalès explication simple",
        summary:
          "Quand deux droites parallèles coupent deux droites sécantes, elles déterminent des segments proportionnels. C'est l'outil principal pour calculer des longueurs dans des configurations de triangles imbriqués.",
        examples: [
          {
            title: "Exemple : Configuration triangle",
            content:
              "Soient (BC) // (DE). Si AB = 4, AD = 6 et AC = 5, alors AE = (AC × AD) / AB = (5 × 6) / 4 = 7,5.",
          },
        ],
        exercises: [
          {
            question: "Le théorème de Thalès demande que deux droites soient :",
            options: ["Perpendiculaires", "Parallèles", "Sécantes"],
            answer: 1,
            explanation: "Les deux droites coupant les sécantes doivent être parallèles.",
          },
          {
            question: "Si AB/AD = 2/3 et AC = 4, alors AE vaut :",
            options: ["6", "8", "3"],
            answer: 0,
            explanation: "AC/AE = 2/3, donc AE = (4 × 3) / 2 = 6.",
          },
          {
            question: "Thalès permet de calculer :",
            options: ["Des aires", "Des longueurs proportionnelles", "Des angles"],
            answer: 1,
            explanation: "C'est un théorème de proportionnalité des longueurs.",
          },
          {
            question: "Dans Thalès, quelle est l'égalité correcte ?",
            options: ["AB/AD = AC/AE = BC/DE", "AB + AD = AC + AE", "AB × AD = AC × AE"],
            answer: 0,
            explanation: "Les rapports des longueurs correspondantes sont égaux.",
          },
          {
            question: "Si AB = 3, AD = 9 et BC = 2, alors DE vaut :",
            options: ["6", "5", "4"],
            answer: 0,
            explanation: "DE = (BC × AD) / AB = (2 × 9) / 3 = 6.",
          },
        ],
      },
    ],
  },

  // ─── SECONDE ─────────────────────────────────────────────────────────────
  {
    id: "math-seconde",
    title: "Fonctions et Statistiques",
    subject: "Mathématiques",
    level: "Seconde",
    description: "Étudier les fonctions numériques, les représentations graphiques et les statistiques descriptives au niveau Seconde.",
    duration: "8 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Notion de fonction",
        youtubeSearch: "notion de fonction seconde mathématiques cours image antécédent",
        summary:
          "Une fonction f associe à tout réel x (du domaine de définition) un unique réel f(x) (image). On note y = f(x). L'image de x par f est f(x). L'antécédent de y est la valeur x telle que f(x) = y. La représentation graphique d'une fonction est sa courbe dans un repère.",
        examples: [
          {
            title: "Exemple avec f(x) = 2x + 1",
            content:
              "f(3) = 2(3) + 1 = 7 → l'image de 3 est 7.\nSi f(x) = 9 : 2x + 1 = 9 → 2x = 8 → x = 4 → 4 est l'antécédent de 9.",
          },
        ],
        exercises: [
          {
            question: "Pour f(x) = 3x − 2, quelle est f(4) ?",
            options: ["10", "12", "14"],
            answer: 0,
            explanation: "f(4) = 3(4) − 2 = 12 − 2 = 10.",
          },
          {
            question: "Pour f(x) = x² − 1, quelle est f(3) ?",
            options: ["8", "6", "10"],
            answer: 0,
            explanation: "f(3) = 9 − 1 = 8.",
          },
          {
            question: "L'antécédent de 7 par f(x) = x + 3 est :",
            options: ["10", "4", "7"],
            answer: 1,
            explanation: "f(x) = 7 → x + 3 = 7 → x = 4.",
          },
          {
            question: "Que représente f(x) graphiquement ?",
            options: ["La pente", "L'ordonnée du point d'abscisse x", "L'abscisse"],
            answer: 1,
            explanation: "f(x) est l'ordonnée (y) du point de la courbe ayant pour abscisse x.",
          },
          {
            question: "Une fonction associe à chaque x :",
            options: ["Plusieurs images", "Un unique réel f(x)", "Zéro ou une image"],
            answer: 1,
            explanation: "Par définition, une fonction donne une seule image pour chaque x.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — La fonction affine y = ax + b",
        youtubeSearch: "fonction affine droite ax+b cours seconde coefficient directeur",
        summary:
          "Une fonction affine a la forme f(x) = ax + b. Sa représentation graphique est une droite. 'a' est le coefficient directeur (pente) : si a > 0 la droite monte, si a < 0 elle descend. 'b' est l'ordonnée à l'origine (où la droite coupe l'axe des y).",
        examples: [
          {
            title: "Tracer y = 2x − 1",
            content:
              "b = −1 → point (0 ; −1) sur l'axe des y.\na = 2 : pour x = 1, y = 2(1) − 1 = 1 → point (1 ; 1).\nOn trace la droite passant par (0 ; −1) et (1 ; 1).",
          },
        ],
        exercises: [
          {
            question: "Pour f(x) = 3x + 2, quelle est l'ordonnée à l'origine ?",
            options: ["3", "2", "5"],
            answer: 1,
            explanation: "b = 2 est l'ordonnée à l'origine.",
          },
          {
            question: "Si le coefficient directeur est négatif, la droite :",
            options: ["Monte de gauche à droite", "Est horizontale", "Descend de gauche à droite"],
            answer: 2,
            explanation: "a < 0 → la droite décroît (descend).",
          },
          {
            question: "Quel est le coefficient directeur de y = −4x + 7 ?",
            options: ["7", "−4", "4"],
            answer: 1,
            explanation: "a = −4.",
          },
          {
            question: "Deux droites y = 2x + 1 et y = 2x − 3 sont :",
            options: ["Perpendiculaires", "Parallèles", "Sécantes"],
            answer: 1,
            explanation: "Même coefficient directeur (a = 2) → droites parallèles.",
          },
          {
            question: "La droite y = 5 est :",
            options: ["Une droite oblique", "Une droite horizontale", "Une droite verticale"],
            answer: 1,
            explanation: "y = 5 (a = 0) est une droite horizontale.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Statistiques descriptives",
        youtubeSearch: "statistiques descriptives moyenne médiane mode cours seconde",
        summary:
          "Les statistiques permettent d'analyser des données. Les mesures de tendance centrale : moyenne (somme/effectif), médiane (valeur centrale quand on trie), mode (valeur la plus fréquente). Les mesures de dispersion : étendue (max − min), variance, écart-type.",
        examples: [
          {
            title: "Notes d'un élève : 8, 12, 15, 10, 12, 14",
            content:
              "Moyenne : (8+12+15+10+12+14)/6 = 71/6 ≈ 11,8\nTri : 8, 10, 12, 12, 14, 15\nMédiane : (12+12)/2 = 12\nMode : 12 (apparaît 2 fois)\nÉtendue : 15 − 8 = 7",
          },
        ],
        exercises: [
          {
            question: "Quelle est la moyenne de : 4, 8, 6, 10, 2 ?",
            options: ["6", "8", "5"],
            answer: 0,
            explanation: "(4+8+6+10+2)/5 = 30/5 = 6.",
          },
          {
            question: "Quelle est la médiane de : 1, 3, 5, 7, 9 ?",
            options: ["3", "5", "7"],
            answer: 1,
            explanation: "La valeur centrale de 5 données triées est la 3e : 5.",
          },
          {
            question: "Le mode de : 2, 3, 3, 5, 7, 3, 8 est :",
            options: ["2", "5", "3"],
            answer: 2,
            explanation: "3 apparaît 3 fois, c'est la valeur la plus fréquente.",
          },
          {
            question: "L'étendue de : 4, 17, 8, 3, 12 est :",
            options: ["14", "13", "17"],
            answer: 0,
            explanation: "Étendue = max − min = 17 − 3 = 14.",
          },
          {
            question: "Que mesure l'écart-type ?",
            options: ["La valeur centrale", "La dispersion autour de la moyenne", "Le maximum des données"],
            answer: 1,
            explanation: "L'écart-type mesure combien les données s'éloignent de la moyenne.",
          },
        ],
      },
    ],
  },

  // ─── RHÉTORIQUE ──────────────────────────────────────────────────────────
  {
    id: "fr-rheto",
    title: "Dissertation et Argumentation",
    subject: "Français",
    level: "Rhétorique",
    description: "Maîtriser l'art de la dissertation française, de l'argumentation et de l'analyse de texte pour le baccalauréat.",
    duration: "8 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — La dissertation littéraire",
        youtubeSearch: "dissertation littéraire méthode plan introduction développement conclusion",
        summary:
          "La dissertation est un exercice de réflexion organisée sur un sujet donné. Elle comprend une introduction (accroche, présentation du sujet, problématique, annonce du plan), un développement (2 ou 3 parties avec arguments et exemples) et une conclusion (bilan, ouverture). Le plan dialectique (thèse/antithèse/synthèse) est le plus courant.",
        examples: [
          {
            title: "Structure d'une bonne introduction",
            content:
              "1. Accroche (citation, anecdote, fait marquant)\n2. Présentation du sujet et définition des termes clés\n3. Problématique (question centrale)\n4. Annonce du plan (en deux ou trois parties)",
          },
          {
            title: "Plan dialectique",
            content:
              "I. Thèse : la position soutenue par le sujet\n   1.1 Argument 1 + exemple\n   1.2 Argument 2 + exemple\nII. Antithèse : la position contraire\n   2.1 Argument 1 + exemple\n   2.2 Argument 2 + exemple\nIII. Synthèse : dépassement des deux positions",
          },
        ],
        exercises: [
          {
            question: "Combien de parties comprend généralement une dissertation ?",
            options: ["1 seule", "2 ou 3", "5 ou 6"],
            answer: 1,
            explanation: "La dissertation comprend 2 ou 3 grandes parties dans le développement.",
          },
          {
            question: "La problématique d'une dissertation est :",
            options: ["La réponse au sujet", "La question centrale à laquelle le devoir répond", "Le résumé du sujet"],
            answer: 1,
            explanation: "La problématique est la question précise que le devoir cherche à résoudre.",
          },
          {
            question: "Dans le plan dialectique, l'antithèse :",
            options: ["Confirme la thèse", "S'oppose à la thèse", "Conclut le devoir"],
            answer: 1,
            explanation: "L'antithèse présente la position contraire à la thèse.",
          },
          {
            question: "Une bonne accroche peut être :",
            options: ["La question du sujet répétée", "Une citation, un fait ou une anecdote", "La définition du mot 'littérature'"],
            answer: 1,
            explanation: "L'accroche doit capter l'attention du lecteur dès le début.",
          },
          {
            question: "La conclusion doit obligatoirement contenir :",
            options: ["Un nouveau développement", "Un bilan et une ouverture", "L'énoncé du sujet"],
            answer: 1,
            explanation: "La conclusion récapitule le raisonnement et ouvre sur une question plus large.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — L'analyse de texte",
        youtubeSearch: "analyse de texte littéraire méthode commentaire composé lycée",
        summary:
          "L'analyse de texte (commentaire composé) consiste à étudier un texte littéraire selon un plan organisé. On identifie le genre, le registre, les procédés stylistiques (métaphore, antithèse, hyperbole, anaphore…) et on interprète leur effet sur le lecteur.",
        examples: [
          {
            title: "Figures de style essentielles",
            content:
              "Métaphore : comparaison sans 'comme' (ex: 'la vie est un voyage')\nSimile : comparaison avec 'comme' (ex: 'elle court comme le vent')\nAntithèse : opposition de deux idées (ex: 'lumière et ténèbres')\nAnaphore : répétition en début de vers/phrase\nHyperbole : exagération (ex: 'j'ai mille fois faim')",
          },
        ],
        exercises: [
          {
            question: "'Il était un géant' est un exemple de :",
            options: ["Antithèse", "Métaphore", "Anaphore"],
            answer: 1,
            explanation: "C'est une métaphore : comparaison directe sans 'comme'.",
          },
          {
            question: "L'anaphore est :",
            options: ["Une comparaison avec 'comme'", "La répétition d'un mot en début de phrase", "Une exagération"],
            answer: 1,
            explanation: "L'anaphore répète le même mot ou groupe au début de phrases successives.",
          },
          {
            question: "'J'ai attendu mille ans' est un exemple de :",
            options: ["Métaphore", "Antithèse", "Hyperbole"],
            answer: 2,
            explanation: "L'hyperbole est une exagération volontaire.",
          },
          {
            question: "Le registre tragique est associé à :",
            options: ["Le rire et la légèreté", "La mort, le destin fatal et la souffrance", "L'amour heureux"],
            answer: 1,
            explanation: "Le registre tragique évoque la fatalité, la souffrance et la mort.",
          },
          {
            question: "Que cherche-t-on à montrer dans un commentaire composé ?",
            options: ["Le résumé du texte", "Comment les procédés stylistiques servent le sens du texte", "La biographie de l'auteur"],
            answer: 1,
            explanation: "On analyse les procédés pour en interpréter les effets sur le lecteur.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La philosophie et la pensée critique",
        youtubeSearch: "introduction philosophie lycée conscience liberté bonheur cours",
        summary:
          "La philosophie questionne les grandes notions de l'existence humaine : la liberté, la conscience, le bonheur, la justice, le temps, la raison. Elle invite à ne jamais accepter une idée sans l'examiner. Philosopher c'est remettre en question l'évidence et chercher des définitions rigoureuses.",
        examples: [
          {
            title: "La notion de liberté",
            content:
              "Être libre, est-ce faire tout ce qu'on veut ? Non, car on est limité par la nature, la société, nos désirs mêmes. Pour Rousseau : 'L'homme est né libre et partout il est dans les fers.' Pour Sartre : 'Nous sommes condamnés à être libres'. La liberté véritable inclut la responsabilité.",
          },
        ],
        exercises: [
          {
            question: "La philosophie est avant tout :",
            options: ["Une accumulation de faits", "Un art de questionner et de réfléchir rigoureusement", "Une religion"],
            answer: 1,
            explanation: "Philosopher c'est examiner les idées avec méthode et rigueur.",
          },
          {
            question: "Qui a dit 'L'homme est né libre et partout il est dans les fers' ?",
            options: ["Sartre", "Rousseau", "Descartes"],
            answer: 1,
            explanation: "Jean-Jacques Rousseau, dans 'Du Contrat social' (1762).",
          },
          {
            question: "La conscience est :",
            options: ["Le fait de dormir", "La capacité de se représenter soi-même et le monde", "Un organe du corps"],
            answer: 1,
            explanation: "La conscience est la capacité de s'apercevoir de soi et de son environnement.",
          },
          {
            question: "Pour Sartre, 'être condamné à être libre' signifie :",
            options: ["Qu'on ne peut pas choisir", "Qu'on est toujours responsable de ses choix", "Qu'on est prisonnier"],
            answer: 1,
            explanation: "La liberté est inévitable : même ne pas choisir est un choix.",
          },
          {
            question: "La méthode philosophique de Socrate s'appelle :",
            options: ["La dialectique", "La maïeutique", "La rhétorique"],
            answer: 1,
            explanation: "La maïeutique consiste à faire accoucher les idées par le questionnement.",
          },
        ],
      },
    ],
  },

  // ─── PHILOSOPHIE (existant) ───────────────────────────────────────────────
  {
    id: "fr-philo",
    title: "Analyse Littéraire Haïtienne",
    subject: "Français",
    level: "Philo",
    description: "Analyse des grandes œuvres littéraires haïtiennes et préparation à l'épreuve de littérature du baccalauréat.",
    duration: "10 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — Le mouvement indigéniste",
        youtubeId: "RYqE1meCxv4",
        youtubeSearch: "littérature haïtienne indigénisme Jacques Roumain",
        summary:
          "L'indigénisme est un mouvement littéraire haïtien né dans les années 1920, en réaction à l'occupation américaine (1915-1934). Il prône un retour aux sources africaines et populaires, et la valorisation de la culture paysanne haïtienne.",
        examples: [
          {
            title: "Auteurs majeurs",
            content:
              "Jean Price-Mars (Ainsi parla l'oncle, 1928), Jacques Roumain, Carl Brouard, Émile Roumer, Jacques-Stephen Alexis. La revue 'La Revue indigène' (1927) est le manifeste du mouvement.",
          },
          {
            title: "Thèmes",
            content:
              "Le vodou, le créole, la paysannerie, l'identité afro-haïtienne, la critique de l'élite francisée et de la présence américaine.",
          },
        ],
        exercises: [
          {
            question: "Lequel de ces auteurs est une figure de l'indigénisme ?",
            options: ["Jacques Roumain", "Victor Hugo", "Aimé Césaire"],
            answer: 0,
            explanation: "Jacques Roumain est l'un des fondateurs du mouvement indigéniste haïtien.",
          },
          {
            question: "L'indigénisme naît en réaction à :",
            options: ["L'indépendance d'Haïti", "L'occupation américaine", "La Révolution française"],
            answer: 1,
            explanation: "Le mouvement répond à l'occupation américaine de 1915-1934.",
          },
          {
            question: "Quelle œuvre fondatrice de Jean Price-Mars marque l'indigénisme ?",
            options: ["Gouverneurs de la rosée", "Ainsi parla l'oncle", "Compère Général Soleil"],
            answer: 1,
            explanation: "'Ainsi parla l'oncle' (1928) est l'essai fondateur du mouvement.",
          },
          {
            question: "L'indigénisme valorise :",
            options: ["La culture européenne", "La culture populaire et africaine", "La culture américaine"],
            answer: 1,
            explanation: "Le mouvement revendique les racines africaines et la culture paysanne.",
          },
          {
            question: "La revue manifeste du mouvement s'appelle :",
            options: ["La Revue indigène", "La Phalange", "Conjonction"],
            answer: 0,
            explanation: "'La Revue indigène' (1927) lance officiellement le mouvement.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Jacques Roumain et 'Gouverneurs de la rosée'",
        youtubeSearch: "Gouverneurs de la rosée Jacques Roumain résumé analyse",
        summary:
          "Publié en 1944 (à titre posthume), 'Gouverneurs de la rosée' raconte le retour de Manuel à Fonds-Rouge, son village ravagé par la sécheresse et divisé par une vendetta. Manuel découvre une source d'eau et tente de réconcilier les habitants pour la conduire au village. C'est un roman engagé sur la solidarité paysanne.",
        examples: [
          {
            title: "Personnages clés",
            content:
              "Manuel : héros, ouvrier rentré de Cuba.\nDélira et Bienaimé : ses parents.\nAnnaïse : sa bien-aimée, fille du clan rival.\nGervilen : le rival jaloux qui assassine Manuel.",
          },
          {
            title: "Thèmes centraux",
            content:
              "L'eau comme symbole de vie et de réconciliation, le coumbite (travail collectif), la sécheresse comme métaphore de la division, le sacrifice du héros pour la communauté.",
          },
        ],
        exercises: [
          {
            question: "L'auteur de 'Gouverneurs de la rosée' est :",
            options: ["Jacques Stephen Alexis", "Jacques Roumain", "Frankétienne"],
            answer: 1,
            explanation: "Jacques Roumain a écrit le roman, publié en 1944 après sa mort.",
          },
          {
            question: "Le héros du roman s'appelle :",
            options: ["Manuel", "Hilarion", "Gervilen"],
            answer: 0,
            explanation: "Manuel est le personnage principal qui revient de Cuba.",
          },
          {
            question: "D'où Manuel revient-il ?",
            options: ["De France", "De Cuba", "des États-Unis"],
            answer: 1,
            explanation: "Il a travaillé dans les plantations de canne à sucre à Cuba.",
          },
          {
            question: "Le 'coumbite' désigne :",
            options: ["Une danse", "Le travail collectif paysan", "Une fête religieuse"],
            answer: 1,
            explanation: "Le coumbite est l'entraide collective pour les travaux agricoles.",
          },
          {
            question: "Que cherche Manuel pour sauver son village ?",
            options: ["De l'argent", "Une source d'eau", "Un médecin"],
            answer: 1,
            explanation: "Il découvre une source qu'il veut amener au village.",
          },
          {
            question: "Annaïse appartient :",
            options: ["À la famille de Manuel", "Au clan rival", "Au gouvernement"],
            answer: 1,
            explanation: "Annaïse est de la famille rivale, ce qui rend leur amour difficile.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Le réalisme merveilleux et Jacques-Stephen Alexis",
        youtubeSearch: "réalisme merveilleux Jacques Stephen Alexis Haïti",
        summary:
          "Le réalisme merveilleux est une esthétique théorisée par Jacques-Stephen Alexis en 1956. Il mêle réalité quotidienne haïtienne et merveilleux populaire (vodou, légendes, oralité). Œuvres clés : 'Compère Général Soleil', 'Les Arbres musiciens', 'L'Espace d'un cillement'.",
        examples: [
          {
            title: "Définition",
            content:
              "Pour Alexis, le réalisme merveilleux saisit la réalité du peuple haïtien telle qu'il la vit et la rêve, en intégrant le surnaturel comme partie intégrante du quotidien.",
          },
        ],
        exercises: [
          {
            question: "Qui a théorisé le réalisme merveilleux ?",
            options: ["Jacques Roumain", "Jacques-Stephen Alexis", "René Depestre"],
            answer: 1,
            explanation: "Alexis l'a théorisé dans son intervention au Congrès de Paris en 1956.",
          },
          {
            question: "Le réalisme merveilleux mêle :",
            options: ["Réalité et merveilleux", "Histoire et politique", "Poésie et théâtre"],
            answer: 0,
            explanation: "Il combine la réalité quotidienne et le merveilleux populaire.",
          },
          {
            question: "Quelle œuvre est de Jacques-Stephen Alexis ?",
            options: ["Compère Général Soleil", "Gouverneurs de la rosée", "Pays sans chapeau"],
            answer: 0,
            explanation: "'Compère Général Soleil' (1955) est son premier roman.",
          },
          {
            question: "L'année de l'intervention d'Alexis sur le réalisme merveilleux :",
            options: ["1944", "1956", "1980"],
            answer: 1,
            explanation: "C'était en 1956 lors du 1er Congrès des écrivains et artistes noirs.",
          },
          {
            question: "Quel élément culturel imprègne le réalisme merveilleux haïtien ?",
            options: ["Le bouddhisme", "Le vodou", "Le catholicisme romain"],
            answer: 1,
            explanation: "Le vodou et l'imaginaire populaire haïtien nourrissent l'esthétique.",
          },
        ],
      },
    ],
  },

  // ─── NS1 ─────────────────────────────────────────────────────────────────
  {
    id: "chimie-ns1",
    title: "Chimie Générale — Atomes, Liaisons et Réactions",
    subject: "Chimie",
    level: "NS1",
    description: "Comprendre la structure de la matière au niveau atomique, les types de liaisons chimiques et les réactions chimiques fondamentales.",
    duration: "7 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — La structure de l'atome",
        youtubeSearch: "structure atome proton neutron électron cours lycée chimie",
        summary:
          "Un atome est constitué d'un noyau (protons + neutrons) entouré d'électrons. Le numéro atomique Z = nombre de protons = nombre d'électrons (atome neutre). La masse atomique A = protons + neutrons. Les électrons sont répartis en couches (K, L, M) selon les règles de remplissage.",
        examples: [
          {
            title: "L'atome de sodium (Na)",
            content:
              "Z = 11 → 11 protons et 11 électrons\nA = 23 → 23 − 11 = 12 neutrons\nConfiguration électronique : K(2) L(8) M(1)\nL'électron de valence (M) explique la réactivité du sodium.",
          },
        ],
        exercises: [
          {
            question: "Le numéro atomique Z d'un élément représente :",
            options: ["Le nombre de neutrons", "Le nombre de protons", "La masse atomique"],
            answer: 1,
            explanation: "Z = nombre de protons dans le noyau.",
          },
          {
            question: "Un atome neutre possède :",
            options: ["Plus de protons que d'électrons", "Autant de protons que d'électrons", "Plus d'électrons que de protons"],
            answer: 1,
            explanation: "La charge est nulle : protons = électrons.",
          },
          {
            question: "L'oxygène a Z=8 et A=16. Combien a-t-il de neutrons ?",
            options: ["8", "16", "24"],
            answer: 0,
            explanation: "Neutrons = A − Z = 16 − 8 = 8.",
          },
          {
            question: "La première couche électronique (K) peut contenir au maximum :",
            options: ["2 électrons", "8 électrons", "18 électrons"],
            answer: 0,
            explanation: "La couche K est saturée à 2 électrons.",
          },
          {
            question: "Les électrons de valence sont ceux de :",
            options: ["La couche interne", "La couche externe", "Le noyau"],
            answer: 1,
            explanation: "Les électrons de la dernière couche (externe) déterminent la réactivité.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les liaisons chimiques",
        youtubeSearch: "liaisons chimiques ionique covalente cours lycée chimie",
        summary:
          "Les atomes se lient pour atteindre une configuration stable (règle de l'octet). Liaison covalente : partage d'électrons entre non-métaux (ex : H₂O, CO₂). Liaison ionique : transfert d'électrons entre métal et non-métal, formant des ions + et − attirés (ex : NaCl). Liaison métallique : pool d'électrons dans les métaux.",
        examples: [
          {
            title: "Formation de NaCl (sel)",
            content:
              "Na (Z=11) → cède son électron M → Na+ (stable comme le néon)\nCl (Z=17) → gagne l'électron → Cl⁻ (stable comme l'argon)\nNa+ + Cl⁻ → liaison ionique → NaCl (sel de cuisine)",
          },
          {
            title: "Liaison covalente : H₂O",
            content:
              "L'oxygène partage 2 paires d'électrons avec 2 atomes d'hydrogène.\nChaque H forme 1 liaison covalente avec O.\nMolécule coudée (angle HOH ≈ 104,5°).",
          },
        ],
        exercises: [
          {
            question: "La liaison ionique est formée entre :",
            options: ["Deux non-métaux", "Un métal et un non-métal", "Deux métaux"],
            answer: 1,
            explanation: "Le métal donne des électrons au non-métal → ions attractifs.",
          },
          {
            question: "Dans H₂O, quel type de liaison unit O et H ?",
            options: ["Ionique", "Covalente", "Métallique"],
            answer: 1,
            explanation: "L'eau est une molécule covalente : partage d'électrons.",
          },
          {
            question: "La règle de l'octet dit que les atomes cherchent à avoir :",
            options: ["2 électrons", "8 électrons en couche externe", "18 électrons"],
            answer: 1,
            explanation: "La stabilité est atteinte avec 8 électrons sur la couche externe.",
          },
          {
            question: "L'ion Na+ est :",
            options: ["Un sodium qui a gagné un électron", "Un sodium qui a perdu un électron", "Un chlore ionisé"],
            answer: 1,
            explanation: "Na perd son électron de valence → charge +1.",
          },
          {
            question: "Quel composé est ionique ?",
            options: ["CO₂", "NaCl", "H₂O"],
            answer: 1,
            explanation: "NaCl (sel) est un composé ionique formé de Na+ et Cl⁻.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — Les réactions chimiques",
        youtubeSearch: "équilibrer réaction chimique cours lycée bilan équation",
        summary:
          "Une réaction chimique transforme des réactifs en produits. Elle se représente par une équation bilan. La loi de conservation de la masse (Lavoisier) : 'Rien ne se crée, rien ne se perd, tout se transforme'. Pour équilibrer une équation, on ajuste les coefficients stœchiométriques pour que le nombre d'atomes de chaque élément soit identique de chaque côté.",
        examples: [
          {
            title: "Combustion du méthane",
            content:
              "Non équilibrée : CH₄ + O₂ → CO₂ + H₂O\nÉquilibrée : CH₄ + 2O₂ → CO₂ + 2H₂O\nVérification : C: 1=1 ✓, H: 4=4 ✓, O: 4=4 ✓",
          },
        ],
        exercises: [
          {
            question: "Quelle loi garantit la conservation des atomes dans une réaction ?",
            options: ["La loi de Newton", "La loi de Lavoisier", "La loi de Boyle"],
            answer: 1,
            explanation: "La loi de Lavoisier : rien ne se perd, rien ne se crée.",
          },
          {
            question: "Dans 2H₂ + O₂ → 2H₂O, combien de molécules d'eau se forment ?",
            options: ["1", "2", "4"],
            answer: 1,
            explanation: "Le coefficient 2 devant H₂O indique 2 molécules d'eau.",
          },
          {
            question: "Les réactifs dans une équation chimique sont :",
            options: ["Du côté droit de la flèche", "Du côté gauche de la flèche", "N'importe où"],
            answer: 1,
            explanation: "Réactifs → à gauche ; produits → à droite.",
          },
          {
            question: "Pour équilibrer une équation chimique, on modifie :",
            options: ["Les formules chimiques", "Les coefficients stœchiométriques", "Les éléments chimiques"],
            answer: 1,
            explanation: "On ne change jamais les formules, seulement les coefficients.",
          },
          {
            question: "La combustion complète du carbone donne :",
            options: ["CO (monoxyde)", "CO₂ (dioxyde)", "C₂O"],
            answer: 1,
            explanation: "C + O₂ → CO₂ (combustion complète).",
          },
        ],
      },
    ],
  },

  // ─── NS2 (existant) ───────────────────────────────────────────────────────
  {
    id: "svt-ns2",
    title: "Biologie Cellulaire",
    subject: "Sciences",
    level: "NS2",
    description: "Comprendre la structure et le fonctionnement de la cellule, l'unité de base de la vie.",
    duration: "6 heures",
    chapters: [
      {
        id: "c1",
        title: "Chapitre 1 — La membrane plasmique",
        youtubeId: "RBXMkPMgh2Y",
        youtubeSearch: "membrane plasmique cellule cours lycée",
        summary:
          "La membrane plasmique sépare l'intérieur de la cellule du milieu extérieur. Elle est composée d'une double couche de phospholipides (bicouche lipidique) dans laquelle sont insérées des protéines. Elle est sélective : elle contrôle ce qui entre et sort de la cellule.",
        examples: [
          {
            title: "Composition",
            content:
              "Bicouche lipidique (phospholipides) + protéines membranaires (transport, récepteurs) + cholestérol (fluidité) + glycoprotéines (reconnaissance cellulaire).",
          },
          {
            title: "Modèle de la mosaïque fluide",
            content:
              "Proposé par Singer et Nicolson en 1972 : les protéines flottent dans la bicouche lipidique fluide, comme une mosaïque mobile.",
          },
        ],
        exercises: [
          {
            question: "Quel est le rôle principal de la membrane plasmique ?",
            options: ["Produire de l'énergie", "Protéger la cellule et contrôler les échanges", "Stocker l'ADN"],
            answer: 1,
            explanation: "Elle est la barrière sélective entre cellule et extérieur.",
          },
          {
            question: "La membrane est composée principalement de :",
            options: ["Glucides", "Phospholipides", "Acides nucléiques"],
            answer: 1,
            explanation: "C'est une bicouche de phospholipides avec des protéines.",
          },
          {
            question: "Le modèle de la membrane est appelé :",
            options: ["Mosaïque fluide", "Bouclier rigide", "Couche unique"],
            answer: 0,
            explanation: "Modèle de Singer et Nicolson (1972).",
          },
          {
            question: "Que fait passer la membrane par diffusion simple ?",
            options: ["L'ADN", "Les petites molécules non polaires (O₂, CO₂)", "Les ions Na+"],
            answer: 1,
            explanation: "Petites molécules apolaires traversent librement la bicouche.",
          },
          {
            question: "Le cholestérol membranaire sert à :",
            options: ["Stocker l'énergie", "Réguler la fluidité de la membrane", "Fabriquer des protéines"],
            answer: 1,
            explanation: "Il maintient la fluidité optimale selon la température.",
          },
          {
            question: "Les glycoprotéines membranaires servent à :",
            options: ["La reconnaissance cellulaire", "La photosynthèse", "Le stockage d'ADN"],
            answer: 0,
            explanation: "Elles agissent comme des marqueurs d'identité de la cellule.",
          },
        ],
      },
      {
        id: "c2",
        title: "Chapitre 2 — Les organites cellulaires",
        youtubeSearch: "organites cellulaires cours lycée biologie",
        summary:
          "Une cellule eucaryote contient plusieurs organites, chacun avec une fonction spécifique : noyau (ADN), mitochondrie (énergie/ATP), réticulum endoplasmique (synthèse), appareil de Golgi (tri/expédition), lysosomes (digestion), ribosomes (traduction des protéines).",
        examples: [
          {
            title: "Mitochondrie",
            content:
              "Surnommée la 'centrale énergétique' de la cellule. Elle produit l'ATP (énergie) par respiration cellulaire à partir du glucose et de l'oxygène.",
          },
          {
            title: "Noyau",
            content:
              "Contient l'ADN organisé en chromosomes. C'est le 'centre de commande' qui dirige toutes les activités cellulaires via la transcription des gènes.",
          },
        ],
        exercises: [
          {
            question: "L'organite qui produit l'énergie de la cellule est :",
            options: ["Le noyau", "La mitochondrie", "Le ribosome"],
            answer: 1,
            explanation: "La mitochondrie produit l'ATP par respiration cellulaire.",
          },
          {
            question: "L'ADN est stocké dans :",
            options: ["Le cytoplasme", "Le noyau", "L'appareil de Golgi"],
            answer: 1,
            explanation: "L'ADN nucléaire est dans le noyau de la cellule eucaryote.",
          },
          {
            question: "Les ribosomes servent à :",
            options: ["Synthétiser des protéines", "Stocker l'eau", "Digérer les déchets"],
            answer: 0,
            explanation: "Ils traduisent l'ARNm en protéines.",
          },
          {
            question: "L'appareil de Golgi sert à :",
            options: ["La photosynthèse", "Le tri et l'expédition des protéines", "La respiration"],
            answer: 1,
            explanation: "Il modifie, trie et envoie les protéines aux bonnes destinations.",
          },
          {
            question: "Les lysosomes contiennent :",
            options: ["De l'ADN", "Des enzymes digestives", "Des chromosomes"],
            answer: 1,
            explanation: "Ce sont les 'estomacs' de la cellule.",
          },
          {
            question: "La cellule végétale possède en plus :",
            options: ["Des mitochondries", "Des chloroplastes et une paroi cellulosique", "Un noyau"],
            answer: 1,
            explanation: "Chloroplastes (photosynthèse) et paroi rigide sont propres aux plantes.",
          },
        ],
      },
      {
        id: "c3",
        title: "Chapitre 3 — La division cellulaire (mitose)",
        youtubeSearch: "mitose division cellulaire cours simple",
        summary:
          "La mitose est la division d'une cellule mère en deux cellules filles génétiquement identiques. Elle comprend 4 phases : prophase (condensation des chromosomes), métaphase (alignement à l'équateur), anaphase (séparation), télophase (formation de deux noyaux).",
        examples: [
          {
            title: "Les 4 phases en ordre",
            content:
              "Prophase → Métaphase → Anaphase → Télophase. Pour s'en souvenir : 'PMAT'. Avant la mitose, l'ADN se duplique pendant l'interphase.",
          },
        ],
        exercises: [
          {
            question: "La mitose produit combien de cellules filles ?",
            options: ["1", "2", "4"],
            answer: 1,
            explanation: "Une cellule mère donne 2 cellules filles identiques.",
          },
          {
            question: "Les cellules filles sont :",
            options: ["Différentes de la mère", "Identiques à la mère", "Plus petites de moitié"],
            answer: 1,
            explanation: "La mitose donne deux cellules génétiquement identiques.",
          },
          {
            question: "L'ordre correct des phases :",
            options: [
              "Prophase, Métaphase, Anaphase, Télophase",
              "Métaphase, Prophase, Télophase, Anaphase",
              "Anaphase, Prophase, Métaphase, Télophase",
            ],
            answer: 0,
            explanation: "PMAT : Prophase, Métaphase, Anaphase, Télophase.",
          },
          {
            question: "Pendant la métaphase, les chromosomes :",
            options: ["S'alignent à l'équateur", "Se séparent", "Disparaissent"],
            answer: 0,
            explanation: "Ils s'alignent au centre (plaque équatoriale).",
          },
          {
            question: "L'ADN se duplique pendant :",
            options: ["La prophase", "L'interphase", "La télophase"],
            answer: 1,
            explanation: "La duplication a lieu en phase S de l'interphase, AVANT la mitose.",
          },
        ],
      },
    ],
  },
];
