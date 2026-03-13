import { Component, OnInit } from '@angular/core';
import { TramitesService } from '../tramites.service';

@Component({
  selector: 'app-tramites-table',
  standalone: false,
  templateUrl: './tramites-table.html',
  styleUrl: './tramites-table.scss',
})
export class TramitesTable implements OnInit {

  tramites: any[] = [];
  columns = ['id', 'socioId', 'tipoSolicitudId', 'estadoSolicitudId'];

  constructor(private service: TramitesService) {}

  ngOnInit() {
    this.service.getTramites().subscribe({
      next: (data: any) => {
        this.tramites = data;
      },
      error: (error) => {
        console.error('Error al cargar trámites:', error);
        // Datos demo
        this.tramites = [
          { id: '1', socioId: '1', tipoSolicitudId: 1, estadoSolicitudId: 1 },
          { id: '2', socioId: '2', tipoSolicitudId: 2, estadoSolicitudId: 2 }
        ];
      }
    });
  }

}
