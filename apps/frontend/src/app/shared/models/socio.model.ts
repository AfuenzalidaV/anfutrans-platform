/**
 * Modelo Socio
 * Generado automáticamente desde Prisma Schema
 */
export interface Socio {
  id: string;
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  comunaId: number;
  fechaIngreso: Date | string;
  activo: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
