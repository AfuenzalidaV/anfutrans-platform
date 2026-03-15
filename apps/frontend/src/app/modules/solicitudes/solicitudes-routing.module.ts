import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudTable } from './solicitud-table/solicitud-table.component';
import { SolicitudCreate } from './solicitud-create/solicitud-create.component';
import { SolicitudEdit } from './solicitud-edit/solicitud-edit.component';

const routes: Routes = [
  { path: '', component: SolicitudTable },
  { path: 'create' , component: SolicitudCreate },
  { path: 'edit/:id', component: SolicitudEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
