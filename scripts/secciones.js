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

//TABS: ¿Qué es una intranet?
function switchTab(id, boton) {

    // Quita "active" de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Quita "active" de todos los paneles
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Pone "active" al botón que se clickeó
    boton.classList.add('active');

    // Pone "active" al panel correspondiente
    document.getElementById('tab-' + id).classList.add('active');
}


// MODAL: Leer más
const datosModal = {
    mesh: {
        badge: '<span class="badge badge-redes">RED MESH</span>',
        titulo: 'Redes Mesh Comunitarias',
        imagen: '../recursos/imagenes/galeria/redMesh.png',
        texto: 'Una red mesh distribuye la conectividad entre múltiples nodos que funcionan como repetidores entre sí. Si uno falla, el tráfico se redirige automáticamente por otros caminos, haciendo la red resiliente. No depende de un punto central de acceso, ideal para comunidades rurales o zonas sin infraestructura fija.',
        tags: ['Topología distribuida', 'Sin punto central de falla', 'Auto-organizada']
    },
    sdr: {
        badge: '<span class="badge badge-radio">SDR</span>',
        titulo: 'Radio Definido por Software',
        imagen: '../recursos/imagenes/galeria/sdr.png',
        texto: 'A diferencia del hardware de radio convencional, el SDR implementa los protocolos de comunicación completamente en software. Permite modificar frecuencias, modulaciones y protocolos sin cambiar el hardware físico, reduciendo costos y aumentando la flexibilidad.',
        tags: ['Procesamiento digital', 'Protocolos flexibles', 'Bajo costo']
    },
    mosy: {
        badge: '<span class="badge badge-sistema">SISTEMA</span>',
        titulo: 'MosyNetI',
        imagen: '../recursos/imagenes/galeria/mosyneti.png',
        texto: 'MosyNetI es el sistema de gestión desarrollado en UAM-I para administrar la intranet comunitaria. Desde una interfaz web permite monitorear el estado de los nodos, gestionar usuarios y visualizar el tráfico de la red, todo con software libre.',
        tags: ['Software libre', 'Interfaz web', 'Monitoreo en tiempo real']
    },
    sob: {
        badge: '<span class="badge badge-politica">POLÍTICA</span>',
        titulo: 'Soberanía tecnológica',
        imagen: '../recursos/imagenes/galeria/soberania.jpg',
        texto: 'La soberanía tecnológica plantea que las comunidades deben tener control real sobre su infraestructura digital: decidir quién accede, cómo se administran los datos y qué servicios se ofrecen. Este principio guía todas las decisiones técnicas del proyecto.',
        tags: ['Autonomía comunitaria', 'Control de datos', 'Sin dependencia externa']
    }
};

function openModal(key) {
    const d = datosModal[key];

    document.getElementById('modal-badge').innerHTML = d.badge;
    document.getElementById('modal-title').textContent = d.titulo;
    document.getElementById('modal-body').textContent = d.texto;
    document.getElementById('modal-img').src = d.imagen;
    document.getElementById('modal-img').alt = d.titulo;
    document.getElementById('modal-tags').innerHTML = d.tags
        .map(t => `<span class="modal-tag">${t}</span>`)
        .join('');

    document.getElementById('modal-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOutside(event) {
    if (event.target === document.getElementById('modal-backdrop')) {
        closeModal();
    }
}