#!python
import os
import sqlite3
import sys 

sys.stdout.reconfigure(encoding='utf-8')

#CABECERA HTTP
print("Content-Type: text/html; charset=utf-8\n\n")

#1.SEGURIDAD: VERIFICAR EL GAFETE (COOKIE)
#Si alguien intenta entrar directo a /cgi-bin/dashboard.py sin haberse logueado, lo sacamos
cookies = os.environ.get('HTTP_COOKIE', '')
if 'admin_uami=true' not in cookies:
    print("<script>window.location.href='/vistas/login.html';</script>")
    exit()

# 2.conexion A LA BASE DE DATOS
db_path = '../intranet.db'
if not os.path.exists(db_path):
    db_path = 'intranet.db'

conexion = sqlite3.connect(db_path)
cursor = conexion.cursor()

#Extraemos a todos los administradores
cursor.execute("SELECT id, username, es_principal FROM administradores")
lista_admins = cursor.fetchall()
conexion.close()

# 3. construccion DEL PANEL EN HTML
html = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración - Intranet UAMI</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        body { background-color: #0d1f18; color: #f0fdf4; font-family: 'Outfit', sans-serif; margin: 0; padding: 40px; }
        .panel-container { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .card { background: rgba(45, 106, 79, 0.1); border: 1px solid rgba(82, 183, 136, 0.2); border-radius: 20px; padding: 30px; }
        h1, h2 { color: #52b788; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid rgba(82, 183, 136, 0.2); }
        .btn { padding: 8px 15px; background: #2d6a4f; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .btn-danger { background: #e63946; }
        input, textarea { width: 100%; padding: 10px; margin-top: 5px; margin-bottom: 15px; background: rgba(0,0,0,0.3); border: 1px solid #52b788; color: white; border-radius: 5px; }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1000px; margin: 0 auto 30px;">
        <h1>🛡️ Centro de Mando UAMI</h1>
        <a href="/index.html" class="btn">Ver Sitio Público</a>
    </div>

    <div class="panel-container">
        <div class="card">
            <h2>👥 Administradores</h2>
            <table>
                <tr><th>ID</th><th>Usuario</th><th>Acción</th></tr>
"""

#dibujamos la tabla dinamicamente con los datos de Python
for admin in lista_admins:
    admin_id, username, es_principal = admin
    html += f"<tr><td>{admin_id}</td><td>{username}</td><td>"
    
    #La regla de negocio: El principal no se borra
    if es_principal:
        html += "<span style='color: #95d5b2;'>Principal (Intocable)</span>"
    else:
        #formulario oculto que manda el id del usuario a eliminar
        html += f"""
        <form action="eliminar_admin.py" method="POST" style="display:inline;" onsubmit="return confirm('¿Seguro que deseas eliminar al usuario {username}?');">
            <input type="hidden" name="admin_id" value="{admin_id}">
            <button type="submit" class='btn btn-danger'>Eliminar</button>
        </form>
        """
        
    html += "</td></tr>"

html += """
            </table>
            
            <h3 style="margin-top: 30px;">Agregar Nuevo</h3>
            <form action="procesar_admin.py" method="POST" id="form-nuevo-admin">
                <label>Usuario:</label>
                <input type="text" name="nuevo_user" required>
                
                <label>Contraseña:</label>
                <input type="password" name="nuevo_pass" id="pass1" required>

                <label>Confirmar Contraseña:</label>
                <input type="password" name="nuevo_pass_conf" id="pass2" required>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <input type="checkbox" id="chk-mostrar" style="width: auto; margin: 0;">
                    <label for="chk-mostrar" style="font-size: 0.9em; color: #94a3b8; cursor: pointer;">👁️ Mostrar contraseñas</label>
                </div>
                
                <button type="submit" class="btn">Guardar Administrador</button>
            </form>
            
        </div>

        <div class="card">
            <h2>📢 Publicar Aviso</h2>
            <form action="procesar_aviso.py" method="POST" enctype="multipart/form-data">
                <label>Título del Evento/Aviso:</label>
                <input type="text" name="titulo" required>
                
                <label>Contenido:</label>
                <textarea name="contenido" rows="4" required></textarea>
                
                <label>Adjuntar Imagen (Opcional):</label>
                <input type="file" name="imagen" accept="image/*">
                
                <button type="submit" class="btn">Publicar Aviso</button>
            </form>
        </div>
    </div>
    
    <script>
        //logica de mostrar/ocultar
        const chkMostrar = document.getElementById('chk-mostrar');
        const pass1 = document.getElementById('pass1');
        const pass2 = document.getElementById('pass2');

        chkMostrar.addEventListener('change', function() {
            const tipo = this.checked ? 'text' : 'password';
            pass1.type = tipo;
            pass2.type = tipo;
        });

        //logica de confirmacion antes de enviar
        const formAdmin = document.getElementById('form-nuevo-admin');
        formAdmin.addEventListener('submit', function(e) {
            if (pass1.value !== pass2.value) {
                e.preventDefault(); // Detiene el envío a Python
                alert('⚠️ Las contraseñas no coinciden. Por favor, revísalas.');
            }
        });
    </script>
    
</body>
</html>
"""

print(html)