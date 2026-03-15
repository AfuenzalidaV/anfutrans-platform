# FASE 10 - Migraciones de Base de Datos

## 📋 Resumen

Sistema completo de gestión de migraciones de base de datos con Prisma, incluyendo configuración para múltiples entornos, scripts de automatización, backups y procedimientos de rollback.

## 🎯 Objetivos Completados

- ✅ Configuración de entornos (development, test, production)
- ✅ Scripts de migración con Prisma
- ✅ Sistema de seeds con datos iniciales
- ✅ Scripts de backup y restauración
- ✅ Comandos de gestión de base de datos
- ✅ Documentación completa de procedimientos

---

## 🗂️ Estructura de Migraciones

```
apps/backend/
├── prisma/
│   ├── schema.prisma          # Definición del modelo de datos
│   ├── seed.ts                # Datos iniciales (roles, catálogos, admin)
│   └── migrations/            # Historial de migraciones (generado)
├── scripts/
│   ├── db-setup.js            # Configuración inicial de BD
│   ├── db-reset.js            # Reset completo de BD
│   ├── db-status.js           # Estado de migraciones
│   ├── db-backup.js           # Backup de BD
│   └── db-restore.js          # Restauración desde backup
├── .env.development           # Variables de entorno - desarrollo
├── .env.test                  # Variables de entorno - testing
├── .env.production            # Variables de entorno - producción
└── .env.example               # Template de variables
```

---

## ⚙️ Configuración de Entornos

### 1. Development (.env.development)

```env
NODE_ENV="development"
DATABASE_URL="postgresql://anfutrans_dev:dev_password@localhost:5432/anfutrans_dev?schema=core"
JWT_SECRET="dev-secret-key-change-in-production"
BCRYPT_SALT_ROUNDS=10
LOG_LEVEL="debug"
SWAGGER_ENABLED="true"
```

**Características:**

- Logging detallado
- Swagger habilitado
- Bcrypt con menos rounds (más rápido)
- Base de datos local

### 2. Test (.env.test)

```env
NODE_ENV="test"
DATABASE_URL="postgresql://anfutrans_test:test_password@localhost:5432/anfutrans_test?schema=core"
JWT_SECRET="test-secret-key-not-for-production"
BCRYPT_SALT_ROUNDS=4
LOG_LEVEL="error"
SWAGGER_ENABLED="false"
```

**Características:**

- Base de datos separada
- Logging mínimo
- Bcrypt muy rápido (solo 4 rounds)
- Tokens de corta duración

### 3. Production (.env.production)

```env
NODE_ENV="production"
DATABASE_URL="postgresql://anfutrans_prod:SECURE_PASSWORD@db-host.example.com:5432/anfutrans_prod?schema=core&sslmode=require"
JWT_SECRET="CAMBIAR_ESTE_SECRET_POR_UNO_GENERADO_ALEATORIAMENTE"
BCRYPT_SALT_ROUNDS=12
LOG_LEVEL="warn"
SWAGGER_ENABLED="false"
```

**Características:**

- SSL obligatorio
- Secrets generados aleatoriamente
- Bcrypt seguro (12 rounds)
- Swagger deshabilitado
- Logging solo de warnings/errors

---

## 📜 Comandos de Prisma

### Generación y Sincronización

```bash
# Generar cliente Prisma (después de cambios en schema)
npm run prisma:generate

# Sincronizar schema con BD sin migraciones (desarrollo)
npm run prisma:db:push

# Extraer schema desde BD existente
npm run prisma:db:pull

# Abrir Prisma Studio (GUI para explorar datos)
npm run prisma:studio
```

### Migraciones

```bash
# Crear nueva migración con nombre
npm run prisma:migrate -- add_user_roles

# Crear migración draft (sin aplicar)
npm run prisma:migrate:create -- draft_migration

# Aplicar migraciones pendientes (producción)
npm run prisma:migrate:deploy

# Ver estado de migraciones
npm run prisma:migrate:status

# Resetear BD (elimina datos, reaplica migraciones)
npm run prisma:migrate:reset

# Resolver conflictos de migración
npm run prisma:migrate:resolve --applied <migration_name>
npm run prisma:migrate:resolve --rolled-back <migration_name>
```

### Gestión de Base de Datos

