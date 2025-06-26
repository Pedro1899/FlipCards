import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpServiceService } from '../../core/services/http/http-service.service'
@Component({
  selector: 'app-inicial-page',
  templateUrl: './inicial-page.page.html',
  styleUrls: ['./inicial-page.page.scss'],
  animations: [
    trigger('fadeOut', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'hidden',
        style({
          transform: 'scale(0.4)',
          height: '15%',
        })
      ),
      transition('visible => hidden', [animate('0.5s ease-in-out')]),
    ]),
  ],
  standalone: false
})
export class InicialPagePage implements OnInit {

  constructor(private http: HttpServiceService) { }
  appWordAnimation = ['Learn', 'Explore', 'Start', 'Flip It']
  timing = 1500
  setUser = false
  showContent = true;
  showHeader = false;
  ngOnInit() {
    setTimeout(() => {
      this.triggerTransition()
    }, (this.appWordAnimation.length + 1) * this.timing);

  }



  triggerTransition(): void {
    this.showContent = false;
    setTimeout(() => {
      this.showHeader = true;
    }, 1000);
  }

  UserIsDone() {
    this.setUser = true
  }

  LanguageIsDone() {
    this.setUser = true
  }

}
