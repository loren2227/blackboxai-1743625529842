// Load shared components
function loadComponents() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupMobileMenu();
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Cultural tidbits for loading screen
const culturalTidbits = [
    "The Philippines is the only predominantly Christian nation in Asia.",
    "Filipino time often runs 15-30 minutes later than scheduled time.",
    "The Philippine flag changes meaning when inverted - war is declared!",
    "Jollibee is more popular than McDonald's in the Philippines.",
    "The Philippines has the world's longest Christmas season.",
    "There are over 7,600 islands in the Philippine archipelago.",
    "The word 'boondocks' comes from the Tagalog word 'bundok' meaning mountain."
];

// Show loading screen with cultural tidbit
function showCulturalTidbit() {
    const loadingScreen = document.getElementById('loading-screen');
    const tidbitText = document.getElementById('tidbit-text');
    const closeButton = document.getElementById('close-tidbit');

    if (loadingScreen && tidbitText && closeButton) {
        // Show random tidbit
        const randomTidbit = culturalTidbits[Math.floor(Math.random() * culturalTidbits.length)];
        tidbitText.textContent = randomTidbit;
        
        // Display loading screen
        loadingScreen.classList.remove('hidden');
        
        // Close button handler
        closeButton.addEventListener('click', () => {
            loadingScreen.classList.add('hidden');
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    
    // Show cultural tidbit on home page only
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname === '/') {
        setTimeout(showCulturalTidbit, 1000);
    }
    
    // Check for logged in user
    const user = localStorage.getItem('filipinopro-user');
    if (user) {
        const userAvatar = document.getElementById('user-avatar');
        const loginButton = document.querySelector('a[href="login.html"]');
        if (userAvatar) userAvatar.classList.remove('hidden');
        if (loginButton) loginButton.classList.add('hidden');
    }
});

// Basic user authentication functions
function loginUser(username) {
    localStorage.setItem('filipinopro-user', JSON.stringify({
        username: username,
        streak: 0,
        level: 'beginner',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }));
    window.location.href = 'profile.html';
}

function logoutUser() {
    localStorage.removeItem('filipinopro-user');
    window.location.href = 'index.html';
}