window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
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