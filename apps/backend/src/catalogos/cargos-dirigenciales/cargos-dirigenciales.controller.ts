import { Controller, Get } from '@nestjs/common';
import { CargosDirigencialesService } from './cargos-dirigenciales.service';

@Controller('catalogos/cargos-dirigenciales')
export class CargosDirigencialesController {
  constructor(private readonly service: CargosDirigencialesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
