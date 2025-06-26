import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { TranslateModule } from '@ngx-translate/core';
import {SetUserComponent} from './components/set-user/set-user.component'
import {CardComponent} from './components/card/card.component'
import {ChooseLangComponent} from './components/modals/choose-lang/choose-lang.component'
import {CustomButtonComponent} from './components/custom-button/custom-button.component'
import {SetLanguageComponent} from './components/set-language/set-language.component'
import {FooterComponent} from './components/footer/footer.component'
import {UserNameDirective} from './directives/userName/user-name.directive'
import {WordAnimationDirective} from './directives/word-flip-effect/word-animation.directive'


@NgModule({
  declarations: [SetUserComponent,
    CardComponent,
    SetLanguageComponent, 
    ChooseLangComponent,
    CustomButtonComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule, 
    FormsModule,
    TranslateModule,
    RouterModule,
    UserNameDirective,
    WordAnimationDirective,
  ],
  exports:[
    CommonModule,
    IonicModule,
    FormsModule,
    UserNameDirective,
    TranslateModule,
    WordAnimationDirective,
    SetUserComponent, 
    CardComponent, 
    SetLanguageComponent, 
    ChooseLangComponent,
    FooterComponent,
    CustomButtonComponent]
})
export class SharedModule { }
