import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioSocioTable } from './beneficio-socio-table/beneficio-socio-table.component';
import { BeneficioSocioCreate } from './beneficio-socio-create/beneficio-socio-create.component';
import { BeneficioSocioEdit } from './beneficio-socio-edit/beneficio-socio-edit.component';

const routes: Routes = [
  { path: '', component: BeneficioSocioTable },
  { path: 'create' , component: BeneficioSocioCreate },
  { path: 'edit/:id', component: BeneficioSocioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficioSociosRoutingModule { }
