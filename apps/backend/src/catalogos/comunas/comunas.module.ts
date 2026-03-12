import { Module } from '@nestjs/common';
import { ComunasController } from './comunas.controller';
import { ComunasService } from './comunas.service';

@Module({
  controllers: [ComunasController],
  providers: [ComunasService],
})
export class ComunasModule {}