```bash
# Configuración inicial completa (migraciones + seed)
npm run db:setup

# Estado de migraciones
npm run db:status

# Reset completo (con confirmación)
npm run db:reset

# Reset completo (sin confirmación - testing)
npm run db:reset -- --force

# Ejecutar solo seed
npm run prisma:seed
```

### Backup y Restauración

```bash
# Crear backup
npm run db:backup

# Restaurar desde backup
npm run db:restore backups/backup_anfutrans_dev_2026-03-14.sql
```

---

## 🌱 Sistema de Seeds

El archivo [seed.ts](file:///c:/Users/afuenzalida/Downloads/WEB/ANFUTRANS/anfutrans-platform/apps/backend/prisma/seed.ts) crea datos iniciales:

### Datos Creados

1. **Roles (4)**
   - `ADMIN`: Administrador del sistema
   - `DIRIGENTE`: Dirigente sindical
   - `OPERADOR`: Operador básico
   - `SOCIO`: Socio con acceso limitado

2. **Usuario Administrador**
   - Email: `admin@anfutrans.cl`
   - Password: `admin123` (hasheda con bcrypt)
   - Rol: ADMIN

3. **Estados de Solicitud (7)**
   - BORRADOR, PENDIENTE, EN_REVISION, APROBADA, RECHAZADA, COMPLETADA, CANCELADA

4. **Tipos de Solicitud (3)**
   - Certificado de Afiliación
   - Préstamo
   - Beneficio de Salud

5. **Tipos de Beneficio (4)**
   - Salud, Educación, Recreación, Asistencia Social

6. **Tipos de Documento (5)**
   - RUT, Licencia Médica, Certificado de Estudio, Comprobante Domicilio, Otro

7. **Regiones de Chile (16)**
   - Todas las regiones administrativas

8. **Comunas (52)**
   - Todas las comunas de la Región Metropolitana

### Ejecutar Seed

```bash
# Ejecutar seed manualmente
npm run prisma:seed

# Seed automático después de reset
npm run db:reset
```

---

## 🔄 Flujo de Trabajo de Migraciones

### Desarrollo

```bash
# 1. Modificar schema.prisma
# 2. Crear migración
npm run prisma:migrate -- add_new_field

# 3. Verificar archivos generados en prisma/migrations/
# 4. Aplicar (ya se aplica automáticamente en dev)
# 5. Actualizar seed.ts si es necesario
npm run prisma:seed
```

### Testing

```bash
# 1. Usar BD de test
export NODE_ENV=test
# o en Windows: $env:NODE_ENV="test"

# 2. Configurar BD de test
npm run db:setup

# 3. Ejecutar tests
npm run test
npm run test:e2e

# 4. Reset para limpiar
npm run db:reset -- --force
```

### Producción

```bash
# 1. Ejecutar migraciones (NO ejecuta seed automáticamente)
npm run prisma:migrate:deploy

# 2. Verificar estado
npm run db:status

# 3. Crear backup ANTES de cambios
npm run db:backup

# 4. Si algo falla, restaurar
npm run db:restore backups/backup_prod_<timestamp>.sql
```

---

## 💾 Sistema de Backups

### Backup Automático

El script [db-backup.js](file:///c:/Users/afuenzalida/Downloads/WEB/ANFUTRANS/anfutrans-platform/apps/backend/scripts/db-backup.js) crea backups con:

**Características:**

- Nombre con timestamp: `backup_anfutrans_dev_2026-03-14T12-30-00.sql`
- Formato SQL plano (compatible con psql)
- Retención automática de últimos 7 backups
- Usa `pg_dump` de PostgreSQL

**Ejecutar:**

```bash
npm run db:backup
```

**Salida:**

```
💾 Creando backup de base de datos...
   Base de datos: anfutrans_dev
   Host: localhost:5432
   Archivo: /path/to/backups/backup_anfutrans_dev_2026-03-14T12-30-00.sql

✅ Backup creado exitosamente!
   Tamaño: 2.45 MB
   Ubicación: /path/to/backups/backup_anfutrans_dev_2026-03-14T12-30-00.sql

🗑️  Limpiando backups antiguos (manteniendo 7)...
   Eliminado: backup_anfutrans_dev_2026-03-07T10-15-00.sql
```

### Restauración

**Ejecutar:**

```bash
npm run db:restore backups/backup_anfutrans_dev_2026-03-14T12-30-00.sql
```

**Proceso:**

1. Pide confirmación (operación destructiva)
2. Sobrescribe BD actual
3. Usa `psql` para restaurar

⚠️ **IMPORTANTE:** Crear backup antes de restaurar si hay datos importantes

---

## 📊 Gestión de Migraciones

### Crear Primera Migración

```bash
# Inicializar migraciones desde schema existente
npm run prisma:migrate -- initial_schema
```

Esto genera:

```
prisma/migrations/
└── 20260314120000_initial_schema/
    └── migration.sql
```

### Añadir Nueva Migración

```bash
# 1. Editar schema.prisma
# 2. Crear migración
npm run prisma:migrate -- add_user_avatar

# 3. Revisar SQL generado
cat prisma/migrations/<timestamp>_add_user_avatar/migration.sql

# 4. Aplicar (automático en dev)
```

### Resolver Conflictos

Si prisma detecta cambios manuales en la BD:

```bash
# Marcar migración como aplicada
npm run prisma:migrate:resolve -- --applied 20260314120000_initial_schema

# Marcar migración como revertida
npm run prisma:migrate:resolve -- --rolled-back 20260314120000_bad_migration
```

### Rollback Manual

Prisma NO tiene rollback automático. Para revertir:

**Opción 1: Restaurar desde backup**

```bash
npm run db:restore backups/backup_before_migration.sql
```

**Opción 2: Crear migración inversa**

```bash
# 1. Modificar schema.prisma (revertir cambios)
# 2. Crear nueva migración
npm run prisma:migrate -- revert_previous_changes
```

---

## 🔐 Seguridad

### Variables Sensibles

**NUNCA commitear:**

- `.env`
- `.env.development`
- `.env.test`
- `.env.production`

**Sí commitear:**

- `.env.example` (template sin valores reales)

### Generar Secrets Seguros

```bash
# JWT Secret (64 caracteres hexadecimales)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output ejemplo:
# a7f3c9e1b2d4f6h8j0k1l3m5n7p9q2r4s6t8u0v2w4x6y8z1a3b5c7d9e2f4g6h8
```

Usar este valor en `.env.production`:

```env
JWT_SECRET="a7f3c9e1b2d4f6h8j0k1l3m5n7p9q2r4s6t8u0v2w4x6y8z1a3b5c7d9e2f4g6h8"
```

### Passwords de BD

En producción:

- Usar passwords de 20+ caracteres
- Combinar mayúsculas, minúsculas, números, símbolos
- Rotar periódicamente
- Almacenar en gestor de secrets (AWS Secrets Manager, Azure Key Vault, etc.)

---

## 🚀 Procedimientos de Despliegue

### Primer Despliegue (Producción)

```bash
# 1. Crear base de datos PostgreSQL
createdb anfutrans_prod

# 2. Configurar .env.production con credenciales
# 3. Ejecutar setup
NODE_ENV=production npm run db:setup

# 4. Verificar
NODE_ENV=production npm run db:status
```

### Actualización con Migraciones

```bash
# 1. SIEMPRE crear backup primero
NODE_ENV=production npm run db:backup

# 2. Aplicar migraciones
NODE_ENV=production npm run prisma:migrate:deploy

# 3. Verificar estado
NODE_ENV=production npm run db:status

# 4. Reiniciar aplicación
pm2 restart anfutrans-backend
```

### Rollback en Producción

```bash
# 1. Detener aplicación
pm2 stop anfutrans-backend

# 2. Restaurar backup
NODE_ENV=production npm run db:restore backups/backup_prod_<timestamp>.sql

# 3. Revertir código
git checkout <commit-anterior>
npm install
npm run build

# 4. Reiniciar aplicación
pm2 start anfutrans-backend
```

---

## 📈 Monitoreo de Migraciones

### Script de Verificación

```bash
# Ver estado actual
npm run db:status
```

**Salida:**

```
🔍 Verificando estado de migraciones...

Database schema is up to date!

✅ Verificación completada
```

### Migraciones Pendientes

Si hay migraciones pendientes:

```
⚠️  Hay migraciones pendientes:

The following migrations have not yet been applied:
20260314120000_add_user_avatar

Ejecuta "npm run db:setup" para aplicar migraciones
```

---

## 🧪 Testing con Migraciones

### Configurar BD de Test

```bash
# 1. Crear BD de test
createdb anfutrans_test

# 2. Usar .env.test
export NODE_ENV=test

# 3. Setup inicial
npm run db:setup

# 4. Ejecutar tests
npm run test
npm run test:e2e
```

### Reset entre Tests

```bash
# En beforeEach global (test setup)
npm run db:reset -- --force
```

O usar Prisma directamente:

```typescript
beforeEach(async () => {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "core"."socio" CASCADE');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "core"."solicitud" CASCADE');
  // ... otros
});
```

---

## 📝 Checklist de Operaciones

### Nueva Feature con Cambios de BD

- [ ] Modificar `schema.prisma`
- [ ] Crear migración: `npm run prisma:migrate -- feature_name`
- [ ] Revisar SQL generado en `migrations/`
- [ ] Actualizar `seed.ts` si necesario
- [ ] Ejecutar seed: `npm run prisma:seed`
- [ ] Actualizar DTOs en backend
- [ ] Actualizar servicios
- [ ] Ejecutar tests: `npm run test`
- [ ] Documentar cambios en CHANGELOG

### Deploy a Producción

- [ ] **Backup**: `npm run db:backup`
- [ ] Verificar migrations en dev/test
- [ ] Revisar SQL de migración
- [ ] Detener aplicación (ventana de mantenimiento)
- [ ] Aplicar migraciones: `npm run prisma:migrate:deploy`
- [ ] Verificar estado: `npm run db:status`
- [ ] Deployar código actualizado
- [ ] Reiniciar aplicación
- [ ] Smoke tests
- [ ] Monitorear logs

### Rollback de Emergencia

- [ ] Detener aplicación inmediatamente
- [ ] Identificar backup previo a migración
- [ ] Restaurar: `npm run db:restore <backup>`
- [ ] Revertir código a commit anterior
- [ ] Rebuild y restart
- [ ] Verificar funcionalidad
- [ ] Postmortem: documentar qué falló

---

## 🛠️ Troubleshooting

### Error: "Database is already up to date"

**Causa:** Prisma detecta que el schema coincide con la BD

**Solución:**

```bash
# Crear migración draft
npm run prisma:migrate:create -- migration_name

# Editar SQL manualmente
# Aplicar
npm run prisma:migrate:deploy
```

### Error: "Migration failed"

**Causa:** SQL inválido o conflicto de datos

**Solución:**

```bash
# 1. Ver detalles del error
npm run db:status

# 2. Marcar como fallida
npm run prisma:migrate:resolve -- --rolled-back <migration_name>

# 3. Corregir schema
# 4. Crear nueva migración
npm run prisma:migrate -- fixed_version
```

### Error: "Connection refused" (PostgreSQL)

**Verificar:**

```bash
# PostgreSQL corriendo?
pg_isready

# Puerto correcto?
netstat -an | grep 5432

# Usuario/password correctos?
psql -U anfutrans_dev -d anfutrans_dev -h localhost
```

### Error: "SSL required" (Producción)

**Agregar a DATABASE_URL:**

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=core&sslmode=require"
```

---

## ✅ Checklist FASE 10

- [x] Archivos de configuración por entorno (.env.development, .env.test, .env.production)
- [x] Scripts de gestión de BD (setup, reset, status, backup, restore)
- [x] Sistema de seeds completo con datos iniciales
- [x] Comandos npm para todas las operaciones
- [x] Documentación de procedimientos
- [x] Sistema de backups automático
- [x] Procedimientos de rollback
- [x] Checklist de operaciones
- [x] Guía de troubleshooting
- [ ] Ejecutar primera migración inicial (requiere BD configurada)
- [ ] Configurar cron para backups automáticos (FASE 12)
- [ ] Integrar con CI/CD (FASE 11)

---

## 🔜 Próximos Pasos

**FASE 11:** Docker + CI/CD

- Dockerfile para backend y frontend
- docker-compose.yml completo
- GitHub Actions / GitLab CI pipeline
- Deploy automatizado
- Tests automáticos en pipeline

**FASE 12:** Monitoreo + Logs

- Winston/Pino logging
- APM (Datadog, New Relic)
- Alertas de errores
- Métricas de performance

---

## 📚 Referencias

- [Prisma Migrations Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL Backup and Restore](https://www.postgresql.org/docs/current/backup.html)
- [Node.js Best Practices - Database](https://github.com/goldbergyoni/nodebestpractices#5-database-best-practices)

---

**Fecha de implementación:** 14 de marzo de 2026
**Fase:** 10/12
**Estado:** ✅ COMPLETADA
