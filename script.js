document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    initCookieBanner();
    initLanguageSwitch();
    initProjectButtons();
    initThemeSwitch();
    initContactForm();
    initScrollSpy();
});

function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            // Retirer la classe active de tous les boutons
            langButtons.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            // Changer la langue
            changeLanguage(lang);
        });
    });
}

function initProjectButtons() {
    const viewMoreButtons = document.querySelectorAll('.view-more');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            card.classList.toggle('expanded');
            
            // Mettre à jour le texte du bouton
            const isExpanded = card.classList.contains('expanded');
            const lang = document.querySelector('.lang-btn.active').dataset.lang;
            button.textContent = isExpanded ? 
                (lang === 'fr' ? 'Voir Moins' : 'View Less') : 
                (lang === 'fr' ? 'Voir Plus' : 'View More');
        });
    });
}

function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const modal = document.getElementById('cookiePolicyModal');
    const viewPolicyBtn = document.getElementById('viewPolicy');
    
    // Vérifier si le consentement existe déjà
    if (!getCookie('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 1000);
    }

    document.querySelector('.cookie-btn.accept').addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 30); // 30 jours
        cookieBanner.classList.remove('visible');
    });

    document.querySelector('.cookie-btn.decline').addEventListener('click', () => {
        setCookie('cookieConsent', 'declined', 30); // 30 jours
        cookieBanner.classList.remove('visible');
    });

    // Gestion de la modale de politique
    if (viewPolicyBtn) {
        viewPolicyBtn.addEventListener('click', (e) => {
            console.log('View Policy clicked'); // Debug
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'flex';
            modal.classList.add('active');
        });
    }

    const closeBtn = document.getElementById('closeCookiePolicy');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close clicked'); // Debug
            modal.style.display = 'none';
            modal.classList.remove('active');
        });
    }

    // Fermeture de la modale en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    });
}

// Fonction pour changer la langue
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-fr], [data-en], [data-fr-placeholder], [data-en-placeholder]');
    elements.forEach(element => {
        // Pour les placeholders des inputs et textareas
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            const placeholderAttr = `data-${lang}-placeholder`;
            if (element.hasAttribute(placeholderAttr)) {
                element.placeholder = element.getAttribute(placeholderAttr);
            }
        }
        
        // Pour le texte normal des éléments avec préservation des emojis
        if (element.hasAttribute(`data-${lang}`)) {
            const emoji = element.textContent.match(/^[^\p{L}\p{N}\p{P}\p{Z}]+/u)?.[0] || '';
            const newText = element.getAttribute(`data-${lang}`);
            // Si le nouveau texte ne commence pas déjà par un emoji, ajouter l'emoji original
            if (!newText.match(/^[^\p{L}\p{N}\p{P}\p{Z}]+/u)) {
                element.textContent = emoji + newText;
            } else {
                element.textContent = newText;
            }
        }
    });

    // Recharger le reCAPTCHA avec la nouvelle langue
    const recaptchaScript = document.querySelector('script[src*="recaptcha/api.js"]');
    const newSrc = `https://www.google.com/recaptcha/api.js?hl=${lang}`;
    if (recaptchaScript.src !== newSrc) {
        recaptchaScript.src = newSrc;
        grecaptcha.reset();
    }
}

// Fonctions utilitaires pour les cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Ajouter la gestion du thème
function initThemeSwitch() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Charger le thème sauvegardé ou utiliser la préférence système
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Mettre à jour l'état initial du switch
    themeToggle.checked = currentTheme === 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifier le reCAPTCHA d'abord
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert('Veuillez valider le reCAPTCHA');
            return;
        }

        // Afficher un indicateur de chargement
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Préparer les données
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            'g-recaptcha-response': recaptchaResponse
        };

        // Assurez-vous de remplacer ces IDs par ceux de votre compte EmailJS
        emailjs.send('service_zaxblgd', 'template_nraahps', templateParams)
            .then(function() {
                alert('Message envoyé avec succès!');
                form.reset();
                grecaptcha.reset();
            }, function(error) {
                console.error('EmailJS error:', error);
                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
