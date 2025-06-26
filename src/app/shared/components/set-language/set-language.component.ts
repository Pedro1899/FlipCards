import { Component, OnInit, OnDestroy, Input ,ChangeDetectorRef, output, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ModalController, IonRange } from '@ionic/angular';
import { LanguageService } from '../../../core/services/language/language.service';
import {ChooseLangComponent} from '../modals/choose-lang/choose-lang.component'
import {Language} from '../../../core/models/language'
import {User} from '../../../core/models/user'
import { LocalStorageService } from '../../../core/services/storage/local-storage.service'
import { from, Observable, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-set-language',
  templateUrl: './set-language.component.html',
  styleUrls: ['./set-language.component.scss'],
  standalone:false
})
export class SetLanguageComponent  implements OnInit {
  fadeState: string = "hidden"
  user$ : Observable<string> | undefined
  languages:Language[]=[]

  @Output() setLangage = new EventEmitter<Language>();
  @Input() language: Language | undefined
  @Input() title!: string
  getLang: Language | undefined 
language$ : Observable<Language> | undefined 
  constructor(private modalController : ModalController,
    private cdRef: ChangeDetectorRef,
    private languageService: LanguageService,
    private storage : LocalStorageService
  ) { 

   
  }



  ngOnInit() {
    
    this.languages = this.languageService.languages
    this.getLang = this.languages.find(lang => lang.code === this.language?.code);
    
    this.user$ = from(this.storage.get("User")).pipe(
      switchMap((User:User)=>{
        return of(User.name +", "); 
      }
      )
    )
  }


  complete(){
    this.setLangage.emit(this.getLang)
  }
}
