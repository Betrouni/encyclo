// Données des champignons toxicologiques de Sanjiro de la Salamandre
const mushroomsData = [
  {
    "nom": "Otoyake",
    "pays": "Pays du Son",
    "prix_kg": 2800,
    "toxicite": 4.5,
    "hallucinogene": 3,
    "couleurs": ["Violette", "Noire"],
    "categorie": "champignon"
  },
  {
    "nom": "Silencio-kinoko",
    "pays": "Pays du Son",
    "prix_kg": 3500,
    "toxicite": 2,
    "hallucinogene": 4.5,
    "couleurs": ["Gris cendré", "Blanc opalescent"],
    "categorie": "champignon"
  },
  {
    "nom": "Katon-shimeji",
    "pays": "Pays du Feu",
    "prix_kg": 1900,
    "toxicite": 1.5,
    "hallucinogene": 1,
    "couleurs": ["Rouge brique", "Crème"],
    "categorie": "champignon"
  },
  {
    "nom": "Tetsu-matsutake",
    "pays": "Pays du Fer",
    "prix_kg": 4200,
    "toxicite": 3.5,
    "hallucinogene": 2,
    "couleurs": ["Gris métallique", "Argenté"],
    "categorie": "champignon"
  },
  {
    "nom": "Onsen-enoki",
    "pays": "Pays des Sources Chaudes",
    "prix_kg": 3100,
    "toxicite": 2.5,
    "hallucinogene": 3.5,
    "couleurs": ["Blanc nacré", "Rose pâle"],
    "categorie": "champignon"
  },
  {
    "nom": "Iwa-shiitake",
    "pays": "Pays de la Roche",
    "prix_kg": 2600,
    "toxicite": 4,
    "hallucinogene": 1.5,
    "couleurs": ["Brun terreux", "Gris pierre"],
    "categorie": "champignon"
  },
  {
    "nom": "Kawa-champignon",
    "pays": "Pays des Rivières",
    "prix_kg": 2200,
    "toxicite": 1,
    "hallucinogene": 2.5,
    "couleurs": ["Bleu aquatique", "Vert mousse"],
    "categorie": "champignon"
  },
  {
    "nom": "Hibana-kinoko",
    "pays": "Pays du Feu",
    "prix_kg": 5000,
    "toxicite": 5,
    "hallucinogene": 4,
    "couleurs": ["Rouge flamboyant", "Orange vif"],
    "categorie": "champignon"
  },
  {
    "nom": "Mizu-maitake",
    "pays": "Pays des Rivières",
    "prix_kg": 1800,
    "toxicite": 0.5,
    "hallucinogene": 1.5,
    "couleurs": ["Bleu clair", "Transparent"],
    "categorie": "champignon"
  },
  {
    "nom": "Yama-reishi",
    "pays": "Pays de la Roche",
    "prix_kg": 6500,
    "toxicite": 3,
    "hallucinogene": 5,
    "couleurs": ["Pourpre royal", "Doré"],
    "categorie": "champignon"
  },
  {
    "nom": "Hagane-champignon",
    "pays": "Pays du Fer",
    "prix_kg": 3800,
    "toxicite": 4.5,
    "hallucinogene": 0.5,
    "couleurs": ["Noir charbon", "Bleu acier"],
    "categorie": "champignon"
  },
  {
    "nom": "Yu-kinoko",
    "pays": "Pays des Sources Chaudes",
    "prix_kg": 4100,
    "toxicite": 2,
    "hallucinogene": 4,
    "couleurs": ["Blanc vapeur", "Jaune soufre"],
    "categorie": "champignon"
  }
];

// Données des plantes toxicologiques de Sanjiro de la Salamandre
const plantsData = [
  {
    "nom": "Myōganosé",
    "pays": "Pays du Son",
    "prix_kg": 1500,
    "toxicite": 3.5,
    "hallucinogene": 2.5,
    "couleurs": ["Indigo", "Vert mousse"],
    "categorie": "plante"
  },
  {
    "nom": "Belladone d'Uchiha",
    "pays": "Pays du Feu",
    "prix_kg": 4200,
    "toxicite": 5,
    "hallucinogene": 4,
    "couleurs": ["Violet profond", "Noir"],
    "categorie": "plante"
  },
  {
    "nom": "Pivoine de la Brume",
    "pays": "Pays des Sources Chaudes",
    "prix_kg": 1100,
    "toxicite": 1,
    "hallucinogene": 0.5,
    "couleurs": ["Rose vif", "Vert clair"],
    "categorie": "plante"
  },
  {
    "nom": "Hana-senbon",
    "pays": "Pays de la Roche",
    "prix_kg": 2900,
    "toxicite": 2,
    "hallucinogene": 1.5,
    "couleurs": ["Rouge vineux", "Brun terre"],
    "categorie": "plante"
  },
  {
    "nom": "Kōri-hanabira",
    "pays": "Pays du Fer",
    "prix_kg": 3100,
    "toxicite": 2.5,
    "hallucinogene": 3,
    "couleurs": ["Bleu pâle", "Blanc givré"],
    "categorie": "plante"
  },
  {
    "nom": "Riviara-kusa",
    "pays": "Pays des Rivières",
    "prix_kg": 2300,
    "toxicite": 1.5,
    "hallucinogene": 2,
    "couleurs": ["Vert jade", "Cyan"],
    "categorie": "plante"
  },
  {
    "nom": "Shōzō-no-hana",
    "pays": "Pays du Feu",
    "prix_kg": 2600,
    "toxicite": 4,
    "hallucinogene": 3.5,
    "couleurs": ["Orange rouille", "Jaune fané"],
    "categorie": "plante"
  },
  {
    "nom": "Kinoko-no-hanabira",
    "pays": "Pays des Sources Chaudes",
    "prix_kg": 1900,
    "toxicite": 2,
    "hallucinogene": 2.5,
    "couleurs": ["Brun rosé", "Crème"],
    "categorie": "plante"
  },
  {
    "nom": "Tsuchihana",
    "pays": "Pays de la Roche",
    "prix_kg": 2800,
    "toxicite": 3,
    "hallucinogene": 2,
    "couleurs": ["Gris pierre", "Rouge brique"],
    "categorie": "plante"
  },
  {
    "nom": "Fuyugusa",
    "pays": "Pays du Fer",
    "prix_kg": 3300,
    "toxicite": 3.5,
    "hallucinogene": 4,
    "couleurs": ["Bleu glacial", "Violet doux"],
    "categorie": "plante"
  }
];

// Données combinées
const allData = [...mushroomsData, ...plantsData];

// Export pour utilisation dans script.js
window.mushroomsData = allData; 