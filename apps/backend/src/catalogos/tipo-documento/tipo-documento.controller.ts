import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TipoDocumentoService } from './tipo-documento.service';

@ApiTags('catálogos')
@Controller('catalogos/tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly service: TipoDocumentoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de documento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de documento obtenida exitosamente',
  })
  findAll() {
    return this.service.findAll();
  }
}
