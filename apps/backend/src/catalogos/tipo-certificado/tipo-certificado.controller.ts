import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoCertificadoService } from './tipo-certificado.service';

@ApiTags('catálogos')
@Controller('catalogos/tipo-certificado')
export class TipoCertificadoController {
  constructor(private readonly service: TipoCertificadoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de certificado' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de certificado obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
