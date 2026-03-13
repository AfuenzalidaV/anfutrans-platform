import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing-module';
import { UsuariosTable } from './usuarios-table/usuarios-table';
import { UsuarioCreate } from './usuario-create/usuario-create';
import { UsuarioEdit } from './usuario-edit/usuario-edit';

@NgModule({
  declarations: [UsuariosTable, UsuarioCreate, UsuarioEdit],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class UsuariosModule {}
