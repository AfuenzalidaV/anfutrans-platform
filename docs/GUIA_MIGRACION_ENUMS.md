# GUÍA DE MIGRACIÓN A ENUMS - ANFUTRANS BASELINE v1.0

**Fecha**: 14 de marzo de 2026  
**Versión**: 1.0  
**Objetivo**: Migrar de tablas de catálogo a enums nativos de PostgreSQL

---

## 📋 RESUMEN DE MIGRACION

La baseline v1.0 elimina **7 tablas de catálogo** reemplazándolas por **8 enums** nativos de PostgreSQL para mejorar:

- ✅ Integridad referencial a nivel de base de datos
- ✅ Performance (reduce JOINs innecesarios)
- ✅ Type-safety en TypeScript
- ✅ Validación automática de valores
- ✅ Código más limpio y mantenible

---

## 🔄 TABLAS ELIMINADAS → ENUMS CREADOS

| Tabla Anterior     | Enum Nuevo        | Valores   | Impacto                       |
| ------------------ | ----------------- | --------- | ----------------------------- |
| `rol`              | `RolUsuario`      | 7 valores | Usuario                       |
| `estado_solicitud` | `EstadoSolicitud` | 7 valores | Solicitud, SolicitudHistorial |
| `tipo_solicitud`   | `TipoSolicitud`   | 9 valores | Solicitud                     |
| `tipo_beneficio`   | ❌ Eliminado      | -         | Beneficio (ahora sin tipo)    |
| `tipo_certificado` | ❌ Eliminado      | -         | No usado                      |
| `tipo_documento`   | `TipoDocumento`   | 9 valores | Documento                     |
| -                  | `EstadoSocio`     | 5 valores | Socio                         |
| -                  | `EstadoPrestamo`  | 9 valores | Prestamo                      |
| -                  | `TipoDescuento`   | 5 valores | DescuentoPlanilla             |
| -                  | `TipoMedia`       | 4 valores | Galeria                       |

---

## 🛠️ CAMBIOS EN MODELOS PRISMA

### 1. Usuario (antes usaba FK a `rol`)

**ANTES (v0.x)**:

```prisma
model usuario {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  nombre       String
  apellido     String
  rolId        Int       @map("rol_id") @db.SmallInt // FK a tabla rol
  activo       Boolean?  @default(true)

  rol          rol       @relation(fields: [rolId], references: [id])
}
```

**DESPUÉS (v1.0)**:

```prisma
model Usuario {
  id           String      @id @default(uuid())
  email        String      @unique
  passwordHash String      @map("password_hash")
  nombre       String
  apellido     String
  rol          RolUsuario  @default(FUNCIONARIO) // Enum directo
  activo       Boolean     @default(true)

  @@map("usuario")
}
```

### 2. Solicitud (antes usaba FK a `tipo_solicitud` y `estado_solicitud`)

**ANTES (v0.x)**:

```prisma
model solicitud {
  id                String    @id @default(uuid())
  socioId           String    @map("socio_id")
  tipoSolicitudId   Int       @map("tipo_solicitud_id") @db.SmallInt
  estadoSolicitudId Int       @map("estado_solicitud_id") @db.SmallInt

  socio           socio            @relation(...)
  tipoSolicitud   tipo_solicitud   @relation(...)
  estadoSolicitud estado_solicitud @relation(...)
}
```

**DESPUÉS (v1.0)**:

```prisma
model Solicitud {
  id              String           @id @default(uuid())
  socioId         String           @map("socio_id")
  tipo            TipoSolicitud    // Enum directo
  estado          EstadoSolicitud  @default(BORRADOR)

  socio           Socio            @relation(...)

  @@map("solicitud")
}
```

### 3. Socio (nuevo campo con enum)

**DESPUÉS (v1.0)**:

```prisma
model Socio {
  id       String       @id @default(uuid())
  rut      String       @unique
  nombre   String
  apellido String
  estado   EstadoSocio  @default(ACTIVO) // Nuevo enum

  @@map("socio")
}
```

### 4. Documento (antes usaba FK a `tipo_documento`)

**ANTES (v0.x)**:

```prisma
model documento {
  id              String    @id @default(uuid())
  nombreArchivo   String
  tipoDocumentoId Int       @map("tipo_documento_id")

  tipoDocumento   tipo_documento @relation(...)
}
```

**DESPUÉS (v1.0)**:

