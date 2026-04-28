

// modal: La caja negra gigante que lo cubre todo
const modal = document.getElementById("lightbox");

// imgModal: La etiqueta 'img' gigante y vacía que está dentro de la caja negra
const imgModal = document.getElementById("img-modal");

// btnCerrar boton de la "X" de la esquina superior
const btnCerrar = document.querySelector(".btn-cerrar");

// Botones de navegación (Flechas)
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

// LISTA con todas y cada una de las pequeñas fotos (.foto-amplia, nombre para identificar) de la galería
const imagenes = document.querySelectorAll(".foto-amplia");

// Convertimos la lista de imágenes a un Arreglo real (Array) para poder saber el "índice" o número de foto
const arregloImagenes = Array.from(imagenes);

// Esta variable recordará en qué número de foto estamos actualmente
let indiceActual = 0;

// Aparte de la "img", el forEach también nos regala el "index" (0, 1, 2, 3...) de cada foto al dibujarlas
arregloImagenes.forEach((img, index) => {
    img.addEventListener("click", function () {

        // Cambia el CSS del modal gigante de "none" a "flex" (visible)
        modal.style.display = "flex";

        // Le pega el origen y el alt de la foto pequeña a la grande
        imgModal.src = this.src;
        imgModal.alt = this.alt;

        // guarda el número de la foto que abrió para saber desde dónde empezar a navegar
        indiceActual = index;
    });
});



// Esta función principal se encarga de cambiar la foto abierta en grande dependiendo del índice
function mostrarImagen(indice) {
    // Si llegamos a la última foto, volvemos a la primera (0)
    if (indice >= arregloImagenes.length) {
        indiceActual = 0;
    }
    // Si retrocedemos mas de la primera foto, vamos a la última del arreglo
    else if (indice < 0) {
        indiceActual = arregloImagenes.length - 1;
    }
    // Si estamos en cualquier foto normal, simplemente actualizamos el contador a ese número
    else {
        indiceActual = indice;
    }

    // Le pegamos el origen y el texto de la NUEVA foto al modal grande
    imgModal.src = arregloImagenes[indiceActual].src;
    imgModal.alt = arregloImagenes[indiceActual].alt;
}

// Escuchamos el clic en la flecha SIGUIENTE
btnNext.addEventListener("click", function () {
    mostrarImagen(indiceActual + 1); // Le sumamos 1 al contador actual
});

// Escuchamos el clic en la flecha ANTERIOR
btnPrev.addEventListener("click", function () {
    mostrarImagen(indiceActual - 1); // Le restamos 1 al contador actual
});


// Para cerrar las imagnes 
function cerrarModal() {
    modal.style.display = "none";
}

// cierre al dar clic en la "X"
btnCerrar.addEventListener("click", cerrarModal);

// Cierre y Navegacion con el Teclado
document.addEventListener("keydown", function (event) {
    // Solo permitimos usar teclas especiales si la galería está ABIERTA ("flex")
    if (modal.style.display === "flex") {
        if (event.key === "Escape") {
            cerrarModal(); // Cerrar con Escape
        } else if (event.key === "ArrowRight") {
            mostrarImagen(indiceActual + 1); // Navegar a la derecha
        } else if (event.key === "ArrowLeft") {
            mostrarImagen(indiceActual - 1); // Navegar a la izquierda
        }
    }
});




