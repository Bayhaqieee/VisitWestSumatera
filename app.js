document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode');
            themeToggleButton.innerHTML = '<img src="images/icons/sun.png" alt="Light Mode">';
        } else {
            body.classList.remove('dark-mode');
            themeToggleButton.innerHTML = '<img src="images/icons/moon.png" alt="Dark Mode">';
        }
    };

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'light-mode');
            applyTheme('light-mode');
        } else {
            localStorage.setItem('theme', 'dark-mode');
            applyTheme('dark-mode');
        }
    });

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);
});

// Create two new icons in your "images/icons" folder:
// - moon.png (for switching to dark mode)
// - sun.png (for switching to light mode)