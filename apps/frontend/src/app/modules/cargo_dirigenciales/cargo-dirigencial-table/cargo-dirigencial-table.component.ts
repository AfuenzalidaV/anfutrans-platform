import { Component, OnInit } from '@angular/core';
import { CargoDirigencialService } from '../cargo-dirigencial.service';
import { CargoDirigencial } from '../../../shared/models/cargo-dirigencial.model';

/**
 * Componente de tabla para CargoDirigencial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-cargo-dirigencial-table',
  standalone: false,
  templateUrl: './cargo-dirigencial-table.component.html',
  styleUrl: './cargo-dirigencial-table.component.scss',
})
export class CargoDirigencialTable implements OnInit {

  data: CargoDirigencial[] = [];
  columns = ['id', 'codigo', 'nombre', 'nivel', 'activo'];
  loading = false;

  constructor(private service: CargoDirigencialService) {}

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
        console.error('Error al cargar cargo_dirigenciales:', error);
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
