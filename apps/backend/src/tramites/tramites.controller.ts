import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Get()
  findAll() {
    return this.tramitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tramitesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTramiteDto) {
    return this.tramitesService.create(dto);
  }
}
