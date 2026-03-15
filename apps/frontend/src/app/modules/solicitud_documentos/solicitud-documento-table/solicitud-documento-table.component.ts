import { Component, OnInit } from '@angular/core';
import { SolicitudDocumentoService } from '../solicitud-documento.service';
import { SolicitudDocumento } from '../../../shared/models/solicitud-documento.model';

/**
 * Componente de tabla para SolicitudDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-solicitud-documento-table',
  standalone: false,
  templateUrl: './solicitud-documento-table.component.html',
  styleUrl: './solicitud-documento-table.component.scss',
})
export class SolicitudDocumentoTable implements OnInit {

  data: SolicitudDocumento[] = [];
  columns = ['id', 'solicitudId', 'documentoId', 'createdAt'];
  loading = false;

  constructor(private service: SolicitudDocumentoService) {}

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
        console.error('Error al cargar solicitud_documentos:', error);
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
