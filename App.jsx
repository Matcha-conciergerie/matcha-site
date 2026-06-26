import { useState, useMemo } from "react";
import { Home, Search, Star, MapPin, Check, ArrowRight, KeyRound, Sparkles, Shield, Filter, ChevronLeft, ChevronDown, Users, Briefcase, Heart, Phone, Mail } from "lucide-react";

// ---- Palette By Anita ----
const C = {
  profond: "#4E3B6E",
  prune: "#7B466F",
  orange: "#C8602A",
  dore: "#D9C188",
  creme: "#FAF6ED",
  aubergine: "#2D2235",
  encre: "#2A2520",
  sepia: "#6B5D4F",
};
const titleFont = { fontFamily: "'Libre Baskerville', Georgia, serif" };
const bodyFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const SERIF = "'Libre Baskerville', Georgia, serif";
const NOIR = C.aubergine; // texte noir des boutons

// ---- Ton tuyau Formspree (les demandes hôtes arrivent dans matcha.conciergerie@gmail.com) ----
const FORMSPREE_URL = "https://formspree.io/f/xvzjarzj";

// ---- Mot vedette Matchä (serif vintage, tréma encre) ----
function Headword({ size = 28, color = C.encre, cap = false }) {
  return (
    <span style={{ fontFamily: SERIF, fontSize: size, fontWeight: 700, color, lineHeight: 1, display: "inline-flex", alignItems: "flex-start", letterSpacing: "-0.06em" }}>
      <span>{cap ? "M" : "m"}atch</span>
      <span style={{ position: "relative", display: "inline-block" }}>
        a
        <span style={{ position: "absolute", top: size * 0.11, left: "50%", transform: "translateX(-50%)", display: "flex", gap: size * 0.11 }}>
          <span style={{ width: size * 0.09, height: size * 0.09, borderRadius: "50%", background: color }} />
          <span style={{ width: size * 0.09, height: size * 0.09, borderRadius: "50%", background: color }} />
        </span>
      </span>
    </span>
  );
}

function Anno({ children, size = 12, color = C.sepia }) {
  return <span style={{ fontFamily: SERIF, fontSize: size, color, fontStyle: "italic", letterSpacing: "0.03em" }}>{children}</span>;
}

// Clé "marque" (violet/doré) pour fonds colorés/foncés
function KeyBrand({ size = 44 }) {
  return (
    <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: size, height: size, background: `linear-gradient(140deg, ${C.profond}, ${C.prune})`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}>
      <KeyRound size={size * 0.52} color={C.dore} strokeWidth={2.2} style={{ transform: "rotate(-45deg)" }} />
    </div>
  );
}

// Lockup header : cartouche papier sur le violet
function HeaderLockup({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center px-4 py-2 rounded-md shrink-0" style={{ backgroundColor: C.creme, border: "1px solid rgba(42,37,32,0.15)" }}>
      <div className="text-left">
        <Headword size={30} cap />
        <div style={{ marginTop: 2 }}><Anno size={10}>[mat.ʃa]&nbsp; n. f.</Anno></div>
      </div>
    </button>
  );
}

// ---- Données fictives ----
const SERVICES = ["Ménage", "Check-in / Check-out", "Gestion du linge", "Gestion des annonces", "Maintenance", "Accueil voyageurs", "Photographie", "Optimisation tarifaire"];

const CONCIERGES = [
  {
    id: 1, name: "Cocoon Conciergerie", city: "Honfleur", dept: "14 — Calvados", region: "Normandie",
    rating: 4.9, reviews: 47, biens: 32, since: 2019, price: "18–22 %",
    services: ["Ménage", "Check-in / Check-out", "Gestion du linge", "Gestion des annonces", "Accueil voyageurs"],
    grad: [C.prune, C.orange], verified: true,
    bio: "Conciergerie indépendante spécialisée dans les biens de charme du littoral normand. Service premium, disponibilité 7j/7, équipe locale.",
    reviewList: [
      { author: "Marc D.", rating: 5, text: "Gestion impeccable de mon appartement à Honfleur. Réservations en hausse de 30 %." },
      { author: "Sophie L.", rating: 5, text: "Réactivité parfaite, voyageurs ravis. Je recommande les yeux fermés." },
    ],
  },
  {
    id: 2, name: "KeyNest Paris", city: "Paris", dept: "75 — Paris", region: "Île-de-France",
    rating: 4.7, reviews: 128, biens: 89, since: 2017, price: "20–25 %",
    services: ["Ménage", "Check-in / Check-out", "Gestion des annonces", "Optimisation tarifaire", "Photographie"],
    grad: [C.profond, C.prune], verified: true,
    bio: "La conciergerie urbaine par excellence. Technologie de tarification dynamique et photographes professionnels intégrés.",
    reviewList: [
      { author: "Julien R.", rating: 5, text: "Le yield management a vraiment fait la différence sur mes 3 studios." },
      { author: "Amélie T.", rating: 4, text: "Très pro, parfois difficile à joindre en haute saison." },
    ],
  },
  {
    id: 3, name: "Lavande & Co", city: "Aix-en-Provence", dept: "13 — Bouches-du-Rhône", region: "PACA",
    rating: 4.8, reviews: 63, biens: 41, since: 2018, price: "17–21 %",
    services: ["Ménage", "Check-in / Check-out", "Gestion du linge", "Accueil voyageurs", "Maintenance"],
    grad: [C.prune, C.dore], verified: true,
    bio: "Conciergerie provençale à taille humaine. Nous traitons chaque bien comme le nôtre, avec un soin artisanal.",
    reviewList: [
      { author: "Claire M.", rating: 5, text: "Une équipe adorable et un mas magnifiquement entretenu." },
    ],
  },
  {
    id: 4, name: "Atlantic Stay", city: "Bordeaux", dept: "33 — Gironde", region: "Nouvelle-Aquitaine",
    rating: 4.6, reviews: 92, biens: 58, since: 2016, price: "19–23 %",
    services: ["Ménage", "Gestion des annonces", "Optimisation tarifaire", "Maintenance", "Check-in / Check-out"],
    grad: [C.profond, C.orange], verified: false,
    bio: "Spécialiste du marché bordelais et du Bassin d'Arcachon. Approche data-driven pour maximiser vos revenus locatifs.",
    reviewList: [
      { author: "Pierre V.", rating: 5, text: "Mes revenus ont augmenté de 25 % la première année." },
      { author: "Nadia K.", rating: 4, text: "Bon service global, communication à améliorer." },
    ],
  },
  {
    id: 5, name: "Alpine Lodge Services", city: "Annecy", dept: "74 — Haute-Savoie", region: "Auvergne-Rhône-Alpes",
    rating: 5.0, reviews: 34, biens: 19, since: 2020, price: "20–24 %",
    services: ["Ménage", "Check-in / Check-out", "Gestion du linge", "Accueil voyageurs", "Photographie", "Maintenance"],
    grad: [C.aubergine, C.prune], verified: true,
    bio: "Conciergerie haut de gamme pour chalets et appartements de montagne. Expérience voyageur soignée dans les moindres détails.",
    reviewList: [
      { author: "Thomas B.", rating: 5, text: "Service 5 étoiles, à la hauteur de mon chalet. Parfait." },
    ],
  },
  {
    id: 6, name: "Riviera Hosts", city: "Nice", dept: "06 — Alpes-Maritimes", region: "PACA",
    rating: 4.5, reviews: 156, biens: 103, since: 2015, price: "21–26 %",
    services: ["Ménage", "Check-in / Check-out", "Gestion des annonces", "Optimisation tarifaire", "Accueil voyageurs", "Gestion du linge"],
    grad: [C.orange, C.dore], verified: true,
    bio: "Leader de la conciergerie sur la Côte d'Azur. Multilingue, disponible 24/7, idéal pour la clientèle internationale.",
    reviewList: [
      { author: "Isabella F.", rating: 5, text: "Perfect for my international guests. Truly professional." },
      { author: "Olivier P.", rating: 4, text: "Efficace mais commission un peu élevée." },
    ],
  },
];

const REGIONS = ["Toutes les régions", "Normandie", "Île-de-France", "PACA", "Nouvelle-Aquitaine", "Auvergne-Rhône-Alpes"];

const BIENS = [
  { id: 1, type: "Appartement T2", city: "Honfleur", dept: "14 — Calvados", region: "Normandie", capacite: "4 voyageurs", besoins: ["Ménage", "Check-in / Check-out", "Gestion des annonces"], grad: [C.prune, C.orange], desc: "Charmant T2 vue port, loué en saison. Cherche conciergerie locale réactive." },
  { id: 2, type: "Studio", city: "Paris 11e", dept: "75 — Paris", region: "Île-de-France", capacite: "2 voyageurs", besoins: ["Ménage", "Accueil voyageurs", "Optimisation tarifaire"], grad: [C.profond, C.prune], desc: "Studio refait à neuf, forte demande. Propriétaire expatrié, gestion 100 % déléguée." },
  { id: 3, type: "Mas provençal", city: "Aix-en-Provence", dept: "13 — Bouches-du-Rhône", region: "PACA", capacite: "8 voyageurs", besoins: ["Ménage", "Gestion du linge", "Maintenance", "Accueil voyageurs"], grad: [C.prune, C.dore], desc: "Grand mas avec piscine, locations à la semaine l'été. Cherche gestion premium." },
  { id: 4, type: "Maison de ville", city: "Bordeaux", dept: "33 — Gironde", region: "Nouvelle-Aquitaine", capacite: "6 voyageurs", besoins: ["Ménage", "Gestion des annonces", "Optimisation tarifaire"], grad: [C.profond, C.orange], desc: "Maison proche centre, rentabilité à optimiser. Ouvert à une gestion clé en main." },
  { id: 5, type: "Chalet", city: "Annecy", dept: "74 — Haute-Savoie", region: "Auvergne-Rhône-Alpes", capacite: "10 voyageurs", besoins: ["Ménage", "Gestion du linge", "Accueil voyageurs", "Maintenance"], grad: [C.aubergine, C.prune], desc: "Chalet familial proche lac et pistes. Saison hiver + été, besoin d'un gestionnaire fiable." },
  { id: 6, type: "Appartement vue mer", city: "Nice", dept: "06 — Alpes-Maritimes", region: "PACA", capacite: "4 voyageurs", besoins: ["Ménage", "Check-in / Check-out", "Gestion des annonces", "Accueil voyageurs"], grad: [C.orange, C.dore], desc: "Bel appartement Promenade, clientèle internationale. Cherche conciergerie multilingue." },
];

