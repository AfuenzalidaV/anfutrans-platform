import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { BeneficioTable } from './beneficio-table/beneficio-table.component';
import { BeneficioCreate } from './beneficio-create/beneficio-create.component';
import { BeneficioEdit } from './beneficio-edit/beneficio-edit.component';
import { BeneficioService } from './beneficio.service';
import { BeneficiosRoutingModule } from './beneficios-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Beneficio
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    BeneficioTable,
    BeneficioCreate,
    BeneficioEdit
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
    BeneficiosRoutingModule,
    SharedModule
  ],
  providers: [BeneficioService]
})
export class BeneficiosModule { }
