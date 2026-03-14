import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../shared/models/usuario.model';

/**
 * Componente de tabla para Usuario
 * Generado automáticamente desde Prisma Schema
 */
@Component({
  selector: 'app-usuario-table',
  standalone: false,
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss',
})
export class UsuarioTable implements OnInit {

  data: Usuario[] = [];
  columns = ['id', 'email', 'passwordHash', 'nombre', 'apellido'];
  loading = false;

  constructor(private service: UsuarioService) {}

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
        console.error('Error al cargar usuarios:', error);
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
