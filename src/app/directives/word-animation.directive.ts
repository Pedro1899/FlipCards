import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWordAnimation]',
  standalone: true
})
export class WordAnimationDirective implements OnInit {

@Input('appWordAnimation') flipWords:string[] =[]
@Input() timing:number =2000

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  private wordValue=0
  private intervalId: any;
  private animationClass = 'flip-effect'

  ngOnInit(){
    if (this.flipWords.length > 0) {
      this.elRef.nativeElement.textContent = this.flipWords[this.wordValue];
    }

    this.intervalId = setInterval(() => {
      this.wordValue = this.wordValue+1
      if(this.wordValue >= this.flipWords.length){
        this.clearInterval()
      }else{
     
        this.updateTextWithAnimation(this.flipWords[this.wordValue])

      }
    },this.timing);

  }

  private updateTextWithAnimation(word: string) {
    // Add the flip animation class
    this.renderer.addClass(this.elRef.nativeElement, this.animationClass);
  

    // Wait for the animation to start, then update the text
    setTimeout(() => {
      this.elRef.nativeElement.textContent = word;
    }, 250); // Halfway through the animation duration

    // Remove the animation class after the animation ends
    setTimeout(() => {
      this.renderer.removeClass(this.elRef.nativeElement, this.animationClass);
    }, 500); // Match this to the total animation duration
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

}
