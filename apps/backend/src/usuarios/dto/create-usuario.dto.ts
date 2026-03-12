export class CreateUsuarioDto {
  email!: string;
  nombre!: string;
  apellido!: string;
  rolId!: number;
  activo?: boolean;
}
