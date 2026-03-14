import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudDocumentoTable } from './solicitud-documento-table/solicitud-documento-table.component';
import { SolicitudDocumentoCreate } from './solicitud-documento-create/solicitud-documento-create.component';
import { SolicitudDocumentoEdit } from './solicitud-documento-edit/solicitud-documento-edit.component';

const routes: Routes = [
  { path: '', component: SolicitudDocumentoTable },
  { path: 'create' , component: SolicitudDocumentoCreate },
  { path: 'edit/:id', component: SolicitudDocumentoEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudDocumentosRoutingModule { }
