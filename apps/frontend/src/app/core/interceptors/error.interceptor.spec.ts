import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Router } from '@angular/router';
import { errorInterceptor } from './error.interceptor';
import { NotificationService } from '../services/notification.service';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['error', 'warning']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(
      NotificationService,
    ) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería manejar error 401 (Unauthorized)', (done) => {
    localStorage.setItem('token', 'expired-token');

    httpClient.get('/api/protected').subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
        expect(notificationService.error).toHaveBeenCalledWith(
          'Sesión expirada. Por favor, inicie sesión nuevamente.',
        );
        expect(localStorage.getItem('token')).toBeNull();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/protected');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('debería manejar error 403 (Forbidden)', (done) => {
    httpClient.get('/api/admin').subscribe({
      error: (error) => {
        expect(error.status).toBe(403);
        expect(notificationService.error).toHaveBeenCalledWith(
          'No tiene permisos para realizar esta acción.',
        );
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/admin');
    req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
  });

  it('debería manejar error 404 (Not Found)', (done) => {
    httpClient.get('/api/inexistente/999').subscribe({
      error: (error) => {
        expect(error.status).toBe(404);
        expect(notificationService.warning).toHaveBeenCalledWith(
          'El recurso solicitado no fue encontrado.',
        );
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/inexistente/999');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('debería manejar error 409 (Conflict) con mensaje del backend', (done) => {
    const errorMessage = 'El RUT ya está registrado';

    httpClient.post('/api/socios', {}).subscribe({
      error: (error) => {
        expect(error.status).toBe(409);
        expect(notificationService.error).toHaveBeenCalledWith(errorMessage);
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/socios');
    req.flush({ message: errorMessage }, { status: 409, statusText: 'Conflict' });
  });

  it('debería manejar error 500 (Internal Server Error)', (done) => {
    httpClient.get('/api/crash').subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
        expect(notificationService.error).toHaveBeenCalledWith(
          'Error interno del servidor. Intente nuevamente más tarde.',
        );
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/crash');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('debería manejar error de red (status 0)', (done) => {
    httpClient.get('/api/offline').subscribe({
      error: (error) => {
        expect(error.status).toBe(0);
        expect(notificationService.error).toHaveBeenCalledWith(
          'Error de conexión. Verifique su conexión a internet.',
        );
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/offline');
    req.error(new ProgressEvent('error'), { status: 0 });
  });

  it('debería re-lanzar el error después de manejarlo', (done) => {
    httpClient.get('/api/error').subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(500);
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/error');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
