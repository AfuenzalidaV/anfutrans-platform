import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Rol } from '../../shared/models/rol.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Rol
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class RolService {

  private readonly endpoint = 'roles';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Rol
   */
  getAll(): Observable<Rol[]> {
    return this.api.get(this.endpoint) as Observable<Rol[]>;
  }

  /**
   * Obtiene un Rol por ID
   */
  getById(id: string | number): Observable<Rol> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Rol>;
  }

  /**
   * Crea un nuevo Rol
   */
  create(data: Partial<Rol>): Observable<Rol> {
    return this.api.post(this.endpoint, data) as Observable<Rol>;
  }

  /**
   * Actualiza un Rol existente
   */
  update(id: string | number, data: Partial<Rol>): Observable<Rol> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Rol>;
  }

  /**
   * Elimina unRol
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
