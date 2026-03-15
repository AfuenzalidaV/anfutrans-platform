import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionTable } from './region-table/region-table.component';
import { RegionCreate } from './region-create/region-create.component';
import { RegionEdit } from './region-edit/region-edit.component';

const routes: Routes = [
  { path: '', component: RegionTable },
  { path: 'create' , component: RegionCreate },
  { path: 'edit/:id', component: RegionEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionesRoutingModule { }
