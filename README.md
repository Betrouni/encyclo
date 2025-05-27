# 🍄 Encyclopédie Toxicologique de Sanjiro de la Salamandre

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://betrouni.github.io/encyclo)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🚀 **[Voir la démonstration en ligne](https://betrouni.github.io/encyclo)**

Une encyclopédie interactive des champignons toxicologiques collectés par Sanjiro dans l'univers de Naruto, présentée dans un format type Pokédex.

![Screenshot](https://via.placeholder.com/800x400/2c3e50/ffffff?text=Encyclop%C3%A9die+Toxicologique)

## 🎯 Fonctionnalités

- **Interface responsive** : Adaptée à tous les écrans (desktop, tablette, mobile)
- **Design type Pokédex** : Interface moderne et immersive avec animations
- **Filtrage par pays** : Sélection dynamique pour afficher les champignons d'un pays spécifique
- **Cartes détaillées** : Chaque champignon affiche :
  - Nom du champignon
  - Pays d'origine
  - Prix au kilo (en ryôs)
  - Note de toxicité (sur 5, avec étoiles)
  - Note d'effet hallucinogène (sur 5, avec étoiles)
  - Couleurs principales
- **Statistiques en temps réel** : Nombre total de champignons et pays explorés
- **Animations fluides** : Effets de survol et transitions

## 🚀 Installation et utilisation

### Méthode simple
1. Téléchargez tous les fichiers dans un dossier
2. Ouvrez `index.html` dans votre navigateur web
3. L'encyclopédie est prête à utiliser !

### Hébergement web
Vous pouvez héberger ces fichiers sur n'importe quel service d'hébergement web :
- GitHub Pages
- Netlify
- Vercel
- Serveur web classique

## 📁 Structure des fichiers

```
mycosuivi/
├── index.html          # Page principale
├── styles.css          # Styles et design
├── script.js           # Logique JavaScript
├── data.js             # Données des champignons
└── README.md           # Documentation
```

## 🔧 Ajouter de nouveaux champignons

Pour enrichir l'encyclopédie, modifiez le fichier `data.js` :

```javascript
// Ajoutez vos nouveaux champignons dans le tableau mushroomsData
{
  "nom": "Nom-du-champignon",
  "pays": "Pays d'origine",
  "prix_kg": 0000,                    // Prix en ryôs
  "toxicite": 0.0,                    // Note sur 5 (décimales autorisées)
  "hallucinogene": 0.0,               // Note sur 5 (décimales autorisées)
  "couleurs": ["Couleur1", "Couleur2"] // Tableau des couleurs
}
```

### Exemple d'ajout :
```javascript
{
  "nom": "Kage-matsutake",
  "pays": "Pays de l'Ombre",
  "prix_kg": 7500,
  "toxicite": 4.8,
  "hallucinogene": 3.2,
  "couleurs": ["Noir profond", "Violet sombre"]
}
```

## 🎨 Personnalisation

### Modifier les couleurs du thème
Dans `styles.css`, modifiez les variables CSS :

```css
:root {
    --primary-color: #2c3e50;      /* Couleur principale */
    --secondary-color: #e74c3c;    /* Couleur secondaire */
    --accent-color: #f39c12;       /* Couleur d'accent */
    --success-color: #27ae60;      /* Couleur des prix */
    --danger-color: #e74c3c;       /* Couleur toxicité */
}
```

### Ajouter de nouveaux pays
Les pays sont automatiquement détectés depuis les données. Ajoutez simplement un champignon avec un nouveau pays dans `data.js`.

## ⌨️ Raccourcis clavier

- **Échap** : Réinitialiser le filtre (afficher tous les champignons)
- **Ctrl/Cmd + F** : Focus sur le sélecteur de pays

## 🔮 Fonctionnalités avancées

### API JavaScript
L'encyclopédie expose une API pour les développeurs :

```javascript
// Ajouter un champignon dynamiquement
MushroomEncyclopedia.addMushroom(nouveauChampignon);

// Rechercher des champignons
const resultats = MushroomEncyclopedia.searchMushrooms("rouge feu");

// Accéder à tous les champignons
const tous = MushroomEncyclopedia.allMushrooms();
```

## 🌟 Pays disponibles

- Pays du Son
- Pays du Feu
- Pays du Fer
- Pays des Sources Chaudes
- Pays de la Roche
- Pays des Rivières

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ Pas de dépendances externes (fonctionne hors ligne)

## 🎭 Thème Naruto

L'interface s'inspire de l'univers de Naruto avec :
- Typographie moderne (Orbitron pour les titres)
- Couleurs rappelant les éléments ninja
- Badge salamandre animé
- Terminologie adaptée (ryôs, pays ninja)

## 🔄 Mises à jour futures possibles

- Système de recherche textuelle
- Tri par prix, toxicité, etc.
- Mode sombre/clair
- Export des données
- Système de favoris
- Détails étendus par champignon

---

**Créé pour le RP de Sanjiro de la Salamandre** 🦎

*Bonne exploration toxicologique !* 