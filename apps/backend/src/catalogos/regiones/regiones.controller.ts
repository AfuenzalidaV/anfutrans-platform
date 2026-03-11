import { Controller, Get } from '@nestjs/common';
import { RegionesService } from './regiones.service';

@Controller('catalogos/regiones')
export class RegionesController {

  constructor(private readonly regionesService: RegionesService) {}

  @Get()
  findAll() {
    return this.regionesService.findAll()
  }

};