import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { TipoBeneficioTable } from './tipo-beneficio-table/tipo-beneficio-table.component';
import { TipoBeneficioCreate } from './tipo-beneficio-create/tipo-beneficio-create.component';
import { TipoBeneficioEdit } from './tipo-beneficio-edit/tipo-beneficio-edit.component';
import { TipoBeneficioService } from './tipo-beneficio.service';
import { TipoBeneficiosRoutingModule } from './tipo_beneficios-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de TipoBeneficio
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    TipoBeneficioTable,
    TipoBeneficioCreate,
    TipoBeneficioEdit
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
    TipoBeneficiosRoutingModule,
    SharedModule
  ],
  providers: [TipoBeneficioService]
})
export class TipoBeneficiosModule { }
