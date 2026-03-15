import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Servicio para gestionar diálogos de confirmación
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre un diálogo de confirmación
   */
  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data,
      disableClose: false,
    });

    return dialogRef.afterClosed();
  }

  /**
   * Diálogo de confirmación para eliminar
   */
  confirmDelete(itemName: string = 'este registro'): Observable<boolean> {
    return this.confirm({
      title: 'Confirmar Eliminación',
      message: `¿Está seguro que desea eliminar ${itemName}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger',
    });
  }

  /**
   * Diálogo de confirmación genérico
   */
  confirmAction(
    title: string,
    message: string,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
  ): Observable<boolean> {
    return this.confirm({
      title,
      message,
      confirmText,
      cancelText,
      type: 'warning',
    });
  }

  /**
   * Diálogo informativo
   */
  info(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      confirmText: 'Entendido',
      cancelText: '',
      type: 'info',
    });
  }
}
