import { Controller, Get } from '@nestjs/common';
import { ParametrosService } from './parametros.service';

@Controller('catalogos/parametros')
export class ParametrosController {
  constructor(private readonly service: ParametrosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
