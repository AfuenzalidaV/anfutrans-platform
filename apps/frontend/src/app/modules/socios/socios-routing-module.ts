import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociosList } from './socios-list/socios-list';
import { SocioForm } from './socio-form/socio-form';

const routes: Routes = [
  { path: '', component: SociosList },
  { path: 'nuevo', component: SocioForm },
  { path: 'editar/:id', component: SocioForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SociosRoutingModule {}
