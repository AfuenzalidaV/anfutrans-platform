# ANFUTRANS Platform – Backend

Backend del sistema **ANFUTRANS Platform**, construido con **NestJS**, **Prisma ORM** y **PostgreSQL**.

Este servicio expone una **API REST documentada con Swagger** para gestionar los módulos principales del sistema.

---

# Stack tecnológico

El backend utiliza las siguientes tecnologías principales:

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- Swagger / OpenAPI
- TypeScript

---

# Arquitectura del backend

La aplicación sigue una arquitectura modular basada en NestJS.

src
│
├─ auth
├─ usuarios
├─ socios
├─ tramites
├─ beneficios
├─ contenidos
│
├─ catalogos
│ └─ regiones
│ ├─ regiones.controller.ts
│ ├─ regiones.service.ts
│ └─ regiones.module.ts
│
└─ database
├─ database.module.ts
└─ prisma.service.ts

Los **catálogos del sistema** se agrupan bajo el módulo:

catalogos/

Ejemplo de endpoint:
GET /catalogos/regiones

---

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

- Node.js >= 18
- PostgreSQL
- npm

---

# Instalación del proyecto

Desde la carpeta `backend` ejecutar:

npm install

Configuración de entorno
Crear archivo .env en la carpeta backend.

Ejemplo:

DATABASE_URL=postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db

Ejecutar el backend
modo desarrollo

npm run start:dev

Servidor disponible en:
http://localhost:3000

Documentación de la API
La API se documenta automáticamente con Swagger.

Abrir en el navegador:

http://localhost:3000/api
Desde ahí es posible:

probar endpoints

ver parámetros

ejecutar requests

inspeccionar respuestas

Ejemplo de endpoint
GET /catalogos/regiones
Respuesta:

[
  {
    "id": 1,
    "codigo": "01",
    "nombre": "Tarapacá",
    "activo": true
  }
]
Base de datos
La base de datos utiliza PostgreSQL con Prisma ORM.

Tablas iniciales del sistema:

core.region
core.comuna
core.tipo_documento
core.tipo_beneficio
core.tipo_certificado
core.estado_solicitud
core.parametro_sistema
core.cargo_dirigencial
Prisma
Generar cliente Prisma:

npx prisma generate

Abrir interfaz visual de base de datos:

npx prisma studio
Control de versiones
Repositorio del proyecto:

https://github.com/AfuenzalidaV/anfutrans-platform
Checkpoint importante del backend:

v0.1-backend-base
Este tag representa:

Backend NestJS operativo

Conexión Prisma + PostgreSQL funcionando

Swagger habilitado

Primer módulo de catálogo implementado (catalogos/regiones)

Próximos módulos
El backend incluirá los siguientes módulos principales:

auth
usuarios
socios
tramites
beneficios
contenidos
catalogos
Dentro de catalogos se implementarán:

catalogos/regiones
catalogos/comunas
catalogos/tipo-documento
catalogos/tipo-beneficio
catalogos/tipo-certificado
catalogos/estado-solicitud
catalogos/parametros
catalogos/cargo-dirigencial
Licencia
Proyecto privado – ANFUTRANS.

