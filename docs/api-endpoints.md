# API ENDPOINTS – ANFUTRANS

Base URL: `http://localhost:3000`
Swagger: `http://localhost:3000/api`

---

## Auth

```
POST   /auth/login
POST   /auth/logout
```

---

## Usuarios

```
GET    /usuarios
GET    /usuarios/:id
POST   /usuarios
PUT    /usuarios/:id
DELETE /usuarios/:id
```

---

## Socios

```
GET    /socios
GET    /socios/:id
POST   /socios
PUT    /socios/:id
DELETE /socios/:id
```

---

## Solicitudes (Tramites)

```
GET    /tramites
GET    /tramites/:id
POST   /tramites
PUT    /tramites/:id
```

---

## Beneficios

```
GET    /beneficios
GET    /beneficios/:id
POST   /beneficios
PUT    /beneficios/:id
```

---

## Catálogos

```
GET    /catalogos/regiones
GET    /catalogos/comunas

GET    /catalogos/tipo-documento
GET    /catalogos/tipo-beneficio
GET    /catalogos/tipo-certificado
GET    /catalogos/estado-solicitud
GET    /catalogos/parametros
GET    /catalogos/cargos-dirigenciales
```

---

## Documentos

```
POST   /documentos
GET    /documentos/:id
DELETE /documentos/:id
```
