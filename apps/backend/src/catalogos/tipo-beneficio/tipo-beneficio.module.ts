import { Module } from '@nestjs/common';
import { TipoBeneficioController } from './tipo-beneficio.controller';
import { TipoBeneficioService } from './tipo-beneficio.service';

@Module({
  controllers: [TipoBeneficioController],
  providers: [TipoBeneficioService],
})
export class TipoBeneficioModule {}
