import { Module } from '@nestjs/common';
import { CargosDirigencialesController } from './cargos-dirigenciales.controller';
import { CargosDirigencialesService } from './cargos-dirigenciales.service';

@Module({
  controllers: [CargosDirigencialesController],
  providers: [CargosDirigencialesService],
})
export class CargosDirigencialesModule {}
