import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayDeckPage } from './play-deck.page';

const routes: Routes = [
  {
    path: '',
    component: PlayDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayDeckPageRoutingModule {}
