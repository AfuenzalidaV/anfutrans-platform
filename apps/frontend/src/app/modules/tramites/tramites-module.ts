import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesRoutingModule } from './tramites-routing-module';
import { TramitesList } from './tramites-list/tramites-list';
import { TramiteForm } from './tramite-form/tramite-form';

@NgModule({
  declarations: [TramitesList, TramiteForm],
  imports: [CommonModule, TramitesRoutingModule],
})
export class TramitesModule {}
