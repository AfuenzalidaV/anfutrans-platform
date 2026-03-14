import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { EstadoSolicitud } from '../../shared/models/estado-solicitud.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de EstadoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class EstadoSolicitudService {

  private readonly endpoint = 'estado_solicitudes';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de EstadoSolicitud
   */
  getAll(): Observable<EstadoSolicitud[]> {
    return this.api.get(this.endpoint) as Observable<EstadoSolicitud[]>;
  }

  /**
   * Obtiene un EstadoSolicitud por ID
   */
  getById(id: string | number): Observable<EstadoSolicitud> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<EstadoSolicitud>;
  }

  /**
   * Crea un nuevo EstadoSolicitud
   */
  create(data: Partial<EstadoSolicitud>): Observable<EstadoSolicitud> {
    return this.api.post(this.endpoint, data) as Observable<EstadoSolicitud>;
  }

  /**
   * Actualiza un EstadoSolicitud existente
   */
  update(id: string | number, data: Partial<EstadoSolicitud>): Observable<EstadoSolicitud> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<EstadoSolicitud>;
  }

  /**
   * Elimina unEstadoSolicitud
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
