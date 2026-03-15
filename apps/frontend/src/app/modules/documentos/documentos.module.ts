import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { DocumentoTable } from './documento-table/documento-table.component';
import { DocumentoCreate } from './documento-create/documento-create.component';
import { DocumentoEdit } from './documento-edit/documento-edit.component';
import { DocumentoService } from './documento.service';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Documento
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    DocumentoTable,
    DocumentoCreate,
    DocumentoEdit
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
    DocumentosRoutingModule,
    SharedModule
  ],
  providers: [DocumentoService]
})
export class DocumentosModule { }
