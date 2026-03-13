import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiosRoutingModule } from './beneficios-routing-module';
import { BeneficiosList } from './beneficios-list/beneficios-list';
import { BeneficioForm } from './beneficio-form/beneficio-form';

@NgModule({
  declarations: [BeneficiosList, BeneficioForm],
  imports: [CommonModule, BeneficiosRoutingModule],
})
export class BeneficiosModule {}
