import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioTable } from './beneficio-table/beneficio-table.component';
import { BeneficioCreate } from './beneficio-create/beneficio-create.component';
import { BeneficioEdit } from './beneficio-edit/beneficio-edit.component';

const routes: Routes = [
  { path: '', component: BeneficioTable },
  { path: 'create' , component: BeneficioCreate },
  { path: 'edit/:id', component: BeneficioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiosRoutingModule { }
