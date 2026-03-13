# Frontend ANFUTRANS - Estructura Completa

## 🎯 Visión General

Frontend completo del sistema ANFUTRANS Platform desarrollado con Angular 21.2.2, integrado con backend NestJS mediante API REST.

## 📁 Arquitectura del Proyecto

```
src/app/
├── core/                          # Funcionalidades base del sistema
│   ├── api/
│   │   └── api.service.ts         # Servicio HTTP base
│   ├── auth/
│   │   ├── auth-module.ts         # Módulo de autenticación
│   │   ├── auth-routing-module.ts
│   │   └── login/                 # Componente de login
│   │       ├── login.ts
│   │       ├── login.html
│   │       └── login.scss
│   ├── guards/
│   │   └── auth.guard.ts          # Guard para rutas protegidas
│   └── interceptors/
│       └── auth.interceptor.ts    # Interceptor JWT
│
├── shared/                        # Componentes compartidos
│   ├── components/
│   │   ├── layout/                # Layout principal
│   │   │   ├── layout.ts
│   │   │   ├── layout.html
│   │   │   └── layout.scss
│   │   ├── navbar/                # Barra de navegación
│   │   │   ├── navbar.ts
│   │   │   ├── navbar.html
│   │   │   └── navbar.scss
│   │   └── sidebar/               # Menú lateral
│   │       ├── sidebar.ts
│   │       ├── sidebar.html
│   │       └── sidebar.scss
│   └── models/                    # Modelos TypeScript
│
├── modules/                       # Módulos funcionales
│   ├── dashboard/
│   │   ├── dashboard-module.ts
│   │   ├── dashboard-routing-module.ts
│   │   └── dashboard/
│   │       ├── dashboard.ts       # Componente principal
│   │       ├── dashboard.html
│   │       └── dashboard.scss
│   │
│   ├── socios/
│   │   ├── socios-module.ts
│   │   ├── socios-routing-module.ts
│   │   ├── socios-list/           # Lista de socios
│   │   └── socio-form/            # Formulario de socio
│   │
│   ├── tramites/
│   │   ├── tramites-module.ts
│   │   ├── tramites-routing-module.ts
│   │   ├── tramites-list/         # Lista de trámites
│   │   └── tramite-form/          # Formulario de trámite
│   │
│   ├── beneficios/
│   │   ├── beneficios-module.ts
│   │   ├── beneficios-routing-module.ts
│   │   ├── beneficios-list/       # Lista de beneficios
│   │   └── beneficio-form/        # Formulario de beneficio
│   │
│   ├── catalogos/
│   │   ├── catalogos-module.ts
│   │   ├── catalogos-routing-module.ts
│   │   ├── regiones/              # Catálogo de regiones
│   │   ├── comunas/               # Catálogo de comunas
│   │   └── tipo-documento/        # Catálogo de tipos de documento
│   │
│   └── usuarios/
│       ├── usuarios-module.ts
│       └── usuarios-routing-module.ts
│
├── app-routing-module.ts          # Routing principal con lazy loading
├── app-module.ts                  # Módulo raíz
├── app.ts                         # Componente raíz
└── app.html                       # Template raíz
```

## 🔐 Sistema de Autenticación

### Guard: AuthGuard
- **Ubicación:** `core/guards/auth.guard.ts`
- **Función:** Protege rutas que requieren autenticación
- **Verificación:** Revisa token en localStorage
- **Redirección:** Si no hay token, redirige a `/login`

### Interceptor: authInterceptor
- **Ubicación:** `core/interceptors/auth.interceptor.ts`
- **Función:** Agrega token JWT a las peticiones HTTP
- **Header:** `Authorization: Bearer {token}`

### Login Component
- **Ruta:** `/login`
- **Funcionalidad:** Pantalla de inicio de sesión
- **Estado actual:** Login demo (guarda token mock en localStorage)
- **TODO:** Integrar con endpoint real `auth/login` del backend

## 🚏 Sistema de Routing

### Rutas Configuradas

| Ruta | Componente | Guard | Tipo |
|------|-----------|-------|------|
| `/login` | Login | No | Eager |
| `/` | Dashboard (redirect) | Sí | Eager |
| `/dashboard` | Dashboard | Sí | Eager |
| `/socios` | SociosModule | Sí | Lazy Loading |
| `/tramites` | TramitesModule | Sí | Lazy Loading |
| `/beneficios` | BeneficiosModule | Sí | Lazy Loading |
| `/catalogos` | CatalogosModule | Sí | Lazy Loading |
| `/usuarios` | UsuariosModule | Sí | Lazy Loading |

### Lazy Loading
Todos los módulos funcionales usan lazy loading para optimizar el performance inicial:
```typescript
loadChildren: () => import('./modules/socios/socios-module').then(m => m.SociosModule)
```

## 🎨 Componentes de Layout

