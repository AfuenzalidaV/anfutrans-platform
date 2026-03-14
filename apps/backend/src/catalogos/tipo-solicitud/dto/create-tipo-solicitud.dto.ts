import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoSolicitudDto {
  @ApiProperty({
    description: 'Código único del tipo de solicitud',
    example: 'CERT_ANTIG',
  })
  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo!: string;

  @ApiProperty({
    description: 'Nombre del tipo de solicitud',
    example: 'Certificado de Antigüedad',
    maxLength: 150,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(150, { message: 'El nombre no puede exceder 150 caracteres' })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Descripción del tipo de solicitud',
    example: 'Certificado que acredita la antigüedad como socio',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Indica si requiere aprobación',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({
    message: 'El campo requiere aprobación debe ser verdadero o falso',
  })
  requiereAprobacion?: boolean;

  @ApiPropertyOptional({
    description: 'Permite guardar como borrador',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'El campo permite borrador debe ser verdadero o falso',
  })
  permiteBorrador?: boolean;

  @ApiPropertyOptional({
    description: 'Estado activo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  activo?: boolean;
}
