import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Servicio de notificaciones toast usando Material Snackbar
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Muestra notificación de éxito
   */
  success(message: string, duration = 3000): void {
    this.snackBar.open(message, '✓', {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification-success'],
    });
  }

  /**
   * Muestra notificación de error
   */
  error(message: string, duration = 4000): void {
    this.snackBar.open(message, '✕', {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification-error'],
    });
  }

  /**
   * Muestra notificación de advertencia
   */
  warning(message: string, duration = 3500): void {
    this.snackBar.open(message, '⚠', {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification-warning'],
    });
  }

  /**
   * Muestra notificación informativa
   */
  info(message: string, duration = 3000): void {
    this.snackBar.open(message, 'ℹ', {
      ...this.defaultConfig,
      duration,
      panelClass: ['notification-info'],
    });
  }

  /**
   * Muestra notificación personalizada
   */
  show(message: string, action = 'OK', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config,
    });
  }
}
