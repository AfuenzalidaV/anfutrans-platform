import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogos-table',
  standalone: false,
  templateUrl: './catalogos-table.html',
  styleUrl: './catalogos-table.scss',
})
export class CatalogosTable {

  catalogos = [
    { nombre: 'Cargos Dirigenciales', ruta: '/catalogos/cargos-dirigenciales' },
    { nombre: 'Comunas', ruta: '/catalogos/comunas' },
    { nombre: 'Regiones', ruta: '/catalogos/regiones' },
    { nombre: 'Tipo Beneficio', ruta: '/catalogos/tipo-beneficio' },
    { nombre: 'Tipo Certificado', ruta: '/catalogos/tipo-certificado' },
    { nombre: 'Tipo Documento', ruta: '/catalogos/tipo-documento' },
    { nombre: 'Tipo Solicitud', ruta: '/catalogos/tipo-solicitud' },
    { nombre: 'Estado Solicitud', ruta: '/catalogos/estado-solicitud' },
    { nombre: 'Parámetros', ruta: '/catalogos/parametros' }
  ];

}
