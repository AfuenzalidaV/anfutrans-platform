🧭 Mapa de Arquitectura — Plataforma ANFUTRANS
1️⃣ Ecosistema completo
La plataforma se divide en 3 grandes sistemas:

                    ┌──────────────────────────┐
                    │      PORTAL PÚBLICO      │
                    │   portal.anfutrans.cl    │
                    └────────────┬─────────────┘
                                 │
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   API BACKEND NESTJS     │
                    │      api.anfutrans.cl    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       BASE DE DATOS      │
                    │        PostgreSQL        │
                    └──────────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   PLATAFORMA INTERNA     │
                    │     app.anfutrans.cl     │
                    └──────────────────────────┘

🌐 2️⃣ Portal Institucional (público)
Objetivo:
Mostrar información institucional y servir como puerta de entrada a la plataforma.

portal.anfutrans.cl
Secciones del portal
HOME
│
├── Hero institucional
├── Noticias recientes
├── Beneficios
├── Acceso a socios
└── Contacto
Asociación
/asociacion
Subsecciones:

Historia
Misión
Visión
Directorio Nacional
Directorio Regional
Noticias
/noticias
Contenido:

Listado de noticias
Detalle de noticia
Archivo histórico
Documentos
Repositorio institucional.

/documentos
Tipos:

Leyes
Decretos
Resoluciones
Instructivos
Formularios
Pronunciamientos
Galería multimedia
/galeria
Contenido:

Fotos
Videos
Eventos institucionales
Contacto
/contacto
Incluye:

Formulario de contacto
Dirección institucional
Teléfono
Redes sociales
Mapa
🔐 3️⃣ Intranet de Socios
Sistema al que acceden funcionarios asociados.

app.anfutrans.cl
Panel del Socio
Funciones principales:

Dashboard personal
│
├── Mis solicitudes
├── Solicitar trámite
├── Solicitar préstamo solidario
├── Solicitar certificados
├── Estado de solicitudes
└── Historial de trámites
Cuenta del socio
/mi-cuenta
Incluye:

Datos personales
Historial financiero
Cuotas
Descuentos
🏛 4️⃣ Plataforma Directiva
Para directores nacionales y regionales.

Funciones:

Administración de solicitudes
│
├── revisar solicitudes
├── derivar solicitudes
├── aprobar o rechazar
└── firmar documentos
Flujo de aprobación
SOCIO
│
▼
Solicitud creada
│
▼
Revisión operador
│
▼
Director regional
│
▼
Director nacional
│
▼
Resolución final
💰 5️⃣ Sistema Financiero
Uno de los módulos más importantes.

Incluye:

Gestión de préstamos solidarios
Gestión de cuotas
Gestión de descuentos
Reportes financieros
Préstamos solidarios
Flujo:

Socio solicita préstamo
│
▼
Evaluación administrativa
│
▼
Aprobación directiva
│
▼
Generación plan de cuotas
│
▼
Registro de descuentos por planilla
📊 6️⃣ Administración del sistema
Acceso exclusivo ADMIN.

Funciones:

Gestión de usuarios
Gestión de roles
Gestión de catálogos
Parámetros del sistema
Auditoría
Logs
🗄 7️⃣ Base de Datos (Prisma + PostgreSQL)
Principales entidades:

usuarios
roles
socios
solicitudes
beneficios
prestamos
cuotas
descuentos
noticias
documentos
galeria
🔗 8️⃣ Integraciones futuras
La arquitectura permite integrar:

firma electrónica
correo institucional
sistema contable
API gobierno digital
pagos electrónicos
🧠 Vista conceptual completa
USUARIOS
│
┌──────────────┼──────────────┐
│ │ │
▼ ▼ ▼
VISITANTE SOCIO DIRECTOR
│ │ │
▼ ▼ ▼
┌───────────────────────────────────────────┐
│ PORTAL ANFUTRANS │
└───────────────────────────────────────────┘
│
▼
┌───────────────────────────────────────────┐
│ API NESTJS │
└───────────────────────────────────────────┘
│
▼
┌───────────────────────────────────────────┐
│ POSTGRESQL + PRISMA │
└───────────────────────────────────────────┘
│
▼
┌───────────────────────────────────────────┐
│ PLATAFORMA INTERNA ANGULAR │
└───────────────────────────────────────────┘
