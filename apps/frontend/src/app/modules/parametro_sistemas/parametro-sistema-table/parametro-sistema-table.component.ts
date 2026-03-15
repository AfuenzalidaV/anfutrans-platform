import { Component, OnInit } from '@angular/core';
import { ParametroSistemaService } from '../parametro-sistema.service';
import { ParametroSistema } from '../../../shared/models/parametro-sistema.model';

/**
 * Componente de tabla para ParametroSistema
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-parametro-sistema-table',
  standalone: false,
  templateUrl: './parametro-sistema-table.component.html',
  styleUrl: './parametro-sistema-table.component.scss',
})
export class ParametroSistemaTable implements OnInit {

  data: ParametroSistema[] = [];
  columns = ['id', 'clave', 'valor', 'descripcion', 'updatedAt'];
  loading = false;

  constructor(private service: ParametroSistemaService) {}

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
        console.error('Error al cargar parametro_sistemas:', error);
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
