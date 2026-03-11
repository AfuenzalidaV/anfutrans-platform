import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {

  @ApiProperty()
  codigo: string

  @ApiProperty()
  nombre: string

  @ApiProperty()
  activo: boolean

};