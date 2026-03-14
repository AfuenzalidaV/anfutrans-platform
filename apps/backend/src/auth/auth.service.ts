import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { RolUsuario } from '../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    // Buscar usuario por email
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña hasheada
    const passwordMatch = await bcrypt.compare(
      dto.password,
      usuario.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar que el usuario esté activo
    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Generar JWT con enum rol
    const payload: JwtPayload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: this.configService.get<string>('JWT_EXPIRATION', '24h'),
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    };
  }

  async register(dto: RegisterDto) {
    // Verificar si el email ya existe
    const exists = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (exists) {
      throw new ConflictException('El email ya se encuentra registrado');
    }

    // Hash de contraseña con bcrypt
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10);
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Rol por defecto para nuevos usuarios
    const rolDefault = dto.rol || RolUsuario.SOCIO;

    // Crear usuario en la base de datos
    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        nombre: dto.nombre,
        apellido: dto.apellido,
        rol: rolDefault,
        activo: true,
      },
    });

    return {
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      rol: nuevoUsuario.rol,
    };
  }
}
