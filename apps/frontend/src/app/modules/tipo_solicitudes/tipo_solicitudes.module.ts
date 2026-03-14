import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { TipoSolicitudTable } from './tipo-solicitud-table/tipo-solicitud-table.component';
import { TipoSolicitudCreate } from './tipo-solicitud-create/tipo-solicitud-create.component';
import { TipoSolicitudEdit } from './tipo-solicitud-edit/tipo-solicitud-edit.component';
import { TipoSolicitudService } from './tipo-solicitud.service';
import { TipoSolicitudesRoutingModule } from './tipo_solicitudes-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de TipoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    TipoSolicitudTable,
    TipoSolicitudCreate,
    TipoSolicitudEdit
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
    TipoSolicitudesRoutingModule,
    SharedModule
  ],
  providers: [TipoSolicitudService]
})
export class TipoSolicitudesModule { }
