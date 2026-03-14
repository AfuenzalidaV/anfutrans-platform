/**
 * Modelo Documento
 * Generado automáticamente desde Prisma Schema
 */
export interface Documento {
  id: string;
  nombreArchivo: string;
  ruta: string;
  tipoDocumentoId: number;
  usuarioId: string;
  tamanioBytes: number;
  fechaSubida: Date | string;
}
