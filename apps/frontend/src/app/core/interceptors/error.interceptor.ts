import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

/**
 * Error Interceptor - FASE 8
 * Maneja errores HTTP de forma global
 * - 401 Unauthorized: Redirige a login
 * - 403 Forbidden: Notifica falta de permisos
 * - 404 Not Found: Notifica recurso no encontrado
 * - 500 Server Error: Notifica error del servidor
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Manejo específico según código de error
      switch (error.status) {

        case 401:
          // Unauthorized - Token inválido o expirado
          notificationService.error('Sesión expirada. Por favor inicie sesión nuevamente.');
          localStorage.removeItem('token');
          router.navigate(['/login']);
          break;

        case 403:
          // Forbidden - Sin permisos
          notificationService.error('No tiene permisos para realizar esta acción.');
          break;

        case 404:
          // Not Found - Recurso no encontrado
          notificationService.warning('Recurso no encontrado.');
          break;

        case 409:
          // Conflict - Duplicado (RUT, email, etc.)
          const conflictMessage = error.error?.message || 'El registro ya existe en el sistema.';
          notificationService.error(conflictMessage);
          break;

        case 500:
        case 502:
        case 503:
          // Server Error
          notificationService.error('Error del servidor. Intente nuevamente más tarde.');
          break;

        case 0:
          // Network Error - No hay conexión
          notificationService.error('No se pudo conectar con el servidor. Verifique su conexión.');
          break;

        default:
          // Error genérico
          const message = error.error?.message || 'Ocurrió un error inesperado.';
          notificationService.error(message);
          break;
      }

      // Re-lanzar el error para que el componente pueda manejarlo si es necesario
      return throwError(() => error);
    })
  );
};
