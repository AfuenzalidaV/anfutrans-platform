import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { TipoSolicitud } from '../../shared/models/tipo-solicitud.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class TipoSolicitudService {

  private readonly endpoint = 'tipo_solicitudes';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de TipoSolicitud
   */
  getAll(): Observable<TipoSolicitud[]> {
    return this.api.get(this.endpoint) as Observable<TipoSolicitud[]>;
  }

  /**
   * Obtiene un TipoSolicitud por ID
   */
  getById(id: string | number): Observable<TipoSolicitud> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<TipoSolicitud>;
  }

  /**
   * Crea un nuevo TipoSolicitud
   */
  create(data: Partial<TipoSolicitud>): Observable<TipoSolicitud> {
    return this.api.post(this.endpoint, data) as Observable<TipoSolicitud>;
  }

  /**
   * Actualiza un TipoSolicitud existente
   */
  update(id: string | number, data: Partial<TipoSolicitud>): Observable<TipoSolicitud> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<TipoSolicitud>;
  }

  /**
   * Elimina unTipoSolicitud
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
