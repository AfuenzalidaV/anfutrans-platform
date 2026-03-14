import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: spy },
      ],
    });

    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('success()', () => {
    it('debería mostrar notificación de éxito con duración predeterminada', () => {
      const message = 'Operación exitosa';
      
      service.success(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '✓', jasmine.objectContaining({
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['notification-success'],
      }));
    });

    it('debería permitir duración personalizada', () => {
      const message = 'Éxito personalizado';
      const customDuration = 5000;
      
      service.success(message, customDuration);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '✓', jasmine.objectContaining({
        duration: customDuration,
      }));
    });
  });

  describe('error()', () => {
    it('debería mostrar notificación de error con duración predeterminada', () => {
      const message = 'Error al procesar';
      
      service.error(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '✕', jasmine.objectContaining({
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['notification-error'],
      }));
    });

    it('debería permitir duración personalizada', () => {
      const message = 'Error crítico';
      const customDuration = 6000;
      
      service.error(message, customDuration);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '✕', jasmine.objectContaining({
        duration: customDuration,
      }));
    });
  });

  describe('warning()', () => {
    it('debería mostrar notificación de advertencia', () => {
      const message = 'Advertencia importante';
      
      service.warning(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '⚠', jasmine.objectContaining({
        duration: 3500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['notification-warning'],
      }));
    });

    it('debería permitir duración personalizada', () => {
      const message = 'Advertencia';
      const customDuration = 2000;
      
      service.warning(message, customDuration);

      expect(snackBarSpy.open).toHaveBeenCalledWith(message, '⚠', jasmine.objectContaining({
        duration: customDuration,
      }));
    });
  });

  it('debería usar configuración predeterminada para todas las notificaciones', () => {
    service.success('Test 1');
    service.error('Test 2');
    service.warning('Test 3');

    expect(snackBarSpy.open).toHaveBeenCalledTimes(3);
    
    const calls = snackBarSpy.open.calls.all();
    calls.forEach(call => {
      const config = call.args[2];
      expect(config.horizontalPosition).toBe('end');
      expect(config.verticalPosition).toBe('top');
    });
  });
});
