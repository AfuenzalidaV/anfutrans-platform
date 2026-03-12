export class CreateBeneficioDto {
  nombre!: string;
  descripcion?: string;
  tipoBeneficioId!: number;
  activo?: boolean;
}
