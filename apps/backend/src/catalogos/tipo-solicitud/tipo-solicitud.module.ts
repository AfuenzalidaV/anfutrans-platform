import { Module } from '@nestjs/common';
import { TipoSolicitudController } from './tipo-solicitud.controller';
import { TipoSolicitudService } from './tipo-solicitud.service';

@Module({
  controllers: [TipoSolicitudController],
  providers: [TipoSolicitudService],
})
export class TipoSolicitudModule {}
