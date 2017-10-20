import { Animation } from '../animations/animation';
import { MenuComponent } from './menu.component';
import { Platform } from '../platform/platform';
import { MenuType } from './menu-type';
import { Menu } from './menu.interface';

/**
 * @hidden
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
export class MenuPushType extends MenuType {
  constructor(menu: Menu, plt: Platform) {
    super(plt);

    let contentOpenedX: string, menuClosedX: string, menuOpenedX: string;
    const width = menu.width();
    if (menu.isRightSide) {
      // right side
      contentOpenedX = -width + 'px';
      menuClosedX = width + 'px';
      menuOpenedX = '0px';

    } else {
      contentOpenedX = width + 'px';
      menuOpenedX = '0px';
      menuClosedX = -width + 'px';
    }

    const menuAni = new Animation(plt, menu.getMenuElement());
    menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
    this.ani.add(menuAni);

    const contentApi = new Animation(plt, menu.getContentElement());
    contentApi.fromTo('translateX', '0px', contentOpenedX);
    this.ani.add(contentApi);
  }
}
