import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, 
            IonicModule.forRoot(),
            AppRoutingModule,
            IonicStorageModule.forRoot()],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },importProvidersFrom(HttpClientModule) ],
  bootstrap: [AppComponent],
})
export class AppModule {}
