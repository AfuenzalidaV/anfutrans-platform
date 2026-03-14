import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoSolicitud, EstadoSolicitud } from '../../../generated/prisma';

export class CreateTramiteDto {
  @ApiProperty({
    description: 'ID del socio que realiza la solicitud',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'El ID del socio debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del socio es requerido' })
  socioId!: string;

  @ApiProperty({
    description: 'Tipo de solicitud',
    enum: TipoSolicitud,
    example: TipoSolicitud.CERTIFICADO,
  })
  @IsEnum(TipoSolicitud, { message: 'El tipo de solicitud debe ser un valor válido' })
  @IsNotEmpty({ message: 'El tipo de solicitud es requerido' })
  tipo!: TipoSolicitud;

  @ApiProperty({
    description: 'Estado de la solicitud',
    enum: EstadoSolicitud,
    example: EstadoSolicitud.BORRADOR,
  })
  @IsEnum(EstadoSolicitud, { message: 'El estado de solicitud debe ser un valor válido' })
  @IsNotEmpty({ message: 'El estado de solicitud es requerido' })
  estado!: EstadoSolicitud;

  @ApiPropertyOptional({
    description: 'Observaciones de la solicitud',
    example: 'Solicitud de certificado de antigüedad',
  })
  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser un texto' })
  observaciones?: string;
}
