import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoSolicitudService } from './tipo-solicitud.service';

@ApiTags('catálogos')
@Controller('catalogos/tipo-solicitud')
export class TipoSolicitudController {
  constructor(private readonly service: TipoSolicitudService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de solicitud' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de solicitud obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
