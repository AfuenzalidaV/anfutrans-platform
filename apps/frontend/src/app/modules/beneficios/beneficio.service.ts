import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Beneficio } from '../../shared/models/beneficio.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Beneficio
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class BeneficioService {

  private readonly endpoint = 'beneficios';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Beneficio
   */
  getAll(): Observable<Beneficio[]> {
    return this.api.get(this.endpoint) as Observable<Beneficio[]>;
  }

  /**
   * Obtiene un Beneficio por ID
   */
  getById(id: string | number): Observable<Beneficio> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Beneficio>;
  }

  /**
   * Crea un nuevo Beneficio
   */
  create(data: Partial<Beneficio>): Observable<Beneficio> {
    return this.api.post(this.endpoint, data) as Observable<Beneficio>;
  }

  /**
   * Actualiza un Beneficio existente
   */
  update(id: string | number, data: Partial<Beneficio>): Observable<Beneficio> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Beneficio>;
  }

  /**
   * Elimina unBeneficio
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
