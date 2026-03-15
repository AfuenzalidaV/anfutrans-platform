🌐 Catálogo de URLs — Plataforma ANFUTRANS
1️⃣ Portal Institucional (Sitio público)
URL base

http://localhost:8000
URL Función
/ Página principal del portal institucional
/index.html Home del portal con información institucional
/login.html Acceso de usuarios a la plataforma
/dashboard.html Panel inicial después de iniciar sesión
/noticias Noticias institucionales
/documentos Repositorio de documentos oficiales
/beneficios Información sobre beneficios para socios
/contacto Formulario de contacto institucional
Contenido del portal
El portal muestra:

Historia de ANFUTRANS

Misión y visión

Directorio

Noticias

Beneficios

Documentos institucionales

Formulario de contacto

Acceso a la intranet

2️⃣ Backend API (NestJS)
URL base

http://localhost:3000
Endpoint Función
/ Endpoint base del servidor
/health Verificación del estado del servidor
/api Base de la API REST
3️⃣ Documentación de API
URL Función
/api/docs Documentación Swagger completa de la API
Acceso:

http://localhost:3000/api/docs
Permite:

probar endpoints

autenticar con JWT

revisar DTOs

validar respuestas

4️⃣ Autenticación
Base:

/auth
Endpoint Método Función
/auth/login POST Login de usuarios
/auth/register POST Registro de usuarios
/auth/profile GET Información del usuario autenticado
5️⃣ Gestión de Socios
Base:

/socios
Endpoint Método Función
/socios GET Lista de socios
/socios/:id GET Ver socio específico
/socios POST Crear nuevo socio
/socios/:id PATCH Actualizar socio
/socios/:id DELETE Eliminar socio
6️⃣ Gestión de Solicitudes
Base:

/solicitudes
Endpoint Método Función
/solicitudes GET Lista de solicitudes
/solicitudes/:id GET Ver solicitud
/solicitudes POST Crear solicitud
/solicitudes/:id PATCH Actualizar estado
/solicitudes/:id DELETE Eliminar solicitud
Ejemplos de solicitudes:

certificado de socio

préstamo solidario

beneficios

7️⃣ Gestión de Beneficios
Base:

/beneficios
Endpoint Método Función
/beneficios GET Lista de beneficios
/beneficios/:id GET Detalle de beneficio
/beneficios POST Crear beneficio
/beneficios/:id PATCH Editar beneficio
/beneficios/:id DELETE Eliminar beneficio
8️⃣ Gestión de Usuarios
Base:

/usuarios
Endpoint Método Función
/usuarios GET Lista de usuarios
/usuarios/:id GET Ver usuario
/usuarios POST Crear usuario
/usuarios/:id PATCH Actualizar usuario
/usuarios/:id DELETE Eliminar usuario
9️⃣ Catálogos del sistema
Los catálogos contienen datos base para el sistema.

Endpoint Función
/regiones Catálogo de regiones
/comunas Catálogo de comunas
/tipos-beneficio Tipos de beneficios
/tipos-solicitud Tipos de solicitudes
/estados-solicitud Estados del trámite
/cargos Cargos institucionales
/parametros Parámetros del sistema
🔟 Herramientas de Desarrollo
Prisma Studio
Administración visual de base de datos

http://localhost:5555
Permite:

ver tablas

editar registros

crear usuarios

modificar datos

Frontend Angular (cuando compile)
http://localhost:4200
Funciones:

plataforma interna

gestión de socios

solicitudes

beneficios

panel administrativo

🧪 Flujo de uso típico
Usuario socio
1️⃣ Entra al portal

http://localhost:8000
2️⃣ Hace login

/login.html
3️⃣ Sistema llama a

POST /auth/login
4️⃣ Recibe JWT

5️⃣ Accede a su panel

/dashboard.html
📊 Arquitectura completa del sistema
USUARIO
│
▼
PORTAL WEB
localhost:8000
│
▼
API BACKEND
localhost:3000
│
▼
PRISMA ORM
│
▼
POSTGRESQL
