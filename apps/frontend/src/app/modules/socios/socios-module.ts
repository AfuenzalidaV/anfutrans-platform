import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { SociosRoutingModule } from './socios-routing-module';
import { SociosList } from './socios-list/socios-list';
import { SocioForm } from './socio-form/socio-form';
import { SociosTable } from './socios-table/socios-table';
import { SocioCreate } from './socio-create/socio-create';
import { SocioEdit } from './socio-edit/socio-edit';

@NgModule({
  declarations: [SociosList, SocioForm, SociosTable, SocioCreate, SocioEdit],
  imports: [
    CommonModule,
    SociosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class SociosModule {}
