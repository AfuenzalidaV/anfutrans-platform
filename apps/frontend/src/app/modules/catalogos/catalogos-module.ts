import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CatalogosRoutingModule } from './catalogos-routing-module';
import { Regiones } from './regiones/regiones';
import { Comunas } from './comunas/comunas';
import { TipoDocumento } from './tipo-documento/tipo-documento';
import { CatalogosTable } from './catalogos-table/catalogos-table';

@NgModule({
  declarations: [Regiones, Comunas, TipoDocumento, CatalogosTable],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class CatalogosModule {}
