document.addEventListener('DOMContentLoaded', () => {
    const langSwitch = document.getElementById('lang-switch');
    const html = document.documentElement;

    // Default to English if no lang attribute or already present (handled by HTML)
    if (!html.getAttribute('lang')) {
        html.setAttribute('lang', 'en');
    }

    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            const currentLang = html.getAttribute('lang');
            const newLang = currentLang === 'en' ? 'ja' : 'en';
            html.setAttribute('lang', newLang);
            
            // Switch button text based on new language state
            if (newLang === 'ja') {
                langSwitch.textContent = 'English';
                langSwitch.setAttribute('aria-label', 'Switch to English');
            } else {
                langSwitch.textContent = '日本語';
                langSwitch.setAttribute('aria-label', 'Switch to Japanese');
            }
        });
    }

    // --- Last Modified Date Script (moved from index.html) ---
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModifiedDate = new Date(document.lastModified);
        const year = lastModifiedDate.getFullYear();
        const month = String(lastModifiedDate.getMonth() + 1).padStart(2, '0');
        const day = String(lastModifiedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        const dateSpan = document.createElement('span');
        dateSpan.textContent = formattedDate;
        lastModifiedElement.appendChild(dateSpan);
    }

    // --- Mobile Menu Toggle (moved from index.html) ---
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if(toggleBtn){
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking a link (on mobile)
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });
});
