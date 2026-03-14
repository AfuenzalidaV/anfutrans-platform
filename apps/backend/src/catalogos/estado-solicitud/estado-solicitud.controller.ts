import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EstadoSolicitudService } from './estado-solicitud.service';

@ApiTags('catálogos')
@Controller('catalogos/estado-solicitud')
export class EstadoSolicitudController {
  constructor(private readonly service: EstadoSolicitudService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los estados de solicitud' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados de solicitud obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
