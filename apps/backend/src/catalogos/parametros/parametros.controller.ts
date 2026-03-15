import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParametrosService } from './parametros.service';

@ApiTags('catálogos')
@Controller('catalogos/parametros')
export class ParametrosController {
  constructor(private readonly service: ParametrosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los parámetros del sistema' })
  @ApiResponse({
    status: 200,
    description: 'Lista de parámetros obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
