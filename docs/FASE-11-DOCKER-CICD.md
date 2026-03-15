# FASE 11 - Docker + CI/CD

## 📋 Resumen

Sistema completo de containerización con Docker y pipeline CI/CD automatizado con GitHub Actions, incluyendo builds multi-stage, orquestación con Docker Compose, health checks, y despliegue automatizado a staging y producción.

## 🎯 Objetivos Completados

- ✅ Dockerfiles multi-stage para backend y frontend
- ✅ Docker Compose para desarrollo y producción
- ✅ Configuración de nginx para frontend
- ✅ Health checks en todos los servicios
- ✅ GitHub Actions CI/CD pipeline
- ✅ Deploy automatizado con rollback
- ✅ Security scanning con Trivy
- ✅ Scripts de gestión de contenedores
- ✅ Documentación completa

---

## 🗂️ Estructura de Archivos

```
anfutrans-platform/
├── apps/
│   ├── backend/
│   │   ├── Dockerfile              # Build de producción (multi-stage)
│   │   ├── Dockerfile.dev          # Build de desarrollo
│   │   ├── .dockerignore           # Archivos excluidos
│   │   └── src/
│   │       └── health/             # Health check endpoint
│   └── frontend/
│       ├── Dockerfile              # Build de producción (multi-stage)
│       ├── Dockerfile.dev          # Build de desarrollo
│       ├── nginx.conf              # Configuración nginx
│       └── .dockerignore           # Archivos excluidos
├── database/
│   └── init.sql                    # Script de inicialización PostgreSQL
├── scripts/
│   └── deploy.sh                   # Script de deploy bash
├── .github/
│   └── workflows/
│       └── ci-cd.yml               # Pipeline GitHub Actions
├── docker-compose.yml              # Orquestación de producción
├── docker-compose.dev.yml          # Orquestación de desarrollo
└── .env.docker                     # Variables de entorno template
```

---

## 🐳 Dockerfiles

### Backend Dockerfile (Multi-Stage)

**Stages:**

1. **deps**: Instala dependencias de producción
2. **builder**: Build de la aplicación
3. **runner**: Imagen final optimizada

**Características:**

- Imagen base: `node:18-alpine`
- Usuario no-root (nestjs:1001)
- Health check integrado
- Prisma Client generado
- Optimizado para tamaño (< 300 MB)

**Build:**

```bash
docker build -t anfutrans-backend:latest ./apps/backend
```

### Frontend Dockerfile (Multi-Stage)

**Stages:**

1. **deps**: Instala dependencias
2. **builder**: Build de Angular
3. **runner**: Nginx optimizado

**Características:**

- Build: `node:18-alpine`
- Runtime: `nginx:1.25-alpine`
- Usuario no-root (nginx:1001)
- Gzip compression habilitado
- Cache optimizado
- Tamaño final: < 50 MB

**Build:**

```bash
docker build -t anfutrans-frontend:latest ./apps/frontend
```

---

## 🎼 Docker Compose

### Producción (docker-compose.yml)

**Servicios:**

- **db**: PostgreSQL 14 con health check
- **backend**: NestJS con migraciones automáticas
- **frontend**: Angular + Nginx
- **adminer**: Administrador de DB (profile dev)

**Ejecutar:**

```bash
# Copiar variables de entorno
cp .env.docker .env

# Editar secrets
nano .env

# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

**Volúmenes persistentes:**

- `postgres_data`: Datos de PostgreSQL
- `backend_uploads`: Archivos subidos

### Desarrollo (docker-compose.dev.yml)

**Servicios adicionales:**

- **mailhog**: SMTP testing (puerto 8025)
- Hot reload habilitado
- Debug port expuesto (9229)
- Volúmenes montados para código

**Ejecutar:**

```bash
docker-compose -f docker-compose.dev.yml up -d

# Con adminer y mailhog
docker-compose -f docker-compose.dev.yml --profile dev up -d
```

**Accesos Dev:**

- Backend: http://localhost:3000
- Frontend: http://localhost:4200
- Adminer: http://localhost:8080
- Mailhog: http://localhost:8025
- Debug: puerto 9229

---

## ⚙️ Configuración de Nginx

**Archivo:** `apps/frontend/nginx.conf`

**Características:**

- Gzip compression
- Cache de assets estáticos (1 año)
- No cache para index.html
- Routing de Angular (SPA)
- Security headers
- Health check endpoint

**Headers de seguridad:**

```nginx
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🏥 Health Checks

