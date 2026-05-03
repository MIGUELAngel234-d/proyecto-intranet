const API_URL = '/cgi-bin/foro.py';

// Función para cargar los mensajes de la BD
async function cargarMensajes() {
    try {
        const respuesta = await fetch(API_URL);
        const posts = await respuesta.json();

        const contenedor = document.getElementById('posts-container');
        contenedor.innerHTML = ''; // Limpiar mensajes viejos

        posts.forEach(post => {
            const html = `
                <article class="post-card">
                    <div class="post-content">
                        <h3>${post.titulo}</h3>
                        <p>${post.contenido}</p>
                        <div class="post-meta">Publicado en la <span>Intranet UAMI</span></div>
                    </div>
                </article>
            `;
            contenedor.insertAdjacentHTML('beforeend', html);
        });
    } catch (error) {
        console.error("Error conectando con la red UAMI:", error);
    }
}

// Evento para enviar un nuevo mensaje
document.getElementById('foro-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('post-title').value;
    const contenido = document.getElementById('post-content').value;

    const datos = new FormData();
    datos.append("accion", "guardar");
    datos.append("titulo", titulo);
    datos.append("contenido", contenido);

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: datos
        });

        if (res.ok) {
            document.getElementById('foro-form').reset();
            cargarMensajes(); // Recargar la lista automáticamente
        }
    } catch (error) {
        alert("Error al subir a la red");
    }
});

// Cargar todo al abrir la página
window.onload = cargarMensajes;