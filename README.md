# 🚀 ANFUTRANS Platform

Plataforma digital para la gestión integral de ANFUTRANS, orientada a la administración de socios, trámites, beneficios, contenidos y catálogos.

## ⚡ Novedades v0.5 - Generación Automática de CRUD

**Nuevo Sistema de Auto-generación**: Lee el `schema.prisma` del backend y genera automáticamente todo el código frontend (modelos, servicios, componentes, módulos, routing).

```bash
npm run generate:crud
```

✅ **Resultado**: 18 módulos CRUD completos generados en segundos
📖 **Documentación**: Ver [FRONTEND-AUTOGENERATION.md](docs/FRONTEND-AUTOGENERATION.md)

## Estructura del repositorio

```text
anfutrans-platform
|
|-- apps
|   |-- backend
|   `-- frontend
|
|-- database
|-- docker
|-- docs
|
|-- README.md
`-- .gitignore
```

## Backend

El backend esta implementado con NestJS y Prisma bajo `apps/backend`.

Arquitectura modular principal:

```text
apps/backend/src
|
|-- auth
|-- usuarios
|-- socios
|-- tramites
|-- beneficios
|-- contenidos
|-- catalogos
|-- database
`-- common
```

Catalogos previstos:

```text
catalogos
|-- regiones
|-- comunas
|-- tipo-documento
|-- tipo-beneficio
|-- tipo-certificado
|-- estado-solicitud
|-- parametros
`-- cargos-dirigenciales
```

## Frontend

La carpeta `apps/frontend` queda preparada para alojar la SPA del proyecto.

## Base de datos

PostgreSQL como motor principal y Prisma ORM como capa de acceso.

Tablas base esperadas en schema `core`:

- `core.region`
- `core.comuna`
- `core.tipo_documento`
- `core.tipo_beneficio`
- `core.tipo_certificado`
- `core.estado_solicitud`
- `core.parametro_sistema`
- `core.cargo_dirigencial`

## Instalación

### Requisitos previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14

### Setup completo

1. **Clonar repositorio**:

```bash
git clone https://github.com/AfuenzalidaV/anfutrans-platform.git
cd anfutrans-platform
```

2. **Instalar todas las dependencias**:

```bash
npm run install:all
```

3. **Configurar variables de entorno** en `apps/backend/.env`:

```env
DATABASE_URL=postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db
JWT_SECRET=tu_secreto_seguro
```

4. **Migrar base de datos**:

```bash
cd apps/backend
npx prisma migrate dev
npx prisma generate
cd ../..
```

5. **Generar CRUD frontend automáticamente**:

```bash
npm run generate:crud
```

6. **Iniciar desarrollo**:

```bash
# Terminal 1: Backend
npm run backend:dev

# Terminal 2: Frontend
npm run frontend:dev
```

## 📜 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run generate:crud` | 🚀 Genera CRUD frontend desde schema.prisma |
| `npm run backend:dev` | Inicia backend NestJS en modo desarrollo |
| `npm run frontend:dev` | Inicia frontend Angular en modo desarrollo |
| `npm run install:all` | Instala dependencias en todos los proyectos |
| `npm run prisma:generate` | Genera cliente Prisma |
| `npm run prisma:migrate` | Ejecuta migraciones de Prisma |

## 🛠️ Tecnologías

### Backend
- **Framework**: NestJS 11.0.1
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT
- **Documentación**: Swagger/OpenAPI

### Frontend
- **Framework**: Angular 21.2.2
- **UI**: Angular Material Design
- **State Management**: RxJS
- **Forms**: Reactive Forms
- **HTTP Client**: HttpClient

### Tools
- **Code Generator**: TypeScript + Node.js
- **Monorepo**: Nx-compatible structure
- **Version Control**: Git + Semantic Versioning

## Swagger

Con el backend en ejecución, la documentación OpenAPI está disponible en:

- `http://localhost:3000/api`

## 🔄 Workflow de desarrollo con generador

```mermaid
graph LR
    A[Diseñar Modelo] --> B[Editar schema.prisma]
    B --> C[prisma migrate dev]
    C --> D[npm run generate:crud]
    D --> E[Agregar rutas]
    E --> F[Implementar endpoints]
    F --> G[Desarrollo completo]
```

### Ejemplo: Agregar nuevo módulo

```bash
# 1. Editar schema.prisma
code apps/backend/prisma/schema.prisma

# 2. Migrar base de datos
cd apps/backend
npx prisma migrate dev --name add-nuevo-modulo

# 3. Generar frontend automáticamente
cd ../..
npm run generate:crud

# 4. Verificar archivos generados
git status

# 5. Listo para desarrollar
npm run backend:dev
```

## 📊 Modelos de datos

El sistema maneja 18 modelos principales:

**Catálogos**:
- Regiones y Comunas
- Tipos de Documentos
- Tipos de Beneficios
- Tipos de Certificados
- Estados de Solicitud
- Parámetros del Sistema
- Cargos Dirigenciales

**Seguridad**:
- Roles
- Usuarios

**Operaciones**:
- Socios
- Solicitudes y Trámites
- Beneficios
- Documentos
- Contenidos

## Comandos útiles de Prisma

```bash
cd apps/backend

# Generar cliente Prisma
npx prisma generate

# Interfaz visual de la BD
npx prisma studio

# Crear nueva migración
npx prisma migrate dev --name mi-cambio

# Resetear base de datos (⚠️ DESARROLLO ONLY)
npx prisma migrate reset
```

## 📚 Documentación técnica

### Arquitectura y diseño
- [arquitectura-backend.md](docs/arquitectura-backend.md) - Arquitectura del backend
- [system-architecture.md](docs/system-architecture.md) - Arquitectura general del sistema
- [database-erd.dbml](docs/database-erd.dbml) - Diagrama entidad-relación

### Generador CRUD
- [PRISMA-CRUD-GENERATOR.md](docs/PRISMA-CRUD-GENERATOR.md) - **Documentación técnica del generador**
- [FRONTEND-AUTOGENERATION.md](docs/FRONTEND-AUTOGENERATION.md) - **Guía de uso del generador**

### API
- [api-contract.md](docs/api-contract.md) - Contrato de API
- [api-endpoints.md](docs/api-endpoints.md) - Endpoints disponibles

### Desarrollo
- [dev-setup-checklist.md](docs/dev-setup-checklist.md) - Checklist de configuración

## 🏷️ Versiones

- **v0.1** - Setup inicial del proyecto
- **v0.2** - Backend NestJS + Prisma
- **v0.3** - Frontend Angular + Material
- **v0.4** - CRUD manual completo
- **v0.5** - 🚀 **Generador automático de CRUD desde Prisma Schema**

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

MIT License - ANFUTRANS Development Team

---

**Desarrollado con ❤️ por el equipo de ANFUTRANS**
