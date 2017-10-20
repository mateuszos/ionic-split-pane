import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'xc-ionic';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    IonicModule.forRoot(AppComponent, {
      mode: 'ios',
      menuType: 'reveal',
    }),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
