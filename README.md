# ANFUTRANS Platform

Plataforma digital para la gestion integral de ANFUTRANS, orientada a la administracion de socios, tramites, beneficios, contenidos y catalogos.

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

## Instalacion

1. Clonar repositorio:

```bash
git clone https://github.com/AfuenzalidaV/anfutrans-platform.git
cd anfutrans-platform
```

2. Instalar backend:

```bash
cd apps/backend
npm install
```

3. Configurar variables de entorno en `apps/backend/.env`:

```env
DATABASE_URL=postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db
```

4. Levantar backend:

```bash
npm run start:dev
```

## Swagger

Con el backend en ejecucion, la documentacion OpenAPI esta disponible en:

- `http://localhost:3000/api`

## Comandos utiles de Prisma

```bash
cd apps/backend
npx prisma generate
npx prisma studio
```

## Documentacion tecnica

- `docs/arquitectura-backend.md`
