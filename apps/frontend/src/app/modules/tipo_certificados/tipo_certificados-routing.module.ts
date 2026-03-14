import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoCertificadoTable } from './tipo-certificado-table/tipo-certificado-table.component';
import { TipoCertificadoCreate } from './tipo-certificado-create/tipo-certificado-create.component';
import { TipoCertificadoEdit } from './tipo-certificado-edit/tipo-certificado-edit.component';

const routes: Routes = [
  { path: '', component: TipoCertificadoTable },
  { path: 'create' , component: TipoCertificadoCreate },
  { path: 'edit/:id', component: TipoCertificadoEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCertificadosRoutingModule { }
