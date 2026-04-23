#!python
import os
import sys
import urllib.parse
import sqlite3
import hashlib
import traceback

#⚠️ aqui se quito el print() de la cabecera para poder hacer lo de el boton de las cookies de javascript 

def servir_archivo(nombre_archivo):
    posibles_rutas = [
        os.path.join('..', 'vistas', nombre_archivo),
        os.path.join('vistas', nombre_archivo)
    ]
    for ruta in posibles_rutas:
        if os.path.exists(ruta):
            with open(ruta, 'r', encoding='utf-8') as f:
                print(f.read())
                return
    print(f"<h1>Error Crítico: No se encontró el archivo {nombre_archivo}</h1>")

try:
    def encriptar_password(password):
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    content_length = int(os.environ.get('CONTENT_LENGTH', 0))
    post_data = sys.stdin.read(content_length)
    form = urllib.parse.parse_qs(post_data)

    usuario_ingresado = form.get("username", [None])[0]
    password_ingresado = form.get("password", [None])[0]

    if usuario_ingresado and password_ingresado:
        db_path = '../intranet.db' 
        if not os.path.exists(db_path):
            db_path = 'intranet.db' 

        if not os.path.exists(db_path):
            print("Content-Type: text/html; charset=utf-8\n\n")
            print("<h1>Error: Base de datos no encontrada.</h1>")
        else:
            conexion = sqlite3.connect(db_path)
            cursor = conexion.cursor()
            cursor.execute("SELECT password_hash FROM administradores WHERE username = ?", (usuario_ingresado,))
            resultado = cursor.fetchone()
            conexion.close()

            if resultado:
                password_guardada = resultado[0]
                password_encriptada = encriptar_password(password_ingresado)
                
                if password_encriptada == password_guardada:
                    #==========================================
                    #se entrega la cookie (el gafete para moverse como administrador y vovler)
                    #================================
                    # 1.le decimos al navegador que guarde la galleta secreta "admin_uami=true"
                    print("Set-Cookie: admin_uami=true; Path=/; SameSite=Lax")
                    # 2.se imprime la cabecera normal
                    print("Content-Type: text/html; charset=utf-8\n\n")
                    # 3.se muestra la pantalla de exito
                    servir_archivo('login_exito.html')
                else:
                    #si falla, se imprime la cabecera normal SIN Cookie
                    print("Content-Type: text/html; charset=utf-8\n\n")
                    servir_archivo('login_error.html')
            else:
                print("Content-Type: text/html; charset=utf-8\n\n")
                servir_archivo('login_error.html')
    else:
        print("Content-Type: text/html; charset=utf-8\n\n")
        print("<h1>Por favor, ingresa tus credenciales.</h1>")

except Exception as e:
    print("Content-Type: text/html; charset=utf-8\n\n")
    print("<h1>Error interno del servidor</h1>")
    print(f"<pre style='color: #e63946;'>{traceback.format_exc()}</pre>")