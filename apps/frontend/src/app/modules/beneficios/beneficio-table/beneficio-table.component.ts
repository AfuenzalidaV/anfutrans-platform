import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../beneficio.service';
import { Beneficio } from '../../../shared/models/beneficio.model';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';

/**
 * Componente de tabla para Beneficio
 * Generado automáticamente desde Prisma Schema
 * MEJORADO: FASE 7 - Dashboard + CRUD completo
 * MEJORADO: FASE 8 - Interceptores HTTP (loading automático)
 */
@Component({
  selector: 'app-beneficio-table',
  standalone: false,
  templateUrl: './beneficio-table.component.html',
  styleUrl: './beneficio-table.component.scss',
})
export class BeneficioTable implements OnInit {

  data: Beneficio[] = [];
  columns = ['id', 'nombre', 'descripcion', 'tipoBeneficioId', 'activo', 'actions'];
  loading = false;

  constructor(
    private service: BeneficioService,
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
        console.error('Error al cargar beneficios:', error);
        // El errorInterceptor ya muestra la notificación
        this.loading = false;
        this.data = [];
      }
    });
  }

  onDelete(beneficio: Beneficio) {
    const itemName = `el beneficio "${beneficio.nombre}"`;

    this.dialogService.confirmDelete(itemName).subscribe(confirmed => {
      if (confirmed) {
        // El loadingInterceptor activa el loading automáticamente
        this.service.delete(beneficio.id).subscribe({
          next: () => {
            this.notificationService.success('Beneficio eliminado exitosamente');
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
