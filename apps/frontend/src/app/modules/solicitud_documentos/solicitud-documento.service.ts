import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { SolicitudDocumento } from '../../shared/models/solicitud-documento.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de SolicitudDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class SolicitudDocumentoService {

  private readonly endpoint = 'solicitud_documentos';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de SolicitudDocumento
   */
  getAll(): Observable<SolicitudDocumento[]> {
    return this.api.get(this.endpoint) as Observable<SolicitudDocumento[]>;
  }

  /**
   * Obtiene un SolicitudDocumento por ID
   */
  getById(id: string | number): Observable<SolicitudDocumento> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<SolicitudDocumento>;
  }

  /**
   * Crea un nuevo SolicitudDocumento
   */
  create(data: Partial<SolicitudDocumento>): Observable<SolicitudDocumento> {
    return this.api.post(this.endpoint, data) as Observable<SolicitudDocumento>;
  }

  /**
   * Actualiza un SolicitudDocumento existente
   */
  update(id: string | number, data: Partial<SolicitudDocumento>): Observable<SolicitudDocumento> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<SolicitudDocumento>;
  }

  /**
   * Elimina unSolicitudDocumento
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
