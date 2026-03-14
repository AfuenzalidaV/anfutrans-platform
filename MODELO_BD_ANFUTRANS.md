🧠 Modelo de Base de Datos — Plataforma ANFUTRANS
Este modelo cubre 5 dominios principales:

1️⃣ Gestión institucional
2️⃣ Gestión de socios
3️⃣ Gestión de solicitudes
4️⃣ Sistema financiero
5️⃣ Portal institucional

1️⃣ Núcleo de Identidad
Usuario
Usuarios que acceden al sistema.

Usuario
Campos principales:

id
nombre
email
password_hash
rol_id
activo
fecha_creacion
ultimo_login
Rol
Define permisos del sistema.

Rol
Tipos recomendados:

ADMIN
DIRECTOR_NACIONAL
DIRECTOR_REGIONAL
OPERADOR
SOCIO
2️⃣ Gestión de Socios
Socio
Registro principal del padrón.

Socio
Campos:

id
rut
nombre
apellido
email
telefono
direccion
region_id
comuna_id
fecha_ingreso
estado
usuario_id
Estado del socio:

ACTIVO
SUSPENDIDO
RETIRADO
CuentaSocio
Registro financiero del socio.

CuentaSocio
Campos:

id
socio_id
saldo_actual
deuda_total
cuotas_pendientes
fecha_actualizacion
3️⃣ Solicitudes y Trámites
Solicitud
Base de todos los trámites.

Solicitud
Campos:

id
socio_id
tipo_solicitud_id
estado_solicitud_id
descripcion
fecha_creacion
fecha_resolucion
resuelto_por
TipoSolicitud
Tipos de trámites.

CERTIFICADO
PRESTAMO
BENEFICIO
CONSULTA
EstadoSolicitud
Estados del proceso.

PENDIENTE
EN_REVISION
DERIVADO
APROBADO
RECHAZADO
FINALIZADO
4️⃣ Sistema de Beneficios
Beneficio
Programas disponibles.

Beneficio
Ejemplos:

Prestamo solidario
Ayuda social
Convenios
Campos:

id
nombre
descripcion
activo
fecha_creacion
5️⃣ Sistema de Préstamos Solidarios
Este módulo es crítico.

Prestamo
Prestamo
Campos:

id
socio_id
monto
cuotas
valor_cuota
estado
fecha_otorgamiento
fecha_termino
Estados:

SOLICITADO
APROBADO
PAGANDO
FINALIZADO
RECHAZADO
CuotaPrestamo
Cada cuota del préstamo.

CuotaPrestamo
Campos:

id
prestamo_id
numero_cuota
monto
fecha_vencimiento
pagado
fecha_pago
6️⃣ Sistema de Descuentos por Planilla
Esto permite generar reportes mensuales.

DescuentoPlanilla
DescuentoPlanilla
Campos:

id
socio_id
tipo_descuento
monto
periodo
estado
Tipos:

CUOTA_PRESTAMO
CUOTA_ANEF
COOPEUCH
AHORROCOOP
SERVICIO
7️⃣ Portal Institucional
Noticia
Noticias públicas.

Noticia
Campos:

id
titulo
contenido
autor_id
fecha_publicacion
publicado
Documento
Repositorio documental.

Documento
Tipos:

LEY
DECRETO
RESOLUCION
FORMULARIO
INSTRUCTIVO
Campos:

id
titulo
tipo_documento
archivo_url
fecha_publicacion
Galeria
Fotos y videos.

Galeria
Campos:

id
titulo
tipo
url
fecha
Tipos:

FOTO
VIDEO
8️⃣ Auditoría del Sistema
Muy importante para plataformas institucionales.

LogSistema
LogSistema
Campos:

id
usuario_id
accion
modulo
fecha
ip
📊 Relación simplificada
Usuario
   │
   ├── Rol
   │
   └── Socio
         │
         ├── CuentaSocio
         │
         ├── Solicitud
         │
         ├── Prestamo
         │        │
         │        └── CuotaPrestamo
         │
         └── DescuentoPlanilla
