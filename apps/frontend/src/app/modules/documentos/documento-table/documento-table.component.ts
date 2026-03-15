import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../documento.service';
import { Documento } from '../../../shared/models/documento.model';

/**
 * Componente de tabla para Documento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-documento-table',
  standalone: false,
  templateUrl: './documento-table.component.html',
  styleUrl: './documento-table.component.scss',
})
export class DocumentoTable implements OnInit {

  data: Documento[] = [];
  columns = ['id', 'nombreArchivo', 'ruta', 'tipoDocumentoId', 'usuarioId'];
  loading = false;

  constructor(private service: DocumentoService) {}

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
        console.error('Error al cargar documentos:', error);
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
