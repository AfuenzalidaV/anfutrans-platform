import { Component, OnInit } from '@angular/core';
import { TipoSolicitudService } from '../tipo-solicitud.service';
import { TipoSolicitud } from '../../../shared/models/tipo-solicitud.model';

/**
 * Componente de tabla para TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-solicitud-table',
  standalone: false,
  templateUrl: './tipo-solicitud-table.component.html',
  styleUrl: './tipo-solicitud-table.component.scss',
})
export class TipoSolicitudTable implements OnInit {

  data: TipoSolicitud[] = [];
  columns = ['id', 'codigo', 'nombre', 'descripcion', 'requiereAprobacion'];
  loading = false;

  constructor(private service: TipoSolicitudService) {}

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
        console.error('Error al cargar tipo_solicitudes:', error);
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
