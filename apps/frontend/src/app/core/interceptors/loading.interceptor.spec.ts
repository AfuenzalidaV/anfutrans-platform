import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('loadingInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        LoadingService,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);

    spyOn(loadingService, 'show').and.callThrough();
    spyOn(loadingService, 'hide').and.callThrough();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería llamar show() antes de la petición y hide() después del éxito', (done) => {
    httpClient.get('/api/test').subscribe({
      next: () => {
        expect(loadingService.show).toHaveBeenCalled();
        expect(loadingService.hide).toHaveBeenCalled();
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/test');
    expect(loadingService.show).toHaveBeenCalledTimes(1);
    req.flush({ data: 'success' });
  });

  it('debería llamar hide() incluso si la petición falla', (done) => {
    httpClient.get('/api/error').subscribe({
      error: () => {
        expect(loadingService.show).toHaveBeenCalled();
        expect(loadingService.hide).toHaveBeenCalled();
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/error');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('debería manejar múltiples peticiones concurrentes', (done) => {
    let completedRequests = 0;
    const checkCompletion = () => {
      completedRequests++;
      if (completedRequests === 3) {
        expect(loadingService.show).toHaveBeenCalledTimes(3);
        expect(loadingService.hide).toHaveBeenCalledTimes(3);
        done();
      }
    };

    httpClient.get('/api/test1').subscribe(() => checkCompletion());
    httpClient.get('/api/test2').subscribe(() => checkCompletion());
    httpClient.get('/api/test3').subscribe(() => checkCompletion());

    const req1 = httpTestingController.expectOne('/api/test1');
    const req2 = httpTestingController.expectOne('/api/test2');
    const req3 = httpTestingController.expectOne('/api/test3');

    req1.flush({});
    req2.flush({});
    req3.flush({});
  });

  it('debería llamar hide() usando finalize() para garantizar ejecución', (done) => {
    httpClient.get('/api/test').subscribe({
      next: () => {
        // Verificar que hide se llama después del éxito
        setTimeout(() => {
          expect(loadingService.hide).toHaveBeenCalled();
          done();
        }, 0);
      },
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush({ success: true });
  });
});
