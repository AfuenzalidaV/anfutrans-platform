import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { SolicitudHistorialTable } from './solicitud-historial-table/solicitud-historial-table.component';
import { SolicitudHistorialCreate } from './solicitud-historial-create/solicitud-historial-create.component';
import { SolicitudHistorialEdit } from './solicitud-historial-edit/solicitud-historial-edit.component';
import { SolicitudHistorialService } from './solicitud-historial.service';
import { SolicitudHistorialesRoutingModule } from './solicitud_historiales-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de SolicitudHistorial
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    SolicitudHistorialTable,
    SolicitudHistorialCreate,
    SolicitudHistorialEdit
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
    SolicitudHistorialesRoutingModule,
    SharedModule
  ],
  providers: [SolicitudHistorialService]
})
export class SolicitudHistorialesModule { }