### Backend Health Endpoint

**Ruta:** `GET /health`

**Respuesta:**

```json
{
  "status": "ok",
  "timestamp": "2026-03-14T12:00:00.000Z",
  "uptime": 12345,
  "environment": "production"
}
```

**Implementación:**

- Controlador: `src/health/health.controller.ts`
- Módulo: `src/health/health.module.ts`
- Público (sin autenticación)

### Frontend Health Endpoint

**Ruta:** `GET /health`

**Implementado en nginx:**

```nginx
location /health {
    access_log off;
    return 200 "healthy\n";
    add_header Content-Type text/plain;
}
```

### Health Checks en Docker

**Backend:**

```yaml
healthcheck:
  test:
    [
      "CMD",
      "node",
      "-e",
      "require('http').get('http://localhost:3000/health', ...)",
    ]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

**Frontend:**

```yaml
healthcheck:
  test:
    [
      "CMD",
      "wget",
      "--quiet",
      "--tries=1",
      "--spider",
      "http://localhost:80/health",
    ]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 10s
```

**PostgreSQL:**

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U anfutrans_user -d anfutrans_db"]
  interval: 10s
  timeout: 5s
  retries: 5
```

---

## 🔄 GitHub Actions CI/CD

**Archivo:** `.github/workflows/ci-cd.yml`

### Pipeline Jobs

#### 1. Backend CI

- Checkout código
- Setup Node.js 18
- Instalar dependencias
- **Lint** (ESLint)
- Generar Prisma Client
- Ejecutar **migraciones** (PostgreSQL en service)
- **Unit tests** con coverage
- **E2E tests**
- Upload coverage a Codecov
- Build

#### 2. Frontend CI

- Checkout código
- Setup Node.js 18
- Instalar dependencias
- **Lint** (ESLint)
- **Tests** (Karma + ChromeHeadless)
- **Build** de producción
- Upload artifacts

#### 3. Docker Build

- Ejecuta después de CI exitoso
- Solo en push a main/develop
- Build multi-platform
- Push a GitHub Container Registry (ghcr.io)
- Tags automáticos (branch, sha, semver)
- Cache layers con GitHub Actions

#### 4. Deploy Staging

- Solo branch develop
- SSH a servidor staging
- Pull imágenes
- `docker-compose up -d`
- Ejecutar migraciones
- Health check

#### 5. Deploy Production

- Solo branch main
- Crear **backup de BD** automático
- SSH a servidor producción
- Pull imágenes
- Despliegue con **zero-downtime**
- Ejecutar migraciones
- Health check
- Notificación Slack

#### 6. Security Scan

- Trivy vulnerability scanner
- Escaneo de imágenes Docker
- Upload resultados a GitHub Security
- Detecta vulnerabilidades en deps y OS

### Variables de GitHub Secrets

**Staging:**

```
STAGING_HOST=staging.example.com
STAGING_USER=deploy
STAGING_SSH_KEY=<private-key>
STAGING_URL=https://staging.anfutrans.cl
```

**Production:**

```
PROD_HOST=anfutrans.cl
PROD_USER=deploy
PROD_SSH_KEY=<private-key>
PROD_URL=https://anfutrans.cl
```

**Notifications:**

```
SLACK_WEBHOOK=https://hooks.slack.com/services/...
```

---

## 🚀 Script de Deploy (deploy.sh)

**Ubicación:** `scripts/deploy.sh`

**Características:**

- Deploy a staging o production
- **Backup automático** antes de deploy
- Health checks post-deploy
- **Rollback automático** en caso de error
- Confirmación para producción
- Limpieza de imágenes antiguas
- Logs coloridos

**Uso:**

```bash
# Deploy a staging
./scripts/deploy.sh staging

# Deploy a production (pide confirmación)
./scripts/deploy.sh production
```

**Flujo:**

1. Verificar requirements (Docker, docker-compose, .env)
2. Crear backup de PostgreSQL
3. Pull imágenes nuevas
4. Detener servicios
5. Iniciar servicios actualizados
6. Ejecutar migraciones Prisma
7. Health checks (30 reintentos)
8. Limpieza de imágenes
9. Mostrar estado

