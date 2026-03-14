import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoBeneficioService } from './tipo-beneficio.service';

@ApiTags('catálogos')
@Controller('catalogos/tipo-beneficio')
export class TipoBeneficioController {
  constructor(private readonly service: TipoBeneficioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de beneficio' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de beneficio obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
