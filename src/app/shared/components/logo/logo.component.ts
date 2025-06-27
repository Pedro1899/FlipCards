import { Component, Input, OnInit } from '@angular/core';
import { IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone:false
})
export class LogoComponent  implements OnInit {
@Input() getWords!: string[]; 
@Input() getTiming!: number; 

  constructor() { }

  ngOnInit() {}

}
