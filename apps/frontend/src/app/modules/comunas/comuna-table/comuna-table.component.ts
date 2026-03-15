import { Component, OnInit } from '@angular/core';
import { ComunaService } from '../comuna.service';
import { Comuna } from '../../../shared/models/comuna.model';

/**
 * Componente de tabla para Comuna
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-comuna-table',
  standalone: false,
  templateUrl: './comuna-table.component.html',
  styleUrl: './comuna-table.component.scss',
})
export class ComunaTable implements OnInit {

  data: Comuna[] = [];
  columns = ['id', 'codigo', 'nombre', 'regionId', 'activo'];
  loading = false;

  constructor(private service: ComunaService) {}

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
        console.error('Error al cargar comunas:', error);
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
