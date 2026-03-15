import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoSolicitudTable } from './estado-solicitud-table/estado-solicitud-table.component';
import { EstadoSolicitudCreate } from './estado-solicitud-create/estado-solicitud-create.component';
import { EstadoSolicitudEdit } from './estado-solicitud-edit/estado-solicitud-edit.component';

const routes: Routes = [
  { path: '', component: EstadoSolicitudTable },
  { path: 'create' , component: EstadoSolicitudCreate },
  { path: 'edit/:id', component: EstadoSolicitudEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoSolicitudesRoutingModule { }
