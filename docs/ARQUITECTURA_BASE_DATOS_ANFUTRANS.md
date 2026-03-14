# ARQUITECTURA BASE DE DATOS ANFUTRANS

## Baseline Architecture v1.0-database-baseline

**Fecha**: 14 de marzo de 2025  
**Versión**: 1.0  
**Autor**: Principal Backend Architect  
**Tecnología**: PostgreSQL 14+ con Prisma ORM 7.4.2

---

## 📋 RESUMEN EJECUTIVO

Este documento describe la arquitectura baseline de la base de datos de la Plataforma ANFUTRANS, diseñada para gestionar integralmente las operaciones de la Asociación Nacional de Trabajadores del Transporte de Carga de Chile.

### Características Principales

- **24 tablas** organizadas en 8 módulos funcionales
- **8 enums** de dominio para garantizar integridad referencial
- **Schema único** `core` para toda la lógica de negocio
- **UUID como PKs** para escalabilidad y seguridad
- **Auditoría completa** mediante tablas de logs y historiales
- **Módulos futuros** pre-diseñados para votación electrónica y asambleas

---

## 🏗️ ARQUITECTURA CONCEPTUAL

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATAFORMA ANFUTRANS                      │
│                  Base de Datos PostgreSQL                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────┬──────────────────────┐
│  CATÁLOGOS       │   SEGURIDAD      │   SOCIOS             │
│  ════════════    │   ═════════      │   ══════             │
│  • Region        │   • Usuario      │   • Socio            │
│  • Comuna        │   • (RolUsuario) │   • CuentaSocio      │
│  • CargoDirg.    │                  │   • (EstadoSocio)    │
│  • Parametros    │                  │                      │
└──────────────────┴──────────────────┴──────────────────────┘

