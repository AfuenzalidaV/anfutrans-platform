import { Component, OnInit } from '@angular/core';
import { SolicitudHistorialService } from '../solicitud-historial.service';
import { SolicitudHistorial } from '../../../shared/models/solicitud-historial.model';

/**
 * Componente de tabla para SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-historial-table',
  standalone: false,
  templateUrl: './solicitud-historial-table.component.html',
  styleUrl: './solicitud-historial-table.component.scss',
})
export class SolicitudHistorialTable implements OnInit {

  data: SolicitudHistorial[] = [];
  columns = ['id', 'solicitudId', 'estadoSolicitudId', 'usuarioId', 'fecha'];
  loading = false;

  constructor(private service: SolicitudHistorialService) {}

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
        console.error('Error al cargar solicitud_historiales:', error);
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
