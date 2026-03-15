import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidRut } from '../../common/validators';

export class CreateSocioDto {
  @ApiProperty({
    description: 'RUT del socio sin puntos y con guión',
    example: '12345678-9',
  })
  @IsValidRut({ message: 'El RUT del socio no es válido' })
  @IsNotEmpty({ message: 'El RUT es requerido' })
  rut!: string;

  @ApiProperty({
    description: 'Nombre del socio',
    example: 'Juan',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @ApiProperty({
    description: 'Apellido del socio',
    example: 'Pérez',
    maxLength: 100,
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  apellido!: string;

  @ApiPropertyOptional({
    description: 'Email del socio',
    example: 'juan.perez@ejemplo.cl',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido' })
  @MaxLength(150, { message: 'El email no puede exceder 150 caracteres' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Teléfono del socio',
    example: '+56912345678',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un texto' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Dirección del socio',
    example: 'Av. Libertador Bernardo O\'Higgins 1234',
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @MaxLength(250, { message: 'La dirección no puede exceder 250 caracteres' })
  direccion?: string;

  @ApiProperty({
    description: 'ID de la comuna',
    example: 1,
  })
  @IsNumber({}, { message: 'El ID de comuna debe ser un número' })
  @IsNotEmpty({ message: 'El ID de comuna es requerido' })
  comunaId!: number;
}
