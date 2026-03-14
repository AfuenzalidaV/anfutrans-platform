import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { SolicitudTable } from './solicitud-table/solicitud-table.component';
import { SolicitudCreate } from './solicitud-create/solicitud-create.component';
import { SolicitudEdit } from './solicitud-edit/solicitud-edit.component';
import { SolicitudService } from './solicitud.service';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Solicitud
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    SolicitudTable,
    SolicitudCreate,
    SolicitudEdit
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
    SolicitudesRoutingModule,
    SharedModule
  ],
  providers: [SolicitudService]
})
export class SolicitudesModule { }
