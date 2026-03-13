import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing-module';
import { Regiones } from './regiones/regiones';
import { Comunas } from './comunas/comunas';
import { TipoDocumento } from './tipo-documento/tipo-documento';

@NgModule({
  declarations: [Regiones, Comunas, TipoDocumento],
  imports: [CommonModule, CatalogosRoutingModule],
})
export class CatalogosModule {}
