import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone:false
})
export class MenuComponent  implements OnInit {
  decks=false
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}
  
displayDecks(){this.decks=!this.decks}

exit(){
  this.menuCtrl.close('mainMenu');
}
profile(){

}

}
