import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { EstadoSolicitudTable } from './estado-solicitud-table/estado-solicitud-table.component';
import { EstadoSolicitudCreate } from './estado-solicitud-create/estado-solicitud-create.component';
import { EstadoSolicitudEdit } from './estado-solicitud-edit/estado-solicitud-edit.component';
import { EstadoSolicitudService } from './estado-solicitud.service';
import { EstadoSolicitudesRoutingModule } from './estado_solicitudes-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de EstadoSolicitud
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    EstadoSolicitudTable,
    EstadoSolicitudCreate,
    EstadoSolicitudEdit
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
    EstadoSolicitudesRoutingModule,
    SharedModule
  ],
  providers: [EstadoSolicitudService]
})
export class EstadoSolicitudesModule { }
