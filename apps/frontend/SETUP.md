# ANFUTRANS Frontend

Frontend Angular para la plataforma ANFUTRANS.

## Tecnologías

- **Angular** 21.2.2
- **TypeScript**
- **SCSS**
- **RxJS**

## Arquitectura

```
src/app/
├── core/
│   ├── api/           # Servicios API base
│   ├── auth/          # Autenticación y autorización
│   ├── guards/        # Guards de rutas
│   └── interceptors/  # Interceptores HTTP
│
├── shared/
│   ├── components/    # Componentes compartidos
│   └── models/        # Modelos TypeScript
│
└── modules/
    ├── dashboard/     # Dashboard principal
    ├── socios/        # Gestión de socios
    ├── tramites/      # Gestión de trámites
    ├── beneficios/    # Gestión de beneficios
    ├── catalogos/     # Catálogos del sistema
    └── usuarios/      # Gestión de usuarios
```

## Servicios Configurados

### ApiService (core/api/api.service.ts)

Servicio base para todas las peticiones HTTP al backend.

- URL base: `http://localhost:3000`
- Métodos: `get()`, `post()`

### SociosService (modules/socios/socios.service.ts)

- `getSocios()` - Obtener lista de socios
- `createSocio(data)` - Crear nuevo socio

### CatalogosService (modules/catalogos/catalogos.service.ts)

- `getRegiones()` - Obtener regiones
- `getComunas()` - Obtener comunas

## Ejecutar en desarrollo

```bash
cd apps/frontend
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Backend API

El frontend se conecta al backend NestJS en `http://localhost:3000`

Asegúrate de que el backend esté corriendo:

```bash
cd apps/backend
npm run start:dev
```

## Prueba de Conexión

El componente App (`app.ts`) incluye una prueba de conexión que consulta las regiones al inicializar:

```typescript
ngOnInit() {
  this.api.get('catalogos/regiones').subscribe(console.log);
}
```

Abre la consola del navegador en `http://localhost:4200/` para ver los datos retornados.

## Próximos Pasos

1. Implementar componentes de UI
2. Crear formularios reactivos
3. Implementar routing entre módulos
4. Agregar autenticación y guards
5. Agregar interceptores para tokens JWT
6. Implementar manejo de errores
7. Crear componentes compartidos (tablas, modales, etc.)

## Estado Actual

✅ Proyecto Angular inicializado  
✅ Estructura de carpetas profesional  
✅ HttpClientModule activado  
✅ Servicio API base configurado  
✅ Servicios de módulos creados  
✅ Conexión con backend verificada
