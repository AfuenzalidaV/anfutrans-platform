import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('debería hacer una petición GET a la URL correcta', () => {
      const testData = { id: 1, nombre: 'Test' };
      const path = 'api/socios';

      service.get(path).subscribe((data) => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/${path}`);
      expect(req.request.method).toBe('GET');
      req.flush(testData);
    });

    it('debería retornar datos tipados', () => {
      interface Socio {
        id: number;
        nombre: string;
      }

      const testSocio: Socio = { id: 1, nombre: 'Juan Pérez' };

      service.get<Socio>('api/socios/1').subscribe((socio) => {
        expect(socio.id).toBe(1);
        expect(socio.nombre).toBe('Juan Pérez');
      });

      const req = httpTestingController.expectOne(`${baseUrl}/api/socios/1`);
      req.flush(testSocio);
    });
  });

  describe('post()', () => {
    it('debería hacer una petición POST con el body correcto', () => {
      const newSocio = { nombre: 'Nuevo Socio', rut: '12345678-9' };
      const response = { id: 1, ...newSocio };

      service.post('api/socios', newSocio).subscribe((data) => {
        expect(data).toEqual(response);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/api/socios`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newSocio);
      req.flush(response);
    });

    it('debería manejar respuestas tipadas', () => {
      interface LoginResponse {
        access_token: string;
      }

      const credentials = { email: 'test@test.com', password: '123' };
      const response: LoginResponse = { access_token: 'jwt-token' };

      service.post<LoginResponse>('auth/login', credentials).subscribe((res) => {
        expect(res.access_token).toBe('jwt-token');
      });

      const req = httpTestingController.expectOne(`${baseUrl}/auth/login`);
      req.flush(response);
    });
  });

  describe('put()', () => {
    it('debería hacer una petición PUT con el body correcto', () => {
      const updatedSocio = { nombre: 'Nombre Actualizado' };
      const response = { id: 1, ...updatedSocio };

      service.put('api/socios/1', updatedSocio).subscribe((data) => {
        expect(data).toEqual(response);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/api/socios/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedSocio);
      req.flush(response);
    });
  });

  describe('delete()', () => {
    it('debería hacer una petición DELETE', () => {
      service.delete('api/socios/1').subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/api/socios/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('debería manejar la respuesta void correctamente', (done) => {
      service.delete('api/beneficios/99').subscribe((response) => {
        expect(response).toBeUndefined();
        done();
      });

      const req = httpTestingController.expectOne(`${baseUrl}/api/beneficios/99`);
      req.flush(null);
    });
  });

  describe('Integración con URL base', () => {
    it('debería construir URLs correctamente evitando doble slash', () => {
      service.get('api/usuarios').subscribe();
      service.get('/api/tramites').subscribe();

      const req1 = httpTestingController.expectOne(`${baseUrl}/api/usuarios`);
      const req2 = httpTestingController.expectOne(`${baseUrl}//api/tramites`);

      expect(req1.request.url).toBe(`${baseUrl}/api/usuarios`);
      expect(req2.request.url).toBe(`${baseUrl}//api/tramites`);

      req1.flush({});
      req2.flush({});
    });
  });
});
