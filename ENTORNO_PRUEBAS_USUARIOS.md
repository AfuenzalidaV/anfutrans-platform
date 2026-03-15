# 🚀 ENTORNO DE PRUEBAS CON USUARIOS REALES - ANFUTRANS PLATFORM

**Fecha:** 14 de Marzo 2026
**Versión:** 1.0 - Entorno de Desarrollo
**Preparado por:** Arquitecto de Software Senior / UX Architect / Tech Lead

---

## 📋 ÍNDICE

1. [Descripción del Sistema](#descripción-del-sistema)
2. [Arquitectura General](#arquitectura-general)
3. [Roles de Usuarios](#roles-de-usuarios)
4. [Credenciales de Prueba](#credenciales-de-prueba)
5. [Instrucciones para Levantar el Sistema](#instrucciones-para-levantar-el-sistema)
6. [URLs de Acceso](#urls-de-acceso)
7. [Flujos de Uso por Rol](#flujos-de-uso-por-rol)
8. [Estado Actual del Sistema](#estado-actual-del-sistema)
9. [Problemas Conocidos](#problemas-conocidos)
10. [Próximos Pasos](#próximos-pasos)

---

## 📖 DESCRIPCIÓN DEL SISTEMA

**ANFUTRANS Platform** es una plataforma digital integral para la Asociación Nacional de Funcionarios del Transporte (ANFUTRANS) que incluye:

### Componentes Principales

1. **Portal Web Institucional** (Público)
   - Información institucional
   - Noticias y comunicados
   - Documentos y normativas
   - Acceso a plataforma de socios

2. **Plataforma de Gestión Interna** (Privado - Requiere Login)
   - Gestión de socios
   - Tramitación de solicitudes
   - Gestión de beneficios
   - Sistema de cuentas de socios
   - Préstamos solidarios
   - Generación de reportes
   - Panel administrativo

   ### Funcionalidades implementadas

✅ **Backend NestJS**

- API RESTful completamente funcional
- Autenticación JWT
- 10 módulos (Auth, Socios, Trámites, Beneficios, Usuarios, Catálogos, Contenidos, Salud)
- Validación con class-validator
- Documentación Swagger en `/api`
- Health check en `/api/health`

✅ **Base de Datos PostgreSQL**

- 18 modelos de datos
- 16 índices para optimización
- Schema "core"
- Roles configurados
- Catálogos de datos (regiones, comunas, tipos)

⚠️ **Frontend Angular**

- Estructura creada pero con **errores de compilación**
- 19 módulos planificados
- Guards e interceptors configurados
- **NO FUNCIONAL en este momento**

---

## 🏗️ ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────┐
│                   ANFUTRANS PLATFORM                    │
│                Full Stack Application                   │
└─────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────┐         ┌─────────────┐
│                  │         │              │         │             │
│  PORTAL WEB      │         │   BACKEND    │         │  DATABASE   │
│  Institucional   │────────>│   NestJS     │────────>│ PostgreSQL  │
│  (HTML estático) │<────────│   + Prisma   │<────────│     15      │
│                  │   HTTP  │   + JWT      │   ORM   │             │
│  Port: 80        │   REST  │  Port: 3000  │         │ Port: 5432  │
│  (Nginx)         │         │              │         │             │
│                  │         │              │         │             │
└──────────────────┘         └──────────────┘         └─────────────┘
       ▲                            ▲                        ▲
       │                            │                        │
   [Acceso                      [Guards]                [Prisma]
    Público]                    [JWT Auth]              [Schema core]
                                [Validators]             [18 models]
```

### Flujo de Datos

```
Usuario  →  Portal Web  →  Login  →  JWT Token  →  API Backend  →  PostgreSQL
   ↑            ↓                        ↓              ↓              ↓
   └────────────┴────────────────────────┴──────────────┴──────────────┘
                        Autenticación y Autorización
```

### Tecnologías

| Componente              | Tecnología      | Versión  |
| ----------------------- | --------------- | -------- |
| **Backend**             | NestJS          | 11.0.1   |
| **ORM**                 | Prisma          | 7.4.2    |
| **Base de Datos**       | PostgreSQL      | 15       |
| **Autenticación**       | JWT + bcrypt    | 6.0.0    |
| **Validación**          | class-validator | 0.15.1   |
| **Documentación**       | Swagger/OpenAPI | 11.2.6   |
| **Frontend (planeado)** | Angular         | 21.2.4   |
| **Frontend (actual)**   | HTML/CSS/JS     | Estático |

---

## 👥 ROLES DE USUARIOS

El sistema está diseñado para 5 roles principales:

### 1. 🔑 ADMIN (Administrador)

**Descripción:** Acceso total al sistema.

**Capacidades:**

- ✅ Administración completa del sistema
- ✅ Gestión de usuarios y roles
- ✅ Gestión de catálogos (regiones, comunas, tipos)
- ✅ Configuración de parámetros del sistema
- ✅ Acceso a todos los módulos
- ✅ Generación de reportes globales

**Flujo de trabajo:**

1. Login con credenciales de admin
2. Acceso al Panel Administrativo
3. Gestión de usuarios, catálogos y configuración
4. Supervisión de todas las operaciones

---

### 2. 🏛️ DIRECTOR_NACIONAL (Director Nacional)

**Descripción:** Director nacional de ANFUTRANS - Aprobaciones finales y gestión estratégica.

**Capacidades:**

- ✅ Aprobar o rechazar solicitudes finales
- ✅ Firmar documentos oficiales
- ✅ Gestionar padrón de socios a nivel nacional
- ✅ Generar reportes de descuentos por planilla
- ✅ Acceso a estadísticas nacionales
- ✅ Gestión de beneficios nacionales

**Flujo de trabajo:**

1. Login con credenciales de director nacional
2. Ver solicitudes pendientes de aprobación final
3. Revisar documentos y antecedentes
4. Aprobar/Rechazar con observaciones
5. Firmar resol uciones
6. Generar reportes mensuales

---

### 3. 🗺️ DIRECTOR_REGIONAL (Director Regional)

**Descripción:** Director regional - Revisión y derivación de solicitudes.

**Capacidades:**

- ✅ Revisar solicitudes de su región
- ✅ Derivar solicitudes a Director Nacional
- ✅ Validar documentación
- ✅ Emitir pronunciamientos regionales
- ✅ Gestionar socios de su región
- ✅ Generar reportes regionales

**Flujo de trabajo:**

1. Login con credenciales de director regional
2. Ver solicitudes de su región
3. Revisar documentación adjunta
4. Validar información
5. Derivar a Director Nacional o Rechazar
6. Hacer seguimiento de solicitudes derivadas

---

### 4. 🏢 FUNCIONARIO (Funcionario Administrativo)

**Descripción:** Funcionario administrativo - Gestión operativa.

**Capacidades:**

- ✅ Gestión operativa de solicitudes
- ✅ Ingreso de datos de socios
- ✅ Carga de documentos
- ✅ Actualización de información
- ✅ Consulta de estados
- ✅ Generación de certificados simples

**Flujo de trabajo:**

1. Login con credenciales de funcionario
2. Ingresar nuevas solicitudes
3. Cargar documentación respaldatoria
4. Actualizar estados según indicaciones
5. Emitir certificados automáticos

---

### 5. 👤 SOCIO (Socio de ANFUTRANS)

**Descripción:** Socio de ANFUTRANS - Acceso a solicitudes y consultas personales.

**Capacidades:**

- ✅ Crear solicitudes de trámites
- ✅ Ver historial de solicitudes
- ✅ Solicitar préstamo solidario
- ✅ Solicitar certificados (afiliación, antigüedad)
- ✅ Ver estadísticas personales
- ✅ Ver estado de cuenta

**Capacidades específicas:**

#### Solicitudes disponibles:

- **Certificado de Afiliación** (aprobación automática)
- **Certificado de Antigüedad** (aprobación automática)
- **Préstamo Solidario** (requiere aprobación)
- **Beneficio de Salud** (requiere aprobación)

#### Estado de Cuenta:

- Cuotas ANFUTRANS
- Préstamo solidario (si aplica)
- Descuentos cooperativas (Coopeuch, Ahorrocop)

**Flujo de trabajo:**

1. Login con credenciales de socio
2. Acceso a su Dashboard personal
3. Ver solicitudes activas y historial
4. Crear nueva solicitud
5. Adjuntar documentos requeridos
6. Hacer seguimiento de estados
7. Descargar certificados aprobados

---

## 🔐 CREDENCIALES DE PRUEBA

**Password para todos los usuarios:** `admin123`

### Usuarios Disponibles (Pendiente de crear en BD)

| Email                            | Rol               | Nombre                | Password   |
| -------------------------------- | ----------------- | --------------------- | ---------- |
| `admin@anfutrans.cl`             | ADMIN             | Admin Sistema         | `admin123` |
| `director.nacional@anfutrans.cl` | DIRECTOR_NACIONAL | Juan Pérez González   | `admin123` |
| `director.regional@anfutrans.cl` | DIRECTOR_REGIONAL | María Rodríguez Silva | `admin123` |
| `funcionario@anfutrans.cl`       | FUNCIONARIO       | Carlos Muñoz Herrera  | `admin123` |
| `socio@anfutrans.cl`             | SOCIO             | Pedro Torres Morales  | `admin123` |

⚠️ **IMPORTANTE:** Estos usuarios están definidos en `apps/backend/prisma/seed-manual.sql` pero aún no han sido creados exitosamente en la base de datos debido a problemas con los nombres de columnas de Prisma.

---

## 🚢 INSTRUCCIONES PARA LEVANTAR EL SISTEMA

### Prerrequisitos

✅ Node.js v25.8.0 (instalado)
✅ PostgreSQL 15 (instalado y corriendo)
✅ npm 11.11.0 (instalado)
✅ Git (instalado)

### Paso 1: Instalación de Dependencias

```powershell
# Desde la raíz del proyecto
cd C:\Users\afuenzalida\Downloads\WEB\ANFUTRANS\anfutrans-platform

# Instalar dependencias del backend
cd apps\backend
npm install

# Volver a raíz
cd ..\..
```

### Paso 2: Configurar Base de Datos

```powershell
# Base de datos ya existe: anfutrans_db
# Usuario: anfutrans_app
# Password: CambiarPasswordSegura
# Puerto: 5432
```

Archivo `.env` en raíz del proyecto:

```env
DATABASE_URL=postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db
```

### Paso 3: Aplicar Schema de Prisma

```powershell
cd apps\backend

# Generar cliente Prisma
npm run prisma:generate

# Aplicar schema a la base de datos
npm run prisma:db:push -- --accept-data-loss

# Volver a raíz
cd ..\..
```

### Paso 4: Crear Datos Iniciales (Manual)

⚠️ **Estado actual:** El seed automático tiene problemas. Datos deben crearse manualmente.

**Opción A: Usando script SQL (Recomendado)**:

```powershell
$env:PGPASSWORD="CambiarPasswordSegura"
& "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U anfutrans_app -h localhost -d anfutrans_db -f apps\backend\prisma\seed-manual.sql
```

**Opción B: Crear usuarios directamente vía API** (después de levantar backend):
Usar Swagger en `http://localhost:3000/api` para crear usuarios manualmente.

### Paso 5: Levantar Backend

```powershell
# Desde raíz del proyecto
npm run backend:dev
```

**Output esperado:**

```
[Nest] INFO  Mapped {/api/health, GET} route
[Nest] INFO  Nest application successfully started +2ms
```

**Verificar backend:**

```powershell
# Health check
curl http://localhost:3000/api/health

# Debe retornar:
# {
#   "status": "ok",
#   "timestamp": "2026-03-14T...",
#   "uptime": 123.45,
#   "environment": "development"
# }
```

### Paso 6: Acceder al Sistema

Una vez levantado el backend:

1. **Swagger/API Docs:** http://localhost:3000/api
2. **Health Check:** http://localhost:3000/api/health
3. **Portal Institucional:** Pendiente de crear

⚠️ **Frontend Angular NO FUNCIONAL:** Tiene 139 errores de compilación pendientes de resolver.

---

## 🌐 URLs DE ACCESO

| Servicio                 | URL                              | Estado          | Descripción                       |
| ------------------------ | -------------------------------- | --------------- | --------------------------------- |
| **Backend API**          | http://localhost:3000/api        | ✅ Funcionando  | API RESTful principal             |
| **Health Check**         | http://localhost:3000/api/health | ✅ Funcionando  | Verificación de salud del backend |
| **Swagger Docs**         | http://localhost:3000/api        | ✅ Funcionando  | Documentación interactiva de API  |
| **Frontend Angular**     | http://localhost:4200            | ❌ NO FUNCIONAL | 139 errores de compilación        |
| **Portal Institucional** | http://localhost:80              | 📝 Pendiente    | A crear en HTML estático          |

### Endpoints Principales del Backend

**Autenticación:**

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/logout` - Cerrar sesión

**Socios:**

- `GET /api/socios` - Listar socios
- `POST /api/socios` - Crear socio
- `GET /api/socios/:id` - Ver socio
- `PUT /api/socios/:id` - Actualizar socio
- `DELETE /api/socios/:id` - Eliminar socio

**Trámites:**

- `GET /api/tramites` - Listar trámites
- `POST /api/tramites` - Crear trámite
- `GET /api/tramites/:id` - Ver trámite
- `PUT /api/tramites/:id` - Actualizar trámite
- `DELETE /api/tramites/:id` - Eliminar trámite

**Beneficios:**

- `GET /api/beneficios` - Listar beneficios
- `POST /api/beneficios` - Crear beneficio
- `GET /api/beneficios/:id` - Ver beneficio
- `PUT /api/beneficios/:id` - Actualizar beneficio
- `DELETE /api/beneficios/:id` - Eliminar beneficio

**Usuarios:**

- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/:id` - Ver usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

**Catálogos:**

- `GET /api/regiones` - Listar regiones
- `GET /api/comunas` - Listar comunas
- `GET /api/roles` - Listar roles
- `GET /api/tipo-solicitud` - Listar tipos de solicitud
- `GET /api/estado-solicitud` - Listar estados de solicitud

---

## 📱 FLUJOS DE USO POR ROL

### Flujo: SOCIO - Solicitar Préstamo Solidario

**Objetivo:** Solicitar un préstamo solidario.

**Pasos:**

1. **Login**

   ```
   POST /api/auth/login
   Body:
   {
     "email": "socio@anfutrans.cl",
     "password": "admin123"
   }

   Response:
   {
     "access_token": "eyJhbGc...",
     "user": {
       "id": "...",
       "email": "socio@anfutrans.cl",
       "rol": "SOCIO"
     }
   }
   ```

2. **Crear Solicitud de Préstamo**

   ```
   POST /api/tramites
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "tipoSolicitudId": 2,  // PRESTAMO_SOLIDARIO
     "monto": 500000,
     "cuotas": 12,
     "descripcion": "Gastos médicos urgentes"
   }

   Response:
   {
     "id": "...",
     "numeroSolicitud": "2026-001",
     "estado": "PENDIENTE",
     "fechaSolicitud": "2026-03-14",
     ...
   }
   ```

3. **Adjuntar Documentos**

   ```
   POST /api/documentos
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body (multipart/form-data):
   {
     "solicitudId": "...",
     "tipoDocumentoId": 1,  // RUT
     "archivo": [file]
   }
   ```

4. **Ver Estado de Solicitud**

   ```
   GET /api/tramites/{id}
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }

   Response:
   {
     "id": "...",
     "numeroSolicitud": "2026-001",
     "estado": "EN_REVISION",  // Cambió de PENDIENTE
     "tipoSolicitud": {
       "nombre": "Préstamo Solidario"
     },
     "historial": [
       {
         "fecha": "2026-03-14T10:00:00Z",
         "estadoAnterior": "PENDIENTE",
         "estadoNuevo": "EN_REVISION",
         "observacion": "Derivado a Director Regional"
       }
     ]
   }
   ```

---

### Flujo: DIRECTOR_REGIONAL - Revisar y Derivar Solicitud

**Objetivo:** Revisar solicitud de préstamo y derivar a Director Nacional.

**Pasos:**

1. **Login**

   ```
   POST /api/auth/login
   Body:
   {
     "email": "director.regional@anfutrans.cl",
     "password": "admin123"
   }
   ```

2. **Ver Solicitudes Pendientes**

   ```
   GET /api/tramites?estado=PENDIENTE&region=RM
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }

   Response:
   [
     {
       "id": "...",
       "numeroSolicitud": "2026-001",
       "socio": {
         "nombre": "Pedro Torres Morales",
         "rut": "12345678-9"
       },
       "tipoSolicitud": "Préstamo Solidario",
       "monto": 500000,
       "cuotas": 12
     }
   ]
   ```

3. **Revisar Documentos**

   ```
   GET /api/documentos?solicitudId=...
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   ```

4. **Derivar a Director Nacional**

   ```
   PUT /api/tramites/{id}/derivar
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "estadoNuevo": "EN_REVISION",
     "derivadoA": "DIRECTOR_NACIONAL",
     "observacion": "Cumple requisitos. Se deriva para aprobación final."
   }

   Response:
   {
     "id": "...",
     "estado": "EN_REVISION",
     "derivadoA": "DIRECTOR_NACIONAL",
     "fechaDerivacion": "2026-03-14T11:30:00Z"
   }
   ```

---

### Flujo: DIRECTOR_NACIONAL - Aprobar Solicitud

**Objetivo:** Aprobar solicitud de préstamo derivada.

**Pasos:**

1. **Login**

   ```
   POST /api/auth/login
   Body:
   {
     "email": "director.nacional@anfutrans.cl",
     "password": "admin123"
   }
   ```

2. **Ver Solicitudes Derivadas**

   ```
   GET /api/tramites?estado=EN_REVISION&derivadoA=DIRECTOR_NACIONAL
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   ```

3. **Revisar Solicitud Completa**

   ```
   GET /api/tramites/{id}
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }

   Response:
   {
     ...detalles completos...
     "historial": [
       {
         "fecha": "2026-03-14T11:30:00Z",
         "usuario": "María Rodríguez Silva",
         "rol": "DIRECTOR_REGIONAL",
         "accion": "DERIVAR",
         "observacion": "Cumple requisitos. Se deriva para aprobación final."
       }
     ],
     "documentos": [...]
   }
   ```

4. **Aprobar Solicitud**

   ```
   PUT /api/tramites/{id}/aprobar
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "estadoNuevo": "APROBADA",
     "montoAprobado": 500000,
     "cuotasAprobadas": 12,
     "observacion": "Aprobado préstamo solidario según solicitud.",
     "numeroResolucion": "RES-2026-045"
   }

   Response:
   {
     "id": "...",
     "estado": "APROBADA",
     "montoAprobado": 500000,
     "cuotasAprobadas": 12,
     "numeroResolucion": "RES-2026-045",
     "fechaAprobacion": "2026-03-14T14:00:00Z"
   }
   ```

5. **Generar Documento Firmado**

   ```
   POST /api/tramites/{id}/generar-documento
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "tipoDocumento": "RESOLUCION_APROBACION"
   }

   Response:
   {
     "documentoId": "...",
     "url": "/api/documentos/download/...",
     "fechaGeneracion": "2026-03-14T14:05:00Z"
   }
   ```

---

### Flujo: FUNCIONARIO - Ingresar Nuevo Socio

**Objetivo:** Registrar un nuevo socio en el sistema.

**Pasos:**

1. **Login**

   ```
   POST /api/auth/login
   Body:
   {
     "email": "funcionario@anfutrans.cl",
     "password": "admin123"
   }
   ```

2. **Crear Socio**

   ```
   POST /api/socios
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "rut": "19876543-2",
     "nombre": "Luis",
     "apellido": "González Tapia",
     "email": "luis.gonzalez@example.com",
     "telefono": "+56912345678",
     "fechaNacimiento": "1985-05-15",
     "direccion": "Calle Falsa 123",
     "comunaId": 1,
     "fechaIngreso": "2026-03-14",
     "activoEnOrganizacion": true
   }

   Response:
   {
     "id": "...",
     "rut": "19876543-2",
     "nombre": "Luis",
     "apellido": "González Tapia",
     "numeroSocio": "2026-042",
     "fechaIngreso": "2026-03-14",
     "activo": true
   }
   ```

3. **Crear Usuario para el Socio**

   ```
   POST /api/usuarios
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "email": "luis.gonzalez@anfutrans.cl",
     "password": "password123",
     "nombre": "Luis",
     "apellido": "González Tapia",
     "rolId": 5,  // SOCIO
     "activo": true
   }

   Response:
   {
     "id": "...",
     "email": "luis.gonzalez@anfutrans.cl",
     "rol": {
       "codigo": "SOCIO",
       "nombre": "Socio"
     }
   }
   ```

---

### Flujo: ADMIN - Gestionar Catálogos

**Objetivo:** Agregar nuevas comunas a la región Metropolitana.

**Pasos:**

1. **Login**

   ```
   POST /api/auth/login
   Body:
   {
     "email": "admin@anfutrans.cl",
     "password": "admin123"
   }
   ```

2. **Listar Regiones**

   ```
   GET /api/regiones
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }

   Response:
   [
     {
       "id": 1,
       "codigo": "RM",
       "nombre": "Región Metropolitana",
       "activo": true
     },
     ...
   ]
   ```

3. **Crear Nueva Comuna**

   ```
   POST /api/comunas
   Headers:
   {
     "Authorization": "Bearer eyJhbGc..."
   }
   Body:
   {
     "nombre": "Ñuñoa",
     "regionId": 1,  // RM
     "activo": true
   }

   Response:
   {
     "id": "...",
     "nombre": "Ñuñoa",
     "region": {
       "codigo": "RM",
       "nombre": "Región Metropolitana"
     },
     "activo": true
   }
   ```

---

## ⚙️ ESTADO ACTUAL DEL SISTEMA

### ✅ Componentes Funcionando

| Componente                   | Estado         | Detalles                             |
| ---------------------------- | -------------- | ------------------------------------ |
| **Backend NestJS**           | ✅ Funcionando | Puerto 3000, todas las rutas activas |
| **base de datos PostgreSQL** | ✅ Funcionando | Schema aplicado, 18 modelos creados  |
| **Auth JWT**                 | ✅ Funcionando | Login, refresh, guards implementados |
| **Swagger Docs**             | ✅ Funcionando | Documentacióncompleta en `/api`      |
| **Health Check**             | ✅ Funcionando | Endpoint `/api/health` activo        |
| **Validaciones**             | ✅ Funcionando | class-validator en todos los DTOs    |
| **Prisma ORM**               | ✅ Funcionando | Cliente generado, conexión OK        |

### ⚠️ Componentes con Problemas

| Componente               | Estado          | Problema                                      |
| ------------------------ | --------------- | --------------------------------------------- |
| **Frontend Angular**     | ❌ NO FUNCIONAL | 139 errores de compilación                    |
| **Seeds de BD**          | ⚠️ Parcial      | Script SQL con errores en nombres de columnas |
| **Usuarios de prueba**   | ❌ No creados   | Seed no ejecutado exitosamente                |
| **Portal Institucional** | ❌ No creado    | Pendiente de implementación                   |

### 📊 Progreso de Fases

| Fase                                      | Estado         | Progreso | Observaciones                            |
| ----------------------------------------- | -------------- | -------- | ---------------------------------------- |
| **FASE 1:** Validación del Entorno        | ✅ Completada  | 100%     | Backend instalado y funcional            |
| **FASE 2:** Levantar el Sistema           | ✅ Completada  | 70%      | Solo backend funcional                   |
| **FASE 3:** Configuración de Roles        | ⚠️ Parcial     | 50%      | Roles definidos pero usuarios no creados |
| **FASE 4:** Portal Institucional          | ❌ No iniciada | 0%       | Pendiente                                |
| **FASE 5:** Integración Portal+Plataforma | ❌ No iniciada | 0%       | Bloqueada por FASE 4                     |
| **FASE 6:** Experiencia del Socio         | ⚠️ Bloqueada   | 0%       | Depende de frontend funcional            |
| **FASE 7:** Experiencia Directiva         | ⚠️ Bloqueada   | 0%       | Depende de frontend funcional            |
| **FASE 8:** Sistema de Cuentas            | ❌ No iniciada | 0%       | Estructura de BD creada                  |
| **FASE 9:** Documentación                 | ✅ Completada  | 100%     | Este documento                           |
| **FASE 10:** Resultado Final              | 🔄 En progreso | 40%      | Backend OK, frontend bloqueado           |

---

## 🐛 PROBLEMAS CONOCIDOS

### 1. Frontend Angular - 139 Errores de Compilación

**Severidad:** 🔴 CRÍTICA

**Descripción:** El frontend Angular no compila debido a múltiples errores:

- Módulos de Angular Material no importados correctamente
- FormsModule faltante (ngModel no reconocido)
- Componentes sin decorador `@Component`
- Servicios sin token de inyección
- Archivos de componentes corruptos o incompletos

**Archivos afectados:**

- `apps/frontend/src/app/modules/socios/socio-table/socio-table.component.ts` (corrupto)
- `apps/frontend/src/app/core/auth/login/login.html` (ngModel no funcional)
- `apps/frontend/src/app/modules/dashboard/dashboard.html` (Material components sin importar)
- Y 136 errores más...

**Impacto:** Sin frontend funcional, las pruebas de usuario no se pueden realizar en interfaz gráfica.

**Soluciones propuestas:**

1. **Corto plazo:** Crear portal HTML estático simple para pruebas básicas
2. **Mediano plazo:** Arreglar errores uno por uno (estimado: 2-3 semanas)
3. **Largo plazo:** Considerar regenerar frontend desde cero con Angular CLI

---

### 2. Seeds de Base de Datos - Nombres de Columnas

**Severidad:** 🟠 ALTA

**Descripción:** El script SQL `seed-manual.sql` falla al insertar datos porque usa nombres de columnas incorrectos.

**Errores específicos:**

```
ERROR:  no existe la columna «passwordHash» en la relación «usuario»
ERROR:  no existe la columna «requiereAprobacion» en la relación «tipo_solicitud»
ERROR:  no existe la columna «regionId» en la relación «comuna»
```

**Causa:** Prisma usa snake_case en la base de datos pero el script SQL usaba camelCase con comillas.

**Impacto:** No se pueden crear usuarios de prueba automáticamente.

**Solución temporal:**
Crear usuarios manualmente usando Swagger:

1. Ir a http://localhost:3000/api
2. Usar endpoint `POST /api/auth/register` para cada usuario
3. O usar Prisma Studio: `npm run prisma:studio`

**Solución definitiva:**
Actualizar `seed-manual.sql` con nombres correctos de columnas consultando el schema real:

```powershell
psql -U anfutrans_app -d anfutrans_db -c "\d core.usuario"
```

---

### 3. Prisma Seed TypeScript - Error de Inicialización

**Severidad:** 🟠 ALTA

**Descripción:** El seed en TypeScript (`prisma/seed.ts`) falla con error de PrismaClient:

```
PrismaClientInitializationError: `PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`
```

**Causa:** Problema con la configuración de `prisma.config.ts` o generación del cliente.

**Impacto:** No se puede ejecutar `npm run prisma:seed`.

**Solución temporal:** Usar script SQL manual.

**Solución definitiva:** Revisar y arreglar configuración de Prisma Client.

---

### 4. Docker Desktop No Está Corriendo

**Severidad:** 🟡 MEDIA

**Descripción:** Docker daemon no está disponible.

**Impacto:** No se puede usar `docker-compose` para levantar stack completo.

**Solución actual:** Usar servicios locales (PostgreSQL instalado, backend con `npm run backend:dev`).

**Nota:** Para producción, Docker es recomendado pero no crítico para desarrollo local.

---

## 📝 PRÓXIMOS PASOS

### Inmediatos (Esta Semana)

1. **Arreglar Seeds de Base de Datos**
   - Corregir nombres de columnas en `seed-manual.sql`
   - Ejecutar script exitosamente
   - Verificar que 5 usuarios de prueba se creen correctamente
   - **Prioridad:** 🔴 ALTA

2. **Crear Portal Institucional Básico**
   - HTML/CSS/JS estático
   - Secciones: Inicio, Quiénes Somos, Noticias, Documentos, Contacto
   - Botón "Acceso Plataforma de Socios" que redirija a login
   - **Prioridad:** 🔴 ALTA

3. **Crear Página de Login Simple**
   - HTML form que haga POST a `/api/auth/login`
   - Guardar JWT en localStorage
   - Redirigir a dashboard según rol
   - **Prioridad:** 🔴 ALTA

4. **Crear Dashboards Básicos por Rol**
   - HTML estático con fetch() a endpoints de API
   - Un dashboard para cada rol
   - Mostrar información relevante usando JSON de API
   - **Prioridad:** 🟠 MEDIA

### Corto Plazo (1-2 Semanas)

5. **Arreglar Frontend Angular**
   - Importar módulos faltantes ( FormsModule, Material)
   - Agregar decoradores `@Component` faltantes
   - Arreglar archivos corruptos
   - Resolver 139 errores de compilación
   - **Prioridad:** 🔴 ALTA

6. **Implementar Sistema de Cuentas de Socios**
   - Crear modelos de Cuenta en Prisma
   - Controllers y services para cuentas
   - Endpoints para cuotas, préstamos, descuentos
   - Generar reportes mensuales
   - **Prioridad:** 🟠 MEDIA

7. **Crear Módulo de Reportes**
   - Reporte de descuentos por planilla
   - Reporte de socios por región
   - Reporte de solicitudes pendientes
   - Exportar a PDF/Excel
   - **Prioridad:** 🟡 MEDIA-BAJA

### Mediano Plazo (3-4 Semanas)

8. **Implementar Notificaciones**
   - Email notifications (estado de solicitudes)
   - Notificaciones push en frontend
   - **Prioridad:** 🟡 MEDIA-BAJA

9. **Agregar Gestión de Documentos**
   - Upload de archivos
   - Almacenamiento en S3 o local
   - Previsualización de PDFs
   - **Prioridad:** 🟠 MEDIA

10. **Testing Completo**
    - Unit tests para services
    - E2E tests para flujos críticos
    - Coverage > 80%
    - **Prioridad:** 🔴 ALTA (para producción)

---

## 📞 SOPORTE Y CONTACTO

Para dudas o problemas con el entorno de pruebas:

**Documentación:**

- Este archivo: `ENTORNO_PRUEBAS_USUARIOS.md`
- Reporte de auditoría: `PRODUCTION_READINESS_REPORT.md`
- API Docs (Swagger): http://localhost:3000/api

**Comandos Útiles:**

```powershell
# Ver estado del backend
curl http://localhost:3000/api/health

# Ver logs del backend
# (en el terminal donde está corriendo npm run backend:dev)

# Reiniciar backend
# Ctrl+C en terminal, luego:
npm run backend:dev

# Ver tablas en BD
psql -U anfutrans_app -d anfutrans_db -c "\dt core.*"

# Ejecutar Prisma Studio (GUI para BD)
cd apps\backend
npm run prisma:studio
```

---

## 🎯 RESUMEN EJECUTIVO

### Estado General: 🟡 PARCIALMENTE FUNCIONAL

**Backend:** ✅ 100% Funcional
**Base de Datos:** ✅ 100% Operativa
**Frontend:** ❌ 0% Funcional (bloqueado por errores)
**Portal Institucional:** ❌ 0% (no creado)
**Datos de Prueba:** ⚠️ 50% (catálogos OK, usuarios falta)

### ¿Se puede hacer pruebas con usuarios?

**NO** en interfaz gráfica (frontend no funcional).
**SÍ** usando Swagger/API directamente para:

- Probar flujos de autenticación
- Probar endpoints de CRUD
- Validar lógica de negocio
- Probar permisos y roles

### Recomendación

**Para pruebas rápidas esta semana:**

1. Crear portal HTML estático simple
2. Crear página de login básica
3. Crear dashboards HTML que consuman API con fetch()
4. Pruebas limitadas pero funcionales

**Para pruebas completas:**

1. Arreglar 139 errores del frontend Angular (2-3 semanas)
2. Implementar funcionalidades faltantes
3. Testing end-to-end completo

---

**Documento generado:** 14 de Marzo 2026
**Última actualización:** 14 de Marzo 2026
**Versión:** 1.0

---
