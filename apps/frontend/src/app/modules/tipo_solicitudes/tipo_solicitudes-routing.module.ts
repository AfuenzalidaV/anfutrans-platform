import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoSolicitudTable } from './tipo-solicitud-table/tipo-solicitud-table.component';
import { TipoSolicitudCreate } from './tipo-solicitud-create/tipo-solicitud-create.component';
import { TipoSolicitudEdit } from './tipo-solicitud-edit/tipo-solicitud-edit.component';

const routes: Routes = [
  { path: '', component: TipoSolicitudTable },
  { path: 'create' , component: TipoSolicitudCreate },
  { path: 'edit/:id', component: TipoSolicitudEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoSolicitudesRoutingModule { }
