// Variables globales
let currentCountryFilter = '';
let currentCategoryFilter = '';
let allItems = [];

// Configuration: collez ici l'URL GViz publiée de votre Google Sheet (optionnel)
// Format attendu: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json&gid=GID
// Laissez vide pour utiliser les données locales (data.js)
const SHEET_GVIZ_URL = 'https://docs.google.com/spreadsheets/d/1mmrhSvfq62a2NlEbDcNUqPjC1I8-fsY5SX0tGYP6Ctk/gviz/tq?tqx=out:json&gid=1400924564';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    loadDataAndInitialize();
});

async function loadDataAndInitialize() {
    // Tente de charger les données depuis Google Sheets, sinon fallback local
    try {
        if (SHEET_GVIZ_URL && typeof SHEET_GVIZ_URL === 'string' && SHEET_GVIZ_URL.startsWith('http')) {
            const sheetItems = await fetchGoogleSheetData(SHEET_GVIZ_URL);
            if (Array.isArray(sheetItems) && sheetItems.length > 0) {
                allItems = sheetItems;
            } else {
                allItems = window.mushroomsData || [];
            }
        } else {
            allItems = window.mushroomsData || [];
        }
    } catch (e) {
        // En cas d'erreur, fallback aux données locales
        allItems = window.mushroomsData || [];
        // Optionnel: log en console pour debug
        console.warn('Chargement Google Sheets échoué, utilisation des données locales.', e);
    }
    initializeApp();
}

// Chargement depuis Google Sheets (GViz JSON)
async function fetchGoogleSheetData(gvizUrl) {
    // Ajoute un paramètre anti-cache pour forcer l'actualisation
    const url = gvizUrl + (gvizUrl.includes('?') ? '&' : '?') + 'cacheBust=' + Date.now();
    const response = await fetch(url, { cache: 'no-store' });
    const text = await response.text();

    // Si on reçoit une page HTML (souvent une page de connexion), on lève une erreur
    if (/^\s*<!DOCTYPE html>/i.test(text) || /^\s*<html/i.test(text)) {
        throw new Error('Google Sheets non public ou nécessite une connexion');
    }

    // Le format GViz est encapsulé: google.visualization.Query.setResponse({...});
    const jsonString = text
        .replace(/^.*setResponse\(/s, '')
        .replace(/\);\s*$/s, '');

    const data = JSON.parse(jsonString);
    const cols = (data.table && data.table.cols) ? data.table.cols.map(c => (c && c.label ? c.label : '').trim()) : [];
    const rows = (data.table && data.table.rows) ? data.table.rows : [];

    // Attendu: colonnes nom | pays | prix_kg | toxicite | hallucinogene | couleurs | categorie
    const headerIndex = Object.fromEntries(cols.map((name, idx) => [name.toLowerCase(), idx]));

    function getCell(row, key) {
        const idx = headerIndex[key];
        if (idx === undefined) return null;
        const cell = row.c[idx];
        if (!cell) return null;
        return cell.f != null ? cell.f : cell.v;
    }

    const items = rows.map(r => {
        const nom = getCell(r, 'nom') || '';
        const pays = getCell(r, 'pays') || '';
        const prix = getCell(r, 'prix_kg');
        const tox = getCell(r, 'toxicite');
        const hallu = getCell(r, 'hallucinogene');
        const couleursRaw = getCell(r, 'couleurs') || '';
        const categorie = (getCell(r, 'categorie') || '').toString().toLowerCase();

        const prix_kg = typeof prix === 'number' ? prix : parseFloat((prix || '').toString().replace(/\s/g, '').replace(',', '.')) || 0;
        const toxicite = typeof tox === 'number' ? tox : parseFloat((tox || '').toString().replace(',', '.')) || 0;
        const hallucinogene = typeof hallu === 'number' ? hallu : parseFloat((hallu || '').toString().replace(',', '.')) || 0;

        const couleurs = couleursRaw
            .toString()
            .split('|')
            .map(s => s.trim())
            .filter(Boolean);

        const normalizedCategory = categorie.includes('plante') ? 'plante' : 'champignon';

        return {
            nom,
            pays,
            prix_kg,
            toxicite,
            hallucinogene,
            couleurs,
            categorie: normalizedCategory
        };
    }).filter(item => item.nom && item.pays);

    return items;
}

// Initialisation principale
function initializeApp() {
    populateCountryFilter();
    populateCategoryFilter();
    displayItems(allItems);
    updateStats();
    setupEventListeners();
}

// Remplir le select des pays
function populateCountryFilter() {
    const countrySelect = document.getElementById('country-filter');
    const countries = [...new Set(allItems.map(item => item.pays))].sort();
    
    // Vider les options existantes (sauf "Tous les pays")
    countrySelect.innerHTML = '<option value="">Tous les pays</option>';
    
    // Ajouter les pays
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Remplir le select des catégories
function populateCategoryFilter() {
    const categorySelect = document.getElementById('category-filter');
    const categories = [...new Set(allItems.map(item => item.categorie))].sort();
    
    // Vider les options existantes (sauf "Toutes les entités")
    categorySelect.innerHTML = '<option value="">Toutes les entités</option>';
    
    // Ajouter les catégories avec des noms plus beaux
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'champignon' ? 'Champignons' : 'Plantes';
        categorySelect.appendChild(option);
    });
}

// Afficher les éléments
function displayItems(items) {
    const grid = document.getElementById('item-grid');
    const noResults = document.getElementById('no-results');
    
    if (items.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = items.map(item => createItemCard(item)).join('');
    
    // Animation d'apparition des cartes
    const cards = grid.querySelectorAll('.item-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Créer une carte d'élément
function createItemCard(item) {
    const toxicityStars = generateStars(item.toxicite);
    const hallucinogenicStars = generateStars(item.hallucinogene);
    const colorsHtml = item.couleurs.map(color => 
        `<span class="color-tag">${color}</span>`
    ).join('');
    
    // Choisir l'icône et l'image selon la catégorie
    const isPlant = item.categorie === 'plante';
    const categoryIcon = isPlant ? '🌿' : '🍄';
    const imageSrc = isPlant ? 'plante.webp' : 'champignon.webp';
    const categoryLabel = isPlant ? 'Plante' : 'Champignon';
    
    return `
        <div class="item-card">
            <div class="category-badge">
                <span class="category-icon">${categoryIcon}</span>
                <span class="category-text">${categoryLabel}</span>
            </div>
            <img src="${imageSrc}" alt="${item.nom}" class="item-image" loading="lazy">
            
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${item.nom}</h3>
                    <span class="item-country">${item.pays}</span>
                </div>
                
                <div class="item-price">
                    <span class="price-icon">💰</span>
                    <span>${formatPrice(item.prix_kg)} ryôs/kg</span>
                </div>
                
                <div class="ratings-container">
                    <div class="rating-item toxicity">
                        <div class="rating-label">Toxicité</div>
                        <div class="rating-stars">${toxicityStars}</div>
                    </div>
                    <div class="rating-item hallucinogenic">
                        <div class="rating-label">Hallucinogène</div>
                        <div class="rating-stars">${hallucinogenicStars}</div>
                    </div>
                </div>
                
                <div class="colors-container">
                    <div class="colors-label">Couleurs principales</div>
                    <div class="colors-list">${colorsHtml}</div>
                </div>
            </div>
        </div>
    `;
}

// Générer les étoiles pour les notes
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star filled">★</span>';
    }
    
    // Étoile à moitié
    if (hasHalfStar) {
        starsHtml += '<span class="star half">★</span>';
    }
    
    // Étoiles vides
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star">★</span>';
    }
    
    return starsHtml;
}

// Formater le prix avec des espaces pour les milliers
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Filtrer les éléments par pays et catégorie
function filterItems() {
    const selectedCountry = document.getElementById('country-filter').value;
    const selectedCategory = document.getElementById('category-filter').value;
    currentCountryFilter = selectedCountry;
    currentCategoryFilter = selectedCategory;
    
    let filteredItems = allItems;
    
    // Filtrer par pays
    if (selectedCountry !== '') {
        filteredItems = filteredItems.filter(item => 
            item.pays === selectedCountry
        );
    }
    
    // Filtrer par catégorie
    if (selectedCategory !== '') {
        filteredItems = filteredItems.filter(item => 
            item.categorie === selectedCategory
        );
    }
    
    displayItems(filteredItems);
    updateStats(filteredItems);
}

