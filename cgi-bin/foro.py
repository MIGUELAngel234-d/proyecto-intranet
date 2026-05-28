#!/usr/bin/env python3
import sqlite3
import cgi
import json
import sys

# Encabezados para que el navegador acepte la respuesta
print("Content-Type: application/json\n")

try:
    import os
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db_path = os.path.join(BASE_DIR, 'intranet.db')

    conexion = sqlite3.connect(db_path)
    cursor = conexion.cursor()

    form = cgi.FieldStorage()
    accion = form.getvalue("accion")

    if accion == "guardar":
        titulo = form.getvalue("titulo")
        contenido = form.getvalue("contenido")
        if titulo and contenido:
            cursor.execute("INSERT INTO posts (titulo, contenido) VALUES (?, ?)", (titulo, contenido))
            conexion.commit()
            print(json.dumps({"status": "success"}))
    
    else:
        # Cargar posts existentes
        cursor.execute("SELECT titulo, contenido FROM posts ORDER BY id DESC")
        posts = [{"titulo": f[0], "contenido": f[1]} for f in cursor.fetchall()]
        print(json.dumps(posts))

    conexion.close()
except Exception as e:
    print(json.dumps({"error": str(e)}))