import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentoTable } from './documento-table/documento-table.component';
import { DocumentoCreate } from './documento-create/documento-create.component';
import { DocumentoEdit } from './documento-edit/documento-edit.component';

const routes: Routes = [
  { path: '', component: DocumentoTable },
  { path: 'create' , component: DocumentoCreate },
  { path: 'edit/:id', component: DocumentoEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosRoutingModule { }
