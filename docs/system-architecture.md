# ANFUTRANS Platform

## System Architecture

Este documento describe la arquitectura técnica del sistema **ANFUTRANS Platform**.

El objetivo es definir una base sólida para el desarrollo del backend, frontend y base de datos.

---

# Arquitectura general del sistema

La plataforma sigue una arquitectura **SPA + API REST + Base de Datos**.

```
Frontend (Angular)
│
│ HTTP REST API
▼
Backend (NestJS)
│
│ Prisma ORM
▼
PostgreSQL Database
```

---

# Componentes del sistema

## Frontend

Aplicación web desarrollada con:

- Angular
- TypeScript
- RxJS
- Angular CLI

Responsabilidades:

- interfaz de usuario
- formularios
- consumo de API
- autenticación con JWT
- manejo de estado del usuario

Servidor local de desarrollo:
http://localhost:4200

---

## Backend API

API REST desarrollada con:

- NestJS
- TypeScript
- Swagger
- Prisma ORM

Responsabilidades:

- lógica de negocio
- autenticación
- control de acceso
- validación de datos
- conexión a base de datos

Servidor local:
http://localhost:3000

Documentación Swagger:
http://localhost:3000/api

---

# Base de datos

Base de datos relacional usando:

PostgreSQL

ORM utilizado:

Prisma

Esquema principal:
core

Tablas base iniciales:

- region
- comuna
- tipo_documento
- tipo_beneficio
- tipo_certificado
- estado_solicitud
- parametro_sistema
- cargo_dirigencial

---

# Arquitectura del backend

Estructura modular basada en dominios.

```
src
│
├── auth
├── usuarios
├── socios
├── tramites
├── beneficios
├── contenidos
│
├── catalogos
│ ├── regiones
│ ├── comunas
│ ├── tipo-documento
│ ├── tipo-beneficio
│ ├── tipo-certificado
│ ├── estado-solicitud
│ ├── parametros
│ └── cargos-dirigenciales
│
├── database
│
└── common
```

Cada módulo contiene:

- controller
- service
- dto

---

# Convenciones API

La API sigue convenciones REST.

Ejemplo:

```
GET /catalogos/regiones
GET /catalogos/regiones/:id
POST /catalogos/regiones
PUT /catalogos/regiones/:id
DELETE /catalogos/regiones/:id
```

---

# Seguridad

El sistema utilizará autenticación basada en **JWT**.

Flujo de autenticación:

```
POST /auth/login
```

Respuesta:

```
access_token
```

Las rutas protegidas utilizarán:

```
Authorization: Bearer TOKEN
```

Roles del sistema:

- ADMIN
- DIRIGENTE
- SOCIO

---

# Arquitectura del repositorio

Estructura del proyecto:

```
anfutrans-platform
│
├── apps
│ ├── backend
│ └── frontend
│
├── database
├── docker
├── docs
│
└── README.md
```

---

# Flujo de desarrollo

Para cada nueva funcionalidad:

1. crear módulo
2. crear DTO
3. crear service
4. crear controller
5. documentar swagger
6. probar endpoint
7. commit

---

# Control de versiones

Estrategia de ramas:

- main
- develop
- feature/\*

Ejemplo:

- feature/auth-jwt
- feature/catalogos-comunas
- feature/socios-crud

---

# Roadmap técnico

## Fase 1

Infraestructura base

- NestJS
- Prisma
- PostgreSQL
- Swagger

## Fase 2

Catálogos

- regiones
- comunas
- tipos
- estados

## Fase 3

Seguridad

- login
- JWT
- guards
- roles

## Fase 4

Módulos del sistema

- usuarios
- socios
- tramites
- beneficios
- contenidos
