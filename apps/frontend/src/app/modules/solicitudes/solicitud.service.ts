import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Solicitud } from '../../shared/models/solicitud.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de Solicitud
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class SolicitudService {

  private readonly endpoint = 'solicitudes';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de Solicitud
   */
  getAll(): Observable<Solicitud[]> {
    return this.api.get(this.endpoint) as Observable<Solicitud[]>;
  }

  /**
   * Obtiene un Solicitud por ID
   */
  getById(id: string | number): Observable<Solicitud> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<Solicitud>;
  }

  /**
   * Crea un nuevo Solicitud
   */
  create(data: Partial<Solicitud>): Observable<Solicitud> {
    return this.api.post(this.endpoint, data) as Observable<Solicitud>;
  }

  /**
   * Actualiza un Solicitud existente
   */
  update(id: string | number, data: Partial<Solicitud>): Observable<Solicitud> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<Solicitud>;
  }

  /**
   * Elimina unSolicitud
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
