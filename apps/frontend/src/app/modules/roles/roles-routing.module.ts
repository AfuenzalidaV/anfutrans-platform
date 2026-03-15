import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolTable } from './rol-table/rol-table.component';
import { RolCreate } from './rol-create/rol-create.component';
import { RolEdit } from './rol-edit/rol-edit.component';

const routes: Routes = [
  { path: '', component: RolTable },
  { path: 'create' , component: RolCreate },
  { path: 'edit/:id', component: RolEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
