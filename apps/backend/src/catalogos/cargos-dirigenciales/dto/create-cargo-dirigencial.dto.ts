import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCargoDirigencialDto {
  @ApiProperty({
    description: 'Código único del cargo',
    example: 'PRESIDENTE',
  })
  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo!: string;

  @ApiProperty({
    description: 'Nombre del cargo',
    example: 'Presidente',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Nivel del cargo',
    example: 'DIRECTIVA',
  })
  @IsOptional()
  @IsString({ message: 'El nivel debe ser un texto' })
  @MaxLength(20, { message: 'El nivel no puede exceder 20 caracteres' })
  nivel?: string;

  @ApiPropertyOptional({
    description: 'Estado activo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  activo?: boolean;
}
