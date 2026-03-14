import { Component, OnInit } from '@angular/core';
import { RolService } from '../rol.service';
import { Rol } from '../../../shared/models/rol.model';

/**
 * Componente de tabla para Rol
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-rol-table',
  standalone: false,
  templateUrl: './rol-table.component.html',
  styleUrl: './rol-table.component.scss',
})
export class RolTable implements OnInit {

  data: Rol[] = [];
  columns = ['id', 'codigo', 'nombre', 'descripcion', 'activo'];
  loading = false;

  constructor(private service: RolService) {}

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
        console.error('Error al cargar roles:', error);
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
