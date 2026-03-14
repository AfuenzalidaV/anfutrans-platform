import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar con loading en false', (done) => {
    service.loading$.subscribe(loading => {
      expect(loading).toBe(false);
      done();
    });
  });

  it('debería iniciar con contador en 0', (done) => {
    service.loadingCount$.subscribe(count => {
      expect(count).toBe(0);
      done();
    });
  });

  describe('show()', () => {
    it('debería activar loading cuando se llama', (done) => {
      service.show();

      service.loading$.subscribe(loading => {
        expect(loading).toBe(true);
        done();
      });
    });

    it('debería incrementar el contador', (done) => {
      service.show();

      service.loadingCount$.subscribe(count => {
        expect(count).toBe(1);
        done();
      });
    });

    it('debería incrementar el contador múltiples veces', (done) => {
      service.show();
      service.show();
      service.show();

      service.loadingCount$.subscribe(count => {
        expect(count).toBe(3);
        done();
      });
    });
  });

  describe('hide()', () => {
    it('debería decrementar el contador', (done) => {
      service.show();
      service.show();
      service.hide();

      service.loadingCount$.subscribe(count => {
        expect(count).toBe(1);
        done();
      });
    });

    it('debería desactivar loading cuando el contador llega a 0', (done) => {
      service.show();
      service.hide();

      service.loading$.subscribe(loading => {
        expect(loading).toBe(false);
        done();
      });
    });

    it('NO debería hacer el contador negativo', (done) => {
      service.hide();
      service.hide();

      service.loadingCount$.subscribe(count => {
        expect(count).toBe(0);
        done();
      });
    });

    it('debería mantener loading activo mientras el contador sea > 0', (done) => {
      service.show();
      service.show();
      service.show();
      service.hide();

      service.loading$.subscribe(loading => {
        expect(loading).toBe(true);
        done();
      });
    });
  });

  describe('forceHide()', () => {
    it('debería resetear el contador a 0', (done) => {
      service.show();
      service.show();
      service.show();
      service.forceHide();

      service.loadingCount$.subscribe(count => {
        expect(count).toBe(0);
        done();
      });
    });

    it('debería desactivar loading inmediatamente', (done) => {
      service.show();
      service.show();
      service.forceHide();

      service.loading$.subscribe(loading => {
        expect(loading).toBe(false);
        done();
      });
    });
  });

  describe('Escenarios complejos', () => {
    it('debería manejar múltiples peticiones concurrentes correctamente', (done) => {
      // Simula 3 peticiones que empiezan
      service.show(); // Petición 1
      service.show(); // Petición 2
      service.show(); // Petición 3

      service.loadingCount$.subscribe(count => {
        if (count === 3) {
          expect(count).toBe(3);

          // Petición 2 termina
          service.hide();

          // Aún debería estar activo (count = 2)
          service.loading$.subscribe(loading => {
            expect(loading).toBe(true);

            // Petición 1 termina
            service.hide();

            // Aún activo (count = 1)
            service.loading$.subscribe(loading2 => {
              expect(loading2).toBe(true);

              // Petición 3 termina
              service.hide();

              // Ahora debe estar desactivado (count = 0)
              service.loading$.subscribe(loading3 => {
                expect(loading3).toBe(false);
                done();
              });
            });
          });
        }
      });
    });

    it('debería emitir valores a través de observables', (done) => {
      const loadingStates: boolean[] = [];

      service.loading$.subscribe(state => loadingStates.push(state));

      service.show();
      service.hide();

      setTimeout(() => {
        expect(loadingStates).toContain(false);
        expect(loadingStates).toContain(true);
        done();
      }, 100);
    });
  });
});
