import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone:false
})
export class CustomButtonComponent  implements OnInit {

@Input() icon?:string="" 
@Input() text?:string=""
@Input() border?:boolean


@Output() clicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  click(){
    this.clicked.emit()
  }


}
