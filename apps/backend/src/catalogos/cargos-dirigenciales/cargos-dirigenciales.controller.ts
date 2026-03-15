import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CargosDirigencialesService } from './cargos-dirigenciales.service';

@ApiTags('catálogos')
@Controller('catalogos/cargos-dirigenciales')
export class CargosDirigencialesController {
  constructor(private readonly service: CargosDirigencialesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los cargos dirigenciales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cargos dirigenciales obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
