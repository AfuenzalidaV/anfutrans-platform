import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';

type AuthUser = {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
};

@Injectable()
export class AuthService {
  private readonly users: AuthUser[] = [
    {
      id: 'seed-admin-1',
      email: 'admin@anfutrans.cl',
      password: 'admin123',
      nombre: 'Admin',
      apellido: 'ANFUTRANS',
    },
  ];

  login(dto: LoginDto) {
    const user = this.users.find(
      (item) =>
        item.email.toLowerCase() === dto.email.toLowerCase() &&
        item.password === dto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    return {
      access_token: `fake-jwt-${user.id}`,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
      },
    };
  }

  register(dto: RegisterDto) {
    const exists = this.users.some(
      (item) => item.email.toLowerCase() === dto.email.toLowerCase(),
    );

    if (exists) {
      throw new ConflictException('El email ya se encuentra registrado');
    }

    const created: AuthUser = {
      id: crypto.randomUUID(),
      email: dto.email,
      password: dto.password,
      nombre: dto.nombre,
      apellido: dto.apellido,
    };

    this.users.push(created);

    return {
      id: created.id,
      email: created.email,
      nombre: created.nombre,
      apellido: created.apellido,
    };
  }
}
