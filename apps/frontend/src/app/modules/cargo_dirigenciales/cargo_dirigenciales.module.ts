import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { CargoDirigencialTable } from './cargo-dirigencial-table/cargo-dirigencial-table.component';
import { CargoDirigencialCreate } from './cargo-dirigencial-create/cargo-dirigencial-create.component';
import { CargoDirigencialEdit } from './cargo-dirigencial-edit/cargo-dirigencial-edit.component';
import { CargoDirigencialService } from './cargo-dirigencial.service';
import { CargoDirigencialesRoutingModule } from './cargo_dirigenciales-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de CargoDirigencial
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    CargoDirigencialTable,
    CargoDirigencialCreate,
    CargoDirigencialEdit
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
    CargoDirigencialesRoutingModule,
    SharedModule
  ],
  providers: [CargoDirigencialService]
})
export class CargoDirigencialesModule { }
