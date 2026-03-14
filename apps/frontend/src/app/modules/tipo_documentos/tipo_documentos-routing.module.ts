import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDocumentoTable } from './tipo-documento-table/tipo-documento-table.component';
import { TipoDocumentoCreate } from './tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoEdit } from './tipo-documento-edit/tipo-documento-edit.component';

const routes: Routes = [
  { path: '', component: TipoDocumentoTable },
  { path: 'create' , component: TipoDocumentoCreate },
  { path: 'edit/:id', component: TipoDocumentoEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDocumentosRoutingModule { }
