# ✅ FASE 3 - AUTENTICACIÓN JWT REAL Y BCRYPT

**Versión**: v0.7-security
**Fecha**: 14 de marzo de 2026
**Estado**: ✅ COMPLETADO

---

## 📋 RESUMEN DE CAMBIOS

La FASE 3 reemplaza completamente el sistema de autenticación FAKE por una implementación real y segura usando **JWT** y **bcrypt**.

### ✅ Logros Principales

- ✅ Autenticación JWT real implementada
- ✅ Passwords hasheados con bcrypt (10 rounds)
- ✅ Estrategia Passport JWT configurada
- ✅ Guards de autenticación creados
- ✅ Decoradores personalizados (@CurrentUser, @Public)
- ✅ Integración con base de datos Prisma
- ✅ Script de seed para datos iniciales
- ✅ Compilación exitosa sin errores

---

## 🔐 ARQUITECTURA DE SEGURIDAD

### Flujo de Autenticación

```
1. Cliente → POST /auth/login { email, password }
2. AuthService busca usuario en BD
3. bcrypt.compare(password, usuario.passwordHash)
4. Si válido: generar JWT con payload { sub, email, rolId }
5. Retornar { access_token, user, rol }
6. Cliente guarda token en localStorage/sessionStorage
7. Requests futuros: Authorization: Bearer <token>
8. JwtStrategy valida token y extrae usuario
9. Usuario inyectado en request.user
```

### Componentes de Seguridad

```
apps/backend/src/auth/
├── strategies/
│   └── jwt.strategy.ts          # Validación de JWT
├── guards/
│   ├── jwt-auth.guard.ts        # Guard para rutas protegidas
│   └── index.ts
├── decorators/
│   ├── current-user.decorator.ts # @CurrentUser() en controllers
│   ├── public.decorator.ts       # @Public() para rutas públicas
│   └── index.ts
├── auth.service.ts               # Lógica de login/register
├── auth.controller.ts            # Endpoints /auth/*
└── auth.module.ts                # Configuración JWT + Passport
```

---

## 📦 DEPENDENCIAS INSTALADAS

```json
{
  "dependencies": {
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^6.0.0"
  },
  "devDependencies": {
    "@types/bcrypt": "latest",
    "@types/passport-jwt": "latest"
  }
}
```

---

## 🔧 CONFIGURACIÓN

### Variables de Entorno (.env)

```env
# JWT Configuration
JWT_SECRET="dev_secret_key_CAMBIAR_EN_PRODUCCION_use_crypto_randomBytes_32_hex"
JWT_EXPIRATION="24h"
JWT_REFRESH_SECRET="dev_refresh_secret_CAMBIAR_EN_PRODUCCION"
JWT_REFRESH_EXPIRATION="7d"

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Database
DATABASE_URL="postgresql://anfutrans_app:CambiarPasswordSegura@localhost:5432/anfutrans_db?schema=core"
```

### JWT Strategy (jwt.strategy.ts)

```typescript
export interface JwtPayload {
  sub: string;      // Usuario ID
  email: string;
  rolId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', '...'),
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      include: { rol: true },
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rolId: usuario.rolId,
      rol: usuario.rol,
    };
  }
}
```

---

## 🔨 CAMBIOS EN ARCHIVOS

### 1. AuthService (auth.service.ts)

**ANTES** (FAKE):
```typescript
login(dto: LoginDto) {
  const user = this.users.find(item => item.email === dto.email);
  return {
    access_token: `fake-jwt-${user.id}`,
  };
}
```

**DESPUÉS** (REAL):
```typescript
async login(dto: LoginDto) {
  const usuario = await this.prisma.usuario.findUnique({
    where: { email: dto.email.toLowerCase() },
    include: { rol: true },
  });

  const passwordMatch = await bcrypt.compare(
    dto.password,
    usuario.passwordHash,
  );

  if (!passwordMatch) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const payload: JwtPayload = {
    sub: usuario.id,
    email: usuario.email,
    rolId: usuario.rolId,
  };

  const accessToken = this.jwtService.sign(payload);

  return {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: '24h',
    user: { ...usuario, rol: { ... } },
  };
}
```

