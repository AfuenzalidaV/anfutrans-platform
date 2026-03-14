import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoCertificadoDto {
  @ApiProperty({
    description: 'Código único del tipo de certificado',
    example: 'CERT_ANTIG',
  })
  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo!: string;

  @ApiProperty({
    description: 'Nombre del tipo de certificado',
    example: 'Certificado de Antigüedad',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Indica si requiere vigencia',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'El campo requiere vigencia debe ser verdadero o falso',
  })
  requiereVigencia?: boolean;

  @ApiPropertyOptional({
    description: 'Estado activo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  activo?: boolean;
}
