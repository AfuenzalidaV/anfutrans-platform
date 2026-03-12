import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSolicitudDto {
  @IsUUID()
  socioId!: string;

  @IsInt()
  tipoSolicitudId!: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
