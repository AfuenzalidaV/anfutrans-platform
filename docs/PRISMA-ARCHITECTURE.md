# 🏗️ PRISMA ARCHITECTURE - ANFUTRANS PLATFORM

**Versión**: v0.6
**Última Actualización**: 14 de marzo de 2026
**Schema**: `apps/backend/prisma/schema.prisma`

---

## 📋 TABLA DE CONTENIDOS

1. [Visión General](#visión-general)
2. [Configuración de Prisma](#configuración-de-prisma)
3. [Arquitectura de Base de Datos](#arquitectura-de-base-de-datos)
4. [Modelos del Sistema](#modelos-del-sistema)
5. [Relaciones y Constraints](#relaciones-y-constraints)
6. [Índices y Optimización](#índices-y-optimización)
7. [Migraciones](#migraciones)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 VISIÓN GENERAL

El sistema ANFUTRANS utiliza **Prisma ORM** como capa de abstracción sobre **PostgreSQL 16**.

### Características Principales

- ✅ **18 modelos** organizados por dominios de negocio
- ✅ **Schema único** `core` en PostgreSQL
- ✅ **Type-safe** queries generadas automáticamente
- ✅ **Relaciones bien definidas** con foreign keys
- ✅ **Soft deletes** mediante campo `activo`
- ✅ **Timestamps automáticos** (createdAt, updatedAt)
- ✅ **Snake_case en BD**, camelCase en código

### Tecnologías

| Componente | Versión |
|------------|---------|
| Prisma | 7.x |
| PostgreSQL | 16 |
| Prisma Client | Auto-generado |
| Schema Location | `apps/backend/prisma/scheme.prisma` |

---

## ⚙️ CONFIGURACIÓN DE PRISMA

### Generator

```prisma
generator client {
  provider = "prisma-client-js"
}
```

**Genera**: Cliente TypeScript tipado en `apps/backend/generated/prisma/`

### Datasource

```prisma
datasource db {
  provider = "postgresql"
  schemas  = ["core"]
}
```

**Configuración**:
- Base de datos PostgreSQL
- Schema único: `core`
- Conexión via `DATABASE_URL` en `.env`

### Variables de Entorno

```env
DATABASE_URL="postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db?schema=core"
```

**Componentes**:
- Usuario: `anfutrans_app`
- Base de datos: `anfutrans_db`
- Schema: `core`
- Puerto: `5432`

---

## 🏛️ ARQUITECTURA DE BASE DE DATOS

### Estructura de Schemas

```
anfutrans_db
└── core (schema)
    ├── Catálogos (9 tablas)
    ├── Seguridad (2 tablas)
    ├── Socios (1 tabla)
    ├── Trámites (2 tablas)
    ├── Beneficios (2 tablas)
    └── Documentos (2 tablas)
```

### Diagrama ERD Simplificado

```
region (1)────(N) comuna (1)────(N) socio
                                      │
                                      │ (1)
                                      │
                                     (N)
                               solicitud ────(N) historial
                                      │
                                      └────(N) documentos

socio (N)────(N) beneficio_socio (N)────(N) beneficio

usuario (1)────(N) documento
rol (1)────(N) usuario
```

---

## 📦 MODELOS DEL SISTEMA

### 1️⃣ CATÁLOGOS (9 modelos)

Tablas de referencia con códigos únicos y campos `activo` para soft delete.

#### **cargo_dirigencial**

```prisma
model cargo_dirigencial {
  id     Int      @id @default(autoincrement()) @db.SmallInt
  codigo String   @unique @db.VarChar(50)
  nombre String   @db.VarChar(100)
  nivel  String?  @db.VarChar(20)
  activo Boolean? @default(true)
}
```

**Propósito**: Cargos directivos en la organización
**Índices**: `codigo` (unique)
**Tipo ID**: SmallInt (optimizado para catálogos)

#### **region** y **comuna**

```prisma
model region {
  id     Int      @id @default(autoincrement())
  codigo String   @unique
  nombre String
  activo Boolean?
  comunas comuna[]
}

model comuna {
  id       Int      @id @default(autoincrement())
  codigo   String   @unique
  nombre   String
  regionId Int      @map("region_id")
  activo   Boolean?

  region region  @relation(fields: [regionId], references: [id])
  socios socio[]
}
```

**Relación**: 1:N (región → comunas)
**Uso**: Ubicación geográfica de socios

#### **tipo_solicitud**

```prisma
model tipo_solicitud {
  id                 Int      @id @default(autoincrement()) @db.SmallInt
  codigo             String   @unique @db.VarChar(50)
  nombre             String   @db.VarChar(150)
  descripcion        String?
  requiereAprobacion Boolean? @default(true) @map("requiere_aprobacion")
  permiteBorrador    Boolean? @default(false) @map("permite_borrador")
  activo             Boolean? @default(true)

  solicitudes solicitud[]
}
```

**Reglas de Negocio**:
- `requiereAprobacion`: Controla flujo de aprobación
- `permiteBorrador`: Permite guardar sin enviar

#### **estado_solicitud**

```prisma
model estado_solicitud {
  id     Int      @id @default(autoincrement()) @db.SmallInt
  codigo String   @unique @db.VarChar(50)
  nombre String   @db.VarChar(100)
  orden  Int?
  activo Boolean? @default(true)

  solicitudes          solicitud[]
  solicitudHistoriales solicitud_historial[]
}
```

**Campo `orden`**: Define secuencia de estados en workflow

#### **tipo_beneficio**, **tipo_certificado**, **tipo_documento**

Catálogos similares con estructura estándar:
- `id` (SmallInt)
- `codigo` (unique)
- `nombre`
- `activo`

#### **parametro_sistema**

```prisma
model parametro_sistema {
  id          String    @id @default(uuid()) @db.Uuid
  clave       String    @unique @db.VarChar(100)
  valor       String?
  descripcion String?
  updatedAt   DateTime? @default(now()) @map("updated_at")
}
```

**Uso**: Configuración dinámica del sistema
**Tipo ID**: UUID (permite parámetros distribuidos)

---

### 2️⃣ SEGURIDAD (2 modelos)

#### **rol**

```prisma
model rol {
  id          Int      @id @default(autoincrement()) @db.SmallInt
  codigo      String   @unique @db.VarChar(20)
  nombre      String   @db.VarChar(50)
  descripcion String?
  activo      Boolean? @default(true)

  usuarios usuario[]
}
```

**Ejemplo de roles**:
- `ADMIN`: Administrador del sistema
- `DIRIGENTE`: Dirigente sindical
- `OPERADOR`: Operador administrativo

#### **usuario**

```prisma
model usuario {
  id           String    @id @default(uuid()) @db.Uuid
  email        String    @unique @db.VarChar(150)
  passwordHash String    @map("password_hash") @db.VarChar(255)
  nombre       String    @db.VarChar(100)
  apellido     String    @db.VarChar(100)
  rolId        Int       @map("rol_id") @db.SmallInt
  activo       Boolean?  @default(true)
  createdAt    DateTime? @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")

  rol                  rol                   @relation(fields: [rolId], references: [id])
  solicitudHistoriales solicitud_historial[]
  documentos           documento[]
}
```

**Seguridad**:
- Email único (username)
- Password hasheado (bcrypt)
- Relación con rol para permisos

**⚠️ IMPORTANTE**: Campo `passwordHash` debe usar bcrypt con salt rounds >= 10

---

### 3️⃣ SOCIOS (1 modelo)

#### **socio**

```prisma
model socio {
  id           String    @id @default(uuid()) @db.Uuid
  rut          String    @unique @db.VarChar(12)
  nombre       String    @db.VarChar(100)
  apellido     String    @db.VarChar(100)
  email        String?   @db.VarChar(150)
  telefono     String?   @db.VarChar(20)
  direccion    String?   @db.VarChar(250)
  comunaId     Int       @map("comuna_id")
  fechaIngreso DateTime? @map("fecha_ingreso") @db.Date
  activo       Boolean?  @default(true)
  createdAt    DateTime? @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")

  comuna          comuna            @relation(fields: [comunaId], references: [id])
  solicitudes     solicitud[]
  beneficioSocios beneficio_socio[]
}
```

**RUT**: Identificador único de socio (RUT chileno)
**Tipo ID**: UUID para escalabilidad
**Campos opcionales**: email, teléfono, dirección

---

### 4️⃣ TRÁMITES (2 modelos)

#### **solicitud**

```prisma
model solicitud {
  id                String    @id @default(uuid()) @db.Uuid
  socioId           String    @map("socio_id") @db.Uuid
  tipoSolicitudId   Int       @map("tipo_solicitud_id") @db.SmallInt
  estadoSolicitudId Int       @map("estado_solicitud_id") @db.SmallInt
  fechaSolicitud    DateTime? @default(now()) @map("fecha_solicitud")
  observaciones     String?
  createdAt         DateTime? @default(now()) @map("created_at")
  updatedAt         DateTime? @updatedAt @map("updated_at")

  socio           socio                 @relation(fields: [socioId], references: [id])
  tipoSolicitud   tipo_solicitud        @relation(fields: [tipoSolicitudId], references: [id])
  estadoSolicitud estado_solicitud      @relation(fields: [estadoSolicitudId], references: [id])
  historial       solicitud_historial[]
  documentos      solicitud_documento[]
}
```

**Relaciones**:
- 1 socio → N solicitudes
- 1 tipo_solicitud → N solicitudes
- 1 estado_solicitud → N solicitudes

#### **solicitud_historial**

```prisma
model solicitud_historial {
  id                String    @id @default(uuid()) @db.Uuid
  solicitudId       String    @map("solicitud_id") @db.Uuid
  estadoSolicitudId Int       @map("estado_solicitud_id") @db.SmallInt
  usuarioId         String?   @map("usuario_id") @db.Uuid
  fecha             DateTime? @default(now())
  comentario        String?

  solicitud       solicitud        @relation(fields: [solicitudId], references: [id])
  estadoSolicitud estado_solicitud @relation(fields: [estadoSolicitudId], references: [id])
  usuario         usuario?         @relation(fields: [usuarioId], references: [id])
}
```

**Propósito**: Auditoría de cambios de estado
**Usuario opcional**: Para cambios automáticos del sistema

---

### 5️⃣ BENEFICIOS (2 modelos)

#### **beneficio**

```prisma
model beneficio {
  id              String    @id @default(uuid()) @db.Uuid
  nombre          String    @db.VarChar(150)
  descripcion     String?
  tipoBeneficioId Int       @map("tipo_beneficio_id") @db.SmallInt
  activo          Boolean?  @default(true)
  createdAt       DateTime? @default(now()) @map("created_at")

  tipoBeneficio   tipo_beneficio    @relation(fields: [tipoBeneficioId], references: [id])
  beneficioSocios beneficio_socio[]
}
```

#### **beneficio_socio** (Tabla Join)

```prisma
model beneficio_socio {
  id                String    @id @default(uuid()) @db.Uuid
  socioId           String    @map("socio_id") @db.Uuid
  beneficioId       String    @map("beneficio_id") @db.Uuid
  fechaOtorgamiento DateTime? @default(now()) @map("fecha_otorgamiento")
  activo            Boolean?  @default(true)
  createdAt         DateTime? @default(now()) @map("created_at")

  socio     socio     @relation(fields: [socioId], references: [id])
  beneficio beneficio @relation(fields: [beneficioId], references: [id])

  @@unique([socioId, beneficioId])
}
```

**Relación**: Many-to-Many entre socios y beneficios
**Constraint**: Un socio no puede tener el mismo beneficio duplicado

---

### 6️⃣ DOCUMENTOS (2 modelos)

#### **documento**

```prisma
model documento {
  id              String    @id @default(uuid()) @db.Uuid
  nombreArchivo   String    @map("nombre_archivo") @db.VarChar(255)
  ruta            String    @db.VarChar(500)
  tipoDocumentoId Int       @map("tipo_documento_id") @db.SmallInt
  usuarioId       String?   @map("usuario_id") @db.Uuid
  tamanioBytes    Int?      @map("tamanio_bytes")
  fechaSubida     DateTime? @default(now()) @map("fecha_subida")

  tipoDocumento       tipo_documento        @relation(fields: [tipoDocumentoId], references: [id])
  usuario             usuario?              @relation(fields: [usuarioId], references: [id])
  solicitudDocumentos solicitud_documento[]
}
```

**Metadata**: Almacena información del archivo, NO el contenido binario

#### **solicitud_documento** (Tabla Join)

```prisma
model solicitud_documento {
  id          String    @id @default(uuid()) @db.Uuid
  solicitudId String    @map("solicitud_id") @db.Uuid
  documentoId String    @map("documento_id") @db.Uuid
  createdAt   DateTime? @default(now()) @map("created_at")

  solicitud solicitud @relation(fields: [solicitudId], references: [id])
  documento documento @relation(fields: [documentoId], references: [id])

  @@unique([solicitudId, documentoId])
}
```

**Relación**: Many-to-Many entre solicitudes y documentos

---

## 🔗 RELACIONES Y CONSTRAINTS

### Tipos de Relaciones

| Tipo | Ejemplo | Implementación |
|------|---------|----------------|
| **1:N** | region → comunas | `@relation` en modelo hijo |
| **1:N** | socio → solicitudes | Foreign key en solicitud |
| **N:M** | socios ↔ beneficios | Tabla `beneficio_socio` |
| **N:M** | solicitudes ↔ documentos | Tabla `solicitud_documento` |

### Constraints Únicos

```prisma
// Unique en campo simple
@unique // codigo, email, rut

// Composite unique
@@unique([socioId, beneficioId])
@@unique([solicitudId, documentoId])
```

### Reglas de Integridad Referencial

**Comportamiento por defecto** (Prisma):
- `onDelete`: `Cascade` (no especificado)
- `onUpdate`: `Cascade` (no especificado)

**⚠️ RECOMENDACIÓN**: Especificar explícitamente:

```prisma
socio socio @relation(fields: [socioId], references: [id], onDelete: Restrict)
```

---

## 📊 ÍNDICES Y OPTIMIZACIÓN

### Estado Actual

❌ **NO hay índices explícitos** definidos en el schema (solo los implícitos en `@unique` y `@id`)

### Índices Recomendados

```prisma
// En modelo socio
@@index([rut])
@@index([comunaId])
@@index([activo])
@@index([fechaIngreso])

// En modelo solicitud
@@index([socioId])
@@index([estadoSolicitudId])
@@index([tipoSolicitudId])
@@index([fechaSolicitud])
@@index([socioId, estadoSolicitudId]) // Composite

// En modelo usuario
@@index([email])
@@index([rolId])
@@index([activo])

// En modelo beneficio_socio
@@index([socioId])
@@index([beneficioId])
@@index([activo])

// En modelo documento
@@index([tipoDocumentoId])
@@index([usuarioId])
@@index([fechaSubida])
```

### Justificación

| Campo | Justificación |
|-------|---------------|
| `rut`, `email` | Búsquedas frecuentes de identificación |
| `socioId` | Queries de solicitudes por socio |
| `estadoSolicitudId` | Filtrado por estado (dashboards) |
| `activo` | Filtrado de registros activos |
| `fechaIngreso`, `fechaSolicitud` | Rangos de fechas en reportes |

### Queries Optimizadas

```typescript
// ✅ CON índice en socioId
const solicitudes = await prisma.solicitud.findMany({
  where: { socioId: '...' }
})

// ✅ CON índice compuesto en [socioId, estadoSolicitudId]
const solicitudesPendientes = await prisma.solicitud.findMany({
  where: {
    socioId: '...',
    estadoSolicitudId: 1 // PENDIENTE
  }
})
```

---

## 🔄 MIGRACIONES

### Comandos Prisma

```bash
# 1. Crear migración desde cambios en schema
npx prisma migrate dev --name descripcion_cambio

# 2. Aplicar migraciones pendientes (producción)
npx prisma migrate deploy

# 3. Ver estado de migraciones
npx prisma migrate status

# 4. Resetear base de datos (desarrollo)
npx prisma migrate reset

# 5. Generar Prisma Client
npx prisma generate
```

### Workflow de Desarrollo

```mermaid
graph LR
    A[Editar schema.prisma] --> B[npx prisma migrate dev]
    B --> C[Revisa SQL generado]
    C --> D[Commit schema + migration/]
    D --> E[npx prisma generate]
    E --> F[Actualizar código TypeScript]
```

### Estado Actual (FASE 2)

```
📁 prisma/
  └── schema.prisma ✅

❌ NO hay carpeta migrations/
❌ Migraciones pendientes de crear
```

### Primera Migración (Pendiente)

**Requiere**:
1. Docker Desktop iniciado
2. PostgreSQL corriendo en `localhost:5432`

**Comando**:
```bash
cd apps/backend
npx prisma migrate dev --name init
```

**Resultado esperado**:
```
✔ Generated Prisma Client
✔ The SQLite database "anfutrans_db" was created at "localhost:5432"
✔ Migration "20260314_init" applied successfully
```

---

## ✅ MEJORES PRÁCTICAS

### 1. Naming Conventions

```prisma
// ✅ CORRECTO
model usuario {
  passwordHash String @map("password_hash")  // camelCase → snake_case
  rolId Int @map("rol_id")
}

// ❌ INCORRECTO
model usuario {
  password_hash String  // snake_case en Prisma
}
```

### 2. Soft Deletes

```prisma
// ✅ Usar campo activo
model socio {
  activo Boolean? @default(true)
}

// Query filtrada
const sociosActivos = await prisma.socio.findMany({
  where: { activo: true }
})
```

### 3. Timestamps

```prisma
// ✅ Siempre incluir
createdAt DateTime? @default(now()) @map("created_at")
updatedAt DateTime? @updatedAt @map("updated_at")
```

### 4. Tipos de Datos

```prisma
// ✅ Optimizar tipos
id Int @db.SmallInt        // Para catálogos (max 32,767)
id String @db.Uuid         // Para entidades (escalabilidad)
codigo String @db.VarChar(50) // Limitar tamaños
```

### 5. Relaciones Opcionales

```prisma
// ✅ Usuario opcional en historial (para procesos automáticos)
usuario usuario? @relation(...)
usuarioId String? @map("usuario_id")
```

### 6. Validaciones

```prisma
// ⚠️ LIMITADO: Prisma no valida formatos
// Usar class-validator en DTOs para:
@IsEmail()
@Matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/) // RUT
@MinLength(8)
```

---

## 🛠️ TROUBLESHOOTING

### Problema: "Environment variable not found: DATABASE_URL"

**Solución**:
```bash
# Crear .env en apps/backend/
DATABASE_URL="postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db?schema=core"
```

### Problema: "Can't reach database server at localhost:5432"

**Solución**:
```bash
# Verificar Docker
docker ps

# Iniciar PostgreSQL
docker-compose up -d

# Verificar logs
docker-compose logs postgres
```

### Problema: "Migration `20260314_init` failed to apply"

**Solución**:
```bash
# Resetear base de datos (desarrollo)
npx prisma migrate reset

# Re-intentar migración
npx prisma migrate dev
```

### Problema: "Prisma Client not generated"

**Solución**:
```bash
npx prisma generate
```

### Problema: "Schema is not valid"

**Solución**:
```bash
# Validar sintaxis
npx prisma validate

# Formatear schema
npx prisma format
```

---

## 📚 RECURSOS ADICIONALES

### Documentación Oficial

- Prisma Schema Reference: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- Migrations Guide: https://www.prisma.io/docs/concepts/components/prisma-migrate
- Best Practices: https://www.prisma.io/docs/guides/performance-and-optimization

### Scripts NPM (apps/backend/package.json)

```json
{
  "scripts": {
    "prisma:generate": "npx prisma generate",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:deploy": "npx prisma migrate deploy",
    "prisma:studio": "npx prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts"
  }
}
```

### Next Steps

1. ✅ Agregar índices recomendados al schema
2. ✅ Ejecutar primera migración
3. ✅ Crear seed scripts para datos de prueba
4. ✅ Implementar prisma.service.ts mejorado
5. ✅ Configurar query logging en desarrollo

---

**Última revisión**: 14 de marzo de 2026
**Autor**: Arquitecto Senior Full Stack
**Estado**: Documentación FASE 2 - Validación Prisma
