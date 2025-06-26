import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicialPagePageRoutingModule } from './inicial-page-routing.module';
import { InicialPagePage } from './inicial-page.page';
import { TranslateModule } from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicialPagePageRoutingModule,
    TranslateModule,
    SharedModule

  ],
  declarations: [InicialPagePage]
})
export class InicialPagePageModule {}
