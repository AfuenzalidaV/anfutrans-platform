import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Usuario } from '../../shared/models/usuario.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Usuario
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly endpoint = 'usuarios';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Usuario
   */
  getAll(): Observable<Usuario[]> {
    return this.api.get(this.endpoint) as Observable<Usuario[]>;
  }

  /**
   * Obtiene un Usuario por ID
   */
  getById(id: string | number): Observable<Usuario> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Usuario>;
  }

  /**
   * Crea un nuevo Usuario
   */
  create(data: Partial<Usuario>): Observable<Usuario> {
    return this.api.post(this.endpoint, data) as Observable<Usuario>;
  }

  /**
   * Actualiza un Usuario existente
   */
  update(id: string | number, data: Partial<Usuario>): Observable<Usuario> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Usuario>;
  }

  /**
   * Elimina unUsuario
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
