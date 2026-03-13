import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from '../beneficios.service';

@Component({
  selector: 'app-beneficios-table',
  standalone: false,
  templateUrl: './beneficios-table.html',
  styleUrl: './beneficios-table.scss',
})
export class BeneficiosTable implements OnInit {

  beneficios: any[] = [];
  columns = ['nombre', 'descripcion', 'tipoBeneficioId'];

  constructor(private service: BeneficiosService) {}

  ngOnInit() {
    this.service.getBeneficios().subscribe({
      next: (data: any) => {
        this.beneficios = data;
      },
      error: (error) => {
        console.error('Error al cargar beneficios:', error);
        // Datos demo
        this.beneficios = [
          { id: '1', nombre: 'Descuento Salud', descripcion: 'Descuento en seguros de salud', tipoBeneficioId: 1 },
          { id: '2', nombre: 'Beca Educación', descripcion: 'Beca para estudios', tipoBeneficioId: 2 }
        ];
      }
    });
  }

}
