// =====================================================
//  ENGLISH FACILE : moteur du site
// =====================================================
const SEMAINES = window.SEMAINES || {};
const app = document.getElementById("app");
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

const NIVEAUX = [
  { nom: "Niveau 1 : Découverte",         emoji: "🌱", mois: "Mois 1-2",  debut: 1,  fin: 8 },
  { nom: "Niveau 2 : Bases",              emoji: "🌿", mois: "Mois 3-4",  debut: 9,  fin: 16 },
  { nom: "Niveau 3 : Élémentaire",        emoji: "🌳", mois: "Mois 5-7",  debut: 17, fin: 28 },
  { nom: "Niveau 4 : Conversation",       emoji: "🚀", mois: "Mois 8-10", debut: 29, fin: 40 },
  { nom: "Niveau 5 : Révisions et examen", emoji: "🏆", mois: "Mois 11-12", debut: 41, fin: 52 }
];

const JOURS = [
  { id: "lundi",    nom: "Lundi",    icone: "📚", titre: "Vocabulaire" },
  { id: "mardi",    nom: "Mardi",    icone: "🗣️", titre: "Prononciation" },
  { id: "mercredi", nom: "Mercredi", icone: "✏️", titre: "Grammaire" },
  { id: "jeudi",    nom: "Jeudi",    icone: "🤖", titre: "Conversation" },
  { id: "vendredi", nom: "Vendredi", icone: "🎯", titre: "Quiz" }
];

// =====================================================
//  OUTILS : audio, mélange
// =====================================================
function parler(texte, vitesse) {
  if (!("speechSynthesis" in window)) {
    alert("Ton navigateur ne peut pas lire l'audio. Essaie avec Chrome.");
    return;
  }
  window.speechSynthesis.cancel();
  const voix = new SpeechSynthesisUtterance(texte);
  voix.lang = "en-US";
  voix.rate = vitesse;
  window.speechSynthesis.speak(voix);
}

// Tout bouton qui a data-t (texte) et data-v (vitesse) devient un bouton audio
function attacherAudio(zone) {
  zone.querySelectorAll("button[data-t]").forEach(b => {
    b.onclick = () => parler(b.dataset.t, parseFloat(b.dataset.v));
  });
}

function melanger(tableau) {
  return [...tableau].sort(() => Math.random() - 0.5);
}

// =====================================================
//  PROGRESSION (sauvegardée dans le navigateur)
// =====================================================
const CLE = "english-facile-progression";

function chargerProgression() {
  try { return JSON.parse(localStorage.getItem(CLE)) || {}; }
  catch (e) { return {}; }
}
function sauverProgression() {
  try { localStorage.setItem(CLE, JSON.stringify(progression)); } catch (e) {}
}
let progression = chargerProgression();

function jourFait(s, j) { return !!progression[s + "-" + j]; }

function marquerFait(s, j, score) {
  const cle = s + "-" + j;
  const avant = progression[cle];
  if (score !== undefined) {
    const meilleur = Math.max(score, (avant && avant.score) || 0);
    progression[cle] = { score: meilleur };
  } else {
    progression[cle] = avant || true;
  }
  sauverProgression();
}

function semaineFinie(s) { return JOURS.every(j => jourFait(s, j.id)); }
function semaineDebloquee(s) { return !!SEMAINES[s] && (s === 1 || semaineFinie(s - 1)); }

function prochaineSemaine() {
  for (let s = 1; s <= 52; s++) {
    if (semaineDebloquee(s) && !semaineFinie(s)) return s;
  }
  return 1;
}

