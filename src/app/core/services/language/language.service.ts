import { EventEmitter, Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import {Language} from '../../models/language'
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import {LocalStorageService} from '../storage/local-storage.service'
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  availableLanguages = ['en', "es",'tr', "de", "ar", "cn",  "fr", "it", "ru"];
   languages:Language[]=   [
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
      { code: "de", label: "Deutsch" },
      { code: "fr", label: "Français" },
      { code: "it", label: "Italiano" },
      { code: "pt", label: "Português" },
      { code: "ru", label: "Русский" },
      { code: "tr", label: "Türkçe" }
    ]
  private showLanguagePopupSubject = new BehaviorSubject<boolean>(false);
  showLanguagePopup$ = this.showLanguagePopupSubject.asObservable();
  private mainLang  = new BehaviorSubject<Language>({code:"en", label:"English"});
  private learnLang = new BehaviorSubject<Language>({code:"en", label:"English"});
  mainLanguage$ = this.mainLang.asObservable()
  learnLang$ = this.learnLang.asObservable()

  constructor(private translate : TranslateService,
              private localStorageService : LocalStorageService
    ) { 
  
  }

  async setInitialLanguage() {
    try {
      Device.getLanguageCode().then(lang => {
        const getLang = this.languages.find(item=> item.code == lang.value)
        if (getLang) {
          this.translate.setDefaultLang(lang.value);
          this.mainLang.next(getLang); // Seçili dil güncellenir
        } else {
          this.translate.setDefaultLang('en');
          this.mainLang.next({ code: "en", label: "English" }); // Seçili dil güncellenir
        }
      });
      
    } catch (error) {
     // this.translate.setDefaultLang('en');
      this.mainLang.next({ code: "en", label: "English" }); 
    }
  }

  async getLanguage() {
    try {
      const lang = await Device.getLanguageCode();
      const getLang= this.languages.find(item=> item.code == lang.value)
      if (getLang) {
        return getLang;
      } else {
        return { code: "en", label: "English" };
      }
    } catch (error) {
      console.error('Error getting language code', error);
      return { code: "en", label: "English" };
    }
  }

  changeLanguage_base(languageCode: Language) {
    this.translate.use(languageCode.code).subscribe(() => {
      const getLang= this.languages.find(item=> item.code=== languageCode.code)
      this.mainLang.next(getLang!); // now it's safe to emit
      this.localStorageService.set('mainLanguage', languageCode);
    });
    
  }

  changeLanguage_toLearn(languageCode: Language) {
    this.learnLang.next(languageCode);
  }


  getCurrentLanguage(): Language {
    return this.mainLang.getValue();
  }
  getToLearnLanguage(): Language {
    return this.learnLang.getValue();
  }
  
}


