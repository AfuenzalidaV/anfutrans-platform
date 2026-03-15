import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocioTable } from './socio-table/socio-table.component';
import { SocioCreate } from './socio-create/socio-create.component';
import { SocioEdit } from './socio-edit/socio-edit.component';

const routes: Routes = [
  { path: '', component: SocioTable },
  { path: 'create' , component: SocioCreate },
  { path: 'edit/:id', component: SocioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SociosRoutingModule { }
