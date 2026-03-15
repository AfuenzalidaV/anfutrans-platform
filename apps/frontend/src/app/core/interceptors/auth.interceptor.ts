import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth Interceptor - FASE 8
 * Agrega automáticamente el token JWT a todas las requests HTTP
 * Excepto endpoints públicos (/auth/login, /auth/register)
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Lista de endpoints públicos que no requieren autenticación
  const publicEndpoints = ['/auth/login', '/auth/register'];

  // Verificar si la URL es pública
  const isPublicEndpoint = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  // Si es endpoint público, no agregar token
  if (isPublicEndpoint) {
    return next(req);
  }

  // Obtener token del localStorage
  const token = localStorage.getItem('token');

  // Si existe token, clonar request y agregar header Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }

  // Si no hay token, enviar request original
  return next(req);
};
