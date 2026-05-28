#!python
import os
import sys
import urllib.parse
import sqlite3
import hashlib

#forzamos UTF-8 por los acentos o caracteres especiales
sys.stdout.reconfigure(encoding='utf-8')

#SEGURIDAD: Verificamos que quien intenta agregar un admin tenga el gafete puesto
cookies = os.environ.get('HTTP_COOKIE', '')
if 'admin_uami=true' not in cookies:
    print("Content-Type: text/html; charset=utf-8\n\n")
    print("<script>window.location.href='/vistas/login.html';</script>")
    exit()

def encriptar_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

#leer los datos del formulario
content_length = int(os.environ.get('CONTENT_LENGTH', 0))
post_data = sys.stdin.read(content_length)
form = urllib.parse.parse_qs(post_data)

nuevo_user = form.get("nuevo_user", [None])[0]
nuevo_pass = form.get("nuevo_pass", [None])[0]

#atrapamos la segunda contraseña
nuevo_pass_conf = form.get("nuevo_pass_conf", [None])[0]

#guardar en la base de datos (solamente si coinciden las contrasñas )
if nuevo_user and nuevo_pass and nuevo_pass_conf:
    if nuevo_pass == nuevo_pass_conf:
        db_path = '../intranet.db'
        if not os.path.exists(db_path):
            db_path = 'intranet.db'
        
        conexion = sqlite3.connect(db_path)
        cursor = conexion.cursor()
    
        try:
            hash_pass = encriptar_password(nuevo_pass)
            #se guarda con es_principal = 0 (Falso) para que si se pueda borrar despues
            cursor.execute("INSERT INTO administradores (username, password_hash, es_principal) VALUES (?, ?, 0)", (nuevo_user, hash_pass))
            conexion.commit()
        except sqlite3.IntegrityError:
            pass #si intentan meter un usuario que ya existe, lo ignoramos 

    conexion.close()
    

# redirigir de vuelta al panel automaticamente
print("Content-Type: text/html; charset=utf-8\n\n")
print("<script>window.location.href='/cgi-bin/dashboard.py';</script>")