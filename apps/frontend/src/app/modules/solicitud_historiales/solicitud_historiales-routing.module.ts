import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudHistorialTable } from './solicitud-historial-table/solicitud-historial-table.component';
import { SolicitudHistorialCreate } from './solicitud-historial-create/solicitud-historial-create.component';
import { SolicitudHistorialEdit } from './solicitud-historial-edit/solicitud-historial-edit.component';

const routes: Routes = [
  { path: '', component: SolicitudHistorialTable },
  { path: 'create' , component: SolicitudHistorialCreate },
  { path: 'edit/:id', component: SolicitudHistorialEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudHistorialesRoutingModule { }
