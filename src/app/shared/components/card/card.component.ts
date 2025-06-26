import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone:false,
 changeDetection: ChangeDetectionStrategy.OnPush
})


export class CardComponent  implements OnInit {
  @Output() jobIsDone = new EventEmitter<boolean>();
  @Input() type:any="";
  validNext=false
  isFlipped=false
  startAnimation=true
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
setTimeout(() => {
  this.animation()
}, 500);
  }


  animation(){
this.flipCard()
setTimeout(() => {
  this.flipCard()
 // this.completeLanguage()
 this.validNext=true
}, 1000);
  }
  
  
    flipCard() {
      this.isFlipped = !this.isFlipped;
      this.cd.markForCheck()
    }

    completeLanguage(){
      this.jobIsDone.emit(true)
        }
}
