import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiosTable } from './beneficios-table/beneficios-table';
import { BeneficioCreate } from './beneficio-create/beneficio-create';
import { BeneficioEdit } from './beneficio-edit/beneficio-edit';

const routes: Routes = [
  { path: '', component: BeneficiosTable },
  { path: 'nuevo', component: BeneficioCreate },
  { path: 'editar/:id', component: BeneficioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosRoutingModule {}
