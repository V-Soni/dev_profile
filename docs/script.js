document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const currentYearSpan = document.getElementById('currentYear');

    // --- Dark/Light Mode Logic ---

    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme); // Save theme preference
        updateToggleIcon(theme);
    }

    // Function to update the toggle icon
    function updateToggleIcon(theme) {
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>'; // Sun icon for light mode
            } else {
                themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>'; // Moon icon for dark mode
            }
        }
    }

    // Function to toggle the theme
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') ||
                             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Use saved theme if available, otherwise system preference, default to dark if no preference found
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Add event listener to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // --- Update Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add smooth scrolling for nav links ---
    document.querySelectorAll('a.nav-link[href^="#"], a.dropdown-item[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's an internal link before preventing default
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only if target exists
                    // Get the navbar height
                    const navbarHeight = document.querySelector('.navbar.fixed-top')?.offsetHeight || 56;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Optional: Close the navbar dropdown on mobile after clicking an item
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                         const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {toggle: false});
                         bsCollapse.hide();
                    }
                }
            }
        });
    });

});
