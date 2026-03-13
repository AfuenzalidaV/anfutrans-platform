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
import { BeneficiosRoutingModule } from './beneficios-routing-module';
import { BeneficiosList } from './beneficios-list/beneficios-list';
import { BeneficioForm } from './beneficio-form/beneficio-form';
import { BeneficiosTable } from './beneficios-table/beneficios-table';
import { BeneficioCreate } from './beneficio-create/beneficio-create';
import { BeneficioEdit } from './beneficio-edit/beneficio-edit';

@NgModule({
  declarations: [BeneficiosList, BeneficioForm, BeneficiosTable, BeneficioCreate, BeneficioEdit],
  imports: [
    CommonModule,
    BeneficiosRoutingModule,
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
export class BeneficiosModule {}
