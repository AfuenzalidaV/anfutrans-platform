import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoDirigencialTable } from './cargo-dirigencial-table/cargo-dirigencial-table.component';
import { CargoDirigencialCreate } from './cargo-dirigencial-create/cargo-dirigencial-create.component';
import { CargoDirigencialEdit } from './cargo-dirigencial-edit/cargo-dirigencial-edit.component';

const routes: Routes = [
  { path: '', component: CargoDirigencialTable },
  { path: 'create' , component: CargoDirigencialCreate },
  { path: 'edit/:id', component: CargoDirigencialEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoDirigencialesRoutingModule { }
