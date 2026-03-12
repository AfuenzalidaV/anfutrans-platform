import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBeneficioDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  tipoBeneficioId!: number;
}
