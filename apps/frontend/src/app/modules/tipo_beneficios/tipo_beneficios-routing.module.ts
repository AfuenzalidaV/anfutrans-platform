import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoBeneficioTable } from './tipo-beneficio-table/tipo-beneficio-table.component';
import { TipoBeneficioCreate } from './tipo-beneficio-create/tipo-beneficio-create.component';
import { TipoBeneficioEdit } from './tipo-beneficio-edit/tipo-beneficio-edit.component';

const routes: Routes = [
  { path: '', component: TipoBeneficioTable },
  { path: 'create' , component: TipoBeneficioCreate },
  { path: 'edit/:id', component: TipoBeneficioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoBeneficiosRoutingModule { }
