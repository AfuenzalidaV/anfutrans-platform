import { Module } from '@nestjs/common'
import { RegionesController } from './regiones.controller'
import { RegionesService } from './regiones.service'
import { DatabaseModule } from '../../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [RegionesController],
  providers: [RegionesService],
})
export class RegionesModule {}