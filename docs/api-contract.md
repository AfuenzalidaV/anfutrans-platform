# ANFUTRANS Platform

## API Contract v1 (Base)

Este documento define el contrato API inicial para que el frontend (Angular) consuma el backend con reglas claras.

## Base URL

- Desarrollo: http://localhost:3000
- Swagger: http://localhost:3000/api

## Autenticación

### POST /auth/login

Request:

```json
{
  "email": "usuario@anfutrans.cl",
  "password": "********"
}
```

Response 200:

```json
{
  "access_token": "jwt-token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### POST /auth/register

Request:

```json
{
  "email": "nuevo@anfutrans.cl",
  "password": "123456",
  "nombre": "Nuevo",
  "apellido": "Usuario"
}
```

## Catálogos

### GET /catalogos/regiones

Response 200:

```json
[
  {
    "id": 1,
    "nombre": "Metropolitana"
  }
]
```

### GET /catalogos/comunas

Response 200:

```json
[
  {
    "id": 1,
    "nombre": "Santiago",
    "regionId": 1
  }
]
```

## Usuarios

### GET /usuarios

### GET /usuarios/:id

### POST /usuarios

Request POST (ejemplo):

```json
{
  "email": "nuevo@anfutrans.cl",
  "nombre": "Juan",
  "apellido": "Perez",
  "rolId": 1
}
```

## Socios

### GET /socios

### GET /socios/:id

### POST /socios

Request POST (ejemplo):

```json
{
  "rut": "12345678-9",
  "nombre": "Ana",
  "apellido": "Soto",
  "comunaId": 10
}
```

## Solicitudes

### GET /solicitudes

### GET /solicitudes/:id

### POST /solicitudes

Nota: por compatibilidad, tambien existen rutas alias en /tramites.

## Beneficios

### GET /beneficios

### GET /beneficios/:id

### POST /beneficios

## Convenciones comunes

- Formato JSON para request/response.
- Fechas en formato ISO 8601.
- Error estándar:

```json
{
  "statusCode": 400,
  "message": "Detalle del error",
  "error": "Bad Request"
}
```

## Seguridad

Para rutas protegidas se debe enviar:

```http
Authorization: Bearer <token>
```

## Versionado

- Versión actual: v1 (base)
- Fuente de verdad de endpoints: Swagger
