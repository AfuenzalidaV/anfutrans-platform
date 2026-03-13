import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './core/auth/login/login';
import { Dashboard } from './modules/dashboard/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: 'login', component: Login },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },

      {
        path: 'socios',
        loadChildren: () =>
          import('./modules/socios/socios-module').then(m => m.SociosModule)
      },

      {
        path: 'tramites',
        loadChildren: () =>
          import('./modules/tramites/tramites-module').then(m => m.TramitesModule)
      },

      {
        path: 'beneficios',
        loadChildren: () =>
          import('./modules/beneficios/beneficios-module').then(m => m.BeneficiosModule)
      },

      {
        path: 'catalogos',
        loadChildren: () =>
          import('./modules/catalogos/catalogos-module').then(m => m.CatalogosModule)
      },

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/usuarios/usuarios-module').then(m => m.UsuariosModule)
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
