import sqlite3
import hashlib

def encriptar_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, 'intranet.db')

conexion = sqlite3.connect('intranet.db')
cursor = conexion.cursor()

#Tabla de Administradores
cursor.execute('''
    CREATE TABLE IF NOT EXISTS administradores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        es_principal BOOLEAN DEFAULT 0
    )
''')

#tabla de Avisos (NUEVA)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS avisos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        contenido TEXT NOT NULL,
        imagen_ruta TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
''')
#tabla de Posts (NUEVA)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        contenido TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
''')

#insertamos al administrador intocable
usuario = 'admin_uami'
pass_hash = encriptar_password('uami2026')
try:
    #Le ponemos es_principal = 1 (Verdadero) para que la pagina sepa que a este no se le puede borrar
    cursor.execute("INSERT INTO administradores (username, password_hash, es_principal) VALUES (?, ?, 1)", (usuario, pass_hash))
    print("Usuario principal creado.")
except sqlite3.IntegrityError:
    #Si ya existe, actualizamos su estatus a principal por si acaso
    cursor.execute("UPDATE administradores SET es_principal = 1 WHERE username = ?", (usuario,))
    print("Usuario principal ya existía y fue asegurado.")

conexion.commit()
conexion.close()
print("Base de datos actualizada con éxito.")