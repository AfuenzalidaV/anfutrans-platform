import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SociosRoutingModule } from './socios-routing-module';
import { SociosList } from './socios-list/socios-list';
import { SocioForm } from './socio-form/socio-form';

@NgModule({
  declarations: [SociosList, SocioForm],
  imports: [CommonModule, SociosRoutingModule],
})
export class SociosModule {}
