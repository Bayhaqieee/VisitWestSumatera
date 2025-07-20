document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('header');

    // --- STICKY HEADER FOR HOMEPAGE ---
    const handleScroll = () => {
        if (body.classList.contains('homepage')) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    };
    window.addEventListener('scroll', handleScroll);

    // --- LANGUAGE SWITCHER ---
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');
    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.dataset.key;
            if (translations[key] && translations[key][lang]) {
                elem.innerHTML = translations[key][lang];
            }
        });
        document.documentElement.lang = lang; 
        localStorage.setItem('language', lang);
        if (langDropdown) langDropdown.style.display = 'none';
    };
    if (langButton) {
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
        });
        document.getElementById('set-lang-id').addEventListener('click', () => setLanguage('id'));
        document.getElementById('set-lang-en').addEventListener('click', () => setLanguage('en'));
        document.addEventListener('click', () => { langDropdown.style.display = 'none'; });
    }
    const savedLanguage = localStorage.getItem('language') || 'id';
    setLanguage(savedLanguage);

    // --- THEME TOGGLE ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const applyTheme = (theme) => {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            body.classList.remove('dark-mode');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    };
    if(themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);

    // --- IMPROVED MUSIC PLAYER ---
    const songToggleButton = document.getElementById('song-toggle-button');
    const backgroundSong = document.getElementById('background-song');
    const songIcon = document.getElementById('song-icon');
    const songNameDisplay = document.getElementById('song-name-display');
    if (songToggleButton) {
        if (backgroundSong.dataset.songName) {
            songNameDisplay.textContent = backgroundSong.dataset.songName;
        }
        songToggleButton.addEventListener('click', () => {
            if (backgroundSong.paused) {
                backgroundSong.play();
                songIcon.className = 'fas fa-pause';
            } else {
                backgroundSong.pause();
                songIcon.className = 'fas fa-play';
            }
        });
    }
});