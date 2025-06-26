import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalStorageService } from './core/services/storage/local-storage.service'
import { LanguageService } from './core/services/language/language.service'

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private storage: LocalStorageService,
              private translate: TranslateService,
              private deviceLanguageService: LanguageService,
              private cdRef: ChangeDetectorRef
  ) {

  
  }

 ngOnInit(){
 
  this.initializeApp()
 }

 app(){
  console.log("app component?")
 }
 initializeApp() {
    this.storage.get('mainLanguage').then(savedLanguage => {
      if (savedLanguage) {
        this.translate.use(savedLanguage.code);
        this.deviceLanguageService.changeLanguage_base(savedLanguage);
        this.storage.get('newLanguage').then(lang_learn=>{
       lang_learn?   this.deviceLanguageService.changeLanguage_toLearn(lang_learn):""
        })
      } else {
        this.deviceLanguageService.getLanguage().then(lang => {
          const mainLang = this.deviceLanguageService.languages.includes(lang) ? lang :{code:"en", label:"English"};
          this.translate.use(mainLang.code);
          this.deviceLanguageService.changeLanguage_base(mainLang);
          const learnLang = mainLang.code=='en' ? {code:"es", label:"Español"} : {code:"en", label:"English"};
          this.deviceLanguageService.changeLanguage_toLearn(learnLang);
        });
      }
      this.cdRef.detectChanges();
    });
  }
}