```prisma
model Documento {
  id            String        @id @default(uuid())
  nombreArchivo String        @map("nombre_archivo")
  tipo          TipoDocumento // Enum directo

  @@map("documento")
}
```

---

## 💻 CAMBIOS EN BACKEND (NestJS)

### 1. Eliminar Servicios de Catálogos

**Servicios a ELIMINAR**:

```
❌ src/catalogos/estado-solicitud/
❌ src/catalogos/tipo-solicitud/
❌ src/catalogos/tipo-beneficio/
❌ src/catalogos/tipo-certificado/
❌ src/catalogos/tipo-documento/
```

**Motivo**: Los valores ahora son enums en TypeScript, no necesitan CRUD.

### 2. Actualizar DTOs

#### ✏️ CreateUsuarioDto

**ANTES**:

```typescript
export class CreateUsuarioDto {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rolId: number; // ❌ FK numérico
}
```

**DESPUÉS**:

```typescript
import { RolUsuario } from "../../generated/prisma";

export class CreateUsuarioDto {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  @IsEnum(RolUsuario)
  rol: RolUsuario; // ✅ Enum tipado
}
```

#### ✏️ CreateSolicitudDto

**ANTES**:

```typescript
export class CreateSolicitudDto {
  socioId: string;
  tipoSolicitudId: number; // ❌ FK numérico
  estadoSolicitudId: number; // ❌ FK numérico
  observaciones?: string;
}
```

**DESPUÉS**:

```typescript
import { TipoSolicitud, EstadoSolicitud } from "../../generated/prisma";

export class CreateSolicitudDto {
  socioId: string;

  @IsEnum(TipoSolicitud)
  tipo: TipoSolicitud; // ✅ Enum tipado

  @IsEnum(EstadoSolicitud)
  @IsOptional()
  estado?: EstadoSolicitud; // ✅ Default: BORRADOR

  observaciones?: string;
}
```

#### ✏️ CreateDocumentoDto

**ANTES**:

```typescript
export class CreateDocumentoDto {
  nombreArchivo: string;
  ruta: string;
  tipoDocumentoId: number; // ❌ FK numérico
}
```

**DESPUÉS**:

```typescript
import { TipoDocumento } from "../../generated/prisma";

export class CreateDocumentoDto {
  nombreArchivo: string;
  ruta: string;

  @IsEnum(TipoDocumento)
  tipo: TipoDocumento; // ✅ Enum tipado
}
```

### 3. Actualizar Servicios

#### ✏️ AuthService

**CAMBIOS REQUERIDOS**:

```typescript
// ANTES: Buscar usuario con relación a tabla rol
const usuario = await this.prisma.usuario.findUnique({
  where: { email },
  include: { rol: true }, // ❌ rol ya no es una relación
});

// Acceder a propiedades de rol
const rolId = usuario.rolId; // ❌
const rolNombre = usuario.rol.nombre; // ❌

// DESPUÉS: rol es un enum directo
const usuario = await this.prisma.usuario.findUnique({
  where: { email },
  // Sin include, rol viene automáticamente
});

// Acceder directamente al enum
const rol = usuario.rol; // ✅ RolUsuario enum
// Valores: ADMIN, DIRECTOR_NACIONAL, FUNCIONARIO, etc.
```

**Ejemplo completo**:

```typescript
async login(loginDto: LoginDto) {
  const usuario = await this.prisma.usuario.findUnique({
    where: { email: loginDto.email },
    // ✅ rol viene automáticamente como enum
  });

  if (!usuario) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const passwordValido = await bcrypt.compare(
    loginDto.password,
    usuario.passwordHash,
  );

  if (!passwordValido) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const payload = {
    sub: usuario.id,
    email: usuario.email,
    rol: usuario.rol, // ✅ Enum 'ADMIN' | 'FUNCIONARIO' | ...
  };

  return {
    access_token: this.jwtService.sign(payload),
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol, // ✅ String del enum
    },
  };
}
```

#### ✏️ AuthService.register()

**ANTES**:

