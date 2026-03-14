import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BeneficiosService } from './beneficios.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';

@ApiTags('beneficios')
@ApiBearerAuth('JWT-auth')
@Controller('beneficios')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los beneficios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de beneficios obtenida exitosamente',
  })
  findAll() {
    return this.beneficiosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener beneficio por ID' })
  @ApiResponse({
    status: 200,
    description: 'Beneficio encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Beneficio no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.beneficiosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo beneficio' })
  @ApiResponse({
    status: 201,
    description: 'Beneficio creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  create(@Body() dto: CreateBeneficioDto) {
    return this.beneficiosService.create(dto);
  }
}
