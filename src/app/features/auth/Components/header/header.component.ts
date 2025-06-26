import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
  standalone:false
})
export class HeaderComponent  implements OnInit, OnDestroy {
  appWordAnimation = ['Learn', 'Explore', 'Start', 'Flip It']
  timing = 1500
  setUser = false
  showContent = true;
  showHeader = false;
  changePath =false
  isAuthRoot: boolean = false;
  showFinalState: boolean = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAuthRoot = event.urlAfterRedirects === '/Auth';
        if (this.isAuthRoot) {
          this.showHeader = false;
          this.showFinalState = false;
const timing= (this.appWordAnimation.length + 1) * this.timing
          setTimeout(() => {
            this.showHeader = true;
            setTimeout(() => {
              this.showFinalState = true;
              this.router.navigate(['/Auth/register']);
            }, 500);
          }, timing);
        } else {
          this.showHeader = false;
          this.showFinalState = true;
        }
      });
  }
  ngOnDestroy(){
    this.routerSubscription?.unsubscribe()
  }

}
