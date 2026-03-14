# ⚡ Quick Start - Docker

## 🚀 Inicio Rápido con Docker

### Requisitos
- Docker Desktop 20+ (Windows/Mac) o Docker Engine (Linux)
- Docker Compose 2.0+
- 4 GB RAM disponible
- 10 GB espacio en disco

---

## 📦 Setup en 3 Pasos

### 1. Configurar Variables de Entorno

```bash
# Copiar template
cp .env.docker .env

# Editar con tus valores
nano .env
```

**Cambiar OBLIGATORIAMENTE:**
```env
DB_PASSWORD=TuPasswordSegura
JWT_SECRET=<genera-uno-aleatorio>
JWT_REFRESH_SECRET=<genera-uno-aleatorio>
```

**Generar secrets:**
```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# En PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes(64))
```

### 2. Iniciar Servicios

```bash
# Modo producción
docker-compose up -d

# Modo desarrollo (con hot reload)
docker-compose -f docker-compose.dev.yml --profile dev up -d
```

**Esperar ~60 segundos** mientras:
- PostgreSQL inicia
- Backend ejecuta migraciones
- Frontend se compila

### 3. Verificar

```bash
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Health checks
curl http://localhost:3000/health  # Backend
curl http://localhost:80/health    # Frontend
```

---

## 🌐 Accesos

**Producción:**
- **Backend:** http://localhost:3000
- **Swagger API:** http://localhost:3000/api (solo dev)
- **Frontend:** http://localhost:80

**Desarrollo:**
- **Backend:** http://localhost:3000
- **Swagger:** http://localhost:3000/api
- **Frontend:** http://localhost:4200
- **Adminer (DB):** http://localhost:8080
- **Mailhog:** http://localhost:8025

**Credenciales Admin:**
```
Email: admin@anfutrans.cl
Password: admin123
```

---

## 🛠️ Comandos Comunes

### Gestión de Servicios

```bash
# Iniciar
docker-compose up -d

# Detener
docker-compose down

# Reiniciar un servicio
docker-compose restart backend

# Ver logs
docker-compose logs -f backend

# Estado
docker-compose ps
```

### Base de Datos

```bash
# Ejecutar migraciones
docker-compose exec backend npx prisma migrate deploy

# Ejecutar seed
docker-compose exec backend npx prisma seed

# Acceder a PostgreSQL
docker-compose exec db psql -U anfutrans_user -d anfutrans_db

# Backup
docker-compose exec db pg_dump -U anfutrans_user anfutrans_db > backup.sql

# Restore
cat backup.sql | docker-compose exec -T db psql -U anfutrans_user -d anfutrans_db
```

### Mantenimiento

```bash
# Ver uso de recursos
docker stats

# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes no usadas
docker image prune

# Limpieza completa (¡CUIDADO!)
docker system prune -a --volumes
```

---

## 🐛 Troubleshooting

### Error: "port is already allocated"

**Solución:** Cambiar puertos en `.env`
```env
BACKEND_PORT=3001
FRONTEND_PORT=8080
```

### Error: "no such file or directory"

**Solución:** Ejecutar desde raíz del proyecto
```bash
# Verificar ubicación
ls -la docker-compose.yml

# Si no existe, moverte al directorio correcto
cd anfutrans-platform
```

### Backend no conecta a DB

**Solución:** Esperar a que PostgreSQL esté listo
```bash
# Ver logs de DB
docker-compose logs db

# Verificar health
docker-compose exec db pg_isready

# Reiniciar backend
docker-compose restart backend
```

### Frontend muestra página en blanco

**Solución:** Verificar build de Angular
```bash
# Rebuild
docker-compose up -d --build frontend

# Ver archivos
docker-compose exec frontend ls -la /usr/share/nginx/html

# Ver logs nginx
docker-compose logs frontend
```

---

## 🔄 Desarrollo con Hot Reload

```bash
# Iniciar en modo dev
docker-compose -f docker-compose.dev.yml --profile dev up -d

# Editar código en apps/backend/src o apps/frontend/src
# Los cambios se reflejan automáticamente

# Ver logs en tiempo real
docker-compose -f docker-compose.dev.yml logs -f backend
```

**Volúmenes montados:**
- `./apps/backend/src` → `/app/src` (read-only)
- `./apps/frontend/src` → `/app/src` (read-only)

---

## 📊 Verificación Post-Setup

### Checklist

- [ ] `docker-compose ps` muestra todos los servicios "Up"
- [ ] Backend health: `curl http://localhost:3000/health` devuelve `{"status":"ok",...}`
- [ ] Frontend health: `curl http://localhost:80/health` devuelve `healthy`
- [ ] Swagger accesible: http://localhost:3000/api (solo dev)
- [ ] Login funciona con admin@anfutrans.cl / admin123
- [ ] Adminer conecta a DB (solo dev): localhost:8080

### Probar API

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@anfutrans.cl","password":"admin123"}'

# Respuesta esperada:
# {"access_token":"eyJ...","refresh_token":"eyJ..."}
```

---

## 📚 Documentación Completa

- **Docker + CI/CD:** [FASE-11-DOCKER-CICD.md](../docs/FASE-11-DOCKER-CICD.md)
- **Migraciones DB:** [FASE-10-MIGRACIONES.md](../docs/FASE-10-MIGRACIONES.md)
- **API Endpoints:** [api-endpoints.md](../docs/api-endpoints.md)

---

## 🆘 Ayuda

Si encuentras problemas:

1. **Ver logs:** `docker-compose logs -f`
2. **Verificar salud:** `docker-compose ps`
3. **Reiniciar:** `docker-compose restart`
4. **Reset completo:** `docker-compose down -v && docker-compose up -d`

---

**🎉 ¡Listo!** Tu aplicación está corriendo en Docker.

**Siguiente paso:** Probar login en http://localhost:3000/api
