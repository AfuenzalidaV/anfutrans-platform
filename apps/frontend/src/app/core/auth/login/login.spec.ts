import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from './login';
import { ApiService } from '../../api/api.service';
import { NotificationService } from '../../services/notification.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['post']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['success', 'error', 'warning']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [Login],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    notificationServiceSpy = TestBed.inject(
      NotificationService,
    ) as jasmine.SpyObj<NotificationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con credenciales vacías', () => {
    expect(component.credentials).toEqual({
      email: '',
      password: '',
    });
  });

  describe('onLogin()', () => {
    it('debería hacer login exitosamente con credenciales válidas', () => {
      const mockResponse = { access_token: 'jwt-token-123' };
      component.credentials = { email: 'admin@anfutrans.cl', password: 'admin123' };
      apiServiceSpy.post.and.returnValue(of(mockResponse));

      component.onLogin();

      expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/login', {
        email: 'admin@anfutrans.cl',
        password: 'admin123',
      });
      expect(localStorage.getItem('token')).toBe('jwt-token-123');
      expect(notificationServiceSpy.success).toHaveBeenCalledWith('Inicio de sesión exitoso');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('NO debería hacer login si el email está vacío', () => {
      component.credentials = { email: '', password: 'password123' };

      component.onLogin();

      expect(apiServiceSpy.post).not.toHaveBeenCalled();
      expect(notificationServiceSpy.warning).toHaveBeenCalledWith(
        'Por favor complete todos los campos.',
      );
    });

    it('NO debería hacer login si el password está vacío', () => {
      component.credentials = { email: 'test@test.com', password: '' };

      component.onLogin();

      expect(apiServiceSpy.post).not.toHaveBeenCalled();
      expect(notificationServiceSpy.warning).toHaveBeenCalledWith(
        'Por favor complete todos los campos.',
      );
    });

    it('debería manejar error de credenciales inválidas', () => {
      component.credentials = { email: 'wrong@test.com', password: 'wrongpass' };
      const errorResponse = { status: 401, message: 'Credenciales inválidas' };
      apiServiceSpy.post.and.returnValue(throwError(() => errorResponse));

      component.onLogin();

      expect(component.credentials.password).toBe('');
      expect(localStorage.getItem('token')).toBeNull();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('debería limpiar la contraseña después de un error', () => {
      component.credentials = { email: 'test@test.com', password: 'mypassword' };
      apiServiceSpy.post.and.returnValue(throwError(() => ({ status: 401 })));

      component.onLogin();

      expect(component.credentials.password).toBe('');
      expect(component.credentials.email).toBe('test@test.com');
    });

    it('debería almacenar el token en localStorage al recibir respuesta exitosa', () => {
      const accessToken = 'secure-jwt-token-xyz';
      component.credentials = { email: 'user@test.com', password: 'pass123' };
      apiServiceSpy.post.and.returnValue(of({ access_token: accessToken }));

      component.onLogin();

      expect(localStorage.getItem('token')).toBe(accessToken);
    });

    it('NO debería navegar ni mostrar éxito si hay un error', () => {
      component.credentials = { email: 'test@test.com', password: 'test123' };
      apiServiceSpy.post.and.returnValue(throwError(() => ({ status: 500 })));

      component.onLogin();

      expect(notificationServiceSpy.success).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Validación de campos', () => {
    it('debería validar que ambos campos estén completos', () => {
      const testCases = [
        { email: '', password: '', shouldCall: false },
        { email: 'test@test.com', password: '', shouldCall: false },
        { email: '', password: 'password', shouldCall: false },
        { email: 'test@test.com', password: 'password', shouldCall: true },
      ];

      testCases.forEach(({ email, password, shouldCall }) => {
        apiServiceSpy.post.calls.reset();
        apiServiceSpy.post.and.returnValue(of({ access_token: 'token' }));
        component.credentials = { email, password };

        component.onLogin();

        if (shouldCall) {
          expect(apiServiceSpy.post).toHaveBeenCalled();
        } else {
          expect(apiServiceSpy.post).not.toHaveBeenCalled();
        }
      });
    });
  });
});
