import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametroSistemaTable } from './parametro-sistema-table/parametro-sistema-table.component';
import { ParametroSistemaCreate } from './parametro-sistema-create/parametro-sistema-create.component';
import { ParametroSistemaEdit } from './parametro-sistema-edit/parametro-sistema-edit.component';

const routes: Routes = [
  { path: '', component: ParametroSistemaTable },
  { path: 'create' , component: ParametroSistemaCreate },
  { path: 'edit/:id', component: ParametroSistemaEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametroSistemasRoutingModule { }
