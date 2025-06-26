import { Component, Input, OnInit } from '@angular/core';
import {LanguageService} from '../../../../core/services/language/language.service'
import {Language} from '../../../../core/models/language'

import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-choose-lang',
  templateUrl: './choose-lang.component.html',
  styleUrls: ['./choose-lang.component.scss'],
  standalone:false
})
export class ChooseLangComponent  implements OnInit {
  @Input() type!: 'mainLanguage' | 'newLanguage'; 
  availableLanguages = ['en', 'tr', "de",  "es", "fr", "it", "ru"];
  currentLang:Language={code:"", label:""};
  constructor(
    private languageService: LanguageService,
    private modalController : ModalController,
  ) {

   
  }

  ngOnInit() {

   if(this.type ==='mainLanguage'){
    this.currentLang = this.languageService.getCurrentLanguage();
   }else if(this.type ==='newLanguage'){
    this.currentLang = this.languageService.getToLearnLanguage()
   }
  }

  changeLang(event: any) {
    const selectedLanguage = event.detail.value;
    if(this.type=='mainLanguage'){
      this.languageService.changeLanguage_base(selectedLanguage)
    }else if(this.type=='newLanguage'){
      this.languageService.changeLanguage_toLearn(selectedLanguage)
    }
      this.modalController.dismiss({
        lang: selectedLanguage,
      });    
    }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

}
