/**
 * Modelo BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
export interface BeneficioSocio {
  id: string;
  socioId: string;
  beneficioId: string;
  fechaOtorgamiento: Date | string;
  activo: boolean;
  createdAt: Date | string;
}
