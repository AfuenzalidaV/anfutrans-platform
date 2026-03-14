import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../tipo-documento.service';
import { TipoDocumento } from '../../../shared/models/tipo-documento.model';

/**
 * Componente de tabla para TipoDocumento
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-documento-table',
  standalone: false,
  templateUrl: './tipo-documento-table.component.html',
  styleUrl: './tipo-documento-table.component.scss',
})
export class TipoDocumentoTable implements OnInit {

  data: TipoDocumento[] = [];
  columns = ['id', 'codigo', 'nombre', 'ambito', 'activo'];
  loading = false;

  constructor(private service: TipoDocumentoService) {}

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
        console.error('Error al cargar tipo_documentos:', error);
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
