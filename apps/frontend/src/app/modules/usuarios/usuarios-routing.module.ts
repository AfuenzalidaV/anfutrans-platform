import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioTable } from './usuario-table/usuario-table.component';
import { UsuarioCreate } from './usuario-create/usuario-create.component';
import { UsuarioEdit } from './usuario-edit/usuario-edit.component';

const routes: Routes = [
  { path: '', component: UsuarioTable },
  { path: 'create' , component: UsuarioCreate },
  { path: 'edit/:id', component: UsuarioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
