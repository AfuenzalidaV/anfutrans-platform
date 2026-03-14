import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { RegionTable } from './region-table/region-table.component';
import { RegionCreate } from './region-create/region-create.component';
import { RegionEdit } from './region-edit/region-edit.component';
import { RegionService } from './region.service';
import { RegionesRoutingModule } from './regiones-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Módulo para gestión de Region
 * Generado automáticamente desde Prisma Schema
 */
@NgModule({
  declarations: [
    RegionTable,
    RegionCreate,
    RegionEdit
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
    RegionesRoutingModule,
    SharedModule
  ],
  providers: [RegionService]
})
export class RegionesModule { }
