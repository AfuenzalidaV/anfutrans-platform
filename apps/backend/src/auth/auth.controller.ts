import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        token_type: 'Bearer',
        expires_in: '24h',
        user: {
          id: 'uuid',
          email: 'admin@anfutrans.cl',
          nombre: 'Admin',
          apellido: 'ANFUTRANS',
          rol: {
            id: 1,
            codigo: 'ADMIN',
            nombre: 'Administrador',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        id: 'uuid',
        email: 'nuevo@ejemplo.cl',
        nombre: 'Juan',
        apellido: 'Pérez',
        rol: {
          id: 4,
          codigo: 'SOCIO',
          nombre: 'Socio',
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido exitosamente',
    schema: {
      example: {
        message: 'Perfil del usuario autenticado',
        user: {
          id: 'uuid',
          email: 'admin@anfutrans.cl',
          nombre: 'Admin',
          apellido: 'ANFUTRANS',
          rolId: 1,
          rol: {
            id: 1,
            codigo: 'ADMIN',
            nombre: 'Administrador',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Perfil del usuario autenticado',
      user,
    };
  }
}
