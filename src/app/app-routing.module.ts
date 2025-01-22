import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {welcomeGuardGuard} from './welcome-guard.guard'

const routes: Routes = [
  {
    path: 'inicial-page',
    loadChildren: () => import('./inicial-page/inicial-page.module').then( m => m.InicialPagePageModule),
    canActivate:[welcomeGuardGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'play-deck',
    loadChildren: () => import('./play-deck/play-deck.module').then( m => m.PlayDeckPageModule)
  },
  {
    path: '',
    redirectTo: 'inicial-page',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
