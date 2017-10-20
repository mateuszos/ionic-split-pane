import { Animation } from '../animations/animation';
import { MenuComponent } from './menu.component';
import { Platform } from '../platform/platform';
import { MenuType } from './menu-type';
import { Menu } from './menu.interface';

/**
 * @hidden
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
export class MenuRevealType extends MenuType {
  constructor(menu: Menu, plt: Platform) {
    super(plt);

    const openedX = (menu.width() * (menu.isRightSide ? -1 : 1)) + 'px';
    const contentOpen = new Animation(plt, menu.getContentElement());
    contentOpen.fromTo('translateX', '0px', openedX);
    this.ani.add(contentOpen);
  }
}
