/**
 * Modelo Beneficio
 * Generado automáticamente desde Prisma Schema
 */
export interface Beneficio {
  id: string;
  nombre: string;
  descripcion: string;
  tipoBeneficioId: number;
  activo: boolean;
  createdAt: Date | string;
}
