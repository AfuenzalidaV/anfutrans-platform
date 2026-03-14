import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ParametroSistemaTable } from './parametro-sistema-table/parametro-sistema-table.component';
import { ParametroSistemaCreate } from './parametro-sistema-create/parametro-sistema-create.component';
import { ParametroSistemaEdit } from './parametro-sistema-edit/parametro-sistema-edit.component';
import { ParametroSistemaService } from './parametro-sistema.service';
import { ParametroSistemasRoutingModule } from './parametro_sistemas-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de ParametroSistema
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    ParametroSistemaTable,
    ParametroSistemaCreate,
    ParametroSistemaEdit
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
    ParametroSistemasRoutingModule,
    SharedModule
  ],
  providers: [ParametroSistemaService]
})
export class ParametroSistemasModule { }
