import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '../platform/platform.module';
import { GestureModule } from '../gestures/gesture.module';
import { MenuComponent } from './menu.component';
import { MenuController } from './menu-controller';
import { BackdropComponent } from './backdrop/backdrop.component';
import { MenuCloseDirective } from './menu-close.directive';
import { MenuToggleDirective } from './menu-toggle.directive';

import { MenuRevealType } from './menu-reveal-type';
import { MenuPushType } from './menu-push-type';
import { MenuOverlayType } from './menu-overlay-type';

MenuController.registerType('reveal', MenuRevealType);
MenuController.registerType('push', MenuPushType);
MenuController.registerType('overlay', MenuOverlayType);

@NgModule({
  imports: [
    CommonModule,
    PlatformModule,
    GestureModule,
  ],
  exports: [
    CommonModule,
    MenuComponent,
    MenuCloseDirective,
    MenuToggleDirective,
    BackdropComponent,
  ],
  providers: [
    MenuController,
  ],
  declarations: [
    MenuComponent,
    MenuCloseDirective,
    MenuToggleDirective,
    BackdropComponent,
  ],
})
export class MenuModule { }
