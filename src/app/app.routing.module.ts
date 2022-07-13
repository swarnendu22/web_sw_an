import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './authGuards/auth.guard';
import { LoggedInGuard } from './authGuards/loggedin.guard';
import { AppCustomPreloader } from './lazy-loadding.preloading';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: './layout/auth-layout/auth-layout.module#AuthLayoutModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: AppCustomPreloader, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AppCustomPreloader],
})
export class AppRoutingModule { }
