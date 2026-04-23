import sqlite3
import hashlib

def encriptar_password(password):
    #SHA-256 para que la contraseña quede indescifrable
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

#1.crear (o conectarse) al archivo de la base de datos
conexion = sqlite3.connect('intranet.db')
cursor = conexion.cursor()

#2.Crear la tabla de administradores (si no existe)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS administradores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
''')

#3.definir el primer usuario administrador 
usuario = 'admin_uami'      #usuario
password_plana = 'uami2026' #contraseña
hash_pass = encriptar_password(password_plana)

#4.insertarlo en la base de datos
try:
    cursor.execute("INSERT INTO administradores (username, password_hash) VALUES (?, ?)", (usuario, hash_pass))
    print(f"✅ Exito: Usuario '{usuario}' creado con contraseña '{password_plana}'.")
except sqlite3.IntegrityError:
    print(f"⚠️ El usuario '{usuario}' ya existe en la base de datos.")

#guardar cambios y cerrar
conexion.commit()
conexion.close()
print("📂 Base de datos lista. Se ha creado el archivo 'intranet.db'")