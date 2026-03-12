export class CreateSocioDto {
  rut!: string;
  nombre!: string;
  apellido!: string;
  email?: string;
  telefono?: string;
  comunaId!: number;
}
