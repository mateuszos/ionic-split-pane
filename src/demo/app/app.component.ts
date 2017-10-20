import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <ion-split-pane when="lg">
      <ion-menu [content]="content">
        Menu
      </ion-menu>
      <section #content>
        <header>
          <button menuToggle>Toggle menu</button>
        </header>
        Main content
      </section>
    </ion-split-pane>
  `,
})
export class AppComponent { }
