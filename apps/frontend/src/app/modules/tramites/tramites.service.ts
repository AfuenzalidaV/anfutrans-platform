import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class TramitesService {

  constructor(private api: ApiService) {}

  getTramites() {
    return this.api.get('tramites');
  }

  getTramiteById(id: string) {
    return this.api.get(`tramites/${id}`);
  }

  createTramite(data: any) {
    return this.api.post('tramites', data);
  }

  updateTramite(id: string, data: any) {
    return this.api.put(`tramites/${id}`, data);
  }

  deleteTramite(id: string) {
    return this.api.delete(`tramites/${id}`);
  }

}
