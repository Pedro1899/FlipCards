import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {HttpServiceService} from '../../../../core/services/http/http-service.service';
import {LocalStorageService} from '../../../../core/services/storage/local-storage.service';
import { TranslateService } from '@ngx-translate/core'
import { animate, state, style, transition, trigger } from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router'
import { filter } from 'rxjs';
import {User} from '../../../../core/models/user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent  implements OnInit {
  loginForm: FormGroup
  fadeState: string = "hidden"
  isAuthRoot: boolean =false;
  constructor(
    private fb: FormBuilder,
    private http: HttpServiceService,
    private storage: LocalStorageService,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService
  ) { 

    this.loginForm =  this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit() {
    setTimeout(() => {
      this.fadeState ="visible"
    }, 100);
      
  
    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.isAuthRoot = event.urlAfterRedirects === '/Auth';
          if (this.isAuthRoot) {
            this.fadeState = 'hidden';
          }
        });
  
  }
     
  async onSubmit(){

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    let errorMessage = '';
    const controls = this.loginForm.controls;


      if (controls['email'].hasError('required')) {
      errorMessage = this.translate.instant('authErrorEmail');
    } else if (controls['email'].hasError('email')) {
      errorMessage = this.translate.instant('authErrorEmailFormat');
    } else if (controls['password'].hasError('required')) {
      errorMessage = this.translate.instant('authErrorPassword');
    } else if (controls['password'].hasError('minlength')) {
      errorMessage =  this.translate.instant('authErrorPasswordFormat');
    }

      await this.toast(errorMessage)
      return   }

  this.http.login(this.loginForm.value).subscribe(
    {
    next: async (user:User)=>{
      console.log("what will it save?", user)
      await this.storage.set("User",user)
       this.fadeState = 'hidden';
       setTimeout(() => {
         this.router.navigate(['/Auth/language'], {replaceUrl: true});
       }, 400);
    },
    


    error: async (err)=> {
      const error = err.error?.error
      if(error){
        if (error!="wrong-password" && error!="wrong-email"){
          await this.toast(error)
              return
        }
     const gerror = this.translate.instant(error);
      await this.toast(gerror)
      }
    },
    }
  )

}

register(){
  this.fadeState = 'hidden';
  setTimeout(() => {
    this.router.navigate(['/Auth/register'], {replaceUrl: true});
  }, 500);
 
}

async toast(errorMessage: string){
  const toast = await this.toastController.create({
    message: errorMessage,
    duration: 4000,
    color: 'danger',
    position: 'bottom'
  });

  await toast.present();
  return;
}


}
