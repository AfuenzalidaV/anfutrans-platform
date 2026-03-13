import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class BeneficiosService {
  constructor(private api: ApiService) {}

  getBeneficios() {
    return this.api.get('beneficios');
  }

  getBeneficioById(id: string) {
    return this.api.get(`beneficios/${id}`);
  }

  createBeneficio(data: any) {
    return this.api.post('beneficios', data);
  }

  updateBeneficio(id: string, data: any) {
    return this.api.put(`beneficios/${id}`, data);
  }

  deleteBeneficio(id: string) {
    return this.api.delete(`beneficios/${id}`);
  }
}
