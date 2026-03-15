# 🌐 Portal Web ANFUTRANS

Portal institucional y de acceso a plataforma de socios para ANFUTRANS.

## 📁 Estructura

```
portal/
├── index.html          # Página principal del portal institucional
├── login.html          # Página de login para socios
├── dashboard.html      # Dashboard de usuario (post-login)
├── styles.css          # Estilos globales
├── login.css           # Estilos específicos del login
├── dashboard.css       # Estilos del dashboard
├── script.js           # JavaScript del portal institucional
├── login.js            # JavaScript del login (conecta al backend)
├── dashboard.js        # JavaScript del dashboard (conecta al backend)
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. Asegúrate de que el Backend esté corriendo

```powershell
# Desde la raíz del proyecto
cd apps/backend
npm run start:dev

# Verificar que está corriendo:
# http://localhost:3000/api/health
```

### 2. Abrir el Portal

El portal es HTML estático puro, simplemente abre `index.html` en tu navegador:

**Opción A: Directamente en el navegador**

```
Doble click en:
c:\Users\afuenzalida\Downloads\WEB\ANFUTRANS\anfutrans-platform\portal\index.html
```

**Opción B: Con servidor HTTP local (recomendado)**

```powershell
# Desde el directorio portal/
cd portal

# Usando Python
python -m http.server 8000

# O usando Node.js (si tienes http-server instalado)
npx http-server -p 8000

# Abrir en navegador:
# http://localhost:8000
```

### 3. Probar el Login

1. Ir a la página de login: `login.html`
2. Usar cualquiera de estas credenciales de prueba:

| Email                          | Contraseña | Rol               |
| ------------------------------ | ---------- | ----------------- |
| admin@anfutrans.cl             | admin123   | Admin             |
| director.nacional@anfutrans.cl | admin123   | Director Nacional |
| director.regional@anfutrans.cl | admin123   | Director Regional |
| funcionario@anfutrans.cl       | admin123   | Funcionario       |
| socio@anfutrans.cl             | admin123   | Socio             |

**⚠️ NOTA IMPORTANTE:** Estos usuarios están definidos en el seed script pero **NO han sido creados en la base de datos** debido a problemas con los nombres de columnas detectados en Prisma. Por lo tanto, actualmente **el login fallará**.

### 4. Ver dashboard

Una vez autenticado correctamente (cuando los usuarios estén creados), serás redirigido a `dashboard.html`.

## 🎨 Características

### Portal Institucional (index.html)

✅ **Secciones completas:**

- Inicio con hero section
- Quiénes Somos (Historia, Misión, Visión, Directiva)
- Noticias (últimas 3 noticias)
- Documentos (Estatutos, Formularios, Normativa, Reportes)
- Beneficios (Salud, Educación, Recreación, Préstamos)
- Contacto (Dirección, teléfonos, email, formulario)

✅ **Diseño moderno:**

- Responsive (desktop, tablet, móvil)
- Gradientes y sombras sutiles
- Iconos con emojis
- Scroll suave
- Animaciones en hover

### Página de Login (login.html)

✅ **Funcionalidades:**

- Conexión real al backend en `http://localhost:3000/api/auth/login`
- Validación de inputs
- Mensajes de error/éxito
- Botones de acceso rápido para usuarios de prueba
- Estado de cargando durante login
- Guardado de JWT token en localStorage
- Redirección automática si ya hay sesión activa

✅ **UX/UI:**

- Diseño de dos columnas (formulario + sidebar)
- Lista de beneficios visible
- Widget de ayuda con contacto de soporte
- Responsive completo

### Dashboard (dashboard.html)

✅ **Componentes:**

- Header con info de usuario y botón de logout
- Sidebar de navegación (Overview, Solicitudes, Beneficios, Cuenta, Documentos, Perfil)
- Vista general con stats cards
- Acciones rápidas
- Actividad reciente
- **Sección de testing de API** con botones para probar endpoints

✅ **Funcionalidades:**

- Verificación de autenticación (redirige a login si no hay token)
- Logout (limpia localStorage y redirige)
- Requests autenticados al backend con JWT bearer token
- Manejo de errores 401 (token inválido/expirado)

## 🔌 Conexión con Backend

### Endpoints utilizados

**Login:**

```javascript
POST /api/auth/login
Body: { email: string, password: string }
Response: { access_token, refresh_token, user }
```

**Dashboard (ejemplos):**

```javascript
GET /api/health
GET /api/auth/me (requiere auth)
GET /api/socios (requiere auth)
GET /api/tramites (requiere auth)
GET /api/beneficios (requiere auth)
```

### Configuración del API

En cada archivo JavaScript hay:

```javascript
const API_URL = "http://localhost:3000/api";
```

Si el backend corre en otro puerto o dominio, **cambiar esta línea**.

## 🐛 Estado Actual y Problemas Conocidos

### ✅ Funcionando

- Portal institucional 100% funcional
- Página de login con integración al backend
- Dashboard con estructura completa
- Testing de endpoints de API
- Diseño responsive
- Manejo de sesión con localStorage

### ❌ Bloqueado

