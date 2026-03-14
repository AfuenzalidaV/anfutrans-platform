import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { CargoDirigencial } from '../../shared/models/cargo-dirigencial.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de CargoDirigencial
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class CargoDirigencialService {

  private readonly endpoint = 'cargo_dirigenciales';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de CargoDirigencial
   */
  getAll(): Observable<CargoDirigencial[]> {
    return this.api.get(this.endpoint) as Observable<CargoDirigencial[]>;
  }

  /**
   * Obtiene un CargoDirigencial por ID
   */
  getById(id: string | number): Observable<CargoDirigencial> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<CargoDirigencial>;
  }

  /**
   * Crea un nuevo CargoDirigencial
   */
  create(data: Partial<CargoDirigencial>): Observable<CargoDirigencial> {
    return this.api.post(this.endpoint, data) as Observable<CargoDirigencial>;
  }

  /**
   * Actualiza un CargoDirigencial existente
   */
  update(id: string | number, data: Partial<CargoDirigencial>): Observable<CargoDirigencial> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<CargoDirigencial>;
  }

  /**
   * Elimina unCargoDirigencial
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
