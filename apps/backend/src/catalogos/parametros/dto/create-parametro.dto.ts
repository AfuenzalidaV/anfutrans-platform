import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParametroDto {
  @ApiProperty({
    description: 'Clave única del parámetro',
    example: 'MAX_FILE_SIZE',
    maxLength: 100,
  })
  @IsString({ message: 'La clave debe ser un texto' })
  @IsNotEmpty({ message: 'La clave es requerida' })
  @MaxLength(100, { message: 'La clave no puede exceder 100 caracteres' })
  clave!: string;

  @ApiPropertyOptional({
    description: 'Valor del parámetro',
    example: '10485760',
  })
  @IsOptional()
  @IsString({ message: 'El valor debe ser un texto' })
  valor?: string;

  @ApiPropertyOptional({
    description: 'Descripción del parámetro',
    example: 'Tamaño máximo de archivo en bytes (10MB)',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;
}
