import { Controller, Get } from '@nestjs/common';
import { ComunasService } from './comunas.service';

@Controller('catalogos/comunas')
export class ComunasController {
  constructor(private readonly service: ComunasService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
