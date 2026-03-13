import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { TramitesRoutingModule } from './tramites-routing-module';
import { TramitesList } from './tramites-list/tramites-list';
import { TramiteForm } from './tramite-form/tramite-form';
import { TramitesTable } from './tramites-table/tramites-table';
import { TramiteCreate } from './tramite-create/tramite-create';
import { TramiteEdit } from './tramite-edit/tramite-edit';

@NgModule({
  declarations: [TramitesList, TramiteForm, TramitesTable, TramiteCreate, TramiteEdit],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class TramitesModule {}
