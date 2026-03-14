import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../beneficio.service';
import { Beneficio } from '../../../shared/models/beneficio.model';

/**
 * Componente de tabla para Beneficio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-beneficio-table',
  standalone: false,
  templateUrl: './beneficio-table.component.html',
  styleUrl: './beneficio-table.component.scss',
})
export class BeneficioTable implements OnInit {

  data: Beneficio[] = [];
  columns = ['id', 'nombre', 'descripcion', 'tipoBeneficioId', 'activo'];
  loading = false;

  constructor(private service: BeneficioService) {}

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
        console.error('Error al cargar beneficios:', error);
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
