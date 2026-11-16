window.SEMAINES = window.SEMAINES || {};

// ===================================================
//  SEMAINE 1 : LES SALUTATIONS
// ===================================================
window.SEMAINES[1] = {
  titre: "Les salutations",
  objectif: "Dire bonjour, au revoir, merci et s'excuser en anglais.",
  jours: {
    lundi: {
      type: "vocab",
      mots: [
        { en: "Hello", fr: "Bonjour / Salut", pron: "hé-lô" },
        { en: "Good morning", fr: "Bonjour (le matin)", pron: "goud mor-nigne" },
        { en: "Good evening", fr: "Bonsoir", pron: "goud ive-nigne" },
        { en: "Good night", fr: "Bonne nuit", pron: "goud naït" },
        { en: "Goodbye", fr: "Au revoir", pron: "goud-baï" },
        { en: "See you", fr: "À bientôt", pron: "si iou" },
        { en: "Please", fr: "S'il vous plaît", pron: "pliz" },
        { en: "Thank you", fr: "Merci", pron: "sank iou" },
        { en: "Sorry", fr: "Désolé", pron: "so-ri" },
        { en: "Excuse me", fr: "Excusez-moi", pron: "ik-skiouz mi" }
      ]
    },
    mardi: {
      type: "prononciation",
      titre: "Les sons difficiles : « th » et « h »",
      blocs: [
        {
          titre: "Le son « th »",
          texte: "Il n'existe pas en français. Mets le bout de ta langue entre tes dents et souffle doucement. Ça fait « s » ou « z » avec la langue dehors.",
          exemples: [
            { en: "Thank you", pron: "sank iou" },
            { en: "Three", pron: "sri" },
            { en: "This", pron: "zis" }
          ]
        },
        {
          titre: "Le « h » : on souffle",
          texte: "Contrairement au français, on prononce le « h » en soufflant un peu d'air, comme quand tu veux réchauffer tes mains.",
          exemples: [
            { en: "Hello", pron: "hé-lô" },
            { en: "Happy", pron: "ha-pi" },
            { en: "House", pron: "haouss" }
          ]
        }
      ]
    },
    mercredi: {
      type: "grammaire",
      titre: "Bonjour : quel moment de la journée ?",
      texte: "En anglais, on ne dit pas « Good day ». On choisit la formule selon le moment de la journée.",
      astuce: "« Good night » se dit seulement quand on va dormir ou quand on part le soir.",
      exemples: [
        { en: "Good morning", pron: "goud mor-nigne", fr: "Le matin, jusqu'à midi" },
        { en: "Good afternoon", pron: "goud af-teur-noune", fr: "L'après-midi" },
        { en: "Good evening", pron: "goud ive-nigne", fr: "Le soir, pour dire bonsoir" },
        { en: "Good night", pron: "goud naït", fr: "Pour aller dormir" }
      ]
    },
    jeudi: {
      type: "robot",
      scenario: [
        {
          bot: "Hello! Good morning!",
          fr: "Bonjour ! Bonjour (le matin) !",
          reponses: [
            { en: "Hello! Good morning!", pron: "hé-lô ! goud mor-nigne", fr: "Bonjour ! Bonjour !" },
            { en: "Hello!", pron: "hé-lô", fr: "Bonjour !" }
          ]
        },
        {
          bot: "How are you?",
          fr: "Comment ça va ?",
          reponses: [
            { en: "I am fine, thank you.", pron: "aï am faïne, sank iou", fr: "Je vais bien, merci." }
          ]
        },
        {
          bot: "Sorry, I am late!",
          fr: "Désolé, je suis en retard !",
          reponses: [
            { en: "No problem!", pron: "nô pro-bleume", fr: "Pas de problème !" }
          ]
        },
        {
          bot: "Thank you! Goodbye!",
          fr: "Merci ! Au revoir !",
          reponses: [
            { en: "Goodbye! See you!", pron: "goud-baï ! si iou", fr: "Au revoir ! À bientôt !" }
          ]
        },
        { bot: "Great job! See you tomorrow!", fr: "Bravo ! À demain !", fin: true, reponses: [] }
      ]
    },
    vendredi: { type: "quiz" }
  }
};

// ===================================================
//  SEMAINE 2 : SE PRÉSENTER
// ===================================================
window.SEMAINES[2] = {
  titre: "Se présenter",
  objectif: "Dire son prénom, demander comment ça va, dire d'où on vient.",
  jours: {
    lundi: {
      type: "vocab",
      mots: [
        { en: "My name is", fr: "Je m'appelle", pron: "maï néme iz" },
        { en: "What is your name?", fr: "Comment tu t'appelles ?", pron: "wot iz yor néme" },
        { en: "I am", fr: "Je suis", pron: "aï am" },
        { en: "You are", fr: "Tu es / Vous êtes", pron: "iou ar" },
        { en: "Nice to meet you", fr: "Enchanté", pron: "naïs tou mit iou" },
        { en: "How are you?", fr: "Comment ça va ?", pron: "hao ar iou" },
        { en: "I am fine", fr: "Je vais bien", pron: "aï am faïne" },
        { en: "And you?", fr: "Et toi ?", pron: "and iou" },
        { en: "Where are you from?", fr: "D'où viens-tu ?", pron: "wèr ar iou from" },
        { en: "I am from", fr: "Je viens de", pron: "aï am from" }
      ]
    },
    mardi: {
      type: "prononciation",
      titre: "Les sons « w » et « i »",
      blocs: [
        {
          titre: "Le « w » : arrondis les lèvres",
          texte: "Pour le « w », avance les lèvres comme pour dire « ou », puis enchaîne avec la voyelle. « What » se dit presque « ouot ».",
          exemples: [
            { en: "What", pron: "wot" },
            { en: "Where", pron: "wèr" },
            { en: "Welcome", pron: "wèl-keume" }
          ]
        },
        {
          titre: "Le « I » seul se dit « aï »",
          texte: "Quand tu parles de toi, le mot « I » (je) se prononce « aï ». Même chose dans « My » et « Nice ».",
          exemples: [
            { en: "I", pron: "aï" },
            { en: "My", pron: "maï" },
            { en: "Nice", pron: "naïs" }
          ]
        }
      ]
    },
    mercredi: {
      type: "grammaire",
      titre: "I am, You are : le verbe « être »",
      texte: "En anglais, « être » se dit « to be ». Avec « je » on dit « I am », avec « tu / vous » on dit « You are ». C'est la règle la plus importante du début !",
      astuce: "On dit toujours le sujet : « I am happy », jamais seulement « am happy ».",
      exemples: [
        { en: "I am Sam.", pron: "aï am Sam", fr: "Je suis Sam." },
        { en: "You are happy.", pron: "iou ar hapi", fr: "Tu es content." },
        { en: "I am a student.", pron: "aï am a stiou-dent", fr: "Je suis étudiant." },
        { en: "I am from Africa.", pron: "aï am from afrika", fr: "Je viens d'Afrique." }
      ]
    },
    jeudi: {
      type: "robot",
      scenario: [
        {
          bot: "Hello! What is your name?",
          fr: "Bonjour ! Comment tu t'appelles ?",
          reponses: [
            { en: "My name is Sam.", pron: "maï néme iz Sam", fr: "Je m'appelle Sam. (mets ton prénom !)" }
          ]
        },
        {
          bot: "Nice to meet you! How are you?",
          fr: "Enchanté ! Comment ça va ?",
          reponses: [
            { en: "I am fine, thank you.", pron: "aï am faïne, sank iou", fr: "Je vais bien, merci." },
            { en: "I am happy.", pron: "aï am hapi", fr: "Je suis content(e)." }
          ]
        },
        {
          bot: "Where are you from?",
          fr: "D'où viens-tu ?",
          reponses: [
            { en: "I am from France.", pron: "aï am from frans", fr: "Je viens de France." },
            { en: "I am from Africa.", pron: "aï am from afrika", fr: "Je viens d'Afrique." }
          ]
        },
        { bot: "Great job! Nice to meet you!", fr: "Bravo ! Enchanté !", fin: true, reponses: [] }
      ]
    },
    vendredi: { type: "quiz" }
  }
};