```typescript
async register(registerDto: RegisterDto) {
  // Buscar rol por defecto
  const rolPorDefecto = await this.prisma.rol.findFirst({
    where: { codigo: 'SOCIO' }, // ❌ Tabla ya no existe
  });

  const nuevoUsuario = await this.prisma.usuario.create({
    data: {
      email: registerDto.email,
      passwordHash: await bcrypt.hash(registerDto.password, 10),
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      rolId: rolPorDefecto.id, // ❌ FK numérico
    },
    include: { rol: true }, // ❌ Relación inexistente
  });

  return {
    id: nuevoUsuario.id,
    rol: {
      id: nuevoUsuario.rol.id,     // ❌
      nombre: nuevoUsuario.rol.nombre, // ❌
    },
  };
}
```

**DESPUÉS**:

```typescript
async register(registerDto: RegisterDto) {
  // ✅ Rol directo del DTO o default
  const rolDefault = registerDto.rol || RolUsuario.SOCIO;

  const nuevoUsuario = await this.prisma.usuario.create({
    data: {
      email: registerDto.email,
      passwordHash: await bcrypt.hash(registerDto.password, 10),
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      rol: rolDefault, // ✅ Enum directo
    },
    // Sin include innecesario
  });

  return {
    id: nuevoUsuario.id,
    email: nuevoUsuario.email,
    nombre: nuevoUsuario.nombre,
    rol: nuevoUsuario.rol, // ✅ String del enum: 'SOCIO'
  };
}
```

#### ✏️ SolicitudesService

**ANTES**:

```typescript
async create(createDto: CreateSolicitudDto) {
  return this.prisma.solicitud.create({
    data: {
      socioId: createDto.socioId,
      tipoSolicitudId: createDto.tipoSolicitudId,      // ❌
      estadoSolicitudId: createDto.estadoSolicitudId,  // ❌
      observaciones: createDto.observaciones,
    },
    include: {
      tipoSolicitud: true,   // ❌ Relación inexistente
      estadoSolicitud: true, // ❌
    },
  });
}
```

**DESPUÉS**:

```typescript
async create(createDto: CreateSolicitudDto) {
  return this.prisma.solicitud.create({
    data: {
      socioId: createDto.socioId,
      tipo: createDto.tipo,                    // ✅ Enum directo
      estado: createDto.estado || EstadoSolicitud.BORRADOR, // ✅
      observaciones: createDto.observaciones,
    },
    // Sin include de enums
  });
}

async updateEstado(id: string, nuevoEstado: EstadoSolicitud) {
  return this.prisma.solicitud.update({
    where: { id },
    data: {
      estado: nuevoEstado, // ✅ Enum tipado
    },
  });
}
```

### 4. Actualizar Guards y Decorators

#### ✏️ Roles Decorator

**ANTES**:

```typescript
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Uso
@Roles('admin', 'director') // ❌ Strings mágicos sin tipo
```

**DESPUÉS**:

```typescript
import { RolUsuario } from '../../generated/prisma';

export const Roles = (...roles: RolUsuario[]) => SetMetadata('roles', roles);

// Uso
@Roles(RolUsuario.ADMIN, RolUsuario.DIRECTOR_NACIONAL) // ✅ Tipado
```

#### ✏️ RolesGuard

**ANTES**:

```typescript
const requiredRoles = this.reflector.get<string[]>(
  "roles",
  context.getHandler(),
);
const user = request.user;

return requiredRoles.some((role) => user.rol?.codigo === role); // ❌
```

**DESPUÉS**:

```typescript
const requiredRoles = this.reflector.get<RolUsuario[]>(
  "roles",
  context.getHandler(),
);
const user = request.user;

return requiredRoles.some((role) => user.rol === role); // ✅
```

---

## 🎨 CAMBIOS EN FRONTEND (Angular)

### 1. Actualizar Modelos TypeScript

**ANTES** (`src/app/shared/models/usuario.model.ts`):

```typescript
export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rolId: number; // ❌
  rol?: {
    // ❌ Objeto completo
    id: number;
    codigo: string;
    nombre: string;
  };
}
```

**DESPUÉS**:

```typescript
export enum RolUsuario {
  ADMIN = "ADMIN",
  DIRECTOR_NACIONAL = "DIRECTOR_NACIONAL",
  DIRECTOR_REGIONAL = "DIRECTOR_REGIONAL",
  FUNCIONARIO = "FUNCIONARIO",
  SOCIO = "SOCIO",
  CONTADOR = "CONTADOR",
  AUDITOR = "AUDITOR",
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: RolUsuario; // ✅ Enum directo
}
```

### 2. Actualizar Formularios

**ANTES**:

