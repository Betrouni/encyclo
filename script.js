// Variables globales
let currentFilter = '';
let allMushrooms = [];

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    allMushrooms = window.mushroomsData || [];
    initializeApp();
});

// Initialisation principale
function initializeApp() {
    populateCountryFilter();
    displayMushrooms(allMushrooms);
    updateStats();
    setupEventListeners();
}

// Remplir le select des pays
function populateCountryFilter() {
    const countrySelect = document.getElementById('country-filter');
    const countries = [...new Set(allMushrooms.map(mushroom => mushroom.pays))].sort();
    
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

// Afficher les champignons
function displayMushrooms(mushrooms) {
    const grid = document.getElementById('mushroom-grid');
    const noResults = document.getElementById('no-results');
    
    if (mushrooms.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = mushrooms.map(mushroom => createMushroomCard(mushroom)).join('');
    
    // Animation d'apparition des cartes
    const cards = grid.querySelectorAll('.mushroom-card');
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

// Créer une carte de champignon
function createMushroomCard(mushroom) {
    const toxicityStars = generateStars(mushroom.toxicite);
    const hallucinogenicStars = generateStars(mushroom.hallucinogene);
    const colorsHtml = mushroom.couleurs.map(color => 
        `<span class="color-tag">${color}</span>`
    ).join('');
    
    return `
        <div class="mushroom-card">
            <img src="champignon.webp" alt="${mushroom.nom}" class="mushroom-image" loading="lazy">
            
            <div class="mushroom-content">
                <div class="mushroom-header">
                    <h3 class="mushroom-name">${mushroom.nom}</h3>
                    <span class="mushroom-country">${mushroom.pays}</span>
                </div>
                
                <div class="mushroom-price">
                    <span class="price-icon">💰</span>
                    <span>${formatPrice(mushroom.prix_kg)} ryôs/kg</span>
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

// Filtrer les champignons par pays
function filterMushrooms() {
    const selectedCountry = document.getElementById('country-filter').value;
    currentFilter = selectedCountry;
    
    let filteredMushrooms;
    if (selectedCountry === '') {
        filteredMushrooms = allMushrooms;
    } else {
        filteredMushrooms = allMushrooms.filter(mushroom => 
            mushroom.pays === selectedCountry
        );
    }
    
    displayMushrooms(filteredMushrooms);
    updateStats(filteredMushrooms);
}

// Mettre à jour les statistiques
function updateStats(mushrooms = allMushrooms) {
    const totalMushrooms = mushrooms.length;
    const totalCountries = [...new Set(allMushrooms.map(m => m.pays))].length;
    
    // Animation des chiffres
    animateNumber('total-mushrooms', totalMushrooms);
    animateNumber('total-countries', totalCountries);
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
    countrySelect.addEventListener('change', filterMushrooms);
    
    // Effet de survol sur les cartes
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.mushroom-card')) {
            e.target.closest('.mushroom-card').style.transform = 'translateY(-8px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.mushroom-card')) {
            e.target.closest('.mushroom-card').style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // Échap pour réinitialiser le filtre
        if (e.key === 'Escape') {
            countrySelect.value = '';
            filterMushrooms();
        }
        
        // Ctrl/Cmd + F pour focus sur le select
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            countrySelect.focus();
        }
    });
}

// Fonctions utilitaires pour l'ajout de nouveaux champignons (pour usage futur)
function addMushroom(mushroomData) {
    allMushrooms.push(mushroomData);
    populateCountryFilter();
    if (currentFilter === '' || currentFilter === mushroomData.pays) {
        displayMushrooms(allMushrooms.filter(m => 
            currentFilter === '' || m.pays === currentFilter
        ));
    }
    updateStats();
}

// Fonction de recherche avancée (pour extension future)
function searchMushrooms(query) {
    const searchTerms = query.toLowerCase().split(' ');
    return allMushrooms.filter(mushroom => {
        const searchableText = [
            mushroom.nom,
            mushroom.pays,
            ...mushroom.couleurs
        ].join(' ').toLowerCase();
        
        return searchTerms.every(term => searchableText.includes(term));
    });
}

// Export des fonctions pour usage externe
window.MushroomEncyclopedia = {
    addMushroom,
    searchMushrooms,
    filterMushrooms,
    allMushrooms: () => allMushrooms
}; 