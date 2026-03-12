# Setup Base de Desarrollo – ANFUTRANS Platform

Este documento define el procedimiento para preparar el entorno de desarrollo del proyecto ANFUTRANS Platform y establecer una base estable del backend antes de continuar con el desarrollo del sistema.

## Stack principal del proyecto

- Backend: NestJS
- ORM: Prisma
- Base de datos: PostgreSQL
- Documentación API: Swagger
- Frontend: Angular (fase siguiente)

---

## 1. Verificar estructura del repositorio

Abrir el proyecto en VS Code y confirmar que la estructura sea la siguiente:

```
anfutrans-platform
│
├── apps
│   ├── backend
│   └── frontend
│
├── database
├── docker
├── docs
│
├── README.md
└── .gitignore
```

Si el backend aún está en `/backend`, moverlo a la estructura correcta:

```bash
git mv backend apps/backend
```

---

## 2. Verificar backend

Abrir terminal en VS Code:

```bash
cd apps/backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar backend:

```bash
npm run start:dev
```

Verificar que el servidor se levante correctamente.

Probar:

```
http://localhost:3000/api
```

Debe mostrarse Swagger.

---

## 3. Verificar Prisma

Generar cliente Prisma:

```bash
npx prisma generate
```

Abrir panel de base de datos:

```bash
npx prisma studio
```

Confirmar que existan las tablas base del esquema `core`:

- region
- comuna
- tipo_documento
- tipo_beneficio
- tipo_certificado
- estado_solicitud
- parametro_sistema
- cargo_dirigencial

---

## 4. Verificar arquitectura backend

Dentro de:

```
apps/backend/src
```

confirmar la siguiente estructura modular:

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

Cada módulo debe contener:

- controller
- service
- dto

---

## 5. Verificar documentación técnica

Confirmar existencia de:

```
docs/
```

y dentro:

- `arquitectura-backend.md`
- `system-architecture.md`

Estos documentos definen:

- arquitectura del backend
- arquitectura completa del sistema
- reglas de desarrollo

---

## 6. Actualizar README del proyecto

El README raíz debe describir:

- estructura del repositorio
- backend
- frontend
- base de datos
- instalación
- ejecución
- swagger

Archivo:

```
README.md
```

---

## 7. Definir flujo de desarrollo

Cada nueva funcionalidad debe seguir este orden:

1. crear módulo
2. crear DTO
3. crear service
4. crear controller
5. documentar en swagger
6. probar endpoint
7. commit

---

## 8. Estrategia Git

Estructura de ramas:

- main
- develop
- feature/\*

Verificar ramas:

```bash
git branch -a
```

Crear rama develop si no existe:

```bash
git checkout -b develop
git push -u origin develop
```

---

## 9. Crear versión base estable

Volver a main:

```bash
git checkout main
```

Crear tag:

```bash
git tag v0.1-backend-base
git push origin v0.1-backend-base
```

Este tag representa:

- backend funcionando
- prisma configurado
- swagger operativo
- arquitectura modular definida
- documentación técnica creada

---

## 10. Crear commit de arquitectura

Guardar documentación y estructura actual:

```bash
git add .
git commit -m "chore: arquitectura base backend anfutrans + docs + estructura repo"
git push
```

---

## 11. Crear siguiente rama de desarrollo

Ejemplo:

```bash
git checkout develop
git checkout -b feature/catalogos-comunas
```

---

## 12. Estado esperado del proyecto

El proyecto debe quedar en el siguiente estado:

### Estructura:

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
├── README.md
```

### Git:

- main
- develop
- feature/\*

### Tag:

- v0.1-backend-base

### Backend:

- compilando
- prisma funcionando
- swagger activo
- módulos organizados

---

## 13. Próximo paso del proyecto

Una vez validada la base del backend, el siguiente paso será:

**Diseñar el modelo completo de datos del sistema (ERD)**

Entidades principales:

- usuario
- rol
- socio
- solicitud
- solicitud_historial
- beneficio
- beneficio_socio
- documento
- solicitud_documento

Este modelo definirá la base estructural del sistema antes de continuar con:

- auth
- usuarios
- socios
- tramites
- beneficios
- frontend

---

## Estado final esperado

El proyecto ANFUTRANS debe quedar:

- ✅ estructurado
- ✅ documentado
- ✅ versionado
- ✅ con backend funcional
- ✅ preparado para frontend

---

## 💡 Consejo profesional

Este documento debe guardarse en:

```
docs/dev-setup-checklist.md
```

y debe ser subido al repositorio con el siguiente commit:

```bash
git add docs/dev-setup-checklist.md
git commit -m "docs: development setup checklist"
git push
```
