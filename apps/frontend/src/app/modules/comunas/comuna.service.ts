import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Comuna } from '../../shared/models/comuna.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Comuna
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class ComunaService {

  private readonly endpoint = 'comunas';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Comuna
   */
  getAll(): Observable<Comuna[]> {
    return this.api.get(this.endpoint) as Observable<Comuna[]>;
  }

  /**
   * Obtiene un Comuna por ID
   */
  getById(id: string | number): Observable<Comuna> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Comuna>;
  }

  /**
   * Crea un nuevo Comuna
   */
  create(data: Partial<Comuna>): Observable<Comuna> {
    return this.api.post(this.endpoint, data) as Observable<Comuna>;
  }

  /**
   * Actualiza un Comuna existente
   */
  update(id: string | number, data: Partial<Comuna>): Observable<Comuna> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Comuna>;
  }

  /**
   * Elimina unComuna
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