function Stars({ rating, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} style={{ color: i <= Math.round(rating) ? C.dore : "#D6CFC4", fill: i <= Math.round(rating) ? C.dore : "transparent" }} />
      ))}
    </span>
  );
}

function ConciergeCard({ c, onView }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6", boxShadow: "0 1px 3px rgba(45,34,53,0.06)" }}>
      <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${c.grad[0]}, ${c.grad[1]})` }}>
        {c.verified && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: "rgba(255,255,255,0.95)", color: C.profond }}>
            <Shield size={12} /> Vérifiée
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg leading-tight" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>{c.name}</h3>
        <div className="flex items-center gap-1.5 text-sm mt-1.5" style={{ color: C.prune }}>
          <MapPin size={14} /> {c.city} · {c.dept}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Stars rating={c.rating} />
          <span className="font-semibold text-sm" style={{ color: C.aubergine }}>{c.rating}</span>
          <span className="text-sm" style={{ color: "#A99F94" }}>({c.reviews} avis)</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {c.services.slice(0, 3).map((s) => (
            <span key={s} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: C.creme, color: C.prune }}>{s}</span>
          ))}
          {c.services.length > 3 && <span className="text-xs px-1 py-1" style={{ color: "#A99F94" }}>+{c.services.length - 3}</span>}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #ECE4D6" }}>
          <div className="text-sm">
            <span style={{ color: "#A99F94" }}>Commission</span>{" "}
            <span className="font-semibold" style={{ color: C.aubergine }}>{c.price}</span>
          </div>
          <span className="text-sm" style={{ color: C.prune }}>{c.biens} biens gérés</span>
        </div>
        <button onClick={() => onView(c)} className="mt-4 w-full font-semibold py-2.5 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: C.creme, color: NOIR, border: "1px solid #ECE4D6" }}>
          Voir le profil <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Toutes les régions");
  const [svcFilter, setSvcFilter] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [bienRegion, setBienRegion] = useState("Toutes les régions");

  // ---- Formulaire hôte (demande réelle envoyée par email via Formspree) ----
  const [propCity, setPropCity] = useState("");
  const [propType, setPropType] = useState("");
  const [propServices, setPropServices] = useState([]);
  const [propName, setPropName] = useState("");
  const [propEmail, setPropEmail] = useState("");
  const [propPhone, setPropPhone] = useState("");
  const [propMessage, setPropMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState("");

  const toggleSvc = (s, list, setList) => setList(list.includes(s) ? list.filter((x) => x !== s) : [...list, s]);

  const filtered = useMemo(() => CONCIERGES.filter((c) => {
    const mSearch = !search || c.city.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase()) || c.dept.toLowerCase().includes(search.toLowerCase());
    const mRegion = region === "Toutes les régions" || c.region === region;
    const mSvc = svcFilter.length === 0 || svcFilter.every((s) => c.services.includes(s));
    return mSearch && mRegion && mSvc;
  }), [search, region, svcFilter]);

  // ---- Envoi réel de la demande hôte ----
  const submitLead = async () => {
    setLeadError("");
    if (!propName.trim() || !propEmail.trim() || !propCity.trim()) {
      setLeadError("Merci de renseigner au minimum votre nom, votre email et la ville de votre bien.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Nouvelle demande hôte — ${propCity}`,
          Nom: propName,
          Email: propEmail,
          Téléphone: propPhone || "(non renseigné)",
          Ville: propCity,
          "Type de bien": propType || "(non renseigné)",
          "Services recherchés": propServices.length ? propServices.join(", ") : "(non précisé)",
          Message: propMessage || "(aucun)",
        }),
      });
      if (res.ok) {
        setLeadSent(true);
        window.scrollTo(0, 0);
      } else {
        setLeadError("Une erreur est survenue à l'envoi. Réessayez dans un instant.");
      }
    } catch (e) {
      setLeadError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSending(false);
    }
  };

  const resetLead = () => {
    setPropCity(""); setPropType(""); setPropServices([]); setPropName(""); setPropEmail(""); setPropPhone(""); setPropMessage("");
    setLeadSent(false); setLeadError("");
  };

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const viewConcierge = (c) => { setSelected(c); go("detail"); };

  const inputStyle = { border: "1px solid #ECE4D6", outline: "none" };
  const pill = (active) => ({ border: active ? `1px solid ${C.profond}` : "1px solid #ECE4D6", backgroundColor: active ? C.profond : "#fff", color: active ? "#fff" : C.prune });

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.creme, color: C.aubergine, ...bodyFont, letterSpacing: "-0.035em" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');`}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-20" style={{ backgroundColor: C.profond, borderBottom: `1px solid ${C.aubergine}` }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <HeaderLockup onClick={() => go("home")} />
          <nav className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="relative" onMouseLeave={() => setCatOpen(false)}>
              <button onClick={() => setCatOpen((o) => !o)} onMouseEnter={() => setCatOpen(true)} className="w-36 h-11 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5" style={{ color: "#fff", backgroundColor: (page === "directory" || page === "biens") ? "rgba(255,255,255,0.18)" : "transparent", border: "1px solid rgba(255,255,255,0.6)" }}>
                Catalogue <ChevronDown size={16} style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full pt-2 z-30 w-64">
                  <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6", boxShadow: "0 8px 24px rgba(45,34,53,0.12)" }}>
                    <button onClick={() => { go("directory"); setCatOpen(false); }} className="w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors hover:bg-[#FAF6ED]">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: C.creme, color: C.orange }}><Users size={18} /></div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: C.aubergine }}>Les conciergeries</div>
                        <div className="text-xs mt-0.5" style={{ color: C.prune }}>Trouvez qui gérera votre bien</div>
                      </div>
                    </button>
                    <div style={{ borderTop: "1px solid #ECE4D6" }} />
                    <button onClick={() => { go("biens"); setCatOpen(false); }} className="w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors hover:bg-[#FAF6ED]">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: C.creme, color: C.orange }}><Home size={18} /></div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: C.aubergine }}>Les biens à gérer</div>
                        <div className="text-xs mt-0.5" style={{ color: C.prune }}>Hôtes en quête d'une conciergerie</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => go("loueur")} className="w-44 h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 flex items-center justify-center" style={{ backgroundColor: "#fff", color: NOIR }}>Référencer mon bien</button>
            <button onClick={() => go("signup")} className="w-44 h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 flex items-center justify-center px-2" style={{ backgroundColor: C.orange, color: NOIR }}>Référencer ma conciergerie</button>
          </nav>
        </div>
      </header>

      {/* HOME */}
      {page === "home" && (
        <div>
          <section style={{ backgroundColor: C.creme }}>
            <div className="max-w-3xl mx-auto px-5 pt-20 pb-16 text-center">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-semibold mb-8" style={{ backgroundColor: "#fff", color: "#A8893F", border: "1px solid #ECE4D6" }}>
                <Sparkles size={18} fill="#A8893F" /> Conciergeries indépendantes en Normandie
              </span>

              <h1 className="text-3xl sm:text-5xl leading-tight max-w-2xl mx-auto" style={{ fontFamily: SERIF, fontWeight: 700, color: C.aubergine, letterSpacing: "-0.055em" }}>
                Le bon match entre votre bien et la conciergerie qui lui ressemble.
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
                <button onClick={() => go("loueur")} className="font-semibold w-full sm:w-60 py-4 rounded-2xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base" style={{ backgroundColor: "#fff", color: NOIR, border: `1px solid ${C.profond}`, boxShadow: "0 4px 14px rgba(78,59,110,0.12)" }}>
                  <Home size={19} /> Je suis hôte
                </button>
                <button onClick={() => go("signup")} className="font-semibold w-full sm:w-60 py-4 rounded-2xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base" style={{ backgroundColor: C.orange, color: NOIR, boxShadow: "0 4px 14px rgba(200,96,42,0.25)" }}>
                  <Briefcase size={19} /> Je suis conciergerie
                </button>
              </div>

              {/* définition discrète, sans cadre */}
              <div className="mt-10 max-w-xl mx-auto">
                <div className="flex items-baseline justify-center gap-2.5 flex-wrap">
                  <Headword size={20} cap />
                  <Anno size={12}>[mat.ʃa]</Anno>
                  <Anno size={12}>n. f.</Anno>
                </div>
                <p className="mt-2" style={{ fontFamily: SERIF, fontSize: 13, fontStyle: "italic", color: C.sepia, lineHeight: 1.6 }}>
                  Plateforme qui relie les hôtes et les conciergeries indépendantes, partout en France. — <span style={{ color: C.encre }}>Le bon match, les bonnes clés.</span>
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-5 py-16">
            <h2 className="text-3xl text-center" style={{ fontFamily: SERIF, fontWeight: 700, color: C.aubergine, letterSpacing: "-0.055em" }}>Comment ça matche ?</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {[
                { icon: Search, t: "1. Décrivez votre besoin", d: "Votre bien et les services recherchés, ou votre conciergerie et votre zone." },
                { icon: Sparkles, t: "2. Matchä vous relie", d: "Notre matching rapproche les bons profils, par zone et par besoins." },
                { icon: Heart, t: "3. Le bon match", d: "Comparez avis et tarifs, puis contactez en toute confiance." },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-7 text-center" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: C.creme, color: C.orange }}><s.icon size={26} /></div>
                  <h3 className="mt-4 text-lg" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>{s.t}</h3>
                  <p className="text-sm mt-2" style={{ color: C.prune }}>{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-5 pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine, letterSpacing: "-0.055em" }}>Conciergeries à la une</h2>
              <button onClick={() => go("directory")} className="font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all" style={{ color: C.orange }}>
                Tout voir <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONCIERGES.slice(0, 3).map((c) => <ConciergeCard key={c.id} c={c} onView={viewConcierge} />)}
            </div>
          </section>

          <section className="text-white" style={{ backgroundColor: C.profond }}>
            <div className="max-w-6xl mx-auto px-5 py-16 text-center">
              <div className="flex justify-center"><HeaderLockup onClick={() => go("home")} /></div>
              <h2 className="text-3xl mt-5 max-w-2xl mx-auto" style={{ fontFamily: SERIF, fontWeight: 700, color: "#fff", letterSpacing: "-0.055em" }}>Vous êtes conciergerie indépendante ?</h2>
              <p className="mt-3 max-w-xl mx-auto" style={{ color: "rgba(250,246,237,0.75)" }}>Référencez votre activité gratuitement et matchez avec des hôtes partout en France.</p>
              <button onClick={() => go("signup")} className="mt-7 font-semibold px-8 py-3.5 rounded-xl transition-opacity hover:opacity-90 inline-flex items-center gap-2" style={{ backgroundColor: C.orange, color: NOIR }}>
                Référencer ma conciergerie <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* DIRECTORY */}
      {page === "directory" && (
        <div className="max-w-6xl mx-auto px-5 py-10">
          <h1 className="text-3xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Annuaire des conciergeries</h1>
          <p className="mt-2" style={{ color: C.prune }}>Trouvez la conciergerie indépendante qui matche avec votre bien.</p>

          <div className="rounded-2xl p-5 mt-6" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6" }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#A99F94" }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ville, département ou nom..." className="w-full pl-11 pr-4 py-3 rounded-xl" style={inputStyle} />
              </div>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="px-4 py-3 rounded-xl bg-white" style={{ ...inputStyle, color: C.prune }}>
                {REGIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm flex items-center gap-1" style={{ color: C.prune }}><Filter size={14} /> Services :</span>
              {SERVICES.map((s) => (
                <button key={s} onClick={() => toggleSvc(s, svcFilter, setSvcFilter)} className="text-xs px-3 py-1.5 rounded-full transition-colors" style={pill(svcFilter.includes(s))}>{s}</button>
              ))}
            </div>
          </div>

          <p className="text-sm mt-6" style={{ color: C.prune }}>{filtered.length} conciergerie{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filtered.map((c) => <ConciergeCard key={c.id} c={c} onView={viewConcierge} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "#A99F94" }}>
              <Search size={40} className="mx-auto mb-3" /> Aucune conciergerie ne matche ces critères.
            </div>
          )}
        </div>
      )}

      {/* DETAIL */}
      {page === "detail" && selected && (
        <div className="max-w-4xl mx-auto px-5 py-8">
          <button onClick={() => go("directory")} className="flex items-center gap-1 text-sm font-medium mb-6" style={{ color: C.prune }}>
            <ChevronLeft size={18} /> Retour à l'annuaire
          </button>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6" }}>
            <div className="h-40 relative" style={{ background: `linear-gradient(135deg, ${selected.grad[0]}, ${selected.grad[1]})` }}>
              {selected.verified && (
                <span className="absolute top-4 right-4 text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: "rgba(255,255,255,0.95)", color: C.profond }}>
                  <Shield size={14} /> Conciergerie vérifiée
                </span>
              )}
            </div>
            <div className="p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>{selected.name}</h1>
                  <div className="flex items-center gap-1.5 mt-1.5" style={{ color: C.prune }}><MapPin size={16} /> {selected.city} · {selected.dept}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <Stars rating={selected.rating} size={18} />
                    <span className="font-bold" style={{ color: C.aubergine }}>{selected.rating}</span>
                    <span style={{ color: "#A99F94" }}>· {selected.reviews} avis · depuis {selected.since}</span>
                  </div>
                </div>
                <div className="rounded-xl p-4 text-center min-w-[140px]" style={{ backgroundColor: C.creme }}>
                  <div className="text-2xl" style={{ ...titleFont, fontWeight: 700, color: C.profond }}>{selected.price}</div>
                  <div className="text-xs" style={{ color: C.prune }}>commission</div>
                  <div className="text-sm mt-2 pt-2" style={{ color: C.aubergine, borderTop: "1px solid #E6DCC9" }}>{selected.biens} biens gérés</div>
                </div>
              </div>

              <p className="mt-6 leading-relaxed" style={{ color: C.prune }}>{selected.bio}</p>

              <h3 className="mt-7 mb-3 text-lg" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Services proposés</h3>
              <div className="flex flex-wrap gap-2">
                {selected.services.map((s) => (
                  <span key={s} className="text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ backgroundColor: C.creme, color: C.aubergine }}>
                    <Check size={14} style={{ color: C.orange }} /> {s}
                  </span>
                ))}
              </div>

              <h3 className="mt-8 mb-3 text-lg" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Avis des hôtes</h3>
              <div className="space-y-3">
                {selected.reviewList.map((r, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ backgroundColor: C.creme }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: C.aubergine }}>{r.author}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <p className="text-sm mt-2" style={{ color: C.prune }}>{r.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6" style={{ borderTop: "1px solid #ECE4D6" }}>
                <button onClick={() => { resetLead(); go("loueur"); }} className="flex-1 font-semibold py-3.5 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: C.orange, color: NOIR }}>
                  <Mail size={18} /> Demander un devis
                </button>
                <button onClick={() => { resetLead(); go("loueur"); }} className="flex-1 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2" style={{ backgroundColor: "#fff", border: `1px solid ${C.orange}`, color: NOIR }}>
                  <Phone size={18} /> Être recontacté
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOUEUR / HÔTE — formulaire de demande RÉEL (envoi email via Formspree) */}
      {page === "loueur" && (
        <div className="max-w-2xl mx-auto px-5 py-10">
          {!leadSent ? (
            <>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: "#fff", color: C.orange, border: "1px solid #ECE4D6" }}><Home size={26} /></div>
                <h1 className="text-3xl mt-4" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Trouvez votre conciergerie</h1>
                <p className="mt-2" style={{ color: C.prune }}>Décrivez votre bien et vos besoins. Matchä vous met en relation avec la conciergerie de votre secteur qui vous correspond. C'est gratuit et sans engagement.</p>
              </div>

              <div className="rounded-2xl p-7 mt-8 space-y-6" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6" }}>
                {/* --- Votre bien --- */}
                <div>
                  <div className="text-xs font-semibold tracking-wide mb-3" style={{ color: "#A99F94" }}>VOTRE BIEN</div>
                  <label className="block">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Où se situe votre bien ? <span style={{ color: C.orange }}>*</span></span>
                    <input value={propCity} onChange={(e) => setPropCity(e.target.value)} placeholder="Ex : Honfleur, Deauville, Trouville..." className="w-full mt-2 px-4 py-3 rounded-xl" style={inputStyle} />
                  </label>
                  <label className="block mt-4">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Type de bien</span>
                    <input value={propType} onChange={(e) => setPropType(e.target.value)} placeholder="Ex : Appartement T2, maison, studio..." className="w-full mt-2 px-4 py-3 rounded-xl" style={inputStyle} />
                  </label>
                </div>

                {/* --- Services --- */}
                <div>
                  <span className="font-semibold text-sm" style={{ color: C.aubergine }}>De quels services avez-vous besoin ?</span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {SERVICES.map((s) => (
                      <button key={s} onClick={() => toggleSvc(s, propServices, setPropServices)} className="text-sm px-3.5 py-2 rounded-full transition-colors" style={pill(propServices.includes(s))}>{s}</button>
                    ))}
                  </div>
                </div>

                {/* --- Vos coordonnées --- */}
                <div>
                  <div className="text-xs font-semibold tracking-wide mb-3" style={{ color: "#A99F94" }}>VOS COORDONNÉES</div>
                  <label className="block">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Votre nom <span style={{ color: C.orange }}>*</span></span>
                    <input value={propName} onChange={(e) => setPropName(e.target.value)} placeholder="Prénom et nom" className="w-full mt-2 px-4 py-3 rounded-xl" style={inputStyle} />
                  </label>
                  <label className="block mt-4">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Votre email <span style={{ color: C.orange }}>*</span></span>
                    <input type="email" value={propEmail} onChange={(e) => setPropEmail(e.target.value)} placeholder="vous@email.com" className="w-full mt-2 px-4 py-3 rounded-xl" style={inputStyle} />
                  </label>
                  <label className="block mt-4">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Votre téléphone</span>
                    <input value={propPhone} onChange={(e) => setPropPhone(e.target.value)} placeholder="06 ..." className="w-full mt-2 px-4 py-3 rounded-xl" style={inputStyle} />
                  </label>
                  <label className="block mt-4">
                    <span className="font-semibold text-sm" style={{ color: C.aubergine }}>Un message (optionnel)</span>
                    <textarea value={propMessage} onChange={(e) => setPropMessage(e.target.value)} rows={3} placeholder="Précisez votre besoin, vos disponibilités, vos questions..." className="w-full mt-2 px-4 py-3 rounded-xl resize-none" style={inputStyle} />
                  </label>
                </div>

                {leadError && (
                  <div className="text-sm px-4 py-3 rounded-xl" style={{ backgroundColor: "#FBEEE6", color: C.orange, border: `1px solid ${C.orange}` }}>{leadError}</div>
                )}

                <button onClick={submitLead} disabled={sending} className="w-full font-semibold py-3.5 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50" style={{ backgroundColor: C.orange, color: NOIR }}>
                  {sending ? "Envoi en cours..." : (<><Sparkles size={18} /> Envoyer ma demande</>)}
                </button>
                <p className="text-xs text-center" style={{ color: "#A99F94" }}>Vos coordonnées ne sont transmises qu'à la conciergerie qui vous correspond. Aucune commission, aucun intermédiaire dans votre contrat.</p>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: C.creme, color: C.orange }}><Check size={32} /></div>
              <h1 className="text-2xl mt-5" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Votre demande est bien partie ! 🔑</h1>
              <p className="mt-3 max-w-md mx-auto" style={{ color: C.prune }}>Merci {propName.split(" ")[0]}. Nous étudions votre besoin et vous mettons en relation avec la conciergerie de votre secteur qui vous correspond. Vous serez recontacté(e) rapidement.</p>
              <button onClick={() => { resetLead(); go("home"); }} className="mt-7 font-semibold px-7 py-3 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: C.orange, color: NOIR }}>
                Retour à l'accueil
              </button>
            </div>
          )}
        </div>
      )}

      {/* SIGNUP */}
      {page === "signup" && (
        <div className="max-w-2xl mx-auto px-5 py-10">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: "#fff", color: C.orange, border: "1px solid #ECE4D6" }}><Briefcase size={26} /></div>
            <h1 className="text-3xl mt-4" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Référencez votre conciergerie</h1>
            <p className="mt-2" style={{ color: C.prune }}>Créez votre profil gratuitement et matchez avec des hôtes.</p>
          </div>
          <Onboarding onDone={() => go("home")} />
        </div>
      )}

      {/* BIENS À GÉRER */}
      {page === "biens" && (
        <div className="max-w-6xl mx-auto px-5 py-10">
          <h1 className="text-3xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Les biens à gérer</h1>
          <p className="mt-2" style={{ color: C.prune }}>Conciergeries, découvrez les hôtes qui cherchent un partenaire de confiance.</p>

          <div className="flex items-center gap-2 mt-6 flex-wrap">
            <span className="text-sm flex items-center gap-1" style={{ color: C.prune }}><Filter size={14} /> Région :</span>
            {REGIONS.map((r) => (
              <button key={r} onClick={() => setBienRegion(r)} className="text-xs px-3 py-1.5 rounded-full transition-colors" style={pill(bienRegion === r)}>{r}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {BIENS.filter((b) => bienRegion === "Toutes les régions" || b.region === bienRegion).map((b) => (
              <div key={b.id} className="rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6", boxShadow: "0 1px 3px rgba(45,34,53,0.06)" }}>
                <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${b.grad[0]}, ${b.grad[1]})` }}>
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.95)", color: C.profond }}>{b.capacite}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg leading-tight" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>{b.type}</h3>
                  <div className="flex items-center gap-1.5 text-sm mt-1.5" style={{ color: C.prune }}><MapPin size={14} /> {b.city} · {b.dept}</div>
                  <p className="text-sm mt-3" style={{ color: C.prune }}>{b.desc}</p>
                  <div className="mt-4">
                    <div className="text-xs font-semibold mb-1.5" style={{ color: "#A99F94" }}>SERVICES RECHERCHÉS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {b.besoins.map((s) => <span key={s} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: C.creme, color: C.prune }}>{s}</span>)}
                    </div>
                  </div>
                  <button onClick={() => go("signup")} className="mt-5 w-full font-semibold py-2.5 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: C.orange, color: NOIR }}>
                    Proposer mes services <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#fff", borderTop: "1px solid #ECE4D6" }}>
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col items-center text-center text-sm" style={{ color: "#A99F94" }}>
          <div className="text-center">
            <Headword size={22} cap />
            <div style={{ marginTop: 2 }}><Anno size={10}>[mat.ʃa]&nbsp; n. f.</Anno></div>
          </div>
          <div className="mt-3">Hôtes × Conciergeries · Le bon match, les bonnes clés · Normandie</div>
        </div>
      </footer>
    </div>
  );
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", city: "", price: "", services: [], bio: "", email: "" });
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleSvc = (s) => set("services", data.services.includes(s) ? data.services.filter((x) => x !== s) : [...data.services, s]);
  const inputStyle = { border: "1px solid #ECE4D6", outline: "none" };
  const pill = (active) => ({ border: active ? `1px solid ${C.profond}` : "1px solid #ECE4D6", backgroundColor: active ? C.profond : "#fff", color: active ? "#fff" : C.prune });

  const submitConcierge = async () => {
    setErr("");
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Nouvelle conciergerie fondatrice — ${data.city}`,
          Type: "INSCRIPTION CONCIERGERIE",
          "Nom conciergerie": data.name,
          Email: data.email || "(non renseigné)",
          "Zone d'intervention": data.city,
          Commission: data.price || "(non renseignée)",
          Services: data.services.length ? data.services.join(", ") : "(non précisé)",
          Présentation: data.bio || "(aucune)",
        }),
      });
      if (res.ok) setStep(3);
      else setErr("Une erreur est survenue. Réessayez dans un instant.");
    } catch (e) {
      setErr("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl p-7 mt-8" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6" }}>
      <div className="flex items-center gap-2 mb-7">
        {[1, 2, 3].map((s) => (
          <div key={s} className="h-1.5 flex-1 rounded-full transition-colors" style={{ backgroundColor: s <= step ? C.orange : "#ECE4D6" }} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Informations générales</h2>
          <label className="block">
            <span className="text-sm font-medium" style={{ color: C.prune }}>Nom de votre conciergerie</span>
            <input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Cocoon Conciergerie" className="w-full mt-1.5 px-4 py-2.5 rounded-xl" style={inputStyle} />
          </label>
          <label className="block">
            <span className="text-sm font-medium" style={{ color: C.prune }}>Ville / zone d'intervention</span>
            <input value={data.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex : Honfleur et alentours" className="w-full mt-1.5 px-4 py-2.5 rounded-xl" style={inputStyle} />
          </label>
          <label className="block">
            <span className="text-sm font-medium" style={{ color: C.prune }}>Votre email</span>
            <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="contact@votre-conciergerie.fr" className="w-full mt-1.5 px-4 py-2.5 rounded-xl" style={inputStyle} />
          </label>
          <label className="block">
            <span className="text-sm font-medium" style={{ color: C.prune }}>Fourchette de commission</span>
            <input value={data.price} onChange={(e) => set("price", e.target.value)} placeholder="Ex : 18–22 %" className="w-full mt-1.5 px-4 py-2.5 rounded-xl" style={inputStyle} />
          </label>
          <button onClick={() => setStep(2)} disabled={!data.name || !data.city} className="w-full font-semibold py-3 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-40" style={{ backgroundColor: C.orange, color: NOIR }}>
            Continuer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-xl" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Vos services</h2>
          <p className="text-sm" style={{ color: C.prune }}>Sélectionnez tout ce que vous proposez.</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button key={s} onClick={() => toggleSvc(s)} className="text-sm px-3.5 py-2 rounded-full transition-colors" style={pill(data.services.includes(s))}>
                {data.services.includes(s) && <Check size={13} className="inline mr-1" />}{s}
              </button>
            ))}
          </div>
          <label className="block">
            <span className="text-sm font-medium" style={{ color: C.prune }}>Présentation courte</span>
            <textarea value={data.bio} onChange={(e) => set("bio", e.target.value)} rows={3} placeholder="Décrivez votre conciergerie en quelques lignes..." className="w-full mt-1.5 px-4 py-2.5 rounded-xl resize-none" style={inputStyle} />
          </label>
          {err && <div className="text-sm px-4 py-3 rounded-xl" style={{ backgroundColor: "#FBEEE6", color: C.orange, border: `1px solid ${C.orange}` }}>{err}</div>}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl font-semibold" style={{ border: "1px solid #ECE4D6", color: C.prune }}>Retour</button>
            <button onClick={submitConcierge} disabled={data.services.length === 0 || sending} className="flex-1 font-semibold py-3 rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-40" style={{ backgroundColor: C.orange, color: NOIR }}>
              {sending ? "Envoi..." : (<>Envoyer mon inscription <ArrowRight size={16} /></>)}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: C.creme, color: C.orange }}><Check size={32} /></div>
          <h2 className="text-2xl mt-5" style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>Inscription envoyée !</h2>
          <div className="rounded-xl p-5 mt-5 text-left" style={{ backgroundColor: C.creme }}>
            <div style={{ ...titleFont, fontWeight: 700, color: C.aubergine }}>{data.name || "Votre conciergerie"}</div>
            <div className="text-sm flex items-center gap-1 mt-1" style={{ color: C.prune }}><MapPin size={13} /> {data.city || "—"}</div>
            {data.price && <div className="text-sm mt-2" style={{ color: C.aubergine }}>Commission : <span className="font-semibold">{data.price}</span></div>}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {data.services.map((s) => <span key={s} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "#fff", border: "1px solid #ECE4D6", color: C.prune }}>{s}</span>)}
            </div>
            {data.bio && <p className="text-sm mt-3 italic" style={{ color: C.prune }}>"{data.bio}"</p>}
          </div>
          <p className="text-sm mt-4 max-w-md mx-auto" style={{ color: C.prune }}>Nous revenons vers vous très vite pour finaliser votre référencement et votre place de Membre Fondateur.</p>
          <button onClick={onDone} className="mt-6 font-semibold px-7 py-3 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: C.orange, color: NOIR }}>Terminer</button>
        </div>
      )}
    </div>
  );
}