// ===================================================
//  SEMAINE 3 : LES CHIFFRES DE 1 À 10
// ===================================================
window.SEMAINES[3] = {
  titre: "Les chiffres de 1 à 10",
  objectif: "Compter jusqu'à 10 et bien prononcer chaque chiffre.",
  jours: {
    lundi: {
      type: "vocab",
      mots: [
        { en: "One", fr: "Un (1)", pron: "wane" },
        { en: "Two", fr: "Deux (2)", pron: "tou" },
        { en: "Three", fr: "Trois (3)", pron: "sri" },
        { en: "Four", fr: "Quatre (4)", pron: "for" },
        { en: "Five", fr: "Cinq (5)", pron: "faïve" },
        { en: "Six", fr: "Six (6)", pron: "six" },
        { en: "Seven", fr: "Sept (7)", pron: "sèvene" },
        { en: "Eight", fr: "Huit (8)", pron: "éït" },
        { en: "Nine", fr: "Neuf (9)", pron: "naïne" },
        { en: "Ten", fr: "Dix (10)", pron: "tène" }
      ]
    },
    mardi: {
      type: "prononciation",
      titre: "Les chiffres pièges",
      blocs: [
        {
          titre: "One et Two : attention aux lettres muettes",
          texte: "« One » ne se dit pas « one » mais « wane ». Dans « Two », le « w » ne se prononce pas : on dit « tou ».",
          exemples: [
            { en: "One", pron: "wane" },
            { en: "Two", pron: "tou" }
          ]
        },
        {
          titre: "Three : le « th » encore",
          texte: "Langue entre les dents, comme la semaine 1. Le « r » est doux : « sri ».",
          exemples: [
            { en: "Three", pron: "sri" },
            { en: "Eight", pron: "éït" }
          ]
        }
      ]
    },
    mercredi: {
      type: "grammaire",
      titre: "Compter des objets : le « s » du pluriel",
      texte: "Quand il y a plus d'un objet, on ajoute généralement un « s » à la fin du mot. Avec « one » on n'ajoute rien.",
      astuce: "Le « s » final se prononce « z » dans beaucoup de mots : « books » → « bouks », « apples » → « apeulz ».",
      exemples: [
        { en: "One apple", pron: "wane apeul", fr: "Une pomme" },
        { en: "Two apples", pron: "tou apeulz", fr: "Deux pommes" },
        { en: "Three books", pron: "sri bouks", fr: "Trois livres" },
        { en: "Five phones", pron: "faïve fônz", fr: "Cinq téléphones" }
      ]
    },
    jeudi: {
      type: "robot",
      scenario: [
        {
          bot: "Let's count! Say: one, two, three.",
          fr: "Comptons ! Dis : un, deux, trois.",
          reponses: [
            { en: "One, two, three.", pron: "wane, tou, sri", fr: "Un, deux, trois." }
          ]
        },
        {
          bot: "How many fingers do you have on one hand?",
          fr: "Combien de doigts as-tu sur une main ?",
          reponses: [
            { en: "I have five fingers.", pron: "aï hav faïve fingueurz", fr: "J'ai cinq doigts." }
          ]
        },
        {
          bot: "Now count to ten!",
          fr: "Maintenant, compte jusqu'à dix !",
          reponses: [
            {
              en: "One, two, three, four, five, six, seven, eight, nine, ten.",
              pron: "wane, tou, sri, for, faïve, six, sèvene, éït, naïne, tène",
              fr: "Un, deux, trois... jusqu'à dix."
            }
          ]
        },
        { bot: "Wonderful! You can count!", fr: "Magnifique ! Tu sais compter !", fin: true, reponses: [] }
      ]
    },
    vendredi: { type: "quiz" }
  }
};

