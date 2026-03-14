import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './core/auth/login/login';
// import { Dashboard } from './modules/dashboard/dashboard/dashboard'; // TODO: Implementar Dashboard
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: 'login', component: Login },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [

      { path: '', redirectTo: 'socios', pathMatch: 'full' }, // Temporal: redirige a socios
      // { path: 'dashboard', component: Dashboard }, // TODO: Implementar Dashboard

      // Módulos generados automáticamente desde Prisma Schema
      {
        path: 'socios',
        loadChildren: () =>
          import('./modules/socios/socios.module').then(m => m.SociosModule)
      },

      {
        path: 'solicitudes',
        loadChildren: () =>
          import('./modules/solicitudes/solicitudes.module').then(m => m.SolicitudesModule)
      },

      {
        path: 'beneficios',
        loadChildren: () =>
          import('./modules/beneficios/beneficios.module').then(m => m.BeneficiosModule)
      },

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },

      {
        path: 'regiones',
        loadChildren: () =>
          import('./modules/regiones/regiones.module').then(m => m.RegionesModule)
      },

      {
        path: 'comunas',
        loadChildren: () =>
          import('./modules/comunas/comunas.module').then(m => m.ComunasModule)
      },

      {
        path: 'roles',
        loadChildren: () =>
          import('./modules/roles/roles.module').then(m => m.RolesModule)
      },

      {
        path: 'documentos',
        loadChildren: () =>
          import('./modules/documentos/documentos.module').then(m => m.DocumentosModule)
      }

      // TODO: Agregar rutas para los demás módulos generados según necesidad
      // cargo_dirigenciales, tipo_solicitudes, tipo_documentos, etc.

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
