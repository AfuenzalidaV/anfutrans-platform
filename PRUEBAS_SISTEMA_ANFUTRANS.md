# 🚀 Guía de Pruebas del Sistema ANFUTRANS

**Versión:** 1.0.0  
**Fecha:** 14 de Marzo 2026  
**Entorno:** Desarrollo

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Inicial](#configuración-inicial)
3. [Iniciar el Sistema](#iniciar-el-sistema)
4. [Credenciales de Acceso](#credenciales-de-acceso)
5. [Endpoints API Disponibles](#endpoints-api-disponibles)
6. [Datos de Prueba Disponibles](#datos-de-prueba-disponibles)
7. [Escenarios de Prueba](#escenarios-de-prueba)
8. [Swagger UI](#swagger-ui)
9. [Solución de Problemas](#solución-de-problemas)

---

## ✅ Requisitos Previos

Antes de iniciar el sistema, asegúrese de tener instalado:

- **Node.js:** v18+ (recomendado v20.x)
- **PostgreSQL:** v14 o superior (v15 usado en producción)
- **Docker Desktop:** v4.30+ (opcional, para base de datos containerizada)
- **npm:** v9+ o **pnpm:** v8+

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno

#### Backend (`apps/backend/.env`)

```env
# Base de Datos
DATABASE_URL="postgresql://anfutrans_app:Anfutrans2024!@localhost:5432/anfutrans_db?schema=core"

# Configuración de JSON Web Tokens
JWT_SECRET="tu_clave_secreta_super_segura_cambiar_en_produccion"
JWT_EXPIRATION="7d"

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:4200"
```

#### Frontend (`apps/frontend/src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  apiVersion: "v1",
};
```

### 2. Instalación de Dependencias

```bash
# Desde la raíz del proyecto
cd C:\Users\afuenzalida\Downloads\WEB\ANFUTRANS\anfutrans-platform

# Instalar dependencias del backend
cd apps/backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install

# Volver a la raíz
cd ../..
```

### 3. Configuración de Base de Datos

#### Opción A: Docker (Recomendado)

```bash
# Desde la raíz del proyecto
docker-compose up -d
```

El archivo `docker-compose.yml` ya está configurado con:

- PostgreSQL 15
- Usuario: `anfutrans_app`
- Contraseña: `Anfutrans2024!`
- Base de datos: `anfutrans_db`
- Puerto: `5432`

#### Opción B: PostgreSQL Local

1. Crear base de datos manualmente:

```sql
CREATE DATABASE anfutrans_db;
CREATE USER anfutrans_app WITH ENCRYPTED PASSWORD 'Anfutrans2024!';
GRANT ALL PRIVILEGES ON DATABASE anfutrans_db TO anfutrans_app;
```

2. Crear schema:

```sql
\c anfutrans_db
CREATE SCHEMA core;
GRANT ALL ON SCHEMA core TO anfutrans_app;
```

### 4. Ejecutar Migraciones y Seed

```bash
cd apps/backend

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate:deploy

# Poblar base de datos con datos de ejemplo
npm run prisma:seed
```

**Salida esperada:**

```
🌱 Iniciando seed de base de datos...
📝 Creando roles...
✅ Roles creados: ADMIN, DIRECTOR_NACIONAL, DIRECTOR_REGIONAL, FUNCIONARIO, SOCIO
👤 Creando usuarios de prueba...
✅ Usuario creados: 5
...
✅ Socios creados: 10
✅ Beneficios creados: 3
✅ Solicitudes creadas: 5
✅ Documentos creados: 5
✅ Seed completado exitosamente!
```

---

## 🚀 Iniciar el Sistema

### Terminal 1: Backend (NestJS)

```bash
cd apps/backend
npm run start:dev
```

**Salida esperada:**

```
[Nest] 12345  - 14/03/2026 19:30:15 LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 14/03/2026 19:30:15 LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 14/03/2026 19:30:16 LOG [RoutesResolver] AppController {/}:
[Nest] 12345  - 14/03/2026 19:30:16 LOG [RouterExplorer] Mapped {/, GET} route
[Nest] 12345  - 14/03/2026 19:30:16 LOG [NestApplication] Nest application successfully started
[Nest] 12345  - 14/03/2026 19:30:16 LOG [Main] 🚀 Servidor corriendo en http://localhost:3000
[Nest] 12345  - 14/03/2026 19:30:16 LOG [Main] 📚 Documentación Swagger disponible en http://localhost:3000/api
```

- **Backend API:** http://localhost:3000
- **Swagger UI:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

### Terminal 2: Frontend (Angular)

```bash
cd apps/frontend
npm run start
```

**Salida esperada:**

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
✔ Compiled successfully.
```

- **Frontend:** http://localhost:4200

---

## 🔐 Credenciales de Acceso

Todos los usuarios comparten la **misma contraseña**: `admin123`

| Rol                   | Email                            | Descripción                                 |
| --------------------- | -------------------------------- | ------------------------------------------- |
| **Administrador**     | `admin@anfutrans.cl`             | Acceso total al sistema                     |
| **Director Nacional** | `director.nacional@anfutrans.cl` | Aprobaciones finales y gestión estratégica  |
| **Director Regional** | `director.regional@anfutrans.cl` | Revisión y derivación de solicitudes        |
| **Funcionario**       | `funcionario@anfutrans.cl`       | Gestión operativa diaria                    |
| **Socio**             | `socio@anfutrans.cl`             | Acceso a solicitudes y consultas personales |

### Ejemplo de Login con cURL:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@anfutrans.cl","password":"admin123"}'
```

**Respuesta esperada:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-del-usuario",
    "email": "admin@anfutrans.cl",
    "nombre": "Admin",
    "apellido": "Sistema",
    "rol": "ADMIN"
  }
}
```

---

## 🌐 Endpoints API Disponibles

### 🔒 Autenticación

| Método | Endpoint         | Descripción                            |
| ------ | ---------------- | -------------------------------------- |
| POST   | `/auth/login`    | Iniciar sesión (retorna JWT)           |
| POST   | `/auth/register` | Registrar nuevo usuario                |
| GET    | `/auth/profile`  | Obtener perfil del usuario autenticado |

### 👥 Socios

| Método | Endpoint      | Descripción             |
| ------ | ------------- | ----------------------- |
| GET    | `/socios`     | Listar todos los socios |
| GET    | `/socios/:id` | Obtener socio por ID    |
| POST   | `/socios`     | Crear nuevo socio       |
| PUT    | `/socios/:id` | Actualizar socio        |
| DELETE | `/socios/:id` | Eliminar socio          |

### 📋 Solicitudes (Trámites)

| Método | Endpoint        | Descripción                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/tramites`     | Listar todas las solicitudes |
| GET    | `/tramites/:id` | Obtener solicitud por ID     |
| POST   | `/tramites`     | Crear nueva solicitud        |

### 🎁 Beneficios

| Método | Endpoint          | Descripción                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/beneficios`     | Listar todos los beneficios |
| GET    | `/beneficios/:id` | Obtener beneficio por ID    |
| POST   | `/beneficios`     | Crear nuevo beneficio       |

### 👤 Usuarios

| Método | Endpoint        | Descripción               |
| ------ | --------------- | ------------------------- |
| GET    | `/usuarios`     | Listar todos los usuarios |
| GET    | `/usuarios/:id` | Obtener usuario por ID    |
| POST   | `/usuarios`     | Crear nuevo usuario       |

### 📚 Catálogos

| Endpoint                              | Descripción              |
| ------------------------------------- | ------------------------ |
| GET `/catalogos/regiones`             | Listar regiones de Chile |
| GET `/catalogos/comunas`              | Listar comunas           |
| GET `/catalogos/estado-solicitud`     | Estados de solicitud     |
| GET `/catalogos/tipo-solicitud`       | Tipos de solicitud       |
| GET `/catalogos/tipo-beneficio`       | Tipos de beneficio       |
| GET `/catalogos/tipo-documento`       | Tipos de documento       |
| GET `/catalogos/cargos-dirigenciales` | Cargos dirigenciales     |

---

## 📊 Datos de Prueba Disponibles

### Socios (10 registros)

| RUT        | Nombre Completo           | Email                         | Comuna   |
| ---------- | ------------------------- | ----------------------------- | -------- |
| 12345678-9 | Juan Pérez González       | juan.perez@example.com        | Santiago |
| 98765432-1 | María González Silva      | maria.gonzalez@example.com    | Santiago |
| 11223344-5 | Pedro López Torres        | pedro.lopez@example.com       | Maipú    |
| 55667788-9 | Ana Martínez Rojas        | ana.martinez@example.com      | Maipú    |
| 22334455-6 | Carlos Fernández Díaz     | carlos.fernandez@example.com  | Santiago |
| 33445566-7 | Laura Sánchez Muñoz       | laura.sanchez@example.com     | Maipú    |
| 44556677-8 | Diego Ramírez Cortés      | diego.ramirez@example.com     | Santiago |
| 66778899-0 | Sofía Vargas Bravo        | sofia.vargas@example.com      | Maipú    |
| 77889900-1 | Andrés Morales Castro     | andres.morales@example.com    | Santiago |
| 88990011-2 | Valentina Herrera Navarro | valentina.herrera@example.com | Maipú    |

### Beneficios (3 registros)

1. **Préstamo Solidario** - Préstamo de hasta $500.000 con tasa preferencial
2. **Ayuda Social Urgente** - Ayuda económica para casos de emergencia familiar
3. **Convenio Dental** - Descuentos en atención dental con convenios vigentes

### Solicitudes (5 registros)

- 2 Certificados de afiliación (1 aprobada, 1 pendiente)
- 2 Préstamos (2 pendientes)
- 1 Beneficio de salud (aprobada)

### Documentos (5 registros)

1. Ley 16.744 - Accidentes del Trabajo
2. Decreto Supremo 594
3. Reglamento Interno ANFUTRANS
4. Formulario Solicitud de Préstamo
5. Instructivo Beneficios de Salud

---

## 🧪 Escenarios de Prueba

### Escenario 1: Login y Navegación Básica

1. Abrir http://localhost:4200
2. Ingresar credenciales: `admin@anfutrans.cl` / `admin123`
3. Verificar redirección al Dashboard
4. Navegar a "Socios" desde el menú lateral
5. Verificar que se muestra la lista de 10 socios

### Escenario 2: Crear Nuevo Socio

1. Ir a "Socios" → "Nuevo Socio"
2. Completar formulario:
   - RUT: 99887766-5
   - Nombre: Nuevo
   - Apellido: Socio Prueba
   - Email: nuevo.socio@test.com
   - Teléfono: +56999887766
   - Comuna: Seleccionar de lista
3. Guardar
4. Verificar mensaje de éxito
5. Verificar que el socio aparece en la lista

### Escenario 3: Consultar Beneficios Disponibles

1. Navegar a "Beneficios"
2. Verificar que se muestran los 3 beneficios:
   - Préstamo Solidario
   - Ayuda Social Urgente
   - Convenio Dental
3. Hacer clic detalle de "Préstamo Solidario"
4. Verificar descripción completa

### Escenario 4: Ver Solicitudes Pendientes

1. Navegar a "Solicitudes"
2. Filtrar por estado "Pendiente"
3. Verificar que aparecen 3 solicitudes pendientes
4. Abrir detalle de una solicitud de préstamo
5. Verificar información del socio asociado

### Escenario 5: Swagger UI - Pruebas de API

1. Abrir http://localhost:3000/api
2. Expandir endpoint POST `/auth/login`
3. Hacer clic en "Try it out"
4. Ingresar JSON:
   ```json
   {
     "email": "admin@anfutrans.cl",
     "password": "admin123"
   }
   ```
5. Ejecutar
6. Copiar `access_token` devuelto
7. Hacer clic en "Authorize" (candado arriba a la derecha)
8. Pegar token precedido de "Bearer "
9. Probar endpoint GET `/socios`

---

## 📚 Swagger UI

La documentación interactiva de la API está disponible en:

**URL:** http://localhost:3000/api

### Características:

- ✅ Todos los endpoints documentados
- ✅ Ejemplos de request/response
- ✅ Autenticación JWT integrada
- ✅ Pruebas en vivo (Try it out)
- ✅ Modelos de datos con validaciones

### Cómo usar Swagger:

1. Abrir http://localhost:3000/api
2. Login para obtener `access_token`:
   - POST `/auth/login`
   - Body: `{"email":"admin@anfutrans.cl","password":"admin123"}`
3. Copiar el token devuelto
4. Clic en "Authorize" (botón candado arriba)
5. Ingresar: `Bearer <tu_access_token>`
6. Ahora todos los endpoints protegidos son accesibles

---

## 🛠️ Solución de Problemas

### Backend no inicia

#### Error: "Cannot connect to database"

```bash
# Verificar que PostgreSQL está corriendo
docker ps | grep postgres

# Si no está, iniciar:
docker-compose up -d

# Verificar conexión manual:
psql -h localhost -U anfutrans_app -d anfutrans_db
```

#### Error: "Prisma Client not generated"

```bash
cd apps/backend
npm run prisma:generate
```

#### Error: "Cannot find module '@nestjs/...'

```bash
cd apps/backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend no compila

#### Error: "mat-card is not a known element"

```bash
cd apps/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Error: Angular CLI version mismatch

```bash
# Verificar versión
ng version

# Reinstalar CLI si es necesario
npm uninstall -g @angular/cli
npm install -g @angular/cli@latest
```

### Seed falla

#### Error: "PrismaClient needs adapter"

Verificar que el archivo `prisma/seed.ts` tiene:

```typescript
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
```

#### Error: "Unique constraint violation"

```bash
# Resetear base de datos completamente
cd apps/backend
npm run prisma:migrate:reset

# Volver a ejecutar seed
npm run prisma:seed
```

### Login no funciona

#### Error 401: Unauthorized

- Verificar que las credenciales son correctas
- Password siempre es `admin123` (sin espacios)
- Email debe ser exacto (case-sensitive)

#### Error: CORS

Verificar que en `apps/backend/src/main.ts` exista:

```typescript
app.enableCors({
  origin: "http://localhost:4200",
  credentials: true,
});
```

### Verificar salud del sistema

```bash
# Health check backend
curl http://localhost:3000/health

# Respuesta esperada:
# {"status":"ok","database":"connected","timestamp":"2026-03-14T19:30:15.123Z"}

# Verificar Prisma
cd apps/backend
npx prisma studio
# Abre interfaz web en http://localhost:5555
```

---

## 📞 Contacto y Soporte

Si encuentra problemas no documentados aquí:

1. Verificar terminal del backend para logs detallados
2. Revisar consola del navegador (F12) para errores del frontend
3. Consultar archivos de documentación en `/docs`

**Archivos de referencia:**

- `/docs/system-architecture.md` - Arquitectura del sistema
- `/docs/api-endpoints.md` - Lista completa de endpoints
- `/docs/database-erd.dbml` - Diagrama de base de datos
- `/docs/dev-setup-checklist.md` - Checklist de configuración

---

## ✅ Checklist de Validación

Antes de reportar que el sistema está listo para pruebas, verificar:

- [ ] PostgreSQL corriendo en Docker o instalación local
- [ ] Backend compila sin errores (`npm run build`)
- [ ] Frontend compila sin errores (`npm run build`)
- [ ] Migraciones aplicadas correctamente
- [ ] Seed ejecutado exitosamente (5 usuarios, 10 socios, 3 beneficios, 5 solicitudes, 5 documentos)
- [ ] Backend inicia en http://localhost:3000
- [ ] Frontend inicia en http://localhost:4200
- [ ] Swagger accesible en http://localhost:3000/api
- [ ] Login funciona con `admin@anfutrans.cl` / `admin123`
- [ ] Dashboard muestra estadísticas (Socios: 10, Solicitudes: 5, etc.)
- [ ] Listado de socios muestra 10 registros
- [ ] Listado de beneficios muestra 3 registros
- [ ] API responde correctamente en Swagger UI

---

**Última actualización:** 14 de Marzo 2026
**Autor:** Equipo de Desarrollo ANFUTRANS
**Versión del Sistema:** v1.0.0
