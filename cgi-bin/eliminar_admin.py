#!python
import os
import sys
import urllib.parse
import sqlite3

#forzamos UTF-8 por los acentos
sys.stdout.reconfigure(encoding='utf-8')

#SEGURIDAD: Verificamos que tengan el gafete puesto
cookies = os.environ.get('HTTP_COOKIE', '')
if 'admin_uami=true' not in cookies:
    print("Content-Type: text/html; charset=utf-8\n\n")
    print("<script>window.location.href='/vistas/login.html';</script>")
    exit()

#Leer el ID del administrador que queremos borrar
content_length = int(os.environ.get('CONTENT_LENGTH', 0))
post_data = sys.stdin.read(content_length)
form = urllib.parse.parse_qs(post_data)

admin_id = form.get("admin_id", [None])[0]

#Eliminar de la base de datos
if admin_id:
    db_path = '../intranet.db'
    if not os.path.exists(db_path):
        db_path = 'intranet.db'
        
    conexion = sqlite3.connect(db_path)
    cursor = conexion.cursor()
    
    #DOBLE CANDADO DE SEGURIDAD: 
    #aunque alguien modifique el HTML para intentar borrarnos, 
    #la base de datos rechazara la orden si es_principal = 1
    cursor.execute("DELETE FROM administradores WHERE id = ? AND es_principal = 0", (admin_id,))
    conexion.commit()
    conexion.close()

#recargar el panel automaticamente
print("Content-Type: text/html; charset=utf-8\n\n")
print("<script>window.location.href='/cgi-bin/dashboard.py';</script>")