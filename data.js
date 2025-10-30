// Données des champignons toxicologiques de Sanjiro de la Salamandre
const mushroomsData = [
  {
    "nom": "Otoyatoke",
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
  }
];

// Données combinées
const allData = [...mushroomsData, ...plantsData];

// Export pour utilisation dans script.js
window.mushroomsData = allData; 