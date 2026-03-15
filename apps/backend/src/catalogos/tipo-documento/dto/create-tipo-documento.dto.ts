import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoDocumentoDto {
  @ApiProperty({
    description: 'Código único del tipo de documento',
    example: 'DNI',
  })
  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo!: string;

  @ApiProperty({
    description: 'Nombre del tipo de documento',
    example: 'Documento Nacional de Identidad',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Ámbito del documento',
    example: 'IDENTIFICACION',
  })
  @IsOptional()
  @IsString({ message: 'El ámbito debe ser un texto' })
  @MaxLength(50, { message: 'El ámbito no puede exceder 50 caracteres' })
  ambito?: string;

  @ApiPropertyOptional({
    description: 'Estado activo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  activo?: boolean;
}
