import { Module } from '@nestjs/common';
import { TipoCertificadoController } from './tipo-certificado.controller';
import { TipoCertificadoService } from './tipo-certificado.service';

@Module({
  controllers: [TipoCertificadoController],
  providers: [TipoCertificadoService],
})
export class TipoCertificadoModule {}
