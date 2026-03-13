import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosTable } from './usuarios-table/usuarios-table';
import { UsuarioCreate } from './usuario-create/usuario-create';
import { UsuarioEdit } from './usuario-edit/usuario-edit';

const routes: Routes = [
  { path: '', component: UsuariosTable },
  { path: 'nuevo', component: UsuarioCreate },
  { path: 'editar/:id', component: UsuarioEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
