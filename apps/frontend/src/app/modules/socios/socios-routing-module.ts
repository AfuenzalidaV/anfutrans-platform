import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociosTable } from './socios-table/socios-table';
import { SocioCreate } from './socio-create/socio-create';
import { SocioEdit } from './socio-edit/socio-edit';

const routes: Routes = [
  { path: '', component: SociosTable },
  { path: 'nuevo', component: SocioCreate },
  { path: 'editar/:id', component: SocioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SociosRoutingModule {}