**Rollback automático:**

- Si falla health check → rollback
- Detiene servicios
- Restaura último backup
- Vuelve a versión anterior
- **Exit code 1**

---

## 📦 Variables de Entorno

### Archivo .env.docker (Template)

**Database:**

```env
DB_USER=anfutrans_user
DB_PASSWORD=CAMBIAR_PASSWORD_SEGURA_AQUI
DB_NAME=anfutrans_db
DB_PORT=5432
```

**Backend:**

```env
BACKEND_PORT=3000
NODE_ENV=production
JWT_SECRET=CAMBIAR_ESTE_SECRET
JWT_REFRESH_SECRET=CAMBIAR_ESTE_REFRESH_SECRET
BCRYPT_SALT_ROUNDS=12
LOG_LEVEL=info
SWAGGER_ENABLED=false
```

**Frontend:**

```env
FRONTEND_PORT=80
API_URL=http://localhost:3000
```

**Generar secrets seguros:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🛠️ Comandos Útiles

### Docker Compose

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend

# Estado de servicios
docker-compose ps

# Reiniciar servicio
docker-compose restart backend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Rebuild específico
docker-compose up -d --build backend

# Ejecutar comando en contenedor
docker-compose exec backend npx prisma migrate status
docker-compose exec db psql -U anfutrans_user -d anfutrans_db
```

### Docker Images

```bash
# Listar imágenes
docker images

# Eliminar imágenes no usadas
docker image prune -f

# Eliminar todo (images, containers, volumes)
docker system prune -a --volumes

# Build manual
docker build -t anfutrans-backend:v1.0.0 ./apps/backend

# Run manual
docker run -p 3000:3000 --env-file .env anfutrans-backend:v1.0.0
```

### Desarrollo

```bash
# Modo desarrollo con hot reload
docker-compose -f docker-compose.dev.yml up -d

# Con herramientas dev (adminer + mailhog)
docker-compose -f docker-compose.dev.yml --profile dev up -d

# Ver logs backend dev
docker-compose -f docker-compose.dev.yml logs -f backend

# Exec en container dev
docker-compose -f docker-compose.dev.yml exec backend sh

# Detener dev
docker-compose -f docker-compose.dev.yml down
```

---

## 🔐 Seguridad

### Imágenes

- ✅ Multi-stage builds (tamaño reducido)
- ✅ Usuario no-root en runtime
- ✅ Alpine Linux (menos attack surface)
- ✅ Scanning con Trivy
- ✅ No secrets en imágenes

### Networking

- ✅ Red aislada `anfutrans-network`
- ✅ Solo puertos necesarios expuestos
- ✅ Comunicación interna por DNS

### Datos

- ✅ Volúmenes persistentes
- ✅ Backups automáticos
- ✅ .env en .gitignore
- ✅ Secrets via environment variables

### Headers HTTP

```nginx
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 Métricas y Monitoreo

### Health Checks

**Verificar manualmente:**

```bash
# Backend
curl http://localhost:3000/health

# Frontend
curl http://localhost:80/health

# PostgreSQL
docker-compose exec db pg_isready
```

### Logs

**Centralizar logs:**

```bash
# Ver todos
docker-compose logs -f

# Últimas 100 líneas
docker-compose logs --tail=100

# Desde timestamp
docker-compose logs --since 2026-03-14T12:00:00
```

### Estadísticas

```bash
# Stats de contenedores
docker stats

# Uso de volúmenes
docker system df
```

---

## 🚨 Troubleshooting

### Error: "Connection refused" al backend

**Causa:** Backend no inició correctamente

**Solución:**

```bash
# Ver logs
docker-compose logs backend

# Verificar health
docker-compose ps

# Reiniciar
docker-compose restart backend
```

### Error: "Database connection failed"

**Causa:** PostgreSQL no disponible o credenciales incorrectas

**Solución:**

```bash
# Verificar PostgreSQL
docker-compose exec db pg_isready

# Verificar .env
cat .env | grep DB_

# Ver logs de DB
docker-compose logs db
```

### Error: "Migration failed"

**Causa:** Migraciones pendientes o schema inconsistente

**Solución:**

```bash
# Ver estado
docker-compose exec backend npx prisma migrate status

# Aplicar migraciones
docker-compose exec backend npx prisma migrate deploy

# Reset (solo dev)
docker-compose exec backend npx prisma migrate reset --force
```

