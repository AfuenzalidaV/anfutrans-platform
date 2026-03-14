import { Component, OnInit } from '@angular/core';
import { SocioService } from '../socio.service';
import { Socio } from '../../../shared/models/socio.model';

/**
 * Componente de tabla para Socio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-socio-table',
  standalone: false,
  templateUrl: './socio-table.component.html',
  styleUrl: './socio-table.component.scss',
})
export class SocioTable implements OnInit {

  data: Socio[] = [];
  columns = ['id', 'rut', 'nombre', 'apellido', 'email'];
  loading = false;

  constructor(private service: SocioService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.data = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar socios:', error);
        this.loading = false;
        // Datos demo para testing
        this.data = [];
      }
    });
  }

  onDelete(id: string | number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el registro');
        }
      });
    }
  }
}
