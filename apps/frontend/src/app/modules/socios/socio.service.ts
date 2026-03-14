import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Socio } from '../../shared/models/socio.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Socio
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class SocioService {

  private readonly endpoint = 'socios';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Socio
   */
  getAll(): Observable<Socio[]> {
    return this.api.get(this.endpoint) as Observable<Socio[]>;
  }

  /**
   * Obtiene un Socio por ID
   */
  getById(id: string | number): Observable<Socio> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Socio>;
  }

  /**
   * Crea un nuevo Socio
   */
  create(data: Partial<Socio>): Observable<Socio> {
    return this.api.post(this.endpoint, data) as Observable<Socio>;
  }

  /**
   * Actualiza un Socio existente
   */
  update(id: string | number, data: Partial<Socio>): Observable<Socio> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Socio>;
  }

  /**
   * Elimina unSocio
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
