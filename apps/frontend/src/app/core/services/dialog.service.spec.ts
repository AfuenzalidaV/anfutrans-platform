import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogService } from './dialog.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

describe('DialogService', () => {
  let service: DialogService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [DialogService, { provide: MatDialog, useValue: spy }],
    });

    service = TestBed.inject(DialogService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matDialogSpy.open.and.returnValue(dialogRefSpy);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('confirm()', () => {
    it('debería abrir un diálogo con la configuración correcta', () => {
      const data = {
        title: 'Test Title',
        message: 'Test Message',
        confirmText: 'OK',
        cancelText: 'Cancel',
        type: 'info' as const,
      };

      dialogRefSpy.afterClosed.and.returnValue(of(true));
      service.confirm(data);

      expect(matDialogSpy.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        width: '400px',
        data,
        disableClose: false,
      });
    });

    it('debería retornar el observable del resultado del diálogo', (done) => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));

      const data = {
        title: 'Test',
        message: 'Test',
        confirmText: 'OK',
        cancelText: 'Cancel',
        type: 'info' as const,
      };

      service.confirm(data).subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('confirmDelete()', () => {
    it('debería crear un diálogo de confirmación de eliminación con nombre predeterminado', () => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));
      service.confirmDelete();

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            title: 'Confirmar Eliminación',
            message:
              '¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            type: 'danger',
          }),
        }),
      );
    });

    it('debería personalizar el nombre del item a eliminar', () => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));
      const itemName = 'el usuario Juan Pérez';
      service.confirmDelete(itemName);

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            message: `¿Está seguro que desea eliminar ${itemName}? Esta acción no se puede deshacer.`,
          }),
        }),
      );
    });

    it('debería retornar true cuando el usuario confirma', (done) => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));

      service.confirmDelete('el socio').subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('debería retornar false cuando el usuario cancela', (done) => {
      dialogRefSpy.afterClosed.and.returnValue(of(false));

      service.confirmDelete('el socio').subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
    });
  });

  describe('confirmAction()', () => {
    it('debería crear un diálogo de confirmación genérico', () => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));
      const title = 'Confirmar acción';
      const message = '¿Desea continuar?';

      service.confirmAction(title, message);

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            title,
            message,
            confirmText: 'Aceptar',
            cancelText: 'Cancelar',
            type: 'warning',
          }),
        }),
      );
    });

    it('debería permitir personalizar los textos de los botones', () => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));

      service.confirmAction('Título', 'Mensaje', 'Sí', 'No');

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            confirmText: 'Sí',
            cancelText: 'No',
          }),
        }),
      );
    });
  });

  describe('info()', () => {
    it('debería crear un diálogo informativo sin botón de cancelar', () => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));
      const title = 'Información';
      const message = 'Operación completada';

      service.info(title, message);

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent,
        jasmine.objectContaining({
          data: jasmine.objectContaining({
            title,
            message,
            confirmText: 'Entendido',
            cancelText: '',
            type: 'info',
          }),
        }),
      );
    });

    it('debería retornar el resultado del diálogo', (done) => {
      dialogRefSpy.afterClosed.and.returnValue(of(true));

      service.info('Info', 'Mensaje informativo').subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });
  });
});
