import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from './core/api/api.service';
import { LoadingService } from './core/services/loading.service';

/**
 * App Component - FASE 8
 * Componente raíz con overlay de loading global
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(
    private api: ApiService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    // Prueba inicial de API (se puede remover en producción)
    // this.api.get('catalogos/regiones').subscribe(console.log);
  }
}
