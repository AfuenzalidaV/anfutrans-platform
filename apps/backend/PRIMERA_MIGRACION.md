# ⚡ EJECUTAR PRIMERA MIGRACIÓN

## 📋 Checklist Pre-Migración

Antes de ejecutar la primera migración, verificar:

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `anfutrans_dev` creada
- [ ] Archivo `.env` configurado con DATABASE_URL correcta
- [ ] Dependencias instaladas (`npm install`)

---

## 🚀 Pasos para Primera Migración

### 1. Verificar PostgreSQL

**Windows:**
```powershell
# Verificar servicio
Get-Service postgresql*

# Si no está corriendo, iniciar
Start-Service postgresql-x64-14  # Ajustar versión según instalación
```

**Linux:**
```bash
sudo systemctl status postgresql
sudo systemctl start postgresql  # Si no está corriendo
```

**macOS:**
```bash
brew services list
brew services start postgresql  # Si no está corriendo
```

### 2. Verificar que PostgreSQL responde

```bash
# Verificar conexión
psql -U postgres -c "SELECT version();"
```

### 3. Crear Base de Datos (si no existe)

```bash
# Opción A: Usando createdb
createdb anfutrans_dev

# Opción B: Usando psql
psql -U postgres
CREATE DATABASE anfutrans_dev;
\q
```

### 4. Verificar archivo .env

```bash
# Ver contenido actual
cat .env

# Debe contener (ajustar según tu configuración):
# DATABASE_URL="postgresql://anfutrans_dev:dev_password@localhost:5432/anfutrans_dev?schema=core"
```

**Si el usuario/password de PostgreSQL es diferente, actualizar:**

```env
# Ejemplo con usuario postgres y sin password:
DATABASE_URL="postgresql://postgres@localhost:5432/anfutrans_dev?schema=core"

# Ejemplo con password:
DATABASE_URL="postgresql://postgres:mipassword@localhost:5432/anfutrans_dev?schema=core"
```

### 5. Ejecutar Setup Completo

```bash
# Navegar a directorio backend
cd apps/backend

# Ejecutar setup (migraciones + seed)
npm run db:setup
```

**Salida esperada:**
```
🚀 Iniciando configuración de base de datos...

📦 Generando cliente Prisma...
✅ Cliente Prisma generado

🔄 Aplicando migraciones...
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "anfutrans_dev", schema "core"

Applying migration `20260314120000_init`

The following migration(s) have been applied:

migrations/
  └─ 20260314120000_init/
    └─ migration.sql

✅ Migraciones aplicadas

🌱 Ejecutando seed...
🌱 Iniciando seed de base de datos...
✅ Roles creados
✅ Usuario administrador creado
✅ Estados de solicitud creados
✅ Tipos de solicitud creados
✅ Tipos de beneficio creados
✅ Tipos de documento creados
✅ Regiones creadas
✅ Comunas creadas
✅ Seed completado exitosamente

✅ Base de datos configurada exitosamente!

🔐 Credenciales de acceso:
   Email: admin@anfutrans.cl
   Password: admin123
```

### 6. Verificar Instalación

```bash
# Ver estado de migraciones
npm run db:status

# Abrir Prisma Studio (GUI)
npm run prisma:studio
# Abrir navegador en http://localhost:5555

# Verificar tablas creadas:
# - 17 tablas visibles
# - Roles: 4 registros
# - Regiones: 16 registros
# - Comunas: 52 registros
# - etc.
```

### 7. Iniciar Backend

```bash
npm run start:dev
```

**Verificar:**
- Backend inicia sin errores
- Conecta a base de datos exitosamente
- Swagger disponible en http://localhost:3000/api

### 8. Probar Login

**En Swagger (http://localhost:3000/api):**

1. Ir a `POST /auth/login`
2. Click en "Try it out"
3. Enviar:
```json
{
  "email": "admin@anfutrans.cl",
  "password": "admin123"
}
```
4. Verificar respuesta con `access_token` y `refresh_token`

**O con curl:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@anfutrans.cl",
    "password": "admin123"
  }'
```

---

## 🔧 Troubleshooting

### Error: "Connection refused"

**Problema:** PostgreSQL no está corriendo

**Solución:**
```bash
# Windows
Start-Service postgresql-x64-14

# Linux
sudo systemctl start postgresql

# macOS
brew services start postgresql
```

### Error: "Database does not exist"

**Problema:** Base de datos no creada

**Solución:**
```bash
createdb anfutrans_dev
```

### Error: "Password authentication failed"

**Problema:** Credenciales incorrectas en DATABASE_URL

**Solución:** Actualizar .env con usuario/password correctos
```env
# Si usas usuario postgres sin password:
DATABASE_URL="postgresql://postgres@localhost:5432/anfutrans_dev?schema=core"

# Si tiene password:
DATABASE_URL="postgresql://postgres:TUPASSWORD@localhost:5432/anfutrans_dev?schema=core"
```

### Error: "Port 5432 already in use"

**Problema:** Otro servicio usando el puerto

**Solución:**
```bash
# Ver qué está usando el puerto
netstat -an | findstr 5432

# Detener PostgreSQL en ese puerto o usar otro puerto en DATABASE_URL
DATABASE_URL="postgresql://postgres@localhost:5433/anfutrans_dev?schema=core"
```

### Error: "Cannot find module 'prisma'"

**Problema:** Dependencias no instaladas

**Solución:**
```bash
npm install
```

### Error: Migration failed

**Problema:** Schema no sincronizado con BD

**Solución:**
```bash
# Reset completo
npm run db:reset -- --force

# O manual:
DROP SCHEMA core CASCADE;
CREATE SCHEMA core;
npm run db:setup
```

---

## ✅ Verificación Post-Migración

Después de ejecutar la primera migración, verificar:

- [ ] Carpeta `prisma/migrations/` creada con migración inicial
- [ ] 17 tablas creadas en schema "core"
- [ ] 4 roles creados (ADMIN, DIRIGENTE, OPERADOR, SOCIO)
- [ ] Usuario admin creado (admin@anfutrans.cl)
- [ ] 16 regiones y 52 comunas creadas
- [ ] Backend inicia sin errores
- [ ] Login funciona en Swagger
- [ ] Prisma Studio muestra datos

---

## 🎯 Siguiente Paso

Una vez completada la primera migración:

```bash
# Backend corriendo
npm run start:dev

# Frontend (en otra terminal)
cd ../frontend
npm install
npm run start

# Acceder a:
# - Backend: http://localhost:3000
# - Swagger: http://localhost:3000/api
# - Frontend: http://localhost:4200
# - Prisma Studio: http://localhost:5555 (ejecutar npm run prisma:studio)
```

---

## 📚 Documentación Relacionada

- [FASE-10-MIGRACIONES.md](../../docs/FASE-10-MIGRACIONES.md) - Guía completa de migraciones
- [QUICK_START_DB.md](../QUICK_START_DB.md) - Inicio rápido general
- [PROGRESO.md](../../PROGRESO.md) - Estado del proyecto

---

**¿Listo?** Ejecuta: `npm run db:setup` 🚀
