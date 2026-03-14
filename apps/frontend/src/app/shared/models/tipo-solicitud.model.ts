/**
 * Modelo TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
export interface TipoSolicitud {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  requiereAprobacion: boolean;
  permiteBorrador: boolean;
  activo: boolean;
}
