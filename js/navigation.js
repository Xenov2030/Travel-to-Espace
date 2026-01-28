/**
 * Navigation Debugged - Crew Section
 * Restaurando navegación nativa de multipágina (MPA)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del menú móvil (Hamburguesa)
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);
        });
    }

    // 2. Lógica de estado Activo (Auto-detección)
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    
    // Marcamos el link del Header
    const headerLinks = document.querySelectorAll('.primary-navigation a');
    headerLinks.forEach(link => {
        const parentLi = link.parentElement;
        if (link.getAttribute('href') === currentPath || 
           (currentPath.includes('crew-') && link.getAttribute('href').includes('crew-'))) {
            parentLi.classList.add('active');
        } else {
            parentLi.classList.remove('active');
        }
    });

    // 3. Limpieza de intercepciones
    // Eliminamos cualquier 'e.preventDefault()' que pueda estar en otros scripts
    // para los elementos de navegación.
});