import { Module } from '@nestjs/common';
import { ContenidosController } from './contenidos.controller';
import { ContenidosService } from './contenidos.service';

@Module({
  controllers: [ContenidosController],
  providers: [ContenidosService]
})
export class ContenidosModule {}
