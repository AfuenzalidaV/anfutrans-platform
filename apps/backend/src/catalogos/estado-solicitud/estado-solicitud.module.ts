import { Module } from '@nestjs/common';
import { EstadoSolicitudController } from './estado-solicitud.controller';
import { EstadoSolicitudService } from './estado-solicitud.service';

@Module({
  controllers: [EstadoSolicitudController],
  providers: [EstadoSolicitudService],
})
export class EstadoSolicitudModule {}
