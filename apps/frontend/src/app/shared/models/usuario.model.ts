/**
 * Modelo Usuario
 * Generado automáticamente desde Prisma Schema
 */
export interface Usuario {
  id: string;
  email: string;
  passwordHash: string;
  nombre: string;
  apellido: string;
  rolId: number;
  activo: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