```typescript
export class UsuarioFormComponent {
  roles$ = this.http.get<Rol[]>("/api/catalogos/roles"); // ❌ API inexistente

  form = this.fb.group({
    rolId: [null, Validators.required], // ❌
  });
}
```

**DESPUÉS**:

```typescript
export class UsuarioFormComponent {
  roles = Object.values(RolUsuario); // ✅ Enum como array

  rolesLabels = {
    [RolUsuario.ADMIN]: "Administrador",
    [RolUsuario.DIRECTOR_NACIONAL]: "Director Nacional",
    [RolUsuario.FUNCIONARIO]: "Funcionario",
    // ...
  };

  form = this.fb.group({
    rol: [RolUsuario.FUNCIONARIO, Validators.required], // ✅
  });
}
```

**Template**:

```html
<!-- ANTES -->
<mat-select formControlName="rolId">
  <mat-option *ngFor="let rol of roles$ | async" [value]="rol.id">
    {{ rol.nombre }}
  </mat-option>
</mat-select>

<!-- DESPUÉS -->
<mat-select formControlName="rol">
  <mat-option *ngFor="let rol of roles" [value]="rol">
    {{ rolesLabels[rol] }}
  </mat-option>
</mat-select>
```

### 3. Actualizar Servicios

**ANTES**:

```typescript
// En AuthService
login(credentials): Observable<AuthResponse> {
  return this.http.post<AuthResponse>('/api/auth/login', credentials)
    .pipe(
      tap(response => {
        // Acceso a rol anidado
        const rolNombre = response.usuario.rol.nombre; // ❌
      })
    );
}
```

**DESPUÉS**:

```typescript
login(credentials): Observable<AuthResponse> {
  return this.http.post<AuthResponse>('/api/auth/login', credentials)
    .pipe(
      tap(response => {
        // Acceso directo al enum
        const rol = response.usuario.rol; // ✅ 'ADMIN' | 'FUNCIONARIO' | ...
      })
    );
}
```

---

## 📊 COMPARACIÓN DE QUERIES

### Ejemplo: Listar usuarios con su rol

**ANTES (v0.x con JOIN)**:

```typescript
// Backend
const usuarios = await prisma.usuario.findMany({
  include: { rol: true }, // JOIN a tabla rol
});

// SQL generado
SELECT u.*, r.id, r.codigo, r.nombre
FROM usuario u
INNER JOIN rol r ON u.rol_id = r.id;

// Respuesta JSON
[
  {
    "id": "uuid-1",
    "email": "admin@anfutrans.cl",
    "nombre": "Admin",
    "rolId": 1,
    "rol": {
      "id": 1,
      "codigo": "ADMIN",
      "nombre": "Administrador"
    }
  }
]
```

**DESPUÉS (v1.0 sin JOIN)**:

```typescript
// Backend
const usuarios = await prisma.usuario.findMany();
// Sin include necesario

// SQL generado
SELECT * FROM usuario;

// Respuesta JSON
[
  {
    "id": "uuid-1",
    "email": "admin@anfutrans.cl",
    "nombre": "Admin",
    "rol": "ADMIN" // ✅ Enum directo
  }
]
```

**Beneficios**:

- ✅ -1 JOIN = Más rápido
- ✅ -50% tamaño de respuesta JSON
- ✅ Type-safe en TypeScript

---

## 🔍 VALIDACIONES Y SEGURIDAD

### Validación Automática con class-validator

```typescript
import { IsEnum } from "class-validator";
import { RolUsuario, EstadoSolicitud } from "../../generated/prisma";

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(RolUsuario, {
    message:
      "Rol inválido. Valores permitidos: " +
      Object.values(RolUsuario).join(", "),
  })
  rol: RolUsuario; // ✅ Validación automática
}
```

**Ventajas**:

- ❌ Antes: Validar FK numérico + verificar existencia en BD
- ✅ Ahora: Validación inmediata sin query a BD

---

## 📝 CHECKLIST DE MIGRACIÓN

### Backend

- [x] Actualizar `prisma/schema.prisma` con enums
- [x] Ejecutar `prisma db push` o crear migración
- [x] Regenerar Prisma Client: `prisma generate`
- [ ] Eliminar carpetas de servicios de catálogos:
  - [ ] `src/catalogos/estado-solicitud/`
  - [ ] `src/catalogos/tipo-solicitud/`
  - [ ] `src/catalogos/tipo-documento/`
  - [ ] `src/catalogos/tipo-beneficio/`
  - [ ] `src/catalogos/tipo-certificado/`
