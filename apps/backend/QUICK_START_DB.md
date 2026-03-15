# 🚀 Guía de Inicio Rápido - Base de Datos

## Configuración Inicial (Primera vez)

### 1. Instalar PostgreSQL

**Windows:**

```powershell
# Descargar desde: https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql
```

**Linux/Ubuntu:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS:**

```bash
brew install postgresql
brew services start postgresql
```

### 2. Crear Base de Datos

```bash
# Iniciar PostgreSQL (si no está corriendo)
# Windows: Servicios > PostgreSQL
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql

# Crear base de datos de desarrollo
createdb anfutrans_dev

# Crear base de datos de testing
createdb anfutrans_test

# O usando psql:
psql -U postgres
CREATE DATABASE anfutrans_dev;
CREATE DATABASE anfutrans_test;
\q
```

### 3. Crear Usuario de Base de Datos (Opcional pero recomendado)

```sql
-- Conectar como superusuario
psql -U postgres

-- Crear usuario
CREATE USER anfutrans_dev WITH PASSWORD 'dev_password';
CREATE USER anfutrans_test WITH PASSWORD 'test_password';

-- Dar permisos
GRANT ALL PRIVILEGES ON DATABASE anfutrans_dev TO anfutrans_dev;
GRANT ALL PRIVILEGES ON DATABASE anfutrans_test TO anfutrans_test;

-- Salir
\q
```

### 4. Configurar Variables de Entorno

```bash
# Copiar template
cd apps/backend
cp .env.development .env

# Editar .env con tus credenciales
# - DATABASE_URL: postgresql://usuario:password@localhost:5432/anfutrans_dev?schema=core
# - JWT_SECRET: (generar uno aleatorio - ver abajo)
```

**Generar JWT Secret aleatorio:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. Instalar Dependencias

```bash
cd apps/backend
npm install
```

### 6. Inicializar Base de Datos

```bash
# Setup completo (migraciones + seed)
npm run db:setup
```

Este comando ejecuta:

1. Genera cliente Prisma
2. Aplica todas las migraciones
3. Ejecuta seed (datos iniciales)

**Credenciales del admin:**

- Email: `admin@anfutrans.cl`
- Password: `admin123`

### 7. Verificar Instalación

```bash
# Ver estado de migraciones
npm run db:status

# Abrir Prisma Studio (GUI)
npm run prisma:studio
# Abre en: http://localhost:5555

# Iniciar backend
npm run start:dev
# Swagger en: http://localhost:3000/api
```

---

## Comandos Rápidos

```bash
# Ver datos en GUI
npm run prisma:studio

# Estado de migraciones
npm run db:status

# Reset completo (elimina datos)
npm run db:reset

# Solo seed (sin eliminar datos)
npm run prisma:seed

# Backup
npm run db:backup

# Iniciar backend
npm run start:dev
```

---

## Problemas Comunes

### "Connection refused" / No se conecta a PostgreSQL

**Verificar que PostgreSQL esté corriendo:**

```bash
# Windows
Get-Service postgresql*

# Linux
sudo systemctl status postgresql

# macOS
brew services list
```

**Iniciar servicio:**

```bash
# Windows: Panel de Servicios > PostgreSQL > Iniciar
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql
```

### "Database does not exist"

```bash
# Crear manualmente
createdb anfutrans_dev

# O en psql
psql -U postgres
CREATE DATABASE anfutrans_dev;
```

### "Password authentication failed"

Verificar credenciales en `.env`:

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/NOMBRE_DB?schema=core"
```

### Puerto ya en uso (3000)

Cambiar puerto en `.env`:

```env
PORT=3001
```

---

## Estructura de Datos

### Tablas Creadas (17)

**Catálogos:**

- cargo_dirigencial
- region (16 regiones de Chile)
- comuna (52 comunas RM)
- tipo_solicitud (3 tipos)
- estado_solicitud (7 estados)
- tipo_beneficio (4 tipos)
- tipo_certificado
- tipo_documento (5 tipos)

**Seguridad:**

- rol (4 roles)
- usuario

**Entidades Principales:**

- socio
- solicitud
- solicitud_historial
- beneficio
- beneficio_socio
- documento
- solicitud_documento

**Configuración:**

- parametro_sistema

### Datos Seed

**Roles:**

- ADMIN
- DIRIGENTE
- OPERADOR
- SOCIO

**Usuario Admin:**

- Email: admin@anfutrans.cl
- Password: admin123
- Rol: ADMIN

**Estados de Solicitud:**

- BORRADOR
- PENDIENTE
- EN_REVISION
- APROBADA
- RECHAZADA
- COMPLETADA
- CANCELADA

---

## Siguientes Pasos

1. ✅ Base de datos configurada
2. ✅ Datos iniciales cargados
3. ➡️ Iniciar backend: `npm run start:dev`
4. ➡️ Probar endpoints en Swagger: http://localhost:3000/api
5. ➡️ Probar login con admin@anfutrans.cl / admin123

---

## Documentación Completa

Ver [FASE-10-MIGRACIONES.md](../docs/FASE-10-MIGRACIONES.md) para:

- Flujos de trabajo detallados
- Procedimientos de producción
- Sistema de backups
- Rollback procedures
- Troubleshooting completo

---

**¿Listo para continuar?** Ejecuta:

```bash
npm run start:dev
```

🎉 ¡Tu base de datos está lista!
