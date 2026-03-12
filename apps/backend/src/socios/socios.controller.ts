import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';

@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  @Get()
  findAll() {
    return this.sociosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sociosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSocioDto) {
    return this.sociosService.create(dto);
  }
}