┌──────────────────┬──────────────────┬──────────────────────┐
│  SOLICITUDES     │   FINANCIERO     │   BENEFICIOS         │
│  ════════════    │   ══════════     │   ══════════         │
│  • Solicitud     │   • Prestamo     │   • Beneficio        │
│  • SolicitudHist │   • CuotaPresta. │   • BeneficioSocio   │
│  • SolicitudDoc  │   • DescuentoPla.│                      │
│  • (TipoSolic.)  │   • (EstadoPresta│                      │
│  • (EstadoSolic.)│   • (TipoDescue.)│                      │
└──────────────────┴──────────────────┴──────────────────────┘

┌──────────────────┬──────────────────┬──────────────────────┐
│  PORTAL          │   AUDITORÍA      │   FUTUROS            │
│  ═══════         │   ═════════      │   ═══════            │
│  • Noticia       │   • LogSistema   │   • Votacion         │
│  • Documento     │                  │   • Voto             │
│  • Galeria       │                  │   • Asamblea         │
│  • (TipoDoc.)    │                  │   • ActaAsamblea     │
│  • (TipoMedia)   │                  │   • FirmaDocumento   │
└──────────────────┴──────────────────┴──────────────────────┘
```

---

## 📊 MÓDULOS Y TABLAS

### 1. MÓDULO DE CATÁLOGOS BÁSICOS

Tablas de referencia y configuración del sistema.

| Tabla               | Descripción                    | Registros Estimados |
| ------------------- | ------------------------------ | ------------------- |
| `region`            | Regiones de Chile (I a XVI)    | 16                  |
| `comuna`            | Comunas de Chile por región    | 346                 |
| `cargo_dirigencial` | Cargos directivos de ANFUTRANS | 15-30               |
| `parametro_sistema` | Configuraciones del sistema    | 50-100              |

**Características**:

- Datos maestros semi-estáticos
- Activación/desactivación mediante flag `activo`
- Códigos únicos para integración externa

---

### 2. MÓDULO DE SEGURIDAD Y USUARIOS

Gestión de usuarios y control de acceso.

| Tabla     | Descripción          | PK   | Enum Asociado |
| --------- | -------------------- | ---- | ------------- |
| `usuario` | Usuarios del sistema | UUID | `RolUsuario`  |

**Enum `RolUsuario`**:

```
ADMIN             // Administrador total
DIRECTOR_NACIONAL // Director nacional
DIRECTOR_REGIONAL // Director regional
FUNCIONARIO       // Personal administrativo
SOCIO             // Socio de ANFUTRANS
CONTADOR          // Contador/Tesorero
AUDITOR           // Auditor interno
```

**Capacidades**:

- Autenticación integrada con JWT
- Tracking de último login (`last_login_at`)
- Soft delete mediante `activo`
- RUT único para identificación chilena

---

### 3. MÓDULO DE SOCIOS

Gestión de socios afiliados y sus cuentas financieras.

| Tabla          | Descripción                 | Relación               | Índices Clave             |
| -------------- | --------------------------- | ---------------------- | ------------------------- |
| `socio`        | Datos personales de socios  | 1:1 con `cuenta_socio` | RUT, estado, número_socio |
| `cuenta_socio` | Cuenta financiera del socio | N/A                    | socio_id                  |

**Enum `EstadoSocio`**:

```
ACTIVO      // Socio activo con derechos vigentes
INACTIVO    // Socio temporalmente inactivo
SUSPENDIDO  // Socio suspendido por incumplimientos
RETIRADO    // Socio retirado voluntariamente
FALLECIDO   // Socio fallecido
```

**Campos Destacados**:

- `numero_socio`: Identificador único interno
- `fecha_ingreso`: Para cálculo de antigüedad
- `telefono_emergencia`: Seguridad y contacto
- `cuenta_socio.saldo_disponible`: Fondos disponibles
- `cuenta_socio.saldo_pendiente_pagos`: Deudas pendientes

---

### 4. MÓDULO DE SOLICITUDES Y TRÁMITES

Sistema de gestión de solicitudes con flujo de estados.

| Tabla                 | Descripción             | Auditoría           |
| --------------------- | ----------------------- | ------------------- |
| `solicitud`           | Solicitudes de trámites | Completa            |
| `solicitud_historial` | Cambios de estado       | Timestamp + usuario |
| `solicitud_documento` | Docs adjuntos (M:N)     | Timestamp           |

**Enum `TipoSolicitud`**:

```
CERTIFICADO_AFILIACION
CERTIFICADO_ANTIGUEDAD
PRESTAMO
BENEFICIO_SALUD
BENEFICIO_EDUCACION
SUBSIDIO_HABITACIONAL
AYUDA_SOCIAL
ACTUALIZACION_DATOS
OTRO
```

**Enum `EstadoSolicitud`**:

```
BORRADOR    → PENDIENTE → EN_REVISION → APROBADA/RECHAZADA → COMPLETADA
                                              ↓
                                         CANCELADA (usuario)
```

**Métricas Rastreables**:

- Tiempo de aprobación: `fecha_solicitud` → `fecha_aprobacion`
- Tiempo de completitud: `fecha_aprobacion` → `fecha_completada`
- Trazabilidad completa mediante `solicitud_historial`

---

### 5. MÓDULO FINANCIERO

Gestión de préstamos y descuentos por planilla.

| Tabla                | Descripción            | Cálculos             |
| -------------------- | ---------------------- | -------------------- |
| `prestamo`           | Préstamos otorgados    | Tasa interés, cuotas |
| `cuota_prestamo`     | Cuotas de amortización | Capital + interés    |
| `descuento_planilla` | Descuentos mensuales   | Por mes/año          |

**Enum `EstadoPrestamo`**:

```
SOLICITADO → EN_EVALUACION → APROBADO → DESEMBOLSADO → EN_PAGO → PAGADO
                                  ↓              ↓
                             CANCELADO      MOROSO → CASTIGADO
```

**Enum `TipoDescuento`**:

```
CUOTA_PRESTAMO     // Pago de préstamo
CUOTA_SOCIAL       // Cuota mensual obligatoria
APORTE_VOLUNTARIO  // Aporte adicional del socio
FONDO_ESPECIAL     // Fondo solidario
VARIOS             // Otros descuentos
```

**Algoritmo de Cuotas**:

```
cuota_mes = (capital * tasa) / (1 - (1 + tasa)^-n)
interes_mes = saldo_restante * tasa
capital_mes = cuota_mes - interes_mes
```

---

### 6. MÓDULO DE BENEFICIOS

Gestión de beneficios otorgados a socios.

| Tabla             | Descripción            | Tipo Relación |
| ----------------- | ---------------------- | ------------- |
| `beneficio`       | Catálogo de beneficios | 1:N           |
| `beneficio_socio` | Beneficios otorgados   | M:N           |

**Características**:

- Vigencia temporal: `vigencia_desde` / `vigencia_hasta`
- Monto máximo configurable
- Requisitos en texto libre
- Tracking de documentos de respaldo

---

### 7. MÓDULO DE PORTAL Y CONTENIDOS

Gestión de contenido público institucional.

| Tabla       | Descripción               | Visibilidad         |
| ----------- | ------------------------- | ------------------- |
| `noticia`   | Noticias y comunicados    | Publicada/destacada |
| `documento` | Docs institucionales      | Público/privado     |
| `galeria`   | Multimedia (fotos/videos) | Público             |

**Enum `TipoDocumento`**:

```
LEY, DECRETO, REGLAMENTO, ACTA, CONVENIO,
FORMULARIO, INSTRUCTIVO, CIRCULAR, OTRO
```

**Enum `TipoMedia`**:

```
IMAGEN, VIDEO, DOCUMENTO, AUDIO
```

**Funcionalidades**:

- Noticias con autor rastreable
- Documentos públicos/privados
- Galería ordenable con thumbnails
- Metadatos completos (tamaño, fecha)

---

### 8. MÓDULO DE AUDITORÍA

Logs de todas las operaciones del sistema.

| Tabla         | Descripción        | Retención  |
| ------------- | ------------------ | ---------- |
| `log_sistema` | Auditoría completa | Indefinida |

**Datos Capturados**:

- Usuario ejecutor
- Acción realizada
- Módulo afectado
- Entidad y ID impactado
- Detalles en JSON
- IP y User-Agent
- Timestamp automático

**Índices Optimizados**:

- `(usuario_id, fecha)` → Auditoría por usuario
- `(modulo, accion, fecha)` → Análisis de operaciones
- `(entidad, entidad_id)` → Historia de una entidad

---

## 🚀 MÓDULOS FUTUROS (Pre-diseñados)

Tablas preparadas para funcionalidades futuras.

### Votación Electrónica

| Tabla      | Descripción               |
| ---------- | ------------------------- |
| `votacion` | Elecciones y consultas    |
| `voto`     | Votos emitidos (anónimos) |

**Características**:

- Votaciones con quórum configurable
- Voto hash para anonimato
- Restricción 1 voto por socio
- Resultados públicos opcionales

### Asambleas

| Tabla           | Descripción               |
| --------------- | ------------------------- |
| `asamblea`      | Reuniones institucionales |
| `acta_asamblea` | Actas de sesiones         |

**Funcionalidades**:

- Ordinarias/Extraordinarias
- Modalidad: Presencial/Remota/Híbrida
- Quórum y asistencia
- Acuerdos en texto estructurado

### Firmas Digitales

| Tabla             | Descripción         |
| ----------------- | ------------------- |
| `firma_documento` | Firmas electrónicas |

**Capacidades**:

- Firma digital cifrada
- RUT del firmante
- Timestamp de firma
- Documentos múltiples firmantes

---

## 🔐 SEGURIDAD Y MEJORES PRÁCTICAS

### Integridad de Datos

✅ **Foreign Keys con Cascadas Controladas**:

- `onDelete: Cascade` en relaciones dependientes (cuotas, historiales)
- Sin cascada en relaciones principales (protección de socios/usuarios)

✅ **Constraints Únicos**:

- RUT único en socios y usuarios
- Email único en usuarios
- Combinaciones únicas en M:N (socio + beneficio)

✅ **Defaults Inteligentes**:

- UUID automáticos
- Timestamps de creación/actualización
- Estados iniciales consistentes (BORRADOR, SOLICITADO, ACTIVO)

✅ **Soft Deletes**:

- Campo `activo` en entidades principales
- Preservación de datos históricos

### Performance

🚀 **Índices Estratégicos**:

- Índices simples en FKs más consultados
- Índices compuestos: `(socio_id, estado)` en solicitudes
- Índices en fechas para reportes temporales

🚀 **Tipos de Datos Optimizados**:

- `SmallInt` para IDs de catálogos (<32k registros)
- `Decimal(12,2)` para montos financieros
- `VarChar` con límites apropiados (no `Text` innecesario)

🚀 **Desnormalización Controlada**:

- `cuenta_socio`: Totales precalculados para dashboard
- `saldo_pendiente_pagos`: Evita JOINs complejos

### Auditoría

📊 **Trazabilidad Completa**:

- Todos los cambios de estado registrados
- Usuario responsable identificado
- Timestamps precisos (6 decimales)

📊 **Logs Estructurados**:

- Módulo y acción categorizados
- Detalles en JSON para flexibilidad
- IP y User-Agent para seguridad

---

## 📈 ESTADÍSTICAS DE LA BASELINE

### Resumen de Entidades

| Categoría          | Cantidad | Detalles                      |
| ------------------ | -------- | ----------------------------- |
| **Tablas Core**    | 19       | Operación actual              |
| **Tablas Futuras** | 5        | Votaciones, asambleas, firmas |
| **Enums**          | 8        | 59 valores totales            |
| **Relaciones 1:1** | 1        | Socio ↔ CuentaSocio           |
| **Relaciones 1:N** | 15       | Usuario → Noticias, etc.      |
| **Relaciones M:N** | 2        | Beneficios, Documentos        |
| **Índices**        | 47       | Optimización de queries       |

### Líneas de Código

- **schema.prisma**: 720 líneas
- **Comentarios**: ~150 líneas (21%)
- **Modelo promedio**: 30 líneas

---

## 🛠️ HERRAMIENTAS Y TECNOLOGÍA

### Stack Tecnológico

```
┌─────────────────────────────────────┐
│  PostgreSQL 14+                      │
│  • Schemas: core                     │
│  • Extensions: uuid-ossp, pg_trgm   │
└─────────────────────────────────────┘
         ↓ (conexión)
┌─────────────────────────────────────┐
│  Prisma ORM 7.4.2                    │
│  • Client generado automáticamente   │
│  • Migraciones versionadas           │
│  • Type-safe queries                 │
└─────────────────────────────────────┘
         ↓ (integración)
┌─────────────────────────────────────┐
│  NestJS 11.0.1                       │
│  • DTOs tipados                      │
│  • Servicios con PrismaService       │
│  • Validación automática             │
└─────────────────────────────────────┘
```

### Comandos Útiles

```bash
# Generar Prisma Client
npx prisma generate

# Aplicar esquema a BD (desarrollo)
npx prisma db push

# Crear migración
npx prisma migrate dev --name nombre-migracion

# Aplicar migraciones (producción)
npx prisma migrate deploy

# Abrir Prisma Studio (GUI)
npx prisma studio

# Validar esquema
npx prisma validate

# Formatear esquema
npx prisma format
```

---

## 📝 CONVENCIONES DE NOMENCLATURA

### Modelos (PascalCase)

```
✅ Usuario, Socio, CuentaSocio
❌ usuario, cuenta_socio
```

### Tablas BD (snake_case)

```
@@map("usuario")
@@map("cuenta_socio")
@@map("solicitud_historial")
```

### Enums (PascalCase + SCREAMING_SNAKE)

```
enum RolUsuario {
  ADMIN
  DIRECTOR_NACIONAL
  @@map("rol_usuario")
}
```

### Campos (camelCase → snake_case)

```
fechaNacimiento  → fecha_nacimiento
telefonoEmergencia → telefono_emergencia
```

---

## 🔄 FLUJOS DE NEGOCIO CLAVE

### Flujo de Solicitud de Préstamo

```
1. Socio → BORRADOR (crea solicitud tipo PRESTAMO)
2. Socio → PENDIENTE (envía solicitud)
   → Log: CREATE solicitud
3. Funcionario → EN_REVISION
   → SolicitudHistorial: PENDIENTE → EN_REVISION
4a. Director → APROBADA (monto aprobado)
    → Crea Prestamo (estado: APROBADO)
    → Genera CuotaPrestamo (1...N)
4b. Director → RECHAZADA (motivo_rechazo)
5. Contador → Prestamo.DESEMBOLSADO
   → Actualiza CuentaSocio.total_prestamos
6. Sistema → Genera DescuentoPlanilla mensual
7. Socio paga → CuotaPrestamo.pagada = true
8. Todas pagadas → Prestamo.PAGADO
   → Solicitud.COMPLETADA
```

### Flujo de Beneficio

```
1. Admin → Crea Beneficio (vigencia, monto_maximo)
2. Socio solicita → Solicitud tipo BENEFICIO_SALUD
3. Aprobación → BeneficioSocio (monto_otorgado, documento_respaldo)
4. Tracking → BeneficioSocio.fecha_otorgamiento
```

---

## 📚 DOCUMENTOS RELACIONADOS

- [Arquitectura del Sistema](./system-architecture.md)
- [Arquitectura del Backend](./arquitectura-backend.md)
- [Endpoints de la API](./api-endpoints.md)
- [Diagrama ERD](./database-erd.dbml)
- [Checklist de Setup](./dev-setup-checklist.md)

---

## 🎯 PRÓXIMOS PASOS

### Fase de Implementación Backend (FASE 6)

1. ✅ **Actualizar DTOs** para usar enums en lugar de IDs
   - `CreateSolicitudDto`: tipo TipoSolicitud
   - `UpdateSolicitudDto`: estado EstadoSolicitud
   - `CreateUsuarioDto`: rol RolUsuario

2. ✅ **Actualizar Services** para nuevos modelos
   - Remover relaciones a tablas de catálogo eliminadas
   - Usar enums directamente
   - Actualizar queries con nuevos nombres de tablas

3. ✅ **Validar Endpoints** en Swagger
   - Verificar que los enums se muestren correctamente
   - Probar CRUD de todas las entidades

### Fase de Seed y Testing

4. 📝 **Crear nuevo seed.ts** con datos realistas
   - 16 regiones + 346 comunas
   - 10-50 socios con estados variados
   - 10-20 solicitudes en diferentes estados
   - 3-5 préstamos con cuotas
   - 5-10 beneficios

5. 📝 **Tests de integración**
   - Flujo completo de solicitud de préstamo
   - Cálculo de cuotas
   - Actualización de cuenta_socio

---

## ✅ VALIDACIÓN DE BASELINE

- [x] Schema.prisma completo y validado
- [x] Prisma Client generado correctamente
- [x] Base de datos sincronizada con `db push`
- [x] Todos los enums definidos y mapeados
- [x] Relaciones configuradas con cascadas apropiadas
- [x] Índices definidos para performance
- [x] Documentación técnica completa
- [ ] Backend integrado y compilando
- [ ] Tests unitarios pasando
- [ ] Seed data cargado
- [ ] Swagger UI funcional

---

**Versión**: 1.0-database-baseline  
**Última Actualización**: 14/03/2025  
**Próxima Revisión**: Al completar integración con backend
