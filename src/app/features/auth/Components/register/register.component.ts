import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'
import {NavigationEnd, Router} from '@angular/router'
import {HttpServiceService} from '../../../../core/services/http/http-service.service'
import {LocalStorageService} from '../../../../core/services/storage/local-storage.service'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { filter, switchMap } from 'rxjs';
import {User} from '../../../../core/models/user'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('hiddennow', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('400ms ease-in-out')),
      transition('hiddennow => visible', animate('400ms ease-in-out')),
      transition('visible => hidden', animate('400ms ease-in-out')),
      transition('visible => hiddennow', animate('100ms ease-in-out')),
      transition(':enter', [
        style({ opacity: 0 }), // Start hidden
        animate('500ms ease-in-out', style({ opacity: 1 })), // Fade in
      ]),
      transition(':leave', [
        style({ opacity:  1 }),
        animate('500ms ease-in-out', style({ opacity: 0 })),
      ])
    ]),
  ],
  standalone: false

})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  userName_placeholder = ""
  fadeState: string = 'hidden';
  isAuthRoot: boolean = false;
  constructor(private fb: FormBuilder,
    private toastController: ToastController,
    private translate: TranslateService,
    private http:HttpServiceService,
    private storage: LocalStorageService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]

    })
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
            this.fadeState = 'hiddennow';
          }else {
            setTimeout(() => {
              this.fadeState ="visible"
            }, 100);
          }
        });
  }
 




  async onSubmit() {
    
      if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      let errorMessage = '';
      const controls = this.registerForm.controls;
      if (controls['name'].hasError('required')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorName');
      } else if (controls['surname'].hasError('required')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorSurname');
      } else if (controls['email'].hasError('required')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorEmail');
      } else if (controls['email'].hasError('email')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorEmailFormat');
      } else if (controls['password'].hasError('required')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorPassword');
      } else if (controls['password'].hasError('minlength')) {
        errorMessage = this.userName_placeholder = this.translate.instant('authErrorPasswordFormat');
      }

        await this.toast(errorMessage)
        return   }

        this.http.register(this.registerForm.value).pipe(
          switchMap((registerResponse) => {
         return   this.http.login(this.registerForm.value)
          })
        ).subscribe({
          next:async (User:User) =>{
           await this.storage.set("User",User)
            this.fadeState = 'hidden';
            setTimeout(() => {
              this.router.navigate(['/Auth/language'], {replaceUrl: true});
            }, 400);
          },
          error:async (err) => {
            await this.toast(err)
          },
        })
  

  }



  goLogin(){
    this.fadeState = 'hidden';
    setTimeout(() => {
      this.router.navigate(['/Auth/login'], {replaceUrl: true});
    }, 400);

  }

  async toast(errorMessage: string){
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });

    await toast.present();
    return;
  }

}
