/**
 * Modelo Solicitud
 * Generado automáticamente desde Prisma Schema
 */
export interface Solicitud {
  id: string;
  socioId: string;
  tipoSolicitudId: number;
  estadoSolicitudId: number;
  fechaSolicitud: Date | string;
  observaciones: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
