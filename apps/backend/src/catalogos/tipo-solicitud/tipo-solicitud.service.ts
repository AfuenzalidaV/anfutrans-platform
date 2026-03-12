import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TipoSolicitudService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipo_solicitud.findMany();
  }
}
