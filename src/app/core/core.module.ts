import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule , provideHttpClient, withInterceptors } from '@angular/common/http';
import {authInterceptor} from './Interceptors/auth.interceptor'
import {API_CONFIG, apiConfig} from './config/api.config'


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  IonicStorageModule.forRoot()

  ],
  providers: [
    { provide: API_CONFIG, useValue: apiConfig },
     provideHttpClient(withInterceptors([authInterceptor])),

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
exports:[
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  IonicModule,
  TranslateModule,
  IonicStorageModule,
]

})
export class CoreModule { }
