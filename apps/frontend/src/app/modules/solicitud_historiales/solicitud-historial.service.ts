import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { SolicitudHistorial } from '../../shared/models/solicitud-historial.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class SolicitudHistorialService {

  private readonly endpoint = 'solicitud_historiales';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de SolicitudHistorial
   */
  getAll(): Observable<SolicitudHistorial[]> {
    return this.api.get(this.endpoint) as Observable<SolicitudHistorial[]>;
  }

  /**
   * Obtiene un SolicitudHistorial por ID
   */
  getById(id: string | number): Observable<SolicitudHistorial> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<SolicitudHistorial>;
  }

  /**
   * Crea un nuevo SolicitudHistorial
   */
  create(data: Partial<SolicitudHistorial>): Observable<SolicitudHistorial> {
    return this.api.post(this.endpoint, data) as Observable<SolicitudHistorial>;
  }

  /**
   * Actualiza un SolicitudHistorial existente
   */
  update(id: string | number, data: Partial<SolicitudHistorial>): Observable<SolicitudHistorial> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<SolicitudHistorial>;
  }

  /**
   * Elimina unSolicitudHistorial
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
