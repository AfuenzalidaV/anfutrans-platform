import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TramitesTable } from './tramites-table/tramites-table';
import { TramiteCreate } from './tramite-create/tramite-create';
import { TramiteEdit } from './tramite-edit/tramite-edit';

const routes: Routes = [
  { path: '', component: TramitesTable },
  { path: 'nuevo', component: TramiteCreate },
  { path: 'editar/:id', component: TramiteEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramitesRoutingModule {}
