import { Component, OnInit } from '@angular/core';
import { BeneficioSocioService } from '../beneficio-socio.service';
import { BeneficioSocio } from '../../../shared/models/beneficio-socio.model';

/**
 * Componente de tabla para BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-beneficio-socio-table',
  standalone: false,
  templateUrl: './beneficio-socio-table.component.html',
  styleUrl: './beneficio-socio-table.component.scss',
})
export class BeneficioSocioTable implements OnInit {

  data: BeneficioSocio[] = [];
  columns = ['id', 'socioId', 'beneficioId', 'fechaOtorgamiento', 'activo'];
  loading = false;

  constructor(private service: BeneficioSocioService) {}

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
        console.error('Error al cargar beneficio_socios:', error);
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
