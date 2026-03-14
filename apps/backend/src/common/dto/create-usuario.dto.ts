import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RolUsuario } from '../../../generated/prisma';

export class CreateUsuarioDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  nombre!: string;

  @IsString()
  apellido!: string;

  @IsEnum(RolUsuario)
  rol!: RolUsuario;
}