// =====================================================
//  NAVIGATION
// =====================================================
function route() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const p = location.hash.replace(/^#\/?/, "").split("/");
  const s = parseInt(p[1]);

  if (p[0] === "semaine" && SEMAINES[s] && semaineDebloquee(s)) {
    let jour = p[2];
    if (!SEMAINES[s].jours[jour]) {
      const premier = JOURS.find(x => !jourFait(s, x.id));
      jour = premier ? premier.id : "lundi";
    }
    pageSemaine(s, jour);
  } else {
    pageAccueil();
  }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

// =====================================================
//  PAGE D'ACCUEIL
// =====================================================
function pageAccueil() {
  const faits = Object.keys(progression).length;
  const pct = Math.round((faits / (52 * 5)) * 100);

  let html = `
    <section class="hero">
      <h1>Apprends l'anglais, pas à pas</h1>
      <p>Un programme de 12 mois pour les débutants.<br>10 à 15 minutes par jour, à ton rythme.</p>
      <div class="barre"><div style="width:${pct}%"></div></div>
      <p class="petit" style="color:#dbe7ff">Progression de l'année : ${pct}%</p>
      <a class="btn" href="#/semaine/${prochaineSemaine()}">▶️ Continuer</a>
    </section>`;

  NIVEAUX.forEach(n => {
    html += `<h2 class="niveau">${n.emoji} ${n.nom} <span>${n.mois}</span></h2><div class="grille">`;
    for (let s = n.debut; s <= n.fin; s++) {
      if (!SEMAINES[s]) {
        html += `<div class="semaine bientot"><b>Semaine ${s}</b><span>🔜 Bientôt</span></div>`;
      } else if (!semaineDebloquee(s)) {
        html += `<div class="semaine bloque"><b>Semaine ${s}</b><span>${SEMAINES[s].titre}</span><small>🔒 Termine la semaine ${s - 1}</small></div>`;
      } else {
        const nb = JOURS.filter(j => jourFait(s, j.id)).length;
        const fini = semaineFinie(s);
        html += `<a class="semaine ${fini ? "fini" : ""}" href="#/semaine/${s}">
                   <b>Semaine ${s} ${fini ? "🏅" : ""}</b>
                   <span>${SEMAINES[s].titre}</span>
                   <small>${nb} / 5 jours</small>
                 </a>`;
      }
    }
    html += `</div>`;
  });

  html += `<div class="reset"><button id="reset">Effacer ma progression</button></div>`;
  app.innerHTML = html;

  document.getElementById("reset").onclick = () => {
    if (confirm("Effacer toute ta progression ?")) {
      progression = {};
      sauverProgression();
      pageAccueil();
    }
  };
}

// =====================================================
//  PAGE D'UNE SEMAINE
// =====================================================
function pageSemaine(s, jourId) {
  const sem = SEMAINES[s];

  let html = `
    <a class="retour-lien" href="#/">← Retour au programme</a>
    <h1>Semaine ${s} : ${sem.titre}</h1>
    <p class="objectif">🎯 ${sem.objectif}</p>
    <div class="onglets">`;
  JOURS.forEach(j => {
    html += `<a class="onglet ${j.id === jourId ? "actif" : ""} ${jourFait(s, j.id) ? "fait" : ""}" href="#/semaine/${s}/${j.id}">
               <span>${j.icone}</span>${j.nom}<small>${j.titre}</small>
             </a>`;
  });
  html += `</div><div id="contenu" class="carte"></div>`;
  app.innerHTML = html;

  const zone = document.getElementById("contenu");
  const type = sem.jours[jourId].type;
  const rendus = {
    vocab: rendreVocab,
    prononciation: rendrePrononciation,
    grammaire: rendreGrammaire,
    robot: rendreRobot,
    quiz: rendreQuiz
  };
  rendus[type](zone, s, jourId, sem);
}

// ---------- Bas de page d'un jour (terminer / jour suivant) ----------
function renderPied(s, jourId) {
  const pied = document.getElementById("pied");
  if (!pied) return;
  const type = SEMAINES[s].jours[jourId].type;
  const manuel = ["vocab", "prononciation", "grammaire"].includes(type);
  const idx = JOURS.findIndex(x => x.id === jourId);
  const suivant = JOURS[idx + 1];

  if (jourFait(s, jourId)) {
    const lien = suivant
      ? `<a class="btn" href="#/semaine/${s}/${suivant.id}">Jour suivant : ${suivant.nom} →</a>`
      : `<a class="btn" href="#/">🏅 Semaine terminée ! Retour au programme</a>`;
    pied.innerHTML = `<p class="ok">✅ Leçon terminée, bravo !</p>${lien}`;
  } else if (manuel) {
    pied.innerHTML = `<button id="btn-fini">✅ J'ai terminé cette leçon</button>`;
    document.getElementById("btn-fini").onclick = () => finirJour(s, jourId);
  } else {
    pied.innerHTML = "";
  }
}

function finirJour(s, jourId, score) {
  marquerFait(s, jourId, score);
  const idx = JOURS.findIndex(x => x.id === jourId);
  const onglets = document.querySelectorAll(".onglet");
  if (onglets[idx]) onglets[idx].classList.add("fait");
  renderPied(s, jourId);
}

// =====================================================
//  LUNDI : VOCABULAIRE
// =====================================================
function rendreVocab(zone, s, j, sem) {
  const d = sem.jours[j];
  let html = `<h2>📚 Vocabulaire de la semaine</h2>
    <p class="astuce">💡 Écoute chaque mot avec 🐢, puis répète à voix haute 3 fois.</p>`;
  d.mots.forEach(m => {
    html += `
      <div class="mot">
        <div>
          <div class="en">${m.en}</div>
          <div class="fr">➡️ ${m.fr}</div>
          <div class="pron">🗣️ « ${m.pron} »</div>
        </div>
        <div class="boutons">
          <button class="b-normal" data-t="${m.en}" data-v="0.9">🔊</button>
          <button class="b-lent" data-t="${m.en}" data-v="0.5">🐢</button>
        </div>
      </div>`;
  });
  html += `<div id="pied"></div>`;
  zone.innerHTML = html;
  attacherAudio(zone);
  renderPied(s, j);
}

// =====================================================
//  MARDI : PRONONCIATION
// =====================================================
function rendrePrononciation(zone, s, j, sem) {
  const d = sem.jours[j];
  let html = `<h2>🗣️ ${d.titre}</h2>`;
  d.blocs.forEach(b => {
    html += `<div class="bloc"><h3>${b.titre}</h3><p>${b.texte}</p>`;
    b.exemples.forEach(e => {
      html += `
        <div class="exemple">
          <div><div class="en">${e.en}</div><div class="pron">« ${e.pron} »</div></div>
          <div class="boutons">
            <button class="b-normal" data-t="${e.en}" data-v="0.9">🔊</button>
            <button class="b-lent" data-t="${e.en}" data-v="0.5">🐢</button>
          </div>
        </div>`;
    });
    html += `</div>`;
  });
  html += `<div id="pied"></div>`;
  zone.innerHTML = html;
  attacherAudio(zone);
  renderPied(s, j);
}

// =====================================================
//  MERCREDI : GRAMMAIRE
// =====================================================
function rendreGrammaire(zone, s, j, sem) {
  const d = sem.jours[j];
  let html = `<h2>✏️ ${d.titre}</h2><p>${d.texte}</p>`;
  if (d.astuce) html += `<p class="astuce">💡 ${d.astuce}</p>`;
  d.exemples.forEach(e => {
    html += `
      <div class="exemple">
        <div>
          <div class="en">${e.en}</div>
          <div class="pron">« ${e.pron} »</div>
          <div class="fr">➡️ ${e.fr}</div>
        </div>
        <div class="boutons">
          <button class="b-normal" data-t="${e.en}" data-v="0.9">🔊</button>
          <button class="b-lent" data-t="${e.en}" data-v="0.5">🐢</button>
        </div>
      </div>`;
  });
  html += `<div id="pied"></div>`;
  zone.innerHTML = html;
  attacherAudio(zone);
  renderPied(s, j);
}

// =====================================================
//  JEUDI : LE ROBOT DE CONVERSATION
// =====================================================
function rendreRobot(zone, s, j, sem) {
  const scenario = sem.jours[j].scenario;
  let etape = 0;

  zone.innerHTML = `
    <h2>🤖 Conversation avec le robot</h2>
    <p class="astuce">💡 Le robot parle lentement. Choisis une phrase, écris-la, ou dis-la avec le micro 🎤 (sur Chrome).</p>
    <div id="chat"></div>
    <div id="suggestions"></div>
    <div class="saisie">
      <input type="text" id="saisie" placeholder="Écris ta réponse en anglais...">
      <button id="envoyer">Envoyer</button>
      ${SR ? '<button class="rouge" id="micro">🎤</button>' : ""}
    </div>
    ${SR ? "" : '<p class="petit">🎤 Le micro ne marche pas sur ce navigateur. Essaie avec Chrome.</p>'}
    <div id="pied"></div>`;

  const chat = zone.querySelector("#chat");
  const sugg = zone.querySelector("#suggestions");
  const ligne = zone.querySelector(".saisie");
  const champ = zone.querySelector("#saisie");

  function defiler() { chat.scrollTop = chat.scrollHeight; }

  function bulleBot(texte, fr) {
    const b = document.createElement("div");
    b.className = "bulle bot";
    b.innerHTML = `
      <div>🤖 ${texte}</div>
      <div class="trad">➡️ ${fr}</div>
      <button class="b-normal" data-t="${texte}" data-v="0.9">🔊</button>
      <button class="b-lent" data-t="${texte}" data-v="0.5">🐢</button>`;
    chat.appendChild(b);
    attacherAudio(b);
    defiler();
  }

  function bulleMoi(texte) {
    const b = document.createElement("div");
    b.className = "bulle moi";
    b.textContent = texte;
    chat.appendChild(b);
    defiler();
  }

  function conseil(texte) {
    const c = document.createElement("div");
    c.className = "conseil";
    c.textContent = texte;
    chat.appendChild(c);
    defiler();
  }

  function afficherEtape(prefixe) {
    const e = scenario[etape];
    bulleBot(prefixe + e.bot, e.fr);
    parler(prefixe + e.bot, 0.6);
    sugg.innerHTML = "";

    if (e.fin) {
      ligne.style.display = "none";
      const bouton = document.createElement("button");
      bouton.textContent = "🔄 Recommencer la conversation";
      bouton.onclick = () => rendreRobot(zone, s, j, sem);
      sugg.appendChild(bouton);
      finirJour(s, j);
      return;
    }

    const titre = document.createElement("p");
    titre.innerHTML = "<b>👇 Tu peux répondre :</b>";
    sugg.appendChild(titre);

    e.reponses.forEach(r => {
      const boite = document.createElement("div");
      boite.className = "suggestion";
      boite.innerHTML = `
        <div class="en">${r.en}</div>
        <div class="pron">🗣️ ${r.pron}</div>
        <div class="fr">${r.fr}</div>
        <button class="b-lent" data-t="${r.en}" data-v="0.5">🐢 Écouter</button>`;
      const dire = document.createElement("button");
      dire.textContent = "✅ Dire ça";
      dire.onclick = () => envoyer(r.en);
      boite.appendChild(dire);
      sugg.appendChild(boite);
      attacherAudio(boite);
    });
  }

  function motsDe(texte) {
    return texte.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter(Boolean);
  }

  function reponseProche(texte) {
    const dits = motsDe(texte);
    return scenario[etape].reponses.some(r => {
      const ref = motsDe(r.en);
      const communs = ref.filter(m => dits.includes(m)).length;
      return communs / ref.length >= 0.6;
    });
  }

  function envoyer(texte) {
    texte = texte.trim();
    if (!texte || scenario[etape].fin) return;

    bulleMoi(texte);
    const proche = reponseProche(texte);
    if (!proche) {
      const ex = scenario[etape].reponses[0];
      conseil("💡 Bien essayé ! Tu pouvais dire : « " + ex.en + " » (" + ex.pron + ")");
    }
    sugg.innerHTML = "";
    etape++;
    setTimeout(() => afficherEtape(proche ? "Perfect! " : "Good! "), 1200);
  }

  zone.querySelector("#envoyer").onclick = () => { envoyer(champ.value); champ.value = ""; };
  champ.addEventListener("keydown", e => {
    if (e.key === "Enter") { envoyer(champ.value); champ.value = ""; }
  });

  if (SR) {
    const micro = zone.querySelector("#micro");
    micro.onclick = () => {
      const rec = new SR();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      micro.classList.add("ecoute");
      micro.textContent = "🎧";
      rec.onresult = e => envoyer(e.results[0][0].transcript);
      rec.onerror = () => conseil("🎤 Je n'ai pas bien entendu. Réessaie, ou choisis une phrase proposée.");
      rec.onend = () => { micro.classList.remove("ecoute"); micro.textContent = "🎤"; };
      rec.start();
    };
  }

  afficherEtape("");
}

// =====================================================
//  VENDREDI : QUIZ (créé automatiquement avec le vocabulaire)
// =====================================================
function rendreQuiz(zone, s, j, sem) {
  const mots = sem.jours.lundi.mots;
  const qs = melanger(mots).slice(0, 6);
  let n = 0;
  let score = 0;

  function afficher() {
    if (n >= qs.length) {
      const msg = score === qs.length
        ? "🏆 Parfait ! Tu es très fort !"
        : score >= 4
          ? "👏 Bravo, tu progresses bien !"
          : "💪 Continue, c'est en pratiquant qu'on apprend ! Refais le quiz.";
      zone.innerHTML = `
        <h2>🎯 Résultat : ${score} / ${qs.length}</h2>
        <p class="gros">${msg}</p>
        <button id="refaire">🔄 Refaire le quiz</button>
        <div id="pied"></div>`;
      zone.querySelector("#refaire").onclick = () => rendreQuiz(zone, s, j, sem);
      finirJour(s, j, score);
      return;
    }

    const q = qs[n];
    const enVersFr = n % 2 === 0;
    const autres = melanger(mots.filter(m => m.en !== q.en)).slice(0, 2);
    const options = melanger([q, ...autres]);

    zone.innerHTML = `
      <h2>🎯 Quiz de la semaine</h2>
      <p class="petit">Question ${n + 1} / ${qs.length}</p>
      <p class="question">${enVersFr ? `Que veut dire « ${q.en} » ?` : `Comment dit-on « ${q.fr} » en anglais ?`}</p>
      ${enVersFr ? `<button class="b-lent" data-t="${q.en}" data-v="0.5">🐢 Écouter</button>` : ""}
      <div id="options"></div>
      <p class="retour-quiz" id="retour"></p>`;
    attacherAudio(zone);

    const zo = zone.querySelector("#options");
    options.forEach(o => {
      const b = document.createElement("button");
      b.className = "option";
      b.textContent = enVersFr ? o.fr : o.en;
      b.onclick = () => {
        zo.querySelectorAll("button").forEach(x => x.disabled = true);
        const retour = zone.querySelector("#retour");
        if (o.en === q.en) {
          b.classList.add("bonne");
          retour.textContent = "✅ Bravo !";
          score++;
        } else {
          b.classList.add("mauvaise");
          retour.textContent = "❌ Pas grave ! La bonne réponse : " + (enVersFr ? q.fr : q.en);
        }
        parler(q.en, 0.6);
        setTimeout(() => { n++; afficher(); }, 2200);
      };
      zo.appendChild(b);
    });
  }

  afficher();
}

// =====================================================
//  DÉMARRAGE
// =====================================================
route();