import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';

/**
 * Componente de tabla para Solicitud
 * Generado automáticamente desde Prisma Schema
 * MEJORADO: FASE 7 - Dashboard + CRUD completo
 * MEJORADO: FASE 8 - Interceptores HTTP (loading automático)
 */
@Component({
  selector: 'app-solicitud-table',
  standalone: false,
  templateUrl: './solicitud-table.component.html',
  styleUrl: './solicitud-table.component.scss',
})
export class SolicitudTable implements OnInit {

  data: Solicitud[] = [];
  columns = ['id', 'socioId', 'tipoSolicitudId', 'estadoSolicitudId', 'fechaSolicitud', 'actions'];
  loading = false;

  constructor(
    private service: SolicitudService,
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
        console.error('Error al cargar solicitudes:', error);
        // El errorInterceptor ya muestra la notificación
        this.loading = false;
        this.data = [];
      }
    });
  }

  onDelete(solicitud: Solicitud) {
    const itemName = `la solicitud #${solicitud.id}`;

    this.dialogService.confirmDelete(itemName).subscribe(confirmed => {
      if (confirmed) {
        // El loadingInterceptor activa el loading automáticamente
        this.service.delete(solicitud.id).subscribe({
          next: () => {
            this.notificationService.success('Solicitud eliminada exitosamente');
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
