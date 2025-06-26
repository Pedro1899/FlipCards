import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ChooseLangComponent } from './Components/choose-lang/choose-lang.component';
import {userControllGuard} from '../../core/guards/user-controll/user-controll.guard'

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [userControllGuard], 
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [userControllGuard], 
      },
      {
        path: 'language',
        component: ChooseLangComponent,
        canActivate: [userControllGuard], 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
