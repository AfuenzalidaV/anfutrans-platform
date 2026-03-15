/**
 * Modelo SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
export interface SolicitudHistorial {
  id: string;
  solicitudId: string;
  estadoSolicitudId: number;
  usuarioId: string;
  fecha: Date | string;
  comentario: string;
}
