import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Documento } from '../../shared/models/documento.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Documento
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class DocumentoService {

  private readonly endpoint = 'documentos';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Documento
   */
  getAll(): Observable<Documento[]> {
    return this.api.get(this.endpoint) as Observable<Documento[]>;
  }

  /**
   * Obtiene un Documento por ID
   */
  getById(id: string | number): Observable<Documento> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Documento>;
  }

  /**
   * Crea un nuevo Documento
   */
  create(data: Partial<Documento>): Observable<Documento> {
    return this.api.post(this.endpoint, data) as Observable<Documento>;
  }

  /**
   * Actualiza un Documento existente
   */
  update(id: string | number, data: Partial<Documento>): Observable<Documento> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Documento>;
  }

  /**
   * Elimina unDocumento
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
