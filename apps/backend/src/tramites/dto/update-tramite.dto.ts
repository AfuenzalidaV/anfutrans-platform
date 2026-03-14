import { PartialType } from '@nestjs/swagger';
import { CreateTramiteDto } from './create-tramite.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoSolicitud } from '../../../generated/prisma';

export class UpdateTramiteDto extends PartialType(CreateTramiteDto) {
  @ApiPropertyOptional({
    description: 'Estado de la solicitud (para actualizar estado)',
    enum: EstadoSolicitud,
    example: EstadoSolicitud.EN_REVISION,
  })
  @IsOptional()
  @IsEnum(EstadoSolicitud, { message: 'El estado de solicitud debe ser un valor válido' })
  estado?: EstadoSolicitud;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales',
    example: 'Documentación adicional requerida',
  })
  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser un texto' })
  observaciones?: string;
}
