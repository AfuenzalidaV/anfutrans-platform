import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  constructor(private api: ApiService) {}

  getUsuarios() {
    return this.api.get('usuarios');
  }

  getUsuarioById(id: string) {
    return this.api.get(`usuarios/${id}`);
  }

  createUsuario(data: any) {
    return this.api.post('usuarios', data);
  }

  updateUsuario(id: string, data: any) {
    return this.api.put(`usuarios/${id}`, data);
  }

  deleteUsuario(id: string) {
    return this.api.delete(`usuarios/${id}`);
  }

}
