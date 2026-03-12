# ANFUTRANS Backend Architecture

## Stack

- NestJS
- Prisma
- PostgreSQL
- Swagger

## Arquitectura modular

```text
src
 auth
 usuarios
 socios
 tramites
 beneficios
 contenidos
 catalogos
 database
 common
```

## Convenciones

- REST API
- DTO para entrada/salida
- autenticacion JWT
- roles: ADMIN, DIRIGENTE, SOCIO
