/* tslint:disable */
import { Directive, Input, HostListener, Optional } from '@angular/core';
import { MenuController } from './menu-controller';

@Directive({
  selector: '[menuToggle]',
  host: {
    '[hidden]': 'isHidden'
  }
})
export class MenuToggleDirective {

  @Input() menuToggle: string;

  constructor(private menu: MenuController) { }

  @HostListener('click')
  toggle() {
    const menu = this.menu.get(this.menuToggle);
    menu && menu.toggle();
  }
}
