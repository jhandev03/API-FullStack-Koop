from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel

app = FastAPI()

# Configuración de CORS para permitir solicitudes desde el frontend en un dominio diferente
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Conexión a la base de datos elegida que fue MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Root123@",
    database="empresas_db"
)

# Modelo Pydantic para la empresa
class Empresa(BaseModel):
    nombre: str
    nit: int
    correo: str
    direccion: str
    telefono: int

# Ruta para crear una nueva empresa
@app.post("/empresas/")
async def create_empresa(empresa: Empresa):
    cursor = db.cursor()
    query = "INSERT INTO empresas (nombre, nit, correo, direccion, telefono) VALUES (%s, %s, %s, %s, %s)"
    values = (empresa.nombre, empresa.nit, empresa.correo, empresa.direccion, empresa.telefono)
    cursor.execute(query, values)
    db.commit()
    return {"message": "Empresa creada exitosamente"}

# Ruta para obtener todas las empresas
@app.get("/empresas/")
async def get_empresas():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM empresas")
    empresas = cursor.fetchall()
    return empresas

# Ruta para actualizar una empresa por su ID
@app.put("/empresas/{empresa_id}")
async def update_empresa(empresa_id: int, empresa: Empresa):
    cursor = db.cursor()
    query = "UPDATE empresas SET nombre=%s, nit=%s, correo=%s, direccion=%s, telefono=%s WHERE id=%s"
    values = (empresa.nombre, empresa.nit, empresa.correo, empresa.direccion, empresa.telefono, empresa_id)
    cursor.execute(query, values)
    db.commit()
    return {"message": f"Empresa con ID {empresa_id} actualizada exitosamente"}

# Ruta para eliminar una empresa por su ID
@app.delete("/empresas/{empresa_id}")
async def delete_empresa(empresa_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM empresas WHERE id=%s", (empresa_id,))
    db.commit()
    return {"message": f"Empresa con ID {empresa_id} eliminada exitosamente"}
