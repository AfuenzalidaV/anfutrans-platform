import { Controller, Get } from '@nestjs/common';
import { TipoCertificadoService } from './tipo-certificado.service';

@Controller('catalogos/tipo-certificado')
export class TipoCertificadoController {
  constructor(private readonly service: TipoCertificadoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
