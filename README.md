# ANFUTRANS Platform

Plataforma digital para la gestión integral de la ANFUTRANS.

## Estructura del Proyecto

```
anfutrans-platform/
├── apps/
│   ├── backend/          # Backend API (Node.js/Express)
│   └── frontend/         # Frontend Angular
├── database/             # Scripts y configuración de base de datos
├── docker/               # Configuración Docker
├── docs/                 # Documentación del proyecto
└── .git/                 # Repositorio git
```

## Tecnologías

- **Frontend**: Angular 21+, TypeScript, RxJS
- **Backend**: Node.js, Express, PostgreSQL
- **Herramientas**: ESLint, Prettier, Docker

## Instalación

### Requisitos previos

- Node.js v24.14.0 o superior
- npm 11.11.0+
- PostgreSQL 18+
- Docker (opcional)

### Instalación del Proyecto

```bash
# Clonar repositorio
git clone <tu-repositorio>

# Instalar dependencias del frontend
cd apps/frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install
```

## Configuración

Ver documentación en la carpeta `/docs` para más información sobre la configuración.

## Desarrollo

### Frontend (Angular)

```bash
cd apps/frontend
ng serve
```

El frontend estará disponible en `http://localhost:4200`

### Backend (API)

```bash
cd apps/backend
npm run dev
```

## Control de Versiones

Este proyecto utiliza Git. Ver `.gitignore` para archivos excluidos.

## Licencia

Todos los derechos reservados - ANFUTRANS 2026
