import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { SocioTable } from './socio-table/socio-table.component';
import { SocioCreate } from './socio-create/socio-create.component';
import { SocioEdit } from './socio-edit/socio-edit.component';
import { SocioService } from './socio.service';
import { SociosRoutingModule } from './socios-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Socio
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    SocioTable,
    SocioCreate,
    SocioEdit
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
    SociosRoutingModule,
    SharedModule
  ],
  providers: [SocioService]
})
export class SociosModule { }
