import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone:false
})
export class CustomButtonComponent  implements OnInit {
@Input() validButton:boolean=false 
@Input() icon?:string="" 
@Input() text?:string="" 
@Input() class:string=""
@Input() buttonClass:string=""

@Output() clicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  click(){
    this.clicked.emit()
  }


}
