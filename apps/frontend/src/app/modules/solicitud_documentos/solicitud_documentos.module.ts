import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { SolicitudDocumentoTable } from './solicitud-documento-table/solicitud-documento-table.component';
import { SolicitudDocumentoCreate } from './solicitud-documento-create/solicitud-documento-create.component';
import { SolicitudDocumentoEdit } from './solicitud-documento-edit/solicitud-documento-edit.component';
import { SolicitudDocumentoService } from './solicitud-documento.service';
import { SolicitudDocumentosRoutingModule } from './solicitud_documentos-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de SolicitudDocumento
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    SolicitudDocumentoTable,
    SolicitudDocumentoCreate,
    SolicitudDocumentoEdit
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
    SolicitudDocumentosRoutingModule,
    SharedModule
  ],
  providers: [SolicitudDocumentoService]
})
export class SolicitudDocumentosModule { }
