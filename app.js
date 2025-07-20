document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- LANGUAGE SWITCHER ---
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangIcon = document.getElementById('current-lang-icon');
    const currentLangText = document.getElementById('current-lang-text');

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.dataset.key;
            if (translations[key] && translations[key][lang]) {
                elem.innerHTML = translations[key][lang];
            }
        });
        // Update UI of the language button
        currentLangText.textContent = lang.toUpperCase();
        currentLangIcon.src = `images/icons/${lang}-flag.png`; // Anda perlu ikon bendera: en-flag.png & id-flag.png
        document.documentElement.lang = lang; // Update language attribute of the page
        localStorage.setItem('language', lang); // Save preference
        langDropdown.style.display = 'none'; // Hide dropdown
    };

    langButton.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('set-lang-id').addEventListener('click', () => setLanguage('id'));
    document.getElementById('set-lang-en').addEventListener('click', () => setLanguage('en'));

    // Hide dropdown if clicked outside
    document.addEventListener('click', () => {
        langDropdown.style.display = 'none';
    });

    // Load saved language or default to 'id'
    const savedLanguage = localStorage.getItem('language') || 'id';
    setLanguage(savedLanguage);


    // --- THEME TOGGLE ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
            themeToggleButton.innerHTML = '<img src="images/icons/sun.png" alt="Light Mode" title="Switch to Light Mode">';
        } else {
            body.classList.remove('dark-mode');
            themeToggleButton.innerHTML = '<img src="images/icons/moon.png" alt="Dark Mode" title="Switch to Dark Mode">';
        }
    };
    themeToggleButton.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);


    // --- MUSIC PLAYER ---
    const songToggleButton = document.getElementById('song-toggle-button');
    const backgroundSong = document.getElementById('background-song');
    const songIcon = document.getElementById('song-icon');

    songToggleButton.addEventListener('click', () => {
        if (backgroundSong.paused) {
            backgroundSong.play();
            songIcon.src = 'images/icons/music-on.png';
            songIcon.alt = 'Pause Music';
        } else {
            backgroundSong.pause();
            songIcon.src = 'images/icons/music-off.png';
            songIcon.alt = 'Play Music';
        }
    });
});