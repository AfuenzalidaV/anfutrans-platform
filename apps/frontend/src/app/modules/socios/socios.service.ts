import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SociosService {
  constructor(private api: ApiService) {}

  getSocios() {
    return this.api.get('socios');
  }

  createSocio(data: any) {
    return this.api.post('socios', data);
  }
}
