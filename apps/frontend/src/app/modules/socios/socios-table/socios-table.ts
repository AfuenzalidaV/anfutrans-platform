import { Component, OnInit } from '@angular/core';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socios-table',
  standalone: false,
  templateUrl: './socios-table.html',
  styleUrl: './socios-table.scss',
})
export class SociosTable implements OnInit {

  socios: any[] = [];
  columns = ['rut', 'nombre', 'apellido', 'email', 'telefono'];

  constructor(private sociosService: SociosService) {}

  ngOnInit() {
    this.sociosService.getSocios().subscribe({
      next: (data: any) => {
        this.socios = data;
      },
      error: (error) => {
        console.error('Error al cargar socios:', error);
        // Datos demo
        this.socios = [
          { id: '1', rut: '12345678-9', nombre: 'Juan', apellido: 'Pérez', email: 'juan@mail.com', telefono: '+56912345678' },
          { id: '2', rut: '98765432-1', nombre: 'María', apellido: 'González', email: 'maria@mail.com', telefono: '+56987654321' }
        ];
      }
    });
  }

}
