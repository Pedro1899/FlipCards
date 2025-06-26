import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {userLanguageGuard} from './core/guards/user-language-controll/user-language.guard'

const routes: Routes = [
  {
    path: 'Auth',
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthPageModule),
    canActivate:[userLanguageGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'play-deck',
    loadChildren: () => import('./features/play-deck/play-deck.module').then( m => m.PlayDeckPageModule)
  },
  {
    path: '',
    redirectTo: 'Auth',
    pathMatch: 'full'
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