### 2. AuthModule (auth.module.ts)

**Configuración JWT**:
```typescript
@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET', '...'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
```

### 3. AuthController (auth.controller.ts)

**Nuevos endpoints**:
```typescript
@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return { user };
  }
}
```

---

## 🌱 SCRIPT DE SEED

**Ubicación**: `apps/backend/prisma/seed.ts`

**Contenido creado**:
- ✅ 4 roles: ADMIN, DIRIGENTE, OPERADOR, SOCIO
- ✅ 1 usuario admin: admin@anfutrans.cl / admin123
- ✅ 7 estados de solicitud
- ✅ 3 tipos de solicitud
- ✅ 4 tipos de beneficio
- ✅ 5 tipos de documento
- ✅ 16 regiones de Chile
- ✅ 52 comunas de la Región Metropolitana

**Ejecutar seed**:
```bash
npm run prisma:seed
```

---

## 🎯 USO DE LA API

### 1. Login

**Request**:
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@anfutrans.cl",
  "password": "admin123"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": "24h",
  "user": {
    "id": "uuid-...",
    "email": "admin@anfutrans.cl",
    "nombre": "Admin",
    "apellido": "ANFUTRANS",
    "rol": {
      "id": 1,
      "codigo": "ADMIN",
      "nombre": "Administrador"
    }
  }
}
```

### 2. Register

**Request**:
```http
POST /auth/register
Content-Type: application/json

{
  "email": "nuevo@ejemplo.cl",
  "password": "password123",
  "nombre": "Juan",
  "apellido": "Pérez"
}
```

**Response**:
```json
{
  "id": "uuid-...",
  "email": "nuevo@ejemplo.cl",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": {
    "id": 4,
    "codigo": "SOCIO",
    "nombre": "Socio"
  }
}
```

### 3. Acceder a Ruta Protegida

**Request**:
```http
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response**:
```json
{
  "message": "Perfil del usuario autenticado",
  "user": {
    "id": "uuid-...",
    "email": "admin@anfutrans.cl",
    "nombre": "Admin",
    "apellido": "ANFUTRANS",
    "rolId": 1,
    "rol": {
      "id": 1,
      "codigo": "ADMIN",
      "nombre": "Administrador"
    }
  }
}
```

---

## 🛡️ PROTEGER ENDPOINTS

### Opción 1: Guard en Controller Individual

```typescript
@Controller('socios')
@UseGuards(JwtAuthGuard)
export class SociosController {
  // Todos los endpoints requieren autenticación
}
```

### Opción 2: Guard Global (Recomendado)

**En main.ts**:
```typescript
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

// En tu módulo principal
providers: [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
```

**Marcar rutas públicas**:
```typescript
import { Public } from './auth/decorators/public.decorator';

@Public()
@Get('public-data')
getPublicData() {
  // Este endpoint NO requiere autenticación
}
```

### Opción 3: Obtener Usuario Actual

```typescript
import { CurrentUser } from './auth/decorators/current-user.decorator';

@Get('mis-datos')
getMisDatos(@CurrentUser() user: any) {
  return {
    usuario: user,
    mensaje: 'Tus datos personales'
  };
}

// Obtener solo el ID
@Get('mi-id')
getMiId(@CurrentUser('id') userId: string) {
  return { userId };
}
```

---

## 📊 ESTRUCTURA DE BD

### Modelo `usuario`

```prisma
model usuario {
  id           String    @id @default(uuid()) @db.Uuid
  email        String    @unique @db.VarChar(150)
  passwordHash String    @map("password_hash") @db.VarChar(255)  // ← bcrypt hash
  nombre       String    @db.VarChar(100)
  apellido     String    @db.VarChar(100)
  rolId        Int       @map("rol_id") @db.SmallInt
  activo       Boolean?  @default(true)
  createdAt    DateTime? @default(now())
  updatedAt    DateTime? @updatedAt

  rol rol @relation(fields: [rolId], references: [id])
}
```

