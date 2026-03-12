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
```

---

## Socios

```
GET    /socios
GET    /socios/:id
POST   /socios
```

---

## Solicitudes (Tramites)

```
GET    /tramites
GET    /tramites/:id
POST   /tramites
```

---

## Beneficios

```
GET    /beneficios
GET    /beneficios/:id
POST   /beneficios
```

---

## Catálogos

```
GET    /catalogos/regiones
GET    /catalogos/comunas

GET    /catalogos/tipo-documento
GET    /catalogos/tipo-beneficio
GET    /catalogos/tipo-certificado
GET    /catalogos/tipo-solicitud
GET    /catalogos/estado-solicitud
GET    /catalogos/parametros
GET    /catalogos/cargos-dirigenciales
```

---

## Documentos

```
POST   /documentos
GET    /documentos/:id
```