### Frontend no muestra contenido

**Causa:** Build de Angular incorrecto o nginx config

**Solución:**

```bash
# Ver logs nginx
docker-compose logs frontend

# Rebuild
docker-compose up -d --build frontend

# Verificar archivos
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Imágenes muy grandes

**Causa:** No se usa multi-stage o hay archivos innecesarios

**Solución:**

```bash
# Verificar tamaño
docker images

# Revisar .dockerignore
cat apps/backend/.dockerignore

# Rebuild con --no-cache
docker-compose build --no-cache
```

---

## 📝 Checklist de Deploy

### Pre-Deploy

- [ ] Código en main/develop actualizado
- [ ] Tests pasando en local
- [ ] Migraciones probadas
- [ ] .env configurado con secrets seguros
- [ ] Backup de BD creado
- [ ] Changelog actualizado

### Deploy

- [ ] Pull imágenes nuevas
- [ ] Verificar health de servicios actuales
- [ ] Detener servicios antiguos
- [ ] Iniciar servicios nuevos
- [ ] Ejecutar migraciones
- [ ] Health checks pasando
- [ ] Tests de smoke

### Post-Deploy

- [ ] Verificar logs sin errores
- [ ] Probar funcionalidades críticas
- [ ] Monitorear métricas (5-10 min)
- [ ] Notificar equipo
- [ ] Documentar issues

---

## 🔄 Workflow Completo

### Desarrollo Local

```bash
# 1. Clonar repo
git clone <repo>
cd anfutrans-platform

# 2. Configurar env
cp .env.docker .env
nano .env

# 3. Iniciar dev
docker-compose -f docker-compose.dev.yml --profile dev up -d

# 4. Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# 5. Desarrollar (hot reload automático)
# Editar archivos en apps/backend/src o apps/frontend/src

# 6. Tests
docker-compose -f docker-compose.dev.yml exec backend npm run test
docker-compose -f docker-compose.dev.yml exec frontend npm run test

# 7. Detener
docker-compose -f docker-compose.dev.yml down
```

### CI/CD Automático

```bash
# 1. Crear feature branch
git checkout -b feature/mi-feature

# 2. Desarrollar y commitear
git add .
git commit -m "feat: mi nueva feature"

# 3. Push (dispara CI)
git push origin feature/mi-feature

# 4. Crear PR a develop
# GitHub Actions ejecuta:
# - Lint
# - Tests
# - Build
# - Security scan

# 5. Merge a develop (dispara deploy a staging)
# GitHub Actions ejecuta:
# - Build Docker images
# - Push a registry
# - Deploy a staging
# - Health checks

# 6. Merge a main (dispara deploy a production)
# GitHub Actions ejecuta:
# - Backup de BD
# - Deploy a production
# - Health checks
# - Notificación Slack
```

---

## 📚 Referencias

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Health Check Best Practices](https://docs.docker.com/engine/reference/builder/#healthcheck)

---

## ✅ Checklist FASE 11

- [x] Dockerfile backend (multi-stage)
- [x] Dockerfile frontend (multi-stage)
- [x] .dockerignore para ambos
- [x] nginx.conf optimizado
- [x] docker-compose.yml producción
- [x] docker-compose.dev.yml desarrollo
- [x] Variables de entorno (.env.docker)
- [x] Health check endpoint backend
- [x] Health checks en todos los servicios
- [x] GitHub Actions CI pipeline
- [x] GitHub Actions CD pipeline
- [x] Deploy script bash
- [x] Security scanning (Trivy)
- [x] Documentación completa
- [ ] Configurar GitHub Secrets (requiere acceso a GitHub)
- [ ] Configurar servidores staging/prod (requiere infraestructura)
- [ ] Primer deploy a staging
- [ ] Primer deploy a producción

---

## 🔜 Próximos Pasos

**FASE 12:** Monitoreo + Logs

- Winston/Pino structured logging
- APM (Datadog, New Relic)
- Error tracking (Sentry)
- Métricas de performance
- Alertas automáticas
- Dashboards de monitoring

---

**Fecha de implementación:** 14 de marzo de 2026
**Fase:** 11/12
**Estado:** ✅ COMPLETADA (95%)
