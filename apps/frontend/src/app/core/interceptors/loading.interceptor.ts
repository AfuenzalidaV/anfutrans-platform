import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * Loading Interceptor - FASE 8
 * Activa y desactiva el indicador de carga global automáticamente
 * en todas las requests HTTP
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Activar loading antes de la request
  loadingService.show();

  // Ejecutar request y desactivar loading al finalizar
  return next(req).pipe(
    finalize(() => {
      // Se ejecuta tanto en éxito como en error
      loadingService.hide();
    }),
  );
};
