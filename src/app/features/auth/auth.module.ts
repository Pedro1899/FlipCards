import { NgModule } from '@angular/core';

import {SharedModule}  from '../../shared/shared.module'
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import {LoginComponent} from './Components/login/login.component'
import {RegisterComponent} from './Components/register/register.component'
import {HeaderComponent} from './Components/header/header.component'
import {ChooseLangComponent} from './Components/choose-lang/choose-lang.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage, LoginComponent, RegisterComponent,HeaderComponent, ChooseLangComponent]
})
export class AuthPageModule {}
