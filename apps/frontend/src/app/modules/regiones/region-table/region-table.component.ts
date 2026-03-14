import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';
import { Region } from '../../../shared/models/region.model';

/**
 * Componente de tabla para Region
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-region-table',
  standalone: false,
  templateUrl: './region-table.component.html',
  styleUrl: './region-table.component.scss',
})
export class RegionTable implements OnInit {

  data: Region[] = [];
  columns = ['id', 'codigo', 'nombre', 'activo'];
  loading = false;

  constructor(private service: RegionService) {}

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
        console.error('Error al cargar regiones:', error);
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
