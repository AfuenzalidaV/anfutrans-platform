import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComunaTable } from './comuna-table/comuna-table.component';
import { ComunaCreate } from './comuna-create/comuna-create.component';
import { ComunaEdit } from './comuna-edit/comuna-edit.component';

const routes: Routes = [
  { path: '', component: ComunaTable },
  { path: 'create' , component: ComunaCreate },
  { path: 'edit/:id', component: ComunaEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunasRoutingModule { }
