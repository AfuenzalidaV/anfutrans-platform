import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';

@ApiTags('solicitudes')
@ApiBearerAuth('JWT-auth')
@Controller(['solicitudes', 'tramites'])
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitudes obtenida exitosamente',
  })
  findAll() {
    return this.tramitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener solicitud por ID' })
  @ApiResponse({
    status: 200,
    description: 'Solicitud encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitud no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.tramitesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva solicitud/trámite' })
  @ApiResponse({
    status: 201,
    description: 'Solicitud creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (UUID, IDs, etc.)',
  })
  @ApiResponse({
    status: 404,
    description: 'Socio o tipo de solicitud no encontrado',
  })
  create(@Body() dto: CreateTramiteDto) {
    return this.tramitesService.create(dto);
  }
}
