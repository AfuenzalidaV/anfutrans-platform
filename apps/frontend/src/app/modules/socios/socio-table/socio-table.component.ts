import { Component, OnInit } from '@angular/core';
import { SocioService } from '../socio.service';
import { Socio } from '../../../shared/models/socio.model';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';

/**
 * Componente de tabla para Socio
 * Generado automáticamente desde Prisma Schema
 * MEJORADO: FASE 7 - Dashboard + CRUD completo
 * MEJORADO: FASE 8 - Interceptores HTTP (loading automático)
 */
@Component({
  selector: 'app-socio-table',
  standalone: false,
  templateUrl: './socio-table.component.html',
  styleUrl: './socio-table.component.scss',
})
export class SocioTable implements OnInit {

  data: Socio[] = [];
  columns = ['id', 'rut', 'nombre', 'apellido', 'email', 'actions'];
  loading = false;

  constructor(
    private service: SocioService,
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
        console.error('Error al cargar socios:', error);
        // El errorInterceptor ya muestra la notificación
        this.loading = false;
        this.data = [];
      }
    });
  }

  onDelete(socio: Socio) {
    const itemName = `${socio.nombre} ${socio.apellido} (RUT: ${socio.rut})`;

    this.dialogService.confirmDelete(itemName).subscribe(confirmed => {
      if (confirmed) {
        // El loadingInterceptor activa el loading automáticamente
        this.service.delete(socio.id).subscribe({
          next: () => {
            this.notificationService.success('Socio eliminado exitosamente');
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
