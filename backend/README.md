# Backend (Express)

Desde la carpeta `backend/`:

1. Copiar `.env.example` a `.env` y completar con credenciales MySQL.
2. Instalar dependencias:

```powershell
npm install
```

3. Ejecutar servidor:

```powershell
npm start
```

Endpoint de ejemplo:
- `GET /api/items` - lista de items (usa la base `qr_app` definida en `db/schema.sql`).
