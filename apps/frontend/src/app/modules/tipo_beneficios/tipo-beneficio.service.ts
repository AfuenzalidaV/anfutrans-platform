import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { TipoBeneficio } from '../../shared/models/tipo-beneficio.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de TipoBeneficio
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class TipoBeneficioService {

  private readonly endpoint = 'tipo_beneficios';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de TipoBeneficio
   */
  getAll(): Observable<TipoBeneficio[]> {
    return this.api.get(this.endpoint) as Observable<TipoBeneficio[]>;
  }

  /**
   * Obtiene un TipoBeneficio por ID
   */
  getById(id: string | number): Observable<TipoBeneficio> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<TipoBeneficio>;
  }

  /**
   * Crea un nuevo TipoBeneficio
   */
  create(data: Partial<TipoBeneficio>): Observable<TipoBeneficio> {
    return this.api.post(this.endpoint, data) as Observable<TipoBeneficio>;
  }

  /**
   * Actualiza un TipoBeneficio existente
   */
  update(id: string | number, data: Partial<TipoBeneficio>): Observable<TipoBeneficio> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<TipoBeneficio>;
  }

  /**
   * Elimina unTipoBeneficio
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
