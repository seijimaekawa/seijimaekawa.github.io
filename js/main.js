document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const langSwitch = document.getElementById('lang-switch');
    const navToggle = document.querySelector('.nav-toggle');
    const siteNavigation = document.getElementById('site-navigation');
    const mobileNavigation = window.matchMedia('(max-width: 740px)');
    const lastModifiedElement = document.getElementById('last-modified');

    const updateLastModified = (language) => {
        if (!lastModifiedElement) {
            return;
        }

        let dateSpan = lastModifiedElement.querySelector('.last-modified-date');
        if (!dateSpan) {
            dateSpan = document.createElement('span');
            dateSpan.className = 'last-modified-date';
            lastModifiedElement.appendChild(dateSpan);
        }

        dateSpan.textContent = new Intl.DateTimeFormat(
            language === 'ja' ? 'ja-JP' : 'en-CA',
            { year: 'numeric', month: '2-digit', day: '2-digit' }
        ).format(new Date(document.lastModified));
    };

    const setNavigationOpen = (isOpen) => {
        if (!navToggle || !siteNavigation) {
            return;
        }

        const shouldOpen = mobileNavigation.matches && isOpen;
        navToggle.setAttribute('aria-expanded', String(shouldOpen));
        siteNavigation.hidden = mobileNavigation.matches && !shouldOpen;
    };

    const syncNavigation = () => {
        setNavigationOpen(false);
    };

    syncNavigation();

    if (navToggle && siteNavigation) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            setNavigationOpen(!isOpen);
        });

        siteNavigation.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setNavigationOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                setNavigationOpen(false);
                navToggle.focus();
            }
        });

        mobileNavigation.addEventListener('change', syncNavigation);
    }

    const setLanguage = (language) => {
        const nextLanguage = language === 'ja' ? 'ja' : 'en';
        html.setAttribute('lang', nextLanguage);
        updateLastModified(nextLanguage);

        if (langSwitch) {
            const switchingToJapanese = nextLanguage === 'en';
            langSwitch.textContent = switchingToJapanese ? '日本語' : 'English';
            langSwitch.setAttribute(
                'aria-label',
                switchingToJapanese ? 'Switch to Japanese' : 'Switch to English'
            );
        }
    };

    setLanguage(html.getAttribute('lang'));

    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            const nextLanguage = html.getAttribute('lang') === 'en' ? 'ja' : 'en';
            setLanguage(nextLanguage);

            try {
                window.localStorage.setItem('preferred-language', nextLanguage);
            } catch {
                // The language switch still works when storage is unavailable.
            }
        });
    }

});
