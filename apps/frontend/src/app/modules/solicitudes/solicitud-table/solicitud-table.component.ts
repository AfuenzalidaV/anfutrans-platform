import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { Solicitud } from '../../../shared/models/solicitud.model';

/**
 * Componente de tabla para Solicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-table',
  standalone: false,
  templateUrl: './solicitud-table.component.html',
  styleUrl: './solicitud-table.component.scss',
})
export class SolicitudTable implements OnInit {

  data: Solicitud[] = [];
  columns = ['id', 'socioId', 'tipoSolicitudId', 'estadoSolicitudId', 'fechaSolicitud'];
  loading = false;

  constructor(private service: SolicitudService) {}

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
        console.error('Error al cargar solicitudes:', error);
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
