import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBeneficioDto {
  @ApiProperty({
    description: 'Nombre del beneficio',
    example: 'Subsidio habitacional',
    maxLength: 150,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(150, { message: 'El nombre no puede exceder 150 caracteres' })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Descripción del beneficio',
    example: 'Apoyo económico para adquisición de vivienda',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;

  @ApiProperty({
    description: 'ID del tipo de beneficio',
    example: 1,
  })
  @IsNumber({}, { message: 'El tipo de beneficio debe ser un número' })
  @IsNotEmpty({ message: 'El tipo de beneficio es requerido' })
  tipoBeneficioId!: number;

  @ApiPropertyOptional({
    description: 'Estado activo del beneficio',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
  activo?: boolean;
}
