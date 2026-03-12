import { Controller, Get } from '@nestjs/common';
import { TipoSolicitudService } from './tipo-solicitud.service';

@Controller('catalogos/tipo-solicitud')
export class TipoSolicitudController {
  constructor(private readonly service: TipoSolicitudService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
