import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../shared/models/usuario.model';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';

/**
 * Componente de tabla para Usuario
 * Generado automáticamente desde Prisma Schema
 * MEJORADO: FASE 7 - Dashboard + CRUD completo
 * MEJORADO: FASE 8 - Interceptores HTTP (loading automático)
 */
@Component({
  selector: 'app-usuario-table',
  standalone: false,
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss',
})
export class UsuarioTable implements OnInit {

  data: Usuario[] = [];
  columns = ['id', 'email', 'nombre', 'apellido', 'activo', 'actions'];
  loading = false;

  constructor(
    private service: UsuarioService,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

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
        // El errorInterceptor ya muestra la notificación
        this.loading = false;
        this.data = [];
      }
    });
  }

  onDelete(usuario: Usuario) {
    const itemName = `${usuario.nombre} ${usuario.apellido} (${usuario.email})`;

    this.dialogService.confirmDelete(itemName).subscribe(confirmed => {
      if (confirmed) {
        // El loadingInterceptor activa el loading automáticamente
        this.service.delete(usuario.id).subscribe({
          next: () => {
            this.notificationService.success('Usuario eliminado exitosamente');
            this.loadData();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            // El errorInterceptor ya muestra la notificación
          }
        });
      }
    });
  }
}
