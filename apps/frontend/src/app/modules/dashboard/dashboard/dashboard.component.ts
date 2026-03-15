import { Component, OnInit } from '@angular/core';
import { SocioService } from '../../socios/socio.service';
import { SolicitudService } from '../../solicitudes/solicitud.service';
import { BeneficioService } from '../../beneficios/beneficio.service';
import { forkJoin } from 'rxjs';

interface DashboardStats {
  totalSocios: number;
  totalSolicitudes: number;
  totalBeneficios: number;
  totalUsuarios: number;
}

/**
 * Dashboard principal con estadísticas del sistema
 */
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  stats: DashboardStats = {
    totalSocios: 0,
    totalSolicitudes: 0,
    totalBeneficios: 0,
    totalUsuarios: 0
  };

  loading = true;
  error = false;

  constructor(
    private socioService: SocioService,
    private solicitudService: SolicitudService,
    private beneficioService: BeneficioService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading = true;
    this.error = false;

    forkJoin({
      socios: this.socioService.getAll(),
      solicitudes: this.solicitudService.getAll(),
      beneficios: this.beneficioService.getAll()
    }).subscribe({
      next: (data) => {
        this.stats.totalSocios = data.socios.length;
        this.stats.totalSolicitudes = data.solicitudes.length;
        this.stats.totalBeneficios = data.beneficios.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando estadísticas:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  retry(): void {
    this.loadStatistics();
  }
}
