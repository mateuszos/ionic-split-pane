import { Animation } from '../animations/animation';
import { Menu, MenuType as IMenuType } from './menu.interface';
import { MenuController } from './menu-controller';
import { Platform } from '../platform/platform';


/**
 * @hidden
 * Menu Type
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
export class MenuType implements IMenuType {

  ani: Animation;
  isOpening: boolean;

  constructor(plt: Platform) {
    this.ani = new Animation(plt);
    this.ani
      .easing('cubic-bezier(0.0, 0.0, 0.2, 1)')
      .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)')
      .duration(280);
  }

  setOpen(shouldOpen: boolean, animated: boolean, done: Function) {
    const ani = this.ani
      .onFinish(done, true, true)
      .reverse(!shouldOpen);

    if (animated) {
      ani.play();
    } else {
      ani.syncPlay();
    }
  }

  setProgressStart(isOpen: boolean) {
    this.isOpening = !isOpen;

    // the cloned animation should not use an easing curve during seek
    this.ani
        .reverse(isOpen)
        .progressStart();
  }

  setProgessStep(stepValue: number) {
    // adjust progress value depending if it opening or closing
    this.ani.progressStep(stepValue);
  }

  setProgressEnd(shouldComplete: boolean, currentStepValue: number, velocity: number, done: Function) {
    let isOpen = (this.isOpening && shouldComplete);
    if (!this.isOpening && !shouldComplete) {
      isOpen = true;
    }
    const ani = this.ani;
    ani.onFinish(() => {
      this.isOpening = false;
      done(isOpen);
    }, true);

    const factor = 1 - Math.min(Math.abs(velocity) / 4, 0.7);
    const dur = ani.getDuration() * factor;

    ani.progressEnd(shouldComplete, currentStepValue, dur);
  }

  destroy() {
    this.ani.destroy();
    this.ani = null;
  }

}
