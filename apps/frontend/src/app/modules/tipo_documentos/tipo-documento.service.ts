import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { TipoDocumento } from '../../shared/models/tipo-documento.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de TipoDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class TipoDocumentoService {

  private readonly endpoint = 'tipo_documentos';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de TipoDocumento
   */
  getAll(): Observable<TipoDocumento[]> {
    return this.api.get(this.endpoint) as Observable<TipoDocumento[]>;
  }

  /**
   * Obtiene un TipoDocumento por ID
   */
  getById(id: string | number): Observable<TipoDocumento> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<TipoDocumento>;
  }

  /**
   * Crea un nuevo TipoDocumento
   */
  create(data: Partial<TipoDocumento>): Observable<TipoDocumento> {
    return this.api.post(this.endpoint, data) as Observable<TipoDocumento>;
  }

  /**
   * Actualiza un TipoDocumento existente
   */
  update(id: string | number, data: Partial<TipoDocumento>): Observable<TipoDocumento> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<TipoDocumento>;
  }

  /**
   * Elimina unTipoDocumento
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
