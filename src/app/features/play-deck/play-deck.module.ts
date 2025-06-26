import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayDeckPageRoutingModule } from './play-deck-routing.module';

import { PlayDeckPage } from './play-deck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayDeckPageRoutingModule
  ],
  declarations: [PlayDeckPage]
})
export class PlayDeckPageModule {}
