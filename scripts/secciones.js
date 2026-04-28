// Detecta scroll en la ventana
window.addEventListener("scroll", () => {
    const header = document.querySelector("header"); // Selecciona header

    if (window.scrollY > 50) { // Verifica desplazamiento vertical
        header.classList.add("scrolled"); // Agrega clase al bajar
    } else {
        header.classList.remove("scrolled"); // Quita clase al subir
    }
});

// Ejecuta cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.getElementById('mobile-menu'); // Botón menú móvil
    const navMenu = document.getElementById('nav_menu'); // Menú navegación

    if (menuToggle && navMenu) { // Verifica existencia de los elementos
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Muestra/oculta menú
            menuToggle.classList.toggle('active');
        });
    }

    const dropbtn = document.querySelector('.dropbtn'); // Botón dropdown
    const dropdown = document.querySelector('.dropdown'); // Contenedor dropdown
    const dropdownContent = document.querySelector('.dropdown-content'); // Contenido dropdown

    if (dropbtn && dropdownContent) { // Verifica elementos dropdown
        dropbtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamiento enlace
            e.stopPropagation(); // Detiene propagación evento

            dropdownContent.classList.toggle('show'); // Muestra/oculta el contenido
            dropdown.classList.toggle('open'); // Activa estado abierto
        });
    }

    // Detecta click en ventana
    window.addEventListener('click', (e) => {
        if (dropdownContent && !dropdown.contains(e.target)) {
            dropdownContent.classList.remove('show'); // Oculta el contenido
            dropdown.classList.remove('open'); // Cierra dropdown
        }
    });
});