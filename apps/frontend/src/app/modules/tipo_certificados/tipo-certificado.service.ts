import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { TipoCertificado } from '../../shared/models/tipo-certificado.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de TipoCertificado
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class TipoCertificadoService {

  private readonly endpoint = 'tipo_certificados';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de TipoCertificado
   */
  getAll(): Observable<TipoCertificado[]> {
    return this.api.get(this.endpoint) as Observable<TipoCertificado[]>;
  }

  /**
   * Obtiene un TipoCertificado por ID
   */
  getById(id: string | number): Observable<TipoCertificado> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<TipoCertificado>;
  }

  /**
   * Crea un nuevo TipoCertificado
   */
  create(data: Partial<TipoCertificado>): Observable<TipoCertificado> {
    return this.api.post(this.endpoint, data) as Observable<TipoCertificado>;
  }

  /**
   * Actualiza un TipoCertificado existente
   */
  update(id: string | number, data: Partial<TipoCertificado>): Observable<TipoCertificado> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<TipoCertificado>;
  }

  /**
   * Elimina unTipoCertificado
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
