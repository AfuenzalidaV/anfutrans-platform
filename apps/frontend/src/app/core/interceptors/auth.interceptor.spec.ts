import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('debería agregar el header Authorization cuando hay token y no es endpoint público', () => {
    const testToken = 'test-jwt-token-123';
    localStorage.setItem('token', testToken);

    httpClient.get('/api/socios').subscribe();

    const req = httpTestingController.expectOne('/api/socios');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    req.flush({});
  });

  it('NO debería agregar el header Authorization para /auth/login', () => {
    const testToken = 'test-jwt-token-123';
    localStorage.setItem('token', testToken);

    httpClient.post('/auth/login', { email: 'test@test.com', password: '123' }).subscribe();

    const req = httpTestingController.expectOne('/auth/login');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('NO debería agregar el header Authorization para /auth/register', () => {
    const testToken = 'test-jwt-token-123';
    localStorage.setItem('token', testToken);

    httpClient.post('/auth/register', { email: 'test@test.com', password: '123' }).subscribe();

    const req = httpTestingController.expectOne('/auth/register');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('NO debería agregar el header Authorization si no hay token', () => {
    httpClient.get('/api/beneficios').subscribe();

    const req = httpTestingController.expectOne('/api/beneficios');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('debería permitir que la petición continúe sin modificar para endpoints públicos', () => {
    httpClient.post('/auth/login', { username: 'admin', password: 'admin' }).subscribe();

    const req = httpTestingController.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'admin', password: 'admin' });
    req.flush({ access_token: 'nuevo-token' });
  });

  it('debería agregar Authorization para endpoints no públicos con token', () => {
    localStorage.setItem('token', 'my-secure-token');

    httpClient.get('/api/usuarios/1').subscribe();
    httpClient.put('/api/socios/2', { nombre: 'Test' }).subscribe();
    httpClient.delete('/api/beneficios/3').subscribe();

    const requests = [
      httpTestingController.expectOne('/api/usuarios/1'),
      httpTestingController.expectOne('/api/socios/2'),
      httpTestingController.expectOne('/api/beneficios/3'),
    ];

    requests.forEach(req => {
      expect(req.request.headers.get('Authorization')).toBe('Bearer my-secure-token');
      req.flush({});
    });
  });
});
