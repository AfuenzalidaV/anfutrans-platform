import { Controller, Get } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';

@Controller('catalogos/tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly service: TipoDocumentoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
