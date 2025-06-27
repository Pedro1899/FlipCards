import { Component, OnInit } from '@angular/core';
import { IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-initpage',
  templateUrl: './initpage.component.html',
  styleUrls: ['./initpage.component.scss'],
  standalone: false,
})
export class InitpageComponent  implements OnInit {
  appWordAnimation = [ 'Flips']
  timing = 0
  constructor() { }

  ngOnInit() {}

}