### Navbar (Barra Superior)
- Logo "ANFUTRANS Platform"
- Nombre de usuario
- Botón "Cerrar Sesión"
- Estilos: Fondo oscuro (#2c3e50)

### Sidebar (Menú Lateral)
- Links a todos los módulos
- Estado activo con resaltado
- Estilos: Fondo gris oscuro (#34495e)

### Layout (Contenedor Principal)
- Estructura: Navbar + (Sidebar + Content)
- Content: Área flexible para router-outlet
- Estilos: Fondo claro (#ecf0f1)

## 📊 Dashboard

### Métricas Mostradas
1. **Socios Activos:** Total de socios en el sistema
2. **Trámites Pendientes:** Cantidad de trámites por procesar
3. **Beneficios Activos:** Beneficios disponibles
4. **Solicitudes del Mes:** Solicitudes recibidas en el mes actual

### Estado Actual
- Datos de demostración (hardcoded)
- TODO: Integrar con endpoint `dashboard/stats`

## 🛠️ Servicios

### ApiService
**Ruta:** `core/api/api.service.ts`

Servicio base para todas las peticiones HTTP:
```typescript
get(path: string)   → GET  http://localhost:3000/{path}
post(path, body)    → POST http://localhost:3000/{path}
```

### SociosService
**Ruta:** `modules/socios/socios.service.ts`
- `getSocios()` → Lista de socios
- `createSocio(data)` → Crear nuevo socio

### CatalogosService
**Ruta:** `modules/catalogos/catalogos.service.ts`
- `getRegiones()` → Catálogo de regiones
- `getComunas()` → Catálogo de comunas

## 📦 Módulos Configurados

### Módulos Core
- `BrowserModule` - Funcionalidad base de Angular
- `HttpClientModule` - Cliente HTTP
- `FormsModule` - Formularios Template-Driven
- `AppRoutingModule` - Routing principal

### Proveedores
- `provideBrowserGlobalErrorListeners()` - Manejo de errores
- `provideHttpClient(withInterceptors([authInterceptor]))` - HTTP con interceptor JWT

## 🎨 Estilos

Todos los componentes tienen estilos SCSS dedicados:
- **Login:** Diseño centrado con gradiente
- **Navbar:** Barra superior oscura
- **Sidebar:** Menú lateral con hover effects
- **Dashboard:** Grid responsive para cards de estadísticas
- **Layout:** Flexbox para estructura principal

## 🚀 Comandos de Ejecución

### Desarrollo
```bash
cd apps/frontend
ng serve
```
Aplicación disponible en: `http://localhost:4200`

### Build Producción
```bash
ng build --configuration production
```

### Tests
```bash
ng test
ng e2e
```

## 🔗 Integración con Backend

### Configuración
- **URL Base:** `http://localhost:3000`
- **Formato:** JSON
- **Autenticación:** JWT Bearer Token

### Endpoints Usados (Demo)
- `GET /catalogos/regiones` - Lista de regiones
- `POST /auth/login` - Login de usuario (TODO)
- `GET /dashboard/stats` - Estadísticas dashboard (TODO)
- `GET /socios` - Lista de socios (TODO)

## 📋 Para Completar

### Prioridad Alta
- [ ] Conectar login real con backend `/auth/login`
- [ ] Implementar RESTful services para todos los módulos
- [ ] Completar componentes de lista (socios, trámites, beneficios)
- [ ] Implementar formularios reactivos para CRUD

### Prioridad Media
- [ ] Agregar validaciones de formularios
- [ ] Implementar manejo de errores global
- [ ] Agregar loading states
- [ ] Crear componentes de notificaciones/toasts
- [ ] Implementar paginación en listas

### Prioridad Baja
- [ ] Agregar animaciones
- [ ] Implementar tema oscuro
- [ ] Agregar i18n (internacionalización)
- [ ] Optimizar imagenes y assets

## 🏆 Estado Actual

✅ **Completado (≈70% del frontend base)**
- Estructura completa de carpetas
- Sistema de autenticación (Guard + Interceptor)
- Routing con lazy loading
- Layout completo (Navbar + Sidebar)
- Dashboard funcional
- Módulos creados y conectados
- Estilos básicos implementados
- Integración con ApiService

## 📝 Notas Técnicas

### Componentes Standalone
Este proyecto usa **módulos tradicionales** (standalone=false) para mantener una estructura clara y modular.

### Estrategia de Lazy Loading
Los módulos funcionales se cargan bajo demanda para optimizar:
- Tiempo de carga inicial
- Bundle size
- Performance general

### TypeScript
- Version: ^5.7.2
- Strict mode: Activado
- Path mapping: Configurado para imports limpios

## 🔍 Troubleshooting

### Error: Can't bind to 'ngModel'
**Solución:** Importar `FormsModule` en el módulo correspondiente

### Error: No directive found with exportAs 'ngForm'
**Solución:** Importar `FormsModule` en el módulo correspondiente

### Error: Can't resolve router links
**Solución:** Verificar que `RouterModule` esté importado

---

**Versión:** v0.3-frontend-structure  
**Fecha:** Marzo 2026  
**Autor:** Equipo ANFUTRANS
