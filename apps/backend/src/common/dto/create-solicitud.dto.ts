import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TipoSolicitud } from '../../../generated/prisma';

export class CreateSolicitudDto {
  @IsUUID()
  socioId!: string;

  @IsEnum(TipoSolicitud)
  tipo!: TipoSolicitud;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
