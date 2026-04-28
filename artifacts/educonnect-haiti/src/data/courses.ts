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
  {
    id: "math-9af",
    title: "Algèbre et Géométrie Fondamentales",
    subject: "Mathématiques",
    level: "9e AF",
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
        youtubeId: "9hWLYzXsj7c",
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
        youtubeId: "tFnVEPV6oG0",
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
  {
    id: "fr-philo",
    title: "Analyse Littéraire Haïtienne",
    subject: "Français",
    level: "Philo / NS4",
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
        youtubeId: "RYqE1meCxv4",
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
        youtubeId: "DjQjcU3jzGc",
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
        youtubeId: "URUJD5NEXC8",
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
        youtubeId: "f-ldPgEfAHI",
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
