import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false
})
export class FooterComponent  implements OnInit {
 @Output() exit = new EventEmitter<boolean>();
 @Output() profile = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {}

  click_exit(){
    this.exit.emit(true)
  }

  click_profile(){
    this.profile.emit(true)
  }

}