- [ ] Actualizar DTOs:
  - [ ] `src/auth/dto/create-usuario.dto.ts`
  - [ ] `src/auth/dto/register.dto.ts`
  - [ ] `src/tramites/dto/create-solicitud.dto.ts`
  - [ ] `src/tramites/dto/update-solicitud.dto.ts`
  - [ ] `src/contenidos/dto/create-documento.dto.ts`
- [ ] Actualizar Services:
  - [ ] `src/auth/auth.service.ts` (eliminar include de rol)
  - [ ] `src/auth/strategies/jwt.strategy.ts`
  - [ ] `src/tramites/tramites.service.ts`
  - [ ] `src/socios/socios.service.ts`
  - [ ] `src/contenidos/contenidos.service.ts`
- [ ] Actualizar Guards:
  - [ ] `src/auth/guards/roles.guard.ts`
  - [ ] `src/auth/decorators/roles.decorator.ts`
- [ ] Eliminar rutas de catálogos en `app.module.ts`:
  - [ ] Quitar imports de módulos eliminados
  - [ ] Actualizar Swagger tags
- [ ] Ejecutar tests:
  - [ ] `npm run test`
  - [ ] `npm run test:e2e`
- [ ] Compilar: `npm run build`

### Frontend

- [ ] Crear enums en `src/app/shared/enums/`:
  - [ ] `rol-usuario.enum.ts`
  - [ ] `estado-solicitud.enum.ts`
  - [ ] `tipo-solicitud.enum.ts`
  - [ ] `tipo-documento.enum.ts`
- [ ] Actualizar modelos:
  - [ ] `src/app/shared/models/usuario.model.ts`
  - [ ] `src/app/shared/models/solicitud.model.ts`
  - [ ] `src/app/shared/models/documento.model.ts`
- [ ] Actualizar servicios:
  - [ ] Eliminar llamadas a APIs de catálogos
  - [ ] Usar enums locales
- [ ] Actualizar componentes:
  - [ ] Formularios con selects de enums
  - [ ] Pipes para labels de enums
- [ ] Compilar: `npm run build`

### Base de Datos

- [x] Backup de BD antes de migración
- [x] Aplicar nuevo schema
- [ ] Migrar datos existentes (si aplica):
  - [ ] Script SQL para mapear rolId → RolUsuario
  - [ ] Script SQL para mapear estadoSolicitudId → EstadoSolicitud
- [ ] Verificar integridad de datos

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error 1: "Property 'rol' does not exist on type 'PrismaService'"

**Causa**: Prisma Client no regenerado después de cambiar schema.

**Solución**:

```bash
cd apps/backend
npx prisma generate
npm run build
```

### Error 2: "rolId does not exist"

**Causa**: Código antiguo usando FK numérico.

**Solución**: Buscar y reemplazar:

```typescript
// Buscar: usuario.rolId
// Reemplazar: usuario.rol

// Buscar: include: { rol: true }
// Reemplazar: (eliminar, no necesario)
```

### Error 3: "tipo_solicitud does not exist"

**Causa**: Query a tabla eliminada.

**Solución**: Usar enum directamente:

```typescript
// ❌ ANTES
const tipos = await prisma.tipo_solicitud.findMany();

// ✅ DESPUÉS
import { TipoSolicitud } from "../generated/prisma";
const tipos = Object.values(TipoSolicitud);
```

### Error 4: Import de @prisma/client falla

**Causa**: Prisma Client generado en ubicación custom.

**Solución**:

```typescript
// ❌ ANTES
import { PrismaClient } from "@prisma/client";

// ✅ DESPUÉS
import { PrismaClient } from "../generated/prisma";
```

---

## 📚 RECURSOS ADICIONALES

- [Prisma Enums Documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-enums)
- [NestJS Validation with Enums](https://docs.nestjs.com/techniques/validation)
- [TypeScript Enums Best Practices](https://www.typescriptlang.org/docs/handbook/enums.html)
- [PostgreSQL ENUM Type](https://www.postgresql.org/docs/current/datatype-enum.html)

---

**Documento creado**: 14/03/2026  
**Última actualización**: 14/03/2026  
**Próxima revisión**: Después de completar migración backend
