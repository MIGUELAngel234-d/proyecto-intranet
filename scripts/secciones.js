// Detecta scroll en la ventana
window.addEventListener("scroll", () => {
    const header = document.querySelector("header"); // Selecciona header

    if (window.scrollY > 50) { // Verifica desplazamiento vertical
        header.classList.add("scrolled"); // Agrega clase al bajar
    } else {
        header.classList.remove("scrolled"); // Quita clase al subir
    }
});


// ==========================================
//modo administrador botones globales
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    //Si la cookie existe, dibujamos el menu flotante
    if (document.cookie.includes("admin_uami=true")) {
        
        //Creamos una caja contenedora para mantener los dos botones juntos
        const adminNav = document.createElement("div");
        adminNav.style.cssText = "position: fixed; bottom: 30px; right: 30px; display: flex; gap: 15px; z-index: 9999; font-family: 'Outfit', sans-serif;";

        //Boton de ir al Dashboard
        const btnPanel = document.createElement("a");
        //aseguramos la ruta absoluta desde la raiz
        btnPanel.href = "/cgi-bin/dashboard.py"; 
        btnPanel.innerHTML = "🛡️ Panel Admin";
        btnPanel.style.cssText = "background: linear-gradient(135deg, #2d6a4f, #52b788); color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.5); transition: transform 0.3s;";
        
        //boton de Cerrar Sesion
        const btnCerrar = document.createElement("a");
        btnCerrar.href = "#";
        btnCerrar.innerHTML = "🚪 Salir";
        btnCerrar.style.cssText = "background: #e63946; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.5); cursor: pointer; transition: transform 0.3s;";

        //logica de confirmacion para salir
        btnCerrar.addEventListener("click", (e) => {
            e.preventDefault();
            // confirmacion para salir 
            const seguro = confirm("¿Estás seguro de que deseas cerrar sesión?");
            
            if (seguro) {
                //destruimos la cookie
                document.cookie = "admin_uami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                //redirigimos al inicio de forma absoluta
                window.location.href = "/index.html";
            }
        });

        //metemos los botones a la caja, y la caja a la pagina
        adminNav.appendChild(btnPanel);
        adminNav.appendChild(btnCerrar);
        document.body.appendChild(adminNav);
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