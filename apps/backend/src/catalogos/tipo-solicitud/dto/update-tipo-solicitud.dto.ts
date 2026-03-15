import { PartialType } from '@nestjs/swagger';
import { CreateTipoSolicitudDto } from './create-tipo-solicitud.dto';

export class UpdateTipoSolicitudDto extends PartialType(
  CreateTipoSolicitudDto,
) {}
