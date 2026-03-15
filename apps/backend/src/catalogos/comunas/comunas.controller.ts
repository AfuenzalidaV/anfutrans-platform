import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComunasService } from './comunas.service';

@ApiTags('catálogos')
@Controller('catalogos/comunas')
export class ComunasController {
  constructor(private readonly service: ComunasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las comunas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comunas obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
