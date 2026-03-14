import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { RolTable } from './rol-table/rol-table.component';
import { RolCreate } from './rol-create/rol-create.component';
import { RolEdit } from './rol-edit/rol-edit.component';
import { RolService } from './rol.service';
import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Rol
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    RolTable,
    RolCreate,
    RolEdit
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
    RolesRoutingModule,
    SharedModule
  ],
  providers: [RolService]
})
export class RolesModule { }
