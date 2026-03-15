import { Component, OnInit } from '@angular/core';
import { TipoCertificadoService } from '../tipo-certificado.service';
import { TipoCertificado } from '../../../shared/models/tipo-certificado.model';

/**
 * Componente de tabla para TipoCertificado
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-tipo-certificado-table',
  standalone: false,
  templateUrl: './tipo-certificado-table.component.html',
  styleUrl: './tipo-certificado-table.component.scss',
})
export class TipoCertificadoTable implements OnInit {

  data: TipoCertificado[] = [];
  columns = ['id', 'codigo', 'nombre', 'requiereVigencia', 'activo'];
  loading = false;

  constructor(private service: TipoCertificadoService) {}

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
        console.error('Error al cargar tipo_certificados:', error);
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
