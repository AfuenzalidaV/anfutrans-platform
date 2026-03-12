import { Controller, Get } from '@nestjs/common';
import { EstadoSolicitudService } from './estado-solicitud.service';

@Controller('catalogos/estado-solicitud')
export class EstadoSolicitudController {
  constructor(private readonly service: EstadoSolicitudService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
