import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { BeneficioSocioTable } from './beneficio-socio-table/beneficio-socio-table.component';
import { BeneficioSocioCreate } from './beneficio-socio-create/beneficio-socio-create.component';
import { BeneficioSocioEdit } from './beneficio-socio-edit/beneficio-socio-edit.component';
import { BeneficioSocioService } from './beneficio-socio.service';
import { BeneficioSociosRoutingModule } from './beneficio_socios-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de BeneficioSocio
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    BeneficioSocioTable,
    BeneficioSocioCreate,
    BeneficioSocioEdit
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
    BeneficioSociosRoutingModule,
    SharedModule
  ],
  providers: [BeneficioSocioService]
})
export class BeneficioSociosModule { }
