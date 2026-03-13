import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-table',
  standalone: false,
  templateUrl: './usuarios-table.html',
  styleUrl: './usuarios-table.scss',
})
export class UsuariosTable implements OnInit {

  usuarios: any[] = [];
  columns = ['email', 'nombre', 'apellido', 'rolId'];

  constructor(private service: UsuariosService) {}

  ngOnInit() {
    this.service.getUsuarios().subscribe({
      next: (data: any) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        // Datos demo
        this.usuarios = [
          { id: '1', email: 'admin@anfutrans.cl', nombre: 'Admin', apellido: 'Sistema', rolId: 1 },
          { id: '2', email: 'user@anfutrans.cl', nombre: 'Usuario', apellido: 'Demo', rolId: 2 }
        ];
      }
    });
  }

}
