import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ComunaTable } from './comuna-table/comuna-table.component';
import { ComunaCreate } from './comuna-create/comuna-create.component';
import { ComunaEdit } from './comuna-edit/comuna-edit.component';
import { ComunaService } from './comuna.service';
import { ComunasRoutingModule } from './comunas-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Comuna
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    ComunaTable,
    ComunaCreate,
    ComunaEdit
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
    ComunasRoutingModule,
    SharedModule
  ],
  providers: [ComunaService]
})
export class ComunasModule { }
