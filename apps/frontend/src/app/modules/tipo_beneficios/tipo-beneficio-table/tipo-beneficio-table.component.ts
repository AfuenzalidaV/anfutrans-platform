import { Component, OnInit } from '@angular/core';
import { TipoBeneficioService } from '../tipo-beneficio.service';
import { TipoBeneficio } from '../../../shared/models/tipo-beneficio.model';

/**
 * Componente de tabla para TipoBeneficio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-beneficio-table',
  standalone: false,
  templateUrl: './tipo-beneficio-table.component.html',
  styleUrl: './tipo-beneficio-table.component.scss',
})
export class TipoBeneficioTable implements OnInit {

  data: TipoBeneficio[] = [];
  columns = ['id', 'codigo', 'nombre', 'activo'];
  loading = false;

  constructor(private service: TipoBeneficioService) {}

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
        console.error('Error al cargar tipo_beneficios:', error);
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
