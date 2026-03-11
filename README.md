# ANFUTRANS Platform

Plataforma digital para la **gestión integral de la ANFUTRANS**, orientada a la administración de socios, trámites, beneficios, contenidos y catálogos del sistema.

El proyecto está construido como una arquitectura moderna basada en **API REST + Frontend SPA**.

---

# Arquitectura del sistema

El sistema está dividido en dos aplicaciones principales:

anfutrans-platform/
│
├── apps/
│ ├── backend/ # API Backend (NestJS + Prisma)
│ └── frontend/ # Frontend Angular
│
├── database/ # Scripts de base de datos
├── docker/ # Configuración Docker
├── docs/ # Documentación del proyecto
└── README.md


---

# Stack Tecnológico

## Backend

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- Swagger / OpenAPI
- TypeScript

## Frontend

- Angular 21+
- TypeScript
- RxJS
- Angular CLI

## Infraestructura

- Docker (opcional)
- Git / GitHub
- ESLint
- Prettier

---

# Arquitectura Backend

El backend sigue una **arquitectura modular con NestJS**.

backend/src
│
├── auth
├── usuarios
├── socios
├── tramites
├── beneficios
├── contenidos
│
├── catalogos
│ └── regiones
│
└── database
├── database.module.ts
└── prisma.service.ts

Los **catálogos del sistema** se agrupan bajo:
catalogos/


Ejemplo de endpoint:
GET /catalogos/regiones


---

# Base de Datos

Base de datos **PostgreSQL** gestionada con **Prisma ORM**.

Esquema principal:
core

Tablas base iniciales:
region
comuna
tipo_documento
tipo_beneficio
tipo_certificado
estado_solicitud
parametro_sistema
cargo_dirigencial

---

# Requisitos

Antes de ejecutar el proyecto se requiere:

- Node.js >= 18
- npm >= 9
- PostgreSQL
- Angular CLI
- Docker (opcional)

---

# Instalación del proyecto

Clonar repositorio:

git clone https://github.com/AfuenzalidaV/anfutrans-platform.git
cd anfutrans-platform
Instalación del Backend
cd apps/backend
npm install
Crear archivo .env:

DATABASE_URL=postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db
Ejecutar backend:

npm run start:dev
API disponible en:

http://localhost:3000
Documentación de la API
La API se documenta automáticamente con Swagger.

Abrir en el navegador:

http://localhost:3000/api
Desde Swagger es posible:

explorar endpoints

ejecutar requests

revisar respuestas

validar la API

Instalación del Frontend
cd apps/frontend
npm install
Ejecutar frontend:

ng serve
Aplicación disponible en:

http://localhost:4200
Prisma ORM
Comandos útiles para desarrollo:

Generar cliente
npx prisma generate
Introspección de base de datos
npx prisma db pull
Panel visual de base de datos
npx prisma studio
Control de versiones
Repositorio:

https://github.com/AfuenzalidaV/anfutrans-platform
Checkpoint importante del backend:

v0.1-backend-base
Este punto representa:

Backend NestJS operativo

Conexión Prisma + PostgreSQL funcionando

Swagger habilitado

Primer módulo de catálogo implementado

Próximos módulos del sistema
El backend incluirá:

auth
usuarios
socios
tramites
beneficios
contenidos
catalogos
Dentro de catalogos:

regiones
comunas
tipo-documento
tipo-beneficio
tipo-certificado
estado-solicitud
parametros
cargo-dirigencial
Licencia
Todos los derechos reservados
ANFUTRANS – 2026