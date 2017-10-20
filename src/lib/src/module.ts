import { NgModule, ModuleWithProviders, APP_INITIALIZER, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from './platform/platform.module';
import { Config, setupConfig, ConfigToken } from './config/config';
import { registerModeConfigs } from './config/mode-registry';
import { Platform } from './platform/platform';
import { MenuModule } from './menu/menu.module';
import { MenuComponent } from './menu/menu.component';
import { MenuToggleDirective } from './menu/menu-toggle.directive';
import { MenuCloseDirective } from './menu/menu-close.directive';
import { SplitPaneComponent } from './split-pane/split-pane.component';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    PlatformModule,
  ],
  exports: [
    MenuComponent,
    MenuCloseDirective,
    MenuToggleDirective,
    SplitPaneComponent,
  ],
  declarations: [
    SplitPaneComponent,
  ],
})
export class IonicModule {
  /**
   * Set the root app component for you IonicModule
   * @param {any} appRoot The root AppComponent for this app.
   * @param {any} config Config Options for the app. Accepts any config property.
   * @param {any} deepLinkConfig Any configuration needed for the Ionic Deeplinker.
   */
  static forRoot(appRoot: any, config: any = null): ModuleWithProviders {
    return {
      ngModule: IonicModule,
      providers: [
        { provide: ConfigToken, useValue: config },
        { provide: Config, useFactory: setupConfig, deps: [ ConfigToken, Platform ] },
        { provide: APP_INITIALIZER, useFactory: registerModeConfigs, deps: [ Config ], multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: appRoot, multi: true },
      ],
    };
  }
}
