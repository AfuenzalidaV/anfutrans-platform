import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  totalSocios = 0
  tramitesPendientes = 0
  beneficiosActivos = 0
  solicitudesMes = 0

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStats()
  }

  loadStats() {
    // Por ahora datos de demostración
    // TODO: Implementar llamadas reales al backend
    this.totalSocios = 150
    this.tramitesPendientes = 23
    this.beneficiosActivos = 12
    this.solicitudesMes = 45

    // Descomentar cuando el backend esté listo:
    // this.api.get('dashboard/stats').subscribe({
    //   next: (stats: any) => {
    //     this.totalSocios = stats.totalSocios
    //     this.tramitesPendientes = stats.tramitesPendientes
    //     this.beneficiosActivos = stats.beneficiosActivos
    //     this.solicitudesMes = stats.solicitudesMes
    //   },
    //   error: (error) => console.error('Error al cargar stats:', error)
    // })
  }

}
