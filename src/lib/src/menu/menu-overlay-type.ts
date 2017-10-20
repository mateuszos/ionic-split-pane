import { Animation } from '../animations/animation';
import { MenuComponent } from './menu.component';
import { Platform } from '../platform/platform';
import { MenuType } from './menu-type';
import { Menu } from './menu.interface';

/**
 * @hidden
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
export class MenuOverlayType extends MenuType {
  constructor(menu: Menu, plt: Platform) {
    super(plt);

    let closedX: string, openedX: string;
    const width = menu.width();
    if (menu.isRightSide) {
      // right side
      closedX = 8 + width + 'px';
      openedX = '0px';

    } else {
      // left side
      closedX = -(8 + width) + 'px';
      openedX = '0px';
    }

    const menuAni = new Animation(plt, menu.getMenuElement());
    menuAni.fromTo('translateX', closedX, openedX);
    this.ani.add(menuAni);

    const backdropApi = new Animation(plt, menu.getBackdropElement());
    backdropApi.fromTo('opacity', 0.01, 0.35);
    this.ani.add(backdropApi);
  }
}

