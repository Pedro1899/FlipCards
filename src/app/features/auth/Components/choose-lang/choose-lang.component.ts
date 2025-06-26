import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {LocalStorageService} from '../../../../core/services/storage/local-storage.service';
import {LanguageService} from '../../../../core/services/language/language.service';
import {Language} from '../../../../core/models/language';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router'

import {User} from '../../../../core/models/user'

import { from, Observable, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-choose-lang',
  templateUrl: './choose-lang.component.html',
  styleUrls: ['./choose-lang.component.scss'],
   animations: [
        trigger('fadeIn', [
          state('hidden', style({ opacity: 0 })),
          state('visible', style({ opacity: 1 })),
          transition('hidden => visible', animate('400ms ease-in-out')),
          transition('visible => hidden', animate('400ms ease-in-out')),
          transition(':enter', [
            style({ opacity: 0 }), // Start hidden
            animate('400ms ease-in-out', style({ opacity: 1 })), 
          ]),
          transition(':leave', [
            style({ opacity:  1 }),
            animate('400ms ease-in-out', style({ opacity: 0 })),
          ])
        ]),
      ],
  standalone:false
})
export class ChooseLangComponent  implements OnInit {
  fadeState: string = "hidden"
  user$ : Observable<string> | undefined
  step="mainLang"
  mainLang:Language ={code: "", label: ""}
  toLearnLang:Language ={code: "en", label: "English"}
  languages:Language[]=[]

  constructor(private storage: LocalStorageService, 
    private languageService: LanguageService, 
    private cd: ChangeDetectorRef,
  private router: Router) { }

  async ngOnInit() {

    
    this.user$ = from(this.storage.get("User")).pipe(
  switchMap((User:User)=>{
    return of(User.name +", "); 
  }
  )
)
this.mainLang = this.languageService.getCurrentLanguage()
this.toLearnLang =  this.languageService.getToLearnLanguage()
this.languageService.mainLanguage$.subscribe(item=>{
  this.mainLang =item
})

    setTimeout(() => {
      this.fadeState ="visible"
    }, 100);
  }

  async onMainLangChange(Language:Language){
   await this.languageService.changeLanguage_base(Language)
   this.step="toLearnLang"
   this.cd.detectChanges()    
  }
  async ontoLearnLangChange(Language:Language){
    await this.languageService.changeLanguage_toLearn(Language)
    await this.storage.set("newLanguage", Language)
    this.fadeState = 'hidden';
    setTimeout(() => {
      this.router.navigate(['/dashboard'], {replaceUrl: true});
    }, 500);

  }

}
