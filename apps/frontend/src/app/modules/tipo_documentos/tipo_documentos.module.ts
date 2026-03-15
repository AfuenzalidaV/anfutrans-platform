import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { TipoDocumentoTable } from './tipo-documento-table/tipo-documento-table.component';
import { TipoDocumentoCreate } from './tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoEdit } from './tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentosRoutingModule } from './tipo_documentos-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de TipoDocumento
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    TipoDocumentoTable,
    TipoDocumentoCreate,
    TipoDocumentoEdit
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
    TipoDocumentosRoutingModule,
    SharedModule
  ],
  providers: [TipoDocumentoService]
})
export class TipoDocumentosModule { }
