import { Component, OnInit } from '@angular/core';
import { EstadoSolicitudService } from '../estado-solicitud.service';
import { EstadoSolicitud } from '../../../shared/models/estado-solicitud.model';

/**
 * Componente de tabla para EstadoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-estado-solicitud-table',
  standalone: false,
  templateUrl: './estado-solicitud-table.component.html',
  styleUrl: './estado-solicitud-table.component.scss',
})
export class EstadoSolicitudTable implements OnInit {

  data: EstadoSolicitud[] = [];
  columns = ['id', 'codigo', 'nombre', 'orden', 'activo'];
  loading = false;

  constructor(private service: EstadoSolicitudService) {}

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
        console.error('Error al cargar estado_solicitudes:', error);
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