// ===================================================
//  SEMAINE 4 : LES CHIFFRES DE 11 À 20 ET L'ÂGE
// ===================================================
window.SEMAINES[4] = {
  titre: "Les chiffres de 11 à 20 et l'âge",
  objectif: "Compter jusqu'à 20 et dire son âge.",
  jours: {
    lundi: {
      type: "vocab",
      mots: [
        { en: "Eleven", fr: "Onze (11)", pron: "i-lèvene" },
        { en: "Twelve", fr: "Douze (12)", pron: "touèlv" },
        { en: "Thirteen", fr: "Treize (13)", pron: "seur-tine" },
        { en: "Fourteen", fr: "Quatorze (14)", pron: "for-tine" },
        { en: "Fifteen", fr: "Quinze (15)", pron: "fif-tine" },
        { en: "Sixteen", fr: "Seize (16)", pron: "six-tine" },
        { en: "Seventeen", fr: "Dix-sept (17)", pron: "sèvene-tine" },
        { en: "Eighteen", fr: "Dix-huit (18)", pron: "éï-tine" },
        { en: "Nineteen", fr: "Dix-neuf (19)", pron: "naïne-tine" },
        { en: "Twenty", fr: "Vingt (20)", pron: "touène-ti" }
      ]
    },
    mardi: {
      type: "prononciation",
      titre: "-teen ou -ty ? Attention à la fin !",
      blocs: [
        {
          titre: "Les nombres en « -teen » (13 à 19)",
          texte: "La fin « teen » se dit « tine », longue et appuyée. Compare avec « -ty » (comme dans Twenty) qui est court : « ti ».",
          exemples: [
            { en: "Thirteen", pron: "seur-tine" },
            { en: "Thirty", pron: "seur-ti" },
            { en: "Fifteen", pron: "fif-tine" },
            { en: "Fifty", pron: "fif-ti" }
          ]
        },
        {
          titre: "Le « v » de Eleven et Twelve",
          texte: "Pour le « v », pose tes dents du haut sur ta lèvre du bas et fais vibrer. C'est le même « v » qu'en français.",
          exemples: [
            { en: "Eleven", pron: "i-lèvene" },
            { en: "Twelve", pron: "touèlv" }
          ]
        }
      ]
    },
    mercredi: {
      type: "grammaire",
      titre: "Dire son âge",
      texte: "En français on dit « j'ai 20 ans » (avoir). En anglais, on dit « je suis 20 ans » : on utilise « I am », pas « I have » !",
      astuce: "Le mot « years old » veut dire « ans ». On peut le garder ou l'enlever : « I am twenty » marche aussi.",
      exemples: [
        { en: "How old are you?", pron: "hao old ar iou", fr: "Quel âge as-tu ?" },
        { en: "I am twenty years old.", pron: "aï am touène-ti yirz old", fr: "J'ai vingt ans." },
        { en: "I am fifteen.", pron: "aï am fif-tine", fr: "J'ai quinze ans." },
        { en: "She is eighteen.", pron: "chi iz éï-tine", fr: "Elle a dix-huit ans." }
      ]
    },
    jeudi: {
      type: "robot",
      scenario: [
        {
          bot: "How old are you?",
          fr: "Quel âge as-tu ?",
          reponses: [
            { en: "I am twenty years old.", pron: "aï am touène-ti yirz old", fr: "J'ai vingt ans. (mets ton âge !)" }
          ]
        },
        {
          bot: "Nice! What is your favorite number?",
          fr: "Sympa ! Quel est ton chiffre préféré ?",
          reponses: [
            { en: "My favorite number is seven.", pron: "maï fé-vrit neum-beur iz sèvene", fr: "Mon chiffre préféré est sept." }
          ]
        },
        {
          bot: "Can you count: ten, eleven, twelve?",
          fr: "Peux-tu compter : dix, onze, douze ?",
          reponses: [
            { en: "Ten, eleven, twelve.", pron: "tène, i-lèvene, touèlv", fr: "Dix, onze, douze." }
          ]
        },
        { bot: "Excellent! See you next week!", fr: "Excellent ! À la semaine prochaine !", fin: true, reponses: [] }
      ]
    },
    vendredi: { type: "quiz" }
  }
};