import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { TipoCertificadoTable } from './tipo-certificado-table/tipo-certificado-table.component';
import { TipoCertificadoCreate } from './tipo-certificado-create/tipo-certificado-create.component';
import { TipoCertificadoEdit } from './tipo-certificado-edit/tipo-certificado-edit.component';
import { TipoCertificadoService } from './tipo-certificado.service';
import { TipoCertificadosRoutingModule } from './tipo_certificados-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de TipoCertificado
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    TipoCertificadoTable,
    TipoCertificadoCreate,
    TipoCertificadoEdit
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
    TipoCertificadosRoutingModule,
    SharedModule
  ],
  providers: [TipoCertificadoService]
})
export class TipoCertificadosModule { }
