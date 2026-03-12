import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSocioDto {
  @IsString()
  rut!: string;

  @IsString()
  nombre!: string;

  @IsString()
  apellido!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsInt()
  comunaId!: number;
}
