function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// Language Toggle Logic
function setLanguage(lang) {
    document.documentElement.lang = lang;

    // Toggle active class on buttons if we had them (future proofing)
    // Update visibility
    document.querySelectorAll('.lang-content').forEach(el => {
        if (el.dataset.lang === lang) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });

    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

// New Approach: Toggle Body Class
function toggleLanguage() {
    const currentLang = document.body.dataset.lang || 'en';
    const newLang = currentLang === 'en' ? 'ta' : 'en';

    document.body.dataset.lang = newLang;
    const btnText = document.getElementById('langBtnText');
    if (btnText) {
        btnText.innerText = newLang === 'en' ? 'தமிழ்' : 'English';
    }

    localStorage.setItem('userLang', newLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('userLang') || 'en';
    document.body.dataset.lang = savedLang;

    const btnText = document.getElementById('langBtnText');
    if (btnText) {
        btnText.innerText = savedLang === 'en' ? 'தமிழ்' : 'English';
    }

    // Animation Observer
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
