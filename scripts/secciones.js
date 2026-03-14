function cargarPagina(pagina) {

    // Busca el archivo HTML en la carpeta vistas
    fetch("vistas/" + pagina + ".html")
        .then(res => res.text()) // Convierte la respuesta a texto
        .then(data => {
            // Inyecta el contenido en el contenedor principal
            document.getElementById("contenido").innerHTML = data;
        })
        .catch(error => {
            // Muestra error si el archivo no existe o falla la carga
            document.getElementById("contenido").innerHTML = "<p>Error al cargar la página.</p>";
        });

}

// Carga la sección de inicio automáticamente al abrir el sitio
document.addEventListener("DOMContentLoaded", function() {
    cargarPagina("inicio");
});