import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';

@Controller('beneficios')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  @Get()
  findAll() {
    return this.beneficiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBeneficioDto) {
    return this.beneficiosService.create(dto);
  }
}
