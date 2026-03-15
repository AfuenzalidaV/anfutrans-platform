import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionesService } from './regiones.service';

@ApiTags('catálogos')
@Controller('catalogos/regiones')
export class RegionesController {
  constructor(private readonly regionesService: RegionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las regiones de Chile' })
  @ApiResponse({
    status: 200,
    description: 'Lista de regiones obtenida exitosamente',
  })
  findAll() {
    return this.regionesService.findAll();
  }
}
