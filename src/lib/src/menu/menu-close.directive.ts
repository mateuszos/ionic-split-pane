/* tslint:disable */
import { Directive, HostListener, Input } from '@angular/core';
import { MenuController } from './menu-controller';

@Directive({
  selector: '[menuClose]'
})
export class MenuCloseDirective {

  @Input() menuClose: string;

  constructor(private menu: MenuController) {}

  @HostListener('click')
  close() {
    const menu = this.menu.get(this.menuClose);
    menu && menu.close();
  }

}