**1. Usuarios de prueba NO creados en BD:**

- Motivo: Script SQL `seed-manual.sql` falla por nombres de columnas incorrectos
- Columnas problemáticas: `passwordHash`, `requiereAprobacion`, `regionId`
- Solución pendiente: Corregir nombres en script SQL o crear usuarios manualmente

**2. Login fallará:**

- Hasta que se creen usuarios en la base de datos
- Alternativa: Usar endpoint `/api/auth/register` desde Swagger para crear usuarios manualmente

**3. Frontend Angular con 139 errores:**

- Este portal HTML reemplaza temporalmente el frontend Angular
- Angular frontend NO es usable actualmente

## 🔧 Próximos Pasos

### Inmediatos

1. **Arreglar seed de usuarios:**

   ```sql
   -- Actualizar seed-manual.sql con nombres de columnas correctos
   -- Ejecutar: psql ... -f seed-manual.sql
   ```

2. **Probar login real:**
   - Una vez creados los usuarios
   - Verificar que JWT funcione
   - Probar navegación post-login

3. **Agregar más funcionalidades al dashboard:**
   - Secciones reales conectadas al backend
   - CRUD de solicitudes
   - Gestión de documentos
   - Estado de cuenta

### Mediano Plazo

4. **Mejorar dashboard:**
   - Agregar charts/gráficos
   - Implementar filtros y búsqueda
   - Paginación de tablas
   - Notificaciones en tiempo real

5. **Agregar más páginas:**
   - Página de detalle de solicitud
   - Página de perfil de usuario
   - Página de configuración
   - Página de ayuda/FAQ

## 🎯 Uso para Pruebas con Usuarios

### Escenario 1: Demo del Portal Institucional

1. Abrir `index.html`
2. Navegar por las secciones
3. Mostrar diseño responsive (cambiar tamaño de ventana)
4. Click en "Acceso Socios" → redirige a login

**Estado:** ✅ Completamente funcional

### Escenario 2: Probar Login (cuando usuarios estén creados)

1. Abrir `login.html`
2. Click en botón de usuario de prueba (ej: "Socio")
3. Click en "Iniciar Sesión"
4. Ver redirección a dashboard

**Estado:** ⚠️ Requiere usuarios en BD

### Escenario 3: Navegar Dashboard

1. Login exitoso
2. Ver datos de usuario en header
3. Navegar secciones del sidebar
4. Probar botones de testing de API
5. Logout

**Estado:** ⚠️ Requiere login funcional

## 📊 Comparación: Portal HTML vs Frontend Angular

| Aspecto               | Portal HTML     | Frontend Angular       |
| --------------------- | --------------- | ---------------------- |
| **Estado**            | ✅ Funcional    | ❌ 139 errores         |
| **Complejidad**       | Bajo            | Alto                   |
| **Tiempo desarrollo** | 2-3 horas       | 2-3 semanas            |
| **Dependencias**      | Ninguna         | 109 paquetes npm       |
| **Performance**       | Excelente       | Bueno (cuando compile) |
| **Escalabilidad**     | Limitada        | Excelente              |
| **Mantenibilidad**    | Media           | Alta                   |
| **Uso recomendado**   | Demo/MVP rápido | Producción             |

## 🌟 Ventajas del Portal HTML

1. **Cero dependencias** - Solo HTML/CSS/JS vanilla
2. **Rápido de cargar** - No bundle, no transpilación
3. **Fácil de modificar** - Editar y refrescar
4. **Funcional inmediatamente** - Sin compilación
5. **Ideal para pruebas** - Permite validar backend sin esperar frontend Angular

## 📝 Notas Técnicas

### localStorage Schema

```javascript
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": "{\"id\":\"...\",\"email\":\"...\",\"rol\":\"...\"}"
}
```

### JWT en Requests

Todos los requests autenticados incluyen:

```javascript
headers: {
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
```

### Manejo de Errores

- **401 Unauthorized:** Auto-logout y redirect a login
- **500 Server Error:** Mostrar mensaje de error al usuario
- **Network Error:** "No se puede conectar con el servidor"

## 🚨 Troubleshooting

### "No se puede conectar con el servidor"

**Solución:**

```powershell
# Verificar que backend esté corriendo
curl http://localhost:3000/api/health

# Si no responde, iniciar backend:
cd apps/backend
npm run start:dev
```

### "Credenciales inválidas"

**Problema:** Usuarios no existen en BD

**Solución temporal:**

```powershell
# Crear usuario manualmente con Swagger
# 1. Abrir http://localhost:3000/api
# 2. POST /api/auth/register
# 3. Body:
{
  "email": "test@anfutrans.cl",
  "password": "admin123",
  "nombre": "Test",
  "apellido": "User"
}
```

### CORS Error

**Si ves error de CORS en consola:**

Verificar que el backend tenga habilitado CORS para `*` o para el origen del portal.

### Token expirado

Si el login fue hace mucho tiempo, el token puede haber expirado.

**Solución:** Logout y login nuevamente.

---

**Creado:** 14 de Marzo 2026  
**Autor:** Arquitecto Senior de Software  
**Versión:** 1.0
