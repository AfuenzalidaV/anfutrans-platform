import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { ParametroSistema } from '../../shared/models/parametro-sistema.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de ParametroSistema
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class ParametroSistemaService {

  private readonly endpoint = 'parametro_sistemas';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de ParametroSistema
   */
  getAll(): Observable<ParametroSistema[]> {
    return this.api.get(this.endpoint) as Observable<ParametroSistema[]>;
  }

  /**
   * Obtiene un ParametroSistema por ID
   */
  getById(id: string | number): Observable<ParametroSistema> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<ParametroSistema>;
  }

  /**
   * Crea un nuevo ParametroSistema
   */
  create(data: Partial<ParametroSistema>): Observable<ParametroSistema> {
    return this.api.post(this.endpoint, data) as Observable<ParametroSistema>;
  }

  /**
   * Actualiza un ParametroSistema existente
   */
  update(id: string | number, data: Partial<ParametroSistema>): Observable<ParametroSistema> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<ParametroSistema>;
  }

  /**
   * Elimina unParametroSistema
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
