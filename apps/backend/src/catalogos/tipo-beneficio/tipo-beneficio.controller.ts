import { Controller, Get } from '@nestjs/common';
import { TipoBeneficioService } from './tipo-beneficio.service';

@Controller('catalogos/tipo-beneficio')
export class TipoBeneficioController {
  constructor(private readonly service: TipoBeneficioService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
