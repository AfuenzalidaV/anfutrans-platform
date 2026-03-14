import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioTable } from './usuario-table/usuario-table.component';
import { UsuarioCreate } from './usuario-create/usuario-create.component';
import { UsuarioEdit } from './usuario-edit/usuario-edit.component';
import { UsuarioService } from './usuario.service';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Usuario
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    UsuarioTable,
    UsuarioCreate,
    UsuarioEdit
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  providers: [UsuarioService]
})
export class UsuariosModule { }
