
function toggleTheme() {
    const themeToggleButton = document.getElementById('theme-toggle');

    themeToggleButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}



if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', toggleTheme);
} else {
    toggleTheme();
}

