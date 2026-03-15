import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { BeneficioSocio } from '../../shared/models/beneficio-socio.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestión de BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
@Injectable({ providedIn: 'root' })
export class BeneficioSocioService {

  private readonly endpoint = 'beneficio_socios';

  constructor(private api: ApiService) {}

  /**
   * Obtiene todos los registros de BeneficioSocio
   */
  getAll(): Observable<BeneficioSocio[]> {
    return this.api.get(this.endpoint) as Observable<BeneficioSocio[]>;
  }

  /**
   * Obtiene un BeneficioSocio por ID
   */
  getById(id: string | number): Observable<BeneficioSocio> {
    return this.api.get(`${this.endpoint}/${id}`) as Observable<BeneficioSocio>;
  }

  /**
   * Crea un nuevo BeneficioSocio
   */
  create(data: Partial<BeneficioSocio>): Observable<BeneficioSocio> {
    return this.api.post(this.endpoint, data) as Observable<BeneficioSocio>;
  }

  /**
   * Actualiza un BeneficioSocio existente
   */
  update(id: string | number, data: Partial<BeneficioSocio>): Observable<BeneficioSocio> {
    return this.api.put(`${this.endpoint}/${id}`, data) as Observable<BeneficioSocio>;
  }

  /**
   * Elimina unBeneficioSocio
   */
  delete(id: string | number): Observable<void> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
