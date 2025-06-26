import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language/language.service';

@Component({
  selector: 'app-set-user',
  templateUrl: './set-user.component.html',
  styleUrls: ['./set-user.component.scss'],
  standalone:false
})
export class SetUserComponent  implements OnInit {
  step=1
  userName=""
  userName_placeholder =""
  isFlipped=false
  validNext=false
  @Output() usernameSelected = new EventEmitter<string>();
  constructor(private translate :TranslateService, private lang: LanguageService) { }
  
  ngOnInit() {
  this.userName_placeholder = this.translate.instant('userName_placeholder'); 
  this.lang.mainLanguage$.subscribe(newLang=>{
  this.userName_placeholder = this.translate.instant('userName_placeholder');
  })
  }

  Next(){
  if(this.validNext){
    this.usernameSelected.emit(this.userName);
  }
  }


 
  allowNext(event: any) {
    this.validNext=false
     if(event.detail.value.length>4){
      this.validNext=true
      }
}

}