### Modelo `rol`

```prisma
model rol {
  id          Int      @id @default(autoincrement()) @db.SmallInt
  codigo      String   @unique @db.VarChar(20)
  nombre      String   @db.VarChar(50)
  descripcion String?
  activo      Boolean? @default(true)

  usuarios usuario[]
}
```

---

## ⚠️ SEGURIDAD - MEJORES PRÁCTICAS

### ✅ Implementado

1. **Passwords hasheados**: bcrypt con 10 salt rounds
2. **JWT firmado**: Con secret de 64+ caracteres
3. **Validación de token**: En cada request con JwtStrategy
4. **Usuario activo**: Verificado en validación JWT
5. **Lowercase emails**: Normalización para unicidad
6. **Roles asignados**: Control de acceso por rol

### 🔄 Pendiente (Fases futuras)

1. **Refresh Tokens**: Implementar renovación de tokens
2. **Rate Limiting**: Limitar intentos de login
3. **Guards por Rol**: @Roles('ADMIN') decorator
4. **Password Reset**: Recuperación de contraseña
5. **2FA**: Autenticación de dos factores
6. **Session Management**: Invalidar sesiones activas
7. **Audit Log**: Registro de accesos

---

## 🧪 TESTING

### Pruebas Manuales

```bash
# 1. Iniciar servidor
npm run start:dev

# 2. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@anfutrans.cl","password":"admin123"}'

# 3. Copiar access_token de la respuesta

# 4. Acceder a ruta protegida
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <TU_TOKEN_AQUI>"
```

### Unit Tests (Pendiente FASE 9)

```typescript
describe('AuthService', () => {
  it('should hash password with bcrypt', async () => {
    const result = await authService.register({
      email: 'test@test.cl',
      password: 'password123',
      nombre: 'Test',
      apellido: 'User'
    });
    expect(result.id).toBeDefined();
  });

  it('should validate correct password', async () => {
    const result = await authService.login({
      email: 'admin@anfutrans.cl',
      password: 'admin123'
    });
    expect(result.access_token).toBeDefined();
  });

  it('should reject incorrect password', async () => {
    await expect(
      authService.login({
        email: 'admin@anfutrans.cl',
        password: 'wrong'
      })
    ).rejects.toThrow(UnauthorizedException);
  });
});
```

---

## 📈 PRÓXIMOS PASOS

### FASE 4: ValidationPipe y Exception Filter
- Validaciones automáticas con class-validator
- Filtro global de excepciones
- DTO validation en todos los endpoints

### FASE 5: Completar DTOs
- Create/Update DTOs para todas las entidades
- Decoradores de validación (@IsEmail, @MinLength, etc.)
- Validaciones personalizadas (RUT chileno)

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module '@nestjs/jwt'"

**Solución**:
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/bcrypt @types/passport-jwt
```

### Error: "Unauthorized" en todas las rutas

**Causa**: JWT_SECRET no configurado o incorrecto

**Solución**:
```bash
# Verificar .env
cat .env | grep JWT_SECRET

# Reiniciar servidor
npm run start:dev
```

### Error: "Invalid token"

**Causa**: Token expirado o inválido

**Solución**:
1. Login nuevamente para obtener token fresco
2. Verificar que Authorization header tiene formato: `Bearer <token>`

### Error en seed: "There is a unique constraint violation"

**Causa**: Seed ya fue ejecutado previamente

**Solución**:
```bash
# Resetear base de datos (solo desarrollo)
npx prisma migrate reset
npm run prisma:seed
```

---

## 📚 RECURSOS

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [JWT.io - Debug JWT](https://jwt.io/)

---

**✅ FASE 3 COMPLETADA**

**Siguiente**: FASE 4 - ValidationPipe y Exception Filter

**Fecha de completación**: 14 de marzo de 2026
**Compilación**: ✅ Exitosa sin errores
**Tests**: ⏳ Pendiente (FASE 9)
