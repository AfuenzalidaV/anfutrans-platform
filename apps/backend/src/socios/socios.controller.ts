import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';

@ApiTags('socios')
@ApiBearerAuth('JWT-auth')
@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los socios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de socios obtenida exitosamente',
  })
  findAll() {
    return this.sociosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener socio por ID' })
  @ApiResponse({
    status: 200,
    description: 'Socio encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Socio no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.sociosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo socio' })
  @ApiResponse({
    status: 201,
    description: 'Socio creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (RUT, email, etc.)',
  })
  @ApiResponse({
    status: 409,
    description: 'RUT ya existe en el sistema',
  })
  create(@Body() dto: CreateSocioDto) {
    return this.sociosService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar socio existente' })
  @ApiResponse({
    status: 200,
    description: 'Socio actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Socio no encontrado',
  })
  update(@Param('id') id: string, @Body() dto: Partial<CreateSocioDto>) {
    return this.sociosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar socio' })
  @ApiResponse({
    status: 200,
    description: 'Socio eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Socio no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.sociosService.remove(id);
  }
}
