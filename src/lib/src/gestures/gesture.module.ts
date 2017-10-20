import { NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestureController } from './gesture-controller';

@NgModule({
  providers: [
    GestureController,
  ],
})
export class GestureModule { }
