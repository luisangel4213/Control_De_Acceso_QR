# Proyecto fullstack: React + Node/Express + MySQL

Esqueleto inicial para una aplicación con frontend en React (Vite), backend en Node.js con Express y base de datos MySQL.

Requisitos previos:
- Node.js v16+
- MySQL / MySQL Workbench

Pasos rápidos:

1) Configurar la base de datos

 - Abrir `db/schema.sql` en MySQL Workbench y ejecutarlo para crear la base y tablas de ejemplo.

2) Backend

 - Abrir `backend/.env.example`, copiar a `backend/.env` y rellenar credenciales MySQL.
 - Desde `backend/` ejecutar:

```powershell
npm install
npm start
```

3) Frontend

 - Desde `frontend/` ejecutar:

```powershell
npm install
npm run dev
```

El frontend está configurado para hacer proxy de `/api` a `http://localhost:5000` (backend por defecto).
