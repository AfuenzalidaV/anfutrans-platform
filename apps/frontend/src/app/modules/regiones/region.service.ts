import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Region } from '../../shared/models/region.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Region
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class RegionService {

  private readonly endpoint = 'regiones';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Region
   */
  getAll(): Observable<Region[]> {
    return this.api.get(this.endpoint) as Observable<Region[]>;
  }

  /**
   * Obtiene un Region por ID
   */
  getById(id: string | number): Observable<Region> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Region>;
  }

  /**
   * Crea un nuevo Region
   */
  create(data: Partial<Region>): Observable<Region> {
    return this.api.post(this.endpoint, data) as Observable<Region>;
  }

  /**
   * Actualiza un Region existente
   */
  update(id: string | number, data: Partial<Region>): Observable<Region> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Region>;
  }

  /**
   * Elimina unRegion
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