// Mettre à jour les statistiques
function updateStats(items = allItems) {
    const totalItems = items.length;
    const totalCountries = [...new Set(allItems.map(m => m.pays))].length;
    const totalMushrooms = allItems.filter(item => item.categorie === 'champignon').length;
    const totalPlants = allItems.filter(item => item.categorie === 'plante').length;
    
    // Animation des chiffres
    animateNumber('total-items', totalItems);
    animateNumber('total-countries', totalCountries);
    animateNumber('total-mushrooms', totalMushrooms);
    animateNumber('total-plants', totalPlants);
}

// Animation des nombres
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    const currentNumber = parseInt(element.textContent) || 0;
    const increment = targetNumber > currentNumber ? 1 : -1;
    const duration = 500; // ms
    const steps = Math.abs(targetNumber - currentNumber);
    const stepDuration = steps > 0 ? duration / steps : 0;
    
    if (steps === 0) return;
    
    let current = currentNumber;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === targetNumber) {
            clearInterval(timer);
        }
    }, stepDuration);
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    const countrySelect = document.getElementById('country-filter');
    const categorySelect = document.getElementById('category-filter');
    const exportBtn = document.getElementById('export-csv');
    
    countrySelect.addEventListener('change', filterItems);
    categorySelect.addEventListener('change', filterItems);
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }
    
    // Effet de survol sur les cartes
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.item-card')) {
            e.target.closest('.item-card').style.transform = 'translateY(-8px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.item-card')) {
            e.target.closest('.item-card').style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // Échap pour réinitialiser les filtres
        if (e.key === 'Escape') {
            countrySelect.value = '';
            categorySelect.value = '';
            filterItems();
        }
        
        // Ctrl/Cmd + F pour focus sur le select pays
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            countrySelect.focus();
        }
        
        // Ctrl/Cmd + G pour focus sur le select catégorie
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            e.preventDefault();
            categorySelect.focus();
        }
    });
}

// Exporter les données au format CSV (pour import Google Sheets)
function exportToCSV() {
    const headers = ['nom','pays','prix_kg','toxicite','hallucinogene','couleurs','categorie'];
    const csvEscape = s => '"' + (s ?? '').toString().replace(/"/g, '""') + '"';
    const rows = (allItems && allItems.length ? allItems : (window.mushroomsData || [])).map(it => [
        it.nom,
        it.pays,
        it.prix_kg,
        it.toxicite,
        it.hallucinogene,
        (it.couleurs || []).join('|'),
        it.categorie
    ]);
    const csv = [headers, ...rows].map(r => r.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'toxicology_data.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Fonctions utilitaires pour l'ajout de nouveaux éléments (pour usage futur)
function addItem(itemData) {
    allItems.push(itemData);
    populateCountryFilter();
    populateCategoryFilter();
    
    // Vérifier si l'élément correspond aux filtres actuels
    const matchesCountry = currentCountryFilter === '' || currentCountryFilter === itemData.pays;
    const matchesCategory = currentCategoryFilter === '' || currentCategoryFilter === itemData.categorie;
    
    if (matchesCountry && matchesCategory) {
        const filteredItems = allItems.filter(item => {
            const countryMatch = currentCountryFilter === '' || item.pays === currentCountryFilter;
            const categoryMatch = currentCategoryFilter === '' || item.categorie === currentCategoryFilter;
            return countryMatch && categoryMatch;
        });
        displayItems(filteredItems);
    }
    updateStats();
}

// Fonction de recherche avancée (pour extension future)
function searchItems(query) {
    const searchTerms = query.toLowerCase().split(' ');
    return allItems.filter(item => {
        const searchableText = [
            item.nom,
            item.pays,
            item.categorie,
            ...item.couleurs
        ].join(' ').toLowerCase();
        
        return searchTerms.every(term => searchableText.includes(term));
    });
}

// Export des fonctions pour usage externe
window.ToxicologyEncyclopedia = {
    addItem,
    searchItems,
    filterItems,
    allItems: () => allItems
}; 