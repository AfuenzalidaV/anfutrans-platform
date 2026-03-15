import { PartialType } from '@nestjs/swagger';
import { CreateEstadoSolicitudDto } from './create-estado-solicitud.dto';

export class UpdateEstadoSolicitudDto extends PartialType(
  CreateEstadoSolicitudDto,
) {}
